---
title: CloudRunのCI/CDを構築する
slug: how-to-deploy-cloudrun
description: CloudRunで継続デプロイする際の設定をまとめた
timestamp: '2022-01-25T13:21:56+00:00'
date: 2022/1/25
tags:
    - CloudRun
categories:
    - GCP
images:
    - assets/blog-logo-oimo.png
---

## はじめに

CloudRunで継続デプロイする際の設定をまとめた
CloudSDKのコマンドベースでの記載であるが、 terraformを使うバージョンもあるのでまた別途記載予定である

## 手順

1. CI/CD用のサービスアカウントユーザを作成する
2. CloudRun用のサービスアカウントユーザを作成する
3. GitHub Actionsを設定する

## 前提

- [Cloud SDKをインストールしてgcloudコマンドが実行できること](https://cloud.google.com/sdk/docs/install)
- [gcloud config set project](https://cloud.google.com/sdk/gcloud/reference/config/set)してプロジェクト作成済みであること
- Goアプリケーションは割愛、簡易的なWebサーバをたててもらえればOK

## API有効化

gcloudコマンドで作成して、権限を付与する
最低限のAPIしか有効化していないので、例えばCloudSQLも利用するのであれば周辺の権限も有効化しておく

```sh
export GCP_PROJECT=$(gcloud config get-value project)
gcloud services enable iamcredentials.googleapis.com --project $GCP_PROJECT 
gcloud services enable run.googleapis.com --project $GCP_PROJECT
```

ポイント
- `iamcredentials.googleapis.com`は後述するWorkloadIdentify連携で必要になるため必要

## CI/CD用のサービスアカウントユーザを作成する

gcloudコマンドで作成して、権限を付与する
editorやowner権限を与えたくなる気持ちはわかりますが、最小権限の原則でいきましょう

- まずはユーザ作成

```sh
export GCP_PROJECT=$(gcloud config get-value project)

gcloud iam service-accounts create ci-user \
--project=$GCP_PROJECT \
--display-name "CI User Service Account"
```

- 必要なRoleを付与する
    - CloudBuildのBuild
    - サービスアカウントユーザ
    - CloudRun管理者

あたりを付与すればCloudRun単体のCI/CD環境は正しく動作する
サービスアカウントユーザは必須で、これがないとデプロイに対して適切なサービスアカウントを持っていないとみなされ
`iam.serviceaccounts.actAs' denied on service account deploy`といったエラーでおこられるので注意しよう

[参考](https://cloud.google.com/run/docs/reference/iam/roles?hl=ja#gcloud)

```sh
export CI_SA_EMAIL=ci-user@$GCP_PROJECT.iam.gserviceaccount.com

gcloud projects add-iam-policy-binding $GCP_PROJECT \
--member="serviceAccount:$CI_SA_EMAIL" \
--role='roles/cloudbuild.builds.builder'
gcloud projects add-iam-policy-binding $GCP_PROJECT \
--member="serviceAccount:$CI_SA_EMAIL" \
--role='roles/iam.serviceAccountUser'
gcloud projects add-iam-policy-binding $GCP_PROJECT \
--member="serviceAccount:$CI_SA_EMAIL" \
--role='roles/run.admin'
```

## CloudRunの実行ユーザを作成する

指定しなければデフォルトのサービスアカウントで実行されるが、
デフォルトのサービスアカウントから変更しておくことが推奨されているので 専用のサービスアカウントを作成する

- サービスアカウント作成

```sh
# Runのサービス単位でサービスアカウントを作ることを想定して サービス名と同じにして変数を使いまわしているが、特に任意の名前で問題ない
export SERVICE_NAME="cloud-run-service-server"

gcloud iam service-accounts create $SERVICE_NAME \
--display-name "$SERVICE_NAME service account"
```

- CloudRun管理者権限を付与

```sh
export SERVICE_NAME="cloud-run-service-server"
export CLOUDRUN_SA=$SERVICE_NAME@$GCP_PROJECT.iam.gserviceaccount.com

gcloud projects add-iam-policy-binding $GCP_PROJECT \
--member serviceAccount:$CLOUDRUN_SA \
--role roles/run.admin
```

## Workload連携で作成する

GitHubActionsのOIDCでGCPのリソースをさわりたいので WorkloadIdentity連携の設定を行う

```
export POOL_NAME=github-actions
export GITHUB_REPO=$(git config remote.origin.url | cut -d : -f 2 | sed 's/.git//')
export PROVIDER_NAME=gha-provider
export CI_SA_EMAIL=ci-user@$GCP_PROJECT.iam.gserviceaccount.com

## ワークロード連携プールを作成する
gcloud iam workload-identity-pools create $POOL_NAME \
--project=$GCP_PROJECT --location="global" \
--display-name="use from GitHub Actions"

export WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe $POOL_NAME --project=$GCP_PROJECT --location=global --format="value(name)")

## CIユーザにWorkloadIdentity連携のロールを付与する
gcloud iam service-accounts add-iam-policy-binding $CI_SA_EMAIL \
--project=$GCP_PROJECT \
--role="roles/iam.workloadIdentityUser" \
--member="principalSet://iam.googleapis.com/$WORKLOAD_IDENTITY_POOL_ID/attribute.repository/$GITHUB_REPO"

## WorkloadIdentityPoolにProviderを作成する
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME \
--project=$GCP_PROJECT --location=global \
--workload-identity-pool=$POOL_NAME \
--display-name="use from GitHub Actions provider" \
--attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor,attribute.aud=assertion.aud" \
--issuer-uri="https://token.actions.githubusercontent.com"
	
```

# GitHub Actionsを設定する

対象ブランチやデプロイ条件は適宜いい感じにしてもらうとして、
GCPサービスアカウントのアカウントキーを発行せずにデプロイできることがポイントとなる

```yaml
name: Deploy

on:
  pull_request:
    branches:
      - 'main'  
  push:
    branches:
      - 'main'
jobs:
  deploy:
    runs-on: ubuntu-latest

    env:
      GCP_PROJECT: xxxx // secretsに登録して読み込むでも良し
      GCP_PROJECT_NUM: xxxx
      REGION: xxxx
      SERVICE_NAME: xxxx

    permissions:
      contents: read
      id-token: 'write'

    steps:
      - uses: 'google-github-actions/setup-gcloud@v0'
        with:
          project_id: ${{ env.GCP_PROJECT }}

      - name: Checkout
        uses: actions/checkout@v2

      - id: 'auth'
        name: 'Authenticate to Google Cloud'
        uses: 'google-github-actions/auth@v0.3.1'
        with:
          create_credentials_file: true
          workload_identity_provider: projects/${{ env.GCP_PROJECT_NUM }}/locations/global/workloadIdentityPools/github-actions/providers/gha-provider
          service_account: ci-user@${{ env.GCP_PROJECT }}.iam.gserviceaccount.com

      - id: 'gcloud'
        name: Authenticate
        run: |-
          gcloud auth login --brief --cred-file="${{ steps.auth.outputs.credentials_file_path }}"
          gcloud --quiet auth configure-docker

      - name: Docker Build
        run: |-
          docker build -t ${{ env.SERVICE_NAME }} .
          docker tag ${{ env.SERVICE_NAME }} gcr.io/${{ env.GCP_PROJECT }}/${{env.SERVICE_NAME}}:latest
          docker push gcr.io/${{ env.GCP_PROJECT }}/${{env.SERVICE_NAME}}:latest

      - name: Deploy
        if: github.event_name == 'push'
        run: |-
          gcloud run deploy ${{ env.SERVICE_NAME }} --image gcr.io/${{ env.GCP_PROJECT }}/${{ env.SERVICE_NAME }}:latest \
            --project ${{ env.GCP_PROJECT }} \
            --platform managed \
            --region ${{ env.REGION }} \
            --service-account ${{ env.SERVICE_NAME }}@${{ env.GCP_PROJECT }}.iam.gserviceaccount.com \
            --allow-unauthenticated

```

以上で、設定可能となる
