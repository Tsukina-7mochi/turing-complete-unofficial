# OR Gate

## 概要

ORゲートを作成する問題です。

## 攻略

ORゲートはOR演算を行う回路です。
OR演算は、2つの入力のうちのどちらかが <span class="T">True</span> であれば
<span class="T">true</span> となります。

```truth_table
入力1, 入力2, 出力
F, F, F
T, F, T
F, T, T
T, T, T
```

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

NAND演算の [真理値表](#truth_table) は次のようになっていました。

```truth_table
入力1, 入力2, 出力
F, F, T
T, F, T
F, T, T
T, T, F
```

入力の真偽を反転すると次のようになります。

```truth_table
not(入力1), not(入力2), 出力
F, F, F
T, F, T
F, T, T
T, T, T
```

これはOR演算の [真理値表](#truth_table) と一致していることがわかります。

![](https://gyazo.com/314eb63d5ea88fb8e0a929b782f52472.png)

</div>
