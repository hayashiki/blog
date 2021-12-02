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

初学者にGoのセットアップを聞かれる機会がちらほらあるので、
ぐぐって記事さがすよりは自分で書いちゃってよいかなというモチベーション

# Setup環境

- MacBook Pro(Intel)
- Big Sir 11.6

# 方針

- 公式サイトからダウンロードする
- brew経由でインストールしない
- goenvなどのenv系は利用しない

Goは後方互換性があるため、特別なことがない限り
最新にバージョンをあげていけばよいので、goenvなどのバージョンツールは不要

# Install

- [Go公式](https://golang.org/dl/)からtar.gz形式でダウンロードする
- ダウンロードファイルを`/user/local`に展開する


``````sh
// 2021/10 時点での最新バージョン
$ wget https://golang.org/dl/go1.17.2.darwin-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.2.darwin-amd64.tar.gz
$ rm go1.17.2.darwin-amd64.tar.gz
```

# Add path to ~/.zshrc

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

# バージョンアップ

手順はインストール手順と同じである
試しにv1.17.3がでていたので、インストールする

```
$ wget https://golang.org/dl/go1.17.3.darwin-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.17.3.darwin-amd64.tar.gz
$ rm go1.17.3.darwin-amd64.tar.gz
$ go version                                              
go version go1.17.3 darwin/amd64
```

# edit go.mod

go.mod記載のgoのバージョンを変更するには以下のコマンドで行う

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

