# Masking Time

## 概要

入力される値を4で割った余りを8ティック以内に出力するプログラムを作成する問題です。

## 攻略

$n$ が非負整数の時、 $2^n$ で割った余りを求めるには $2^n - 1$ とのビットANDを求めれば良いです。

今回の場合、 $4 = 2^2$ で割った余りを求めたいので、 $2^2 - 1 = 3$ とのビットANDを求めます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

OVERTUREアーキテクチャのプログラム例を示します。

```assembly
0b10110001 # R1 <- INPUT
3          # R0 <- 3
0b10000010 # R2 <- R0
0b01000011 # R3 <- R1 AND R2
0b10011110 # OUTPUT <- R3
```

</div>
