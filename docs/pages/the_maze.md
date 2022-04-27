# The Maze

## 概要

迷路を解くプログラムを構成する問題です。

## 攻略

迷路を解く方法はいくつもありますが、実装が容易な右手法などを採用すると良いでしょう。


## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

左手法の例を示します。まずは擬似コードです。

```
loop {
    左を向く

    while(目の前に壁がある) {
        右を向く
    }

    1歩前に進む
}
```

アセンブラで記述する例です。

```assembly
const right 0
const down  1
const left  2
const up    3
const sleep 4
const act   5
const shoot 6

# $r4にロボットの向きを保存

### ロボットの初期の向きを左にする
left
r0_out
r0_r4

### メインループ ###
label loop

### 左を向く
# $r4 = ($r4 - 1) & 0b11
r4_r1
1
r0_r2
sub
r3_r1
3
r0_r2
and
r3_r4
# out = $r4
r4_out

### 目の前に壁がなくなるまで右を向く ###
label turn

# $r1 = in
in_r1
# if($r1 == 3) jump goal
3
r0_r2
sub
goal
beq0
# if($r1 == 7) jump end_turn
7
r0_r2
and
end_turn
beq0

# $r4 = ($r4 + 1) & 0b11
r4_r1
1
r0_r2
add
r3_r1
3
r0_r2
and
r3_r4
# out = $r4
r4_out

# jump turn
turn
jump

label end_turn
### 右を向く ここまで ###

### 1歩前に進む
# out = $r4
r4_out

# jump loop
loop
jump
### メインループここまで ###

label goal
act
r0_out
```

</div>
