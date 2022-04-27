# XOR

## 概要

プログラムを使って入力値のXORを計算する問題です。

## 攻略

XOR演算はNAND, NOR演算などの組み合わせによって構成することができます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

例としてXORを4つのNANDで構成する方法を用います。
入力値をA, Bとしてコメントを記述します。

```assembly
# A, Bを$r4, $r5に読み込み
in_r4
in_r5

# $r1 = A NAND B
r4_r1
r5_r2
nand
r3_r1

# $r4 = $r1 NAND $r4
#     = (A NAND B) NAND A
r4_r2
nand
r3_r4

# $r5 = $r1 NAND $r5
#     = (A NAND B) NAND B
r5_r2
nand

# out = $r1 NAND $r2
#     = ((A NAND B) NAND A) NAND ((A NAND B) NAND B)
r3_r1
r4_r2
nand

r3_out
```

</div>