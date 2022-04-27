# The Product of Nibbles

## 概要

4ビットの入力2個の掛け算をし、商を8ビットで出力する回路を構成する問題です。

## 攻略

筆算の要領で掛け算をすることができます。  
すなわち、掛けられる数をシフトし、掛ける数の対応するビットが<span class="F">0</span>なら足さない、
<span class="T">1</span>なら足す、とすることで、掛け算を実現できます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/a1c69c4890513ee4394d663da1b574d77ab0b6a4/1444480_20220420203030_1.png)

</div>
