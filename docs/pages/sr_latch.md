# SR Latch

## 概要

SR Latch回路を構成する問題です。

SR Latch回路は内部状態を持つ回路で、<span class="T">Set</span>と
<span class="F">Reset</span>の2つの入力によって内部状態を切り替えます。
<span class="T">Set</span>入力は内部状態を<span class="T">True</span>にし、
<span class="F">Reset</span>は内部状態を<span class="F">False</span>にします。

次の状態遷移表で `S` はSet、 `R` はReset、 `Q` は内部状態を表します。

```truth_table
S, R, 次のtickでのQ
F, F, Q
T, F, T
F, T, F
T, T, 不定
```

このステージではCircular Dependencyの縛りはありません。

## 解答

<div class="spoiler-controller">&#xE5CF;開く</div>
<div class="spoiler">

![](https://gyazo.com/db02952b96ad6566f785bf0a1208880a.png)

</div>
