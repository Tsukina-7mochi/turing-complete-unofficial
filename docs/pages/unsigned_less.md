# Unsigned Less

## 概要

2つのbyte入力を符号なし整数とみなして、
入力1が入力2より小さいならば<span class="T">True</span>を出力する
回路を構成する問題です。

## 攻略

入力をA, Bとおくと、A-Bが負であるならば<span class="T">True</span>を出力すればよいです。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

引き算を行って負数であるかを判定すればよいのですが、
そもそも符号なし整数であるため、負数という概念が存在しません。
そのため符号拡張という方法を用いて9bitの符号付き整数の
引き算を行います。詳細については[Signed Less]のページを参照してください。

今回の場合、両方正の数であるため符号拡張したA, Bの最上位ビットは
0であることが確定しています。よって次のように単純な回路で比較することができます。

![](https://gyazo.com/fb1d77a1a477487a16eca11e025263dd.png)

</div>