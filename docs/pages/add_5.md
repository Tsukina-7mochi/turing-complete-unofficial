# Add 5

## 概要

以下の動作をするプログラムを作成する問題です。

1. 入力を受け取る
2. 受け取った値に5を足す
3. 計算結果を出力する

Programコンポーネントについている「Edit memory」(メモリ編集)ボタンを押すことで、
プログラムの入力画面を開くことができます。

## 攻略

OVERTUREアーキテクチャでは、以下の命令を使用することができます。  
1個の命令は8ビットです。  
命令は、画面上部の歯車アイコン (Instructions) から確認することができます。

|ビット8|ビット7|種類|動作|
|:-:|:-:|---|---|
|<span class="F">0</span>|<span class="F">0</span>|Immediate (即値)|下位6ビットが表す値を、レジスタ0に格納します。|
|<span class="F">0</span>|<span class="T">1</span>|Compute (計算)|レジスタ1とレジスタ2の値に下位3ビットで指定する演算を行い、結果をレジスタ3に格納します。|
|<span class="T">1</span>|<span class="F">0</span>|Copy (値のコピー)|ビット4～6で指定するレジスタまたは入力ポートの値を、ビット1～3で指定するレジスタまたは出力ポートに格納します。|
|<span class="T">1</span>|<span class="T">1</span>|Condition (条件分岐)|レジスタ3の値が下位3ビットで指定する条件を満たす場合、次のプログラムカウンタをレジスタ0の値にします。|

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

OVERTUREアーキテクチャを用いる場合、以下の命令列によって要求される動作を実現できます。

|命令|動作|
|---|---|
|<span class="T">1</span><span class="F">0</span><span class="T">1</span><span class="T">1</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="T">1</span>|レジスタ1 ← 入力ポート|
|<span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="T">1</span><span class="F">0</span><span class="T">1</span>|レジスタ0 ← 5|
|<span class="T">1</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="T">1</span><span class="F">0</span>|レジスタ2 ← レジスタ0|
|<span class="F">0</span><span class="T">1</span><span class="F">0</span><span class="F">0</span><span class="F">0</span><span class="T">1</span><span class="F">0</span><span class="F">0</span>|レジスタ3 ← レジスタ1 + レジスタ2|
|<span class="T">1</span><span class="F">0</span><span class="F">0</span><span class="T">1</span><span class="T">1</span><span class="T">1</span><span class="T">1</span><span class="F">0</span>|出力ポート ← レジスタ3|

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/0e845a7697277488925fdf36ea09c3b4c46a6b6a/1444480_20220418082309_1.png)

</div>
