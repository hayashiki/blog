---
title: Githubプロジェクトボード登録自動化を実装した
slug: github-actions-issue
timestamp: '2021-03-8T04:13:56+00:00'
date: 2021/3/4
tag: GitHub,CI/CD
tags:
  - Github
  - Workflow
  - CI/CD
  - Automation  
categories:
  - NodeJS
---

# TL;DR

GitHub ActionsでIssueやPR管理を自動化したい場合にはGitHubマーケットプレイスから探すのもいいが、
ある程度クエリをパターン化しておいて、自作するのも一つの手であるという話

# 実現したかったワークフロー

Issue作成時に自動で GitHub Projectに登録されるようにしたい

# 課題

- カンバンボードからカード登録からIssueにコンバートすることもできるのだが、ステップが多い
- [マーケットプレイス](https://github.com/marketplace/actions/github-project-automation)といったツールは、プライベートレポジトリではデフォルトのトークン権限が足らずに実行が失敗してしまう
- 個人のプライベートトークン発行が必要になるので、できれば避けたい

# アプローチ

1. ghコマンドでクエリを作成する
2. Github Scriptに流し込む

# 詳細

## 1. ghコマンドでクエリを作成する

今回のプロジェクト操作するには `gh api`コマンドを実行する

- Projectを取得する

owner, name, projectNameを指定する

同じ名前のプロジェクトの場合を無視しているが、そういったケースでプロジェクト名をつけることはないのでまあいいかとしている
mutationがプロジェクト名検索しかないので、id検索できればいいのかもしれない

```
gh api graphql -F owner='hayashiki' -F name='actions' -F searchString="phase1" -F -f query='
  query($owner: String!, $name: String!, $searchString: String!) {
    repository(owner: $owner, name: $name) {
      projects(first: 1, search: $searchString) {
        edges {
          cursor
          node {
            id
            url
            name
            columns(first: 10) {
              edges {
                cursor
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
'
```

- ProjectにIssueを追加する

上記のクエリのレスポンスにて取得できるカラムIdを指定して、issueのnode_idをcontentIdに指定すれば登録可能となる
issueのnode_idの取得は後述する

```
gh api graphql -F contentId='MDU6SXNzdWU4MjM1OTU1OTQ=' -F projectColumnId='MDEzOlByb2plY3RDb2x1bW4xMzIyNzQwOQ==' -f query='
   mutation($contentId: ID!, $projectColumnId: ID!) {
     addProjectCard(input: { contentId: $contentId, projectColumnId: $projectColumnId }) {
       clientMutationId
     }
   }
'
```

## 2. GithubActions内で実行できるようにワークフローを作成する

ワークフロー内に直接スクリプトを実行できる[github-script](https://github.com/actions/github-script)を使う

ワークフロー定義を以下としている
ポイントとしては

- Issueのnode_idは github-scriptのドキュメントにあるように `context.payload.issue`で取得可能
- graphQLのクライアント実行は `github.graphql(core.getInput('query'), variables)` にて実行可能
- stepsにidを付与すると、別のstepで`steps.$(id).outputs` にて参照可能, 本ワークフローではgraphQLのクエリ結果を格納している
- script内に `console.log` を記載すると標準出力されActionsのログ内で閲覧可能

```yaml
name: 'Automatically add issue to project'

on:
  issues:
    types: [opened]

jobs:
  add-project:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Find Project
      id: findColumnsByProjectName
      uses: actions/github-script@v3
      with:
        github-token: ${{secrets.GITHUB_TOKEN}}
        query: '
          query($owner: String!, $name: String!, $search: String!) {
            repository(owner: $owner, name: $name) {
              name
              projects(first: 5, search: $search) {
                edges {
                  cursor
                  node {
                    id
                    url
                    name
                    columns(first: 10) {
                        edges {
                          cursor
                          node {
                            id
                            name
                          }
                        }
                    }
                  }
                }
              }
            }
          }
        '
        projectName: Backlog
        script: |
          const variables = {
            owner: context.repo.owner,
            name: context.repo.repo,
            search: core.getInput('projectName')
          }
          const result = await github.graphql(core.getInput('query'), variables)
          if (!result) {
            core.setFailed('GraphQL request failed')
          } else {
            return result
          }
    - name: Add Backlog Project
      uses: actions/github-script@v3
      with:
        github-token: ${{secrets.GITHUB_TOKEN}}
        columnName: "To do"
        query: '
          mutation($contentId: ID!, $projectColumnId: ID!) {
            addProjectCard(input: { contentId: $contentId, projectColumnId: $projectColumnId }) {
              clientMutationId
            }
          }
        '
        projects: ${{ steps.findColumnsByProjectName.outputs.result }}
        script: |
          const findColumnsByProjectName = JSON.parse(core.getInput('projects'))
          console.log(findColumnsByProjectName)
          let columnId;
          for (const project of findColumnsByProjectName.repository.projects.edges) {
            for (const column of project.node.columns.edges) {
              if (column.node.name == core.getInput('columnName')) {
                columnId = column.node.id
              }
            }
          }
          const issue = context.payload.issue
          const variables = {
            contentId: issue.node_id,
            projectColumnId: columnId ,
          }
          const result = await github.graphql(core.getInput('query'), variables)
          if (!result) {
            core.setFailed('GraphQL request failed')
          } 
```
