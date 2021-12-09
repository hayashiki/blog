---
title: Goをセットアップする
slug: go-setup
timestamp: '2021-03-8T04:13:56+00:00'
date: 2021/3/4
tags:
- Go
- basic
---

# Goのセットアップ方法

# Why??

初学者にGoのセットアップ方法を聞かれる機会がちらほらあるので、
このリンクを読んでおいてと案内できるものを自分で書いちゃってよいかなというモチベーション

# Setup環境

- MacBook Pro(Intel)
- Big Sir 11.6

# 方針

- 公式サイトからダウンロードしてパスを通す
- brew経由などのパッケージマネージャでインストールしない
- [goenv](https://github.com/syndbg/goenv)などのenv系は利用しない

Goは後方互換性があるため、特別なことがない限り
最新にバージョンをあげていけばよいので、goenvなどのバージョン管理ツールは不要

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

パスを通す

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

# バージョンアップ(追記)

手順はインストール手順と同じである
試しにv1.17.3がでていたので、インストールする

```:sh
$ wget https://golang.org/dl/go1.17.3.darwin-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.3.darwin-amd64.tar.gz
$ rm go1.17.3.darwin-amd64.tar.gz
$ go version                                              
go version go1.17.3 darwin/amd64
```

# go.modのバージョンアップ 

go.mod記載のgoのバージョンを変更するには以下のコマンドで行う
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
