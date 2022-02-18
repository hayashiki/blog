---
title: Rustのセットアップ方法
slug: setup-rust
description: Rustのセットアップ方法について整理した
date: 2022/1/31
tags:
    - Rust
    - Setup
categories:
    - Rust
images:
    - assets/blog-logo-oimo.png
---

# Motivation

最近Rustを競プロのサブ言語的な位置づけで書き始めたので、まずはセットアップ方法を自分のメモ用にしておく

# Install

[サイト](https://www.rust-lang.org/ja/tools/install)からrustupをダウンロードする

```
 % curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

〜

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>1

info: profile set to 'default'
info: default host triple is x86_64-apple-darwin
info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: latest update on 2022-01-20, rust version 1.58.1 (db9d1b20b 2022-01-20)

〜
Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, run:
source $HOME/.cargo/env

```

```
% source $HOME/.cargo/env
% which cargo
/Users/hayashiki/.cargo/bin/cargo
% which rustup
/Users/hayashiki/.cargo/bin/rustup
% rustc --version
rustc 1.58.1 (db9d1b20b 2022-01-20)
```

# IntelliJ IDEAでRustを使うには？

[Rustのプラグイン](https://plugins.jetbrains.com/plugin/8182-rust)があったのでインストールする

![img.png](/attachments/20220131-rustidea.png)

Rustをインストール済みであれば 、ToolChainにCargoのパスがうまっているはず

以上
