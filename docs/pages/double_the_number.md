# Double the Number

## 概要

入力値を2倍した値を出力する回路を構成する問題です。

## 攻略

このステージから入出力の種類にByteが増えます。
このゲームでは1Byte = 8bitです。
Byte SplitterはByteを8つのbitに分ける機能を持っています。
反対にByte Makerは8つのbitからByteを作る機能を持っています。

## 解説

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

2進数ではそれぞれの桁を1つ上に動かすことにより値を2倍することができます
(10進数では1の位→10の位, 10の位→100の位.... のように数字を動かせば10倍できるのと同様です)。
この操作を左シフトといいます。

![](https://gyazo.com/a40153e98926923eeeba41a377815ae7.png)

</div>