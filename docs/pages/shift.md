# Shift

## 概要

1個目の入力を、2個目の入力(7以下)で指定されるビット数だけ左シフトする回路を構成する問題です。

## 攻略

シフトするビット数の入力を見て

* 1ビット目が立っていたら、1ビット左シフトする
* 2ビット目が立っていたら、2ビット左シフトする
* 3ビット目が立っていたら、4ビット左シフトする

ことを組み合わせることで、0～7ビットの左シフトを実現できます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/a1c69c4890513ee4394d663da1b574d77ab0b6a4/1444480_20220420200939_1.png)

</div>
