# Turing Complete Unofficial

[解説ページはこちら](https://tsukina-7mochi.github.io/turing-complete-unofficial/)

## 概要

[Turing Complete](turingcomplete.game) の日本語解説・攻略を掲載するページです。
このレポジトリには攻略内容自体とそれを提供するWebアプリケーションの両方が含まれます。
`./app` ディレクトリ以下がアプリケーションで、バンドル結果は `docs/app` 以下に生成されます。
`./docs` ディレクトリがGitHub Pagesによりホスティングされるディレクトリのルートで、
記事の内容が配置されており、Web Appによって動的に読み込まれます。

## バンドル

開発ビルド
```shell
$npm run dev
```

watch
```shell
$npm run watch
```

本番ビルド
```shell
$npm run build
```

## ブランチ

- `main`: メインブランチ
- `dev`: アプリケーションの開発用ブランチ
- `doc`: ドキュメントのアップデートブランチ

適宜 `main` ブランチにmergeしてください。

## 特定のタグに事前に定義されたクラス

- `div.spoiler`: スポイラーとしてデフォルト状態で隠れて表示されます。
- `table.truth`: 真理値表となります
  - WIP: 詳しい内容は決まってから更新

## 動的生成コンテンツ

### レベル解説ページ

`#レベル` タグが付いているページについて、該当レベルの前提レベルと該当レベルを前提とするレベルの内容を自動的に追加します。