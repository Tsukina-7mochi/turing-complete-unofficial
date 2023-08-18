# Adding Bytes

## 概要

1byteの入力の足し算を行う回路を構成する問題です。

## 攻略

10進数の筆算と同様に、各桁に対して繰り上がりを考慮した足し算を行います。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

2進数の場合、FAを用いることで1bit (桁) の加算を行うことができます。
したがってFAをbit数分用意し、オペランド (加算される2つの値) のそれぞれ対応するbitと
下の桁を担当するFAの繰り上がりを入力とすれば良いです。

このような回路は「桁上げ伝搬加算器」(ripple carry adder) と呼ばれます。

![](https://gyazo.com/229ae79986367ce6a7e9066ed38d3d13.png)

</div>
