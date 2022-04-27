# Storage Cracker

## 概要

倉庫のドアのパスコードを見つけるプログラムを作成する問題です。
不正解の出力は制限されず、正解のパスコードを出力すればクリアとなります。

正解より大きい値を出力すると入力は1、そうでない値を出力すると入力は0となります。

## 攻略

パスコードを全探索すれば良いです。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

OVERTUREアーキテクチャのプログラム例を示します。

```assembly
0          # R0 <- 0
0b10000001 # R1 <- R0
0b10000110 # OUTPUT <- R0
1          # R0 <- 1
0b10000010 # R2 <- R0
label loop
0b01000100 # R3 <- R1 + R2
0b10011110 # OUTPUT <- R3
0b10011001 # R1 <- R3
loop       # R0 <- loop
0b11000111 # jump always
```

</div>
