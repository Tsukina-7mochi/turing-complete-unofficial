# Spacial Invasion

## 概要

ロボットで敵を倒すプログラムを記述する問題です。

## 攻略

手動でロボットを操作することができます。
その操作と全く同じことができるプログラムを作成すればよいです。

## 解答

<div class="spoiler-controller">&#xE5CF;開く</div>
<div class="spoiler">

```assembly
const setR 0
const setD 1
const setL 2
const setU 3
const setEnjoy 4
const setShoot 6
const send 0b10000110  # $r0 to out

setShoot
send
setU
send
send
send
send
send
send
setL
send
setShoot
send
send
send
send
setR
send
setEnjoy
send
send
send
send
send
send
send
send
send
send
send
send
send
send
setShoot
send
send
send
send
setL
send
setEnjoy
send
send
send
send
send
send
send
send
send
send
send
send
send
send
send
setShoot
send
send
send
send
setR
send
setEnjoy
send
send
send
send
send
send
send
send
send
send
send
send
send
send
setShoot
send
send
send
send
```

</div>
