---
title: Goのセットアップ方法
slug: go-setup
description: Goのセットアップ方法について整理した
date: 2021/4/7
tags:
    - Go
    - これ読んでおいて
categories:
    - Go
images:
    - assets/blog-logo-oimo.png
---

# Motivation

初学者にGoのセットアップ方法を聞かれる機会がちらほらあるので、
このリンクを読んでおいてと案内できるものを自分で書いちゃってよいかなというモチベーション

# Setup環境

- Machine: MacBook Pro(Intel)
- OS: maxOS Monterey

# 方針

- 公式サイトからダウンロードしてパスを通す 🙆‍♂️
- brew経由などのパッケージマネージャでインストールする方法は採用しない
- [goenv](https://github.com/syndbg/goenv)などの*env系ツールも採用しない

Goは後方互換性があるため、特別なことがない限り
最新にバージョンをあげていけばよいので、バージョン管理ツールは不要

# Install

- [Go公式](https://golang.org/dl/)からtar.gz形式でダウンロードする
- MacOSで 2021/10時点での最新バージョンはgo1.17.2.darwin-amd64.tar.gzが対象
- ダウンロードファイルを`/user/local`に展開する

```sh
// 2021/10 時点での最新バージョン
$ wget https://golang.org/dl/go1.17.2.darwin-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.2.darwin-amd64.tar.gz
$ rm go1.17.2.darwin-amd64.tar.gz
```

# Add path to ~/.zshrc

- パスを通す

```
$ vi ~/.zshrc

$ export PATH=$PATH:/usr/local/go/bin
$ export GOPATH=$HOME/go
```

# ~/.zshrcを反映

```
$ source .zshrc
```

$HOME/goのパスを`ls`するとbin, pkg, sdkが確認できる

```
% ls $HOME/go
bin     pkg     sdk
```

# バージョン確認

```
$ go version
go version go1.17.2 darwin/amd64
```

# Goバージョンアップ(追記)

手順はインストール手順と同じである
試しにv1.17.3がでていたので、インストールする

```:sh
$ wget https://golang.org/dl/go1.17.3.darwin-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.3.darwin-amd64.tar.gz
// Remove all the extracted files
$ sudo rm -rf /usr/local/go
$ rm go1.17.3.darwin-amd64.tar.gz
$ go version                                              
go version go1.17.3 darwin/amd64
```

# go.modのGo Versionの変更 

go.mod記載のGoのVersionを変更するには以下の`go mod edit -go=1.XX`で行う
例として、go1.16 -> go1.17へ変更する

```
$ go mod edit -go=1.17

$ git diff go.mod
diff --git a/go.mod b/go.mod
index 282c25f..014df88 100644
--- a/go.mod
+++ b/go.mod
@@ -1,9 +1,11 @@
 module github.com/hayashiki/go-boiler
 
-go 1.16
+go 1.17

```
# Go Multi Version install

複数バージョンのGoをInstallする場合には[マニュアル](https://go.dev/doc/manage-install?s=09#installing-multiple)に書いてあるようにおこなう
（サーバレス上のランタイムのGoバージョン制約にあわせる必要があるケースなど）

```
$ go install golang.org/dl/go1.17.6@latest
$ go1.17.6 download
$ go1.17.6 version
```

# Install On Ubuntu

- 公式サイトの取得をlinux-amd64にすればよいだけ

```
$ wget https://golang.org/dl/go1.17.6.linux-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.6.linux-amd64.tar.gz
```

- 環境変数をパスに登録する

```
vi ~/.profile
$　export PATH=$PATH:/usr/local/go/bin
$ source ~/.profile
$ go version
go version go1.17.6 linux/amd6
```

# まとめ

結論としてはとにかく公式に書かれている手順でやるのが一番良いよという話であった
