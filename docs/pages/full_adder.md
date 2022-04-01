# Full Adder

## 概要

Full Adderとは「全加算器」のことで、`FA` と同様に `HA` と省略されます。
FAは2つの1桁の2進数の他、下の桁からの繰り上がりを受け取り、和と繰り上がりを出力します。

## 攻略

FAが行う演算を列挙すると次のようになります。

| 演算 | 桁上り | 和 |
| - | - | - |
| 0 + 0 + 0 | 0 | 0 |
| 0 + 0 + 1 | 0 | 1 |
| 0 + 1 + 0 | 0 | 1 |
| 0 + 1 + 1 | 1 | 0 |
| 1 + 0 + 0 | 0 | 1 |
| 1 + 0 + 1 | 1 | 0 |
| 1 + 1 + 0 | 1 | 0 |
| 1 + 1 + 1 | 1 | 1 |

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

HAの時と同様にSumとCarryについて [真理値表](#truth_table) を書くと次のようになります。

```truth_table
入力1, 入力2, 入力3, Sum, Carry
F, F, F, F, F
T, F, F, T, F
F, T, F, T, F
T, T, F, F, T
F, F, T, T, F
T, F, T, F, T
F, T, T, F, T
T, T, T, T, T
```

これを見るとSumは [ODD Number of Signals] 、Carryは [Double Trouble] と同様の問題であることがわかります。

![](https://gyazo.com/c7a881042ce8943c712fd76534142a67.png)

また、FAはHAを2つ連結して構成することもできます。

![](https://gyazo.com/d51b64908c5242d1fec85d8dd93958f5.png)

</div>

