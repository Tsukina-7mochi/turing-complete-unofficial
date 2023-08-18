# Logic Engine

## 概要

2個の入力をビット単位で論理演算し、結果を出力する回路を構成する問題です。

行う論理演算は、3個目の入力 (CODE) の値によって以下のように選択されます。

| CODE | 論理演算 |
| ---- | -------- |
| 0    | OR       |
| 1    | NAND     |
| 2    | NOR      |
| 3    | AND      |

## 攻略

CODEと演算の関係をよく見て、それに沿って回路を構成します。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

まず、ORとNANDの関係に注目します。

ORの真理値表は

```truth_table
入力1,入力2,出力
F,F,F
F,T,T
T,F,T
T,T,T
```

NANDの真理値表は

```truth_table
入力1,入力2,出力
T,T,F
T,F,T
F,T,T
F,F,T
```

したがって、ORの入力を反転させるとNANDになることがわかります。

次に、ORとNOR、NANDとANDの関係は、それぞれ出力の反転です。

よって、以下のような回路を構築すればよいです。

- OR演算を基本とする。
- CODEの1ビット目が<span class="T">ON</span>なら、入力を反転させる。<span class="F">OFF</span>なら反転させない。
- CODEの2ビット目が<span class="T">ON</span>なら、出力を反転させる。<span class="F">OFF</span>なら反転させない。

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/32cbe409517f5d48427466cf97408e38e220e7fe/20220415213033_1.jpg)

</div>
