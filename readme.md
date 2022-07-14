# Turing Complete Unofficial

[解説ページはこちら](https://tsukina-7mochi.github.io/turing-complete-unofficial/)

## 概要

[Turing Complete](https://turingcomplete.game) の日本語解説・攻略を掲載するプロジェクトです。
このレポジトリには攻略記事の内容とホスティングのためのスクリプトが含まれます。

## ディレクトリ

- `/docs` 攻略記事のmarkdownファイルとページのメタデータが含まれます。
- `/src` クライアントサイドのスクリプト・スタイルシートが含まれます。
- `/templates` 記事を書くためのテンプレートが含まれます。
- `/tools` 開発のためのスクリプトが含まれます。
- `/webpack` バンドルのためのスクリプトが含まれます。

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
- `docs`: ドキュメントのアップデートブランチ

適宜 `main` ブランチにmergeします。

## 画像などについて

外部ストレージにアップロードしたものへのリンクを張ってください。

## 特定のタグに事前に定義されたクラス

- `div.spoiler`: スポイラーとしてデフォルト状態で隠れて表示されます。
- `table.truth`: 真理値表となります
  - ```markdown
        ```truth_table
            入力1, 入力2, 出力
            F, F, F
            T, F, T
            F, T, T
            T, T, T
        ```
    ```
    のように記述できるようにしました

## リンクについて

ページへのリンクは `#...` の形で記述します(例: `#or_gate`)
また、 `[and_gate]` 、 `[AND Gate]` のようにした場合 `[and_gate](#and_gate)` 、 `AND Gate(#and_gate)` のように変換されます。

- `page_info.json5` の `alias` フィールドに `alias名: 内部名` のフィールドを
  追加することで任意の別名を追加することができます。

## 動的生成コンテンツ

### メニュー

`page_info.json5` の内容に基づきメニューを生成します。

`page_info.json5` の構造について詳細は `/app/pageInfo.ts` の型定義を参照してください。

### レベルページ

`page_info.json5` に依存関係が定義されているページについて、該当レベルの前提レベルと該当レベルを前提とするレベルの内容を自動的に追加します。

## その他

### 表記揺れの扱いについて

- レベル名 `Signed negator`
  - `Signed Negator` と表記します
- レベル名 `1 bit decoder`
  - `1 Bit Decoder` と表記します
- レベル名 `3 bit decoder`
  - `3 Bit Decoder` と表記します
- レベル名 `Conditionals` ( `Conditions` が存在、拡張的な内容 )
  - `Conditionals` と表記します
- レベル名 `ODD Number of Signals` (`Odd Ticks` が存在)
  - `Odd Number of Signals` と表記します
- 実績名 `Black hat`
  - `Black Hat` と表記します
- 実績名 `Best hat`
  - `Best Hat` と表記します

### 数式

LaTeX記法が使えます (インラインモード `$...$`, ディスプレイモード `$$...$$` 両方)。
一部の数式をライブラリが解釈できないため、コードブロック: latexを用いた記述も可能としました (ディスプレイモードのみ)。