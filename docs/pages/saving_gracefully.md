# Saving Gracefully

## 概要

`Save` 入力が <span class="T">True</span> のときに入力値を保存する
回路を構成する問題です。

## 攻略

このステージではSR Latch (Set-Reset Latch) という部品が追加されています
(もともとはこれを構成するレベルがあったのですが、2022年4月4日現在削除されています)。

この部品には2つの入力があり、それぞれ `Set` と `Reset` という名前がついています。
`Set` 入力が <span class="T">True</span> となった場合、SR Latchの内部状態が <span class="T">True</span>となり、
SR Latchは <span class="T">True</span> を出力し続けるようになります。
反対に `Reset` に入力が <span class="T">True</span> となった場合、SR Latchの内部状態が <span class="F">False</span>となり、
SR Latchは <span class="F">False</span> を出力し続けるようになります。
どちらにも入力がされていない場合は内部状態を保持し、
どちらにも入力がある場合の動作は一般に不定・もしくは禁止とされています
(すなわちアップデートで変更される可能性もあり、このような入力をすべきではありません)。

この部品を使い、入力を保存する回路を構成すればよいです。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

`Save` 入力が <span class="T">True</span> で `Value` が <span class="T">True</span> のときは `Set` に、
`Save` 入力が <span class="T">True</span> で `Value` が <span class="T">False</span> のときは `Reset` に
入力を行えばいいことがわかります。

したがって次のような回路を構成すればよいです。

![](https://gyazo.com/0016d986915089f426bc8d2b02694af1.png)

</div>