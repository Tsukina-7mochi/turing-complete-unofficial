# Delayed Lines

## 概要

2tick前の入力を出力する回路を構成する問題です。

## 攻略

このゲームではtickという時間の単位に基づいて回路の状態が変化します。
1tickごとにすべての論理ゲートの出力が次の論理ゲートへと伝播し、
対応して末端のコンポーネントの状態が変化します。

このステージでは `Delay Line` というコンポーネントが追加され、
このコンポーネントは1tick前の入力を出力します。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

2tick入力を遅延させるには、 `Delay Line` を2つ直列に接続すればよいです。

![](https://gyazo.com/3a3efe953656a718ee707dc60181f325.png)

</div>