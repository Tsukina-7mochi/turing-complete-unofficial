# Turing Complete Unofficial

[解説ページはこちら](https://tsukina-7mochi.github.io/turing-complete-unofficial/)

## 概要

[Turing Complete](https://turingcomplete.game) の日本語解説・攻略を掲載するページです。
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
- `docs`: ドキュメントのアップデートブランチ

適宜 `main` ブランチにmergeしてください。

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

- この表記の拡張 (aliasを定義するファイルの追加) については検討中です。

## 動的生成コンテンツ

### レベルページ

`level_info.json5` に依存関係が定義されているページについて、該当レベルの前提レベルと該当レベルを前提とするレベルの内容を自動的に追加します。

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