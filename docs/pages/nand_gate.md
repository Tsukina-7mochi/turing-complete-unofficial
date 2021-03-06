# NAND Gate

## 概要

ゲームの基本説明のステージです。NANDゲートの利用方法を説明しています。

## 攻略

NANDゲートという部品に入力するとどのような出力になるかを回答します。
画面左上にある入力2つのON/OFFの組み合わせを変えて出力がどうなるかを試してみましょう。
回答は [真理値表](#truth_table) に入力することで行います。 `?` となっている部分をクリックするとON / OFFを切り替えることができます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

このNANDゲートという部品は、2つの入力値 (真偽値) に対してNAND演算 (否定論理積) を行った結果を出力します。
NAND演算 (否定論理積) の真偽値は次の [真理値表](#truth_table) が表すとおりであると確認できると思います。

```truth_table
入力1, 入力2, 出力
F, F, T
T, F, T
F, T, T
T, T, F
```

</div>