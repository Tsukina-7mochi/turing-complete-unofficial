# Arithmetic Engine

## 概要

CODEの値に応じて、2個の入力に対して以下の演算を行った結果を出力する回路を作成する問題です。

|CODE|演算|
|---|---|
|0|OR|
|1|NAND|
|2|NOR|
|3|AND|
|4|ADD (加算)|
|5|SUB (減算)|

## 攻略

[Logic Engine] で作成した回路に加算と減算を行う部分を追加すればよいです。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

CODEの3ビット目が<span class="F">OFF</span>の場合は、[Logic Engine] で作成した回路の出力を出力します。

CODEの3ビット目が<span class="T">ON</span>の場合は、加算または減算を行った結果を出力します。

減算は、2番目の入力の値を符号反転したものを1番目の入力に加算することで実現できます。

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/1c8431200b10a5c562337b9a3a5457179cd0752f/20220415214844_1.jpg)

</div>
