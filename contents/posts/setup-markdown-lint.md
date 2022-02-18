---
title: markdownのlintを設定する
slug: setup-markdown-lint
description: 2022年2月時点でMarkdownのlint項目には50個のルールがあるらしい。興味がてらMarkdownのlintを設定する方法を記載した
date: 2022/2/1
tags:
- Markdown
categories:
- Markdown
- Lint
images:
- assets/blog-logo-oimo.png
---

# tl;dr

- 2022年2月時点でMarkdownのlint項目には50個のルールがあるらしい
- 興味がてらMarkdownのlintを設定する方法を記載した
- チームのドキュメント開発に導入しようと思うレベルではないのだが、 Markdownの記載方法がブレる事例を集約したものなので どのようなルールがあるのか眺めることは良いことだと思う

# 設定ファイルを配置する

.markdownlint.ymlをレポジトリのルートに配置する

`touch .markdownlint.yml`

ルール一覧は[こちら](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)にあるので、無効にしたいものをfalseにする

```yaml
MD040: false
```

MD040はコードブロックに言語指定を必須とするというルールであるが、必ずしも必須にする必要もないと思い`false`にしている

# Docker上で実行する

[`markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)をインストールして実行する方法があるが、
Lintツールの類いはDocker経由で実行したいので、[avto-dev/markdown-lint](https://github.com/avto-dev/markdown-lint)を利用する

$dirを格納先のパスに変更して、ディレクトリ単位で一括で実行するコマンドは以下のようになる

```sh
docker run --rm -v "$(pwd):/data" \
  -e INPUT_CONFIG=/data/.markdownlint.yml \ 
  avtodev/markdown-lint:v1 /data/$dir
```

# GitHub Actions上で実行する

引き続き `docker://avtodev/markdown-lint:v1`のイメージを使う

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Lint markdown file
        uses: docker://avtodev/markdown-lint:v1
        with:
          args: '**/*.md'
          config: '.markdownlint.yml'
```

# まとめ

これで継続的なLintチェックが可能となる
当ブログでも設定しているので、参考にしてほしい
