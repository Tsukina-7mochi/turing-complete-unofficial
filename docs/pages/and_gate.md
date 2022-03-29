# AND Gate

`#レベル`

## 概要

ANDゲートを作成する問題です。

## 攻略

ANDゲートはAND演算 (論理積) を行う回路です。
AND演算は2つの入力が両方とも <span class="T">True</span> のとき <span class="T">True</span> の値を取ります。

```truth_table
入力1, 入力2, 出力
F, F, F
T, F, F
F, T, F
T, T, T
```

これと [NAND演算](#nand_gate) の関係性を考えてみましょう。

## 解答

一方、NAND演算の [真理値表](#truth_table) は次のようになっていました。

```truth_table
入力1, 入力2, 出力
F, F, T
T, F, T
F, T, T
T, T, F
```

これを見ると、入力1, 2の組み合わせに対して出力がちょうど反転している事がわかります
(このため Not AND、否定論理積という名前がついています)。
したがってNANDゲートの出力をNOTゲートに入力すれば良いです。

![](https://gyazo.com/0c72f4ed1ceb676c2f50b682310d8fba.png)