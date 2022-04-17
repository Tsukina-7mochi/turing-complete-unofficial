# Instruction Decoder

## 概要

命令のタイプを判定する回路を構築する問題です。

命令の上位ビットに応じて命令の種類が以下のように決まるので、
対応するビットに<span class="T">ON</span>、それ以外のビットに<span class="F">OFF</span>を出力します。

|8ビット目|7ビット目|命令の種類|
|---|---|---|
|<span class="F">OFF</span>|<span class="F">OFF</span>|Immediate (即値)|
|<span class="F">OFF</span>|<span class="T">ON</span>|Calculate (計算)|
|<span class="T">ON</span>|<span class="F">OFF</span>|Copy (値のコピー)|
|<span class="T">ON</span>|<span class="T">ON</span>|Condition (条件分岐)|

## 攻略

3 Bit decoder を用いることで、入力の2進数に対応するビットに<span class="T">ON</span>、
それ以外のビットに<span class="F">OFF</span>を出力することができます。

## 解答

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/e8a4ffbefd657ee242cd9196bc5a40c0738b1935/20220415220749_1.jpg)
