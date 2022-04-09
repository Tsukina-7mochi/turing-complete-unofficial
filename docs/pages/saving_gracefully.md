# Saving Gracefully

## 概要

`Save` 入力が <span class="T">True</span> のときに入力値を保存する
回路を構成する問題です。

## 攻略 (SR Latch使用)

このステージではSR Latch (Set-Reset Latch) という部品が追加されています
~(もともとはこれを構成するレベルがあったのですが、2022年4月4日現在削除されています)。~

オプションから Allow inline latches を有効化して [SR Latch] のレベルをクリアすることで開放されるようです。

この部品には2つの入力があり、それぞれ `Set` と `Reset` という名前がついています。
`Set` 入力が <span class="T">True</span> となった場合、SR Latchの内部状態が <span class="T">True</span>となり、
SR Latchは <span class="T">True</span> を出力し続けるようになります。
反対に `Reset` に入力が <span class="T">True</span> となった場合、SR Latchの内部状態が <span class="F">False</span>となり、
SR Latchは <span class="F">False</span> を出力し続けるようになります。
どちらにも入力がされていない場合は内部状態を保持し、
どちらにも入力がある場合の動作は一般に不定・もしくは禁止とされています
(すなわちアップデートで変更される可能性もあり、このような入力をすべきではありません)。

この部品を使い、入力を保存する回路を構成すればよいです。

## 解答 (SR Latch使用)

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

`Save` 入力が <span class="T">True</span> で `Value` が <span class="T">True</span> のときは `Set` に、
`Save` 入力が <span class="T">True</span> で `Value` が <span class="T">False</span> のときは `Reset` に
入力を行えばいいことがわかります。

したがって次のような回路を構成すればよいです。

![](https://gyazo.com/0016d986915089f426bc8d2b02694af1.png)

</div>

## 攻略 (SR Latch不使用)

メモリーの基本は前のtickの出力を次のtickの入力に使うことです。
すなわちメモリーは遅延+ループの構造が必ず存在します。

入力と前のtickの出力の3つを利用して次の出力を決める方法を考えればよいです。

## 解答 (SR Latch不使用)

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

出力が <span class="T">True</span> となる条件は、次の2つのいずれかです。

- Actionが <span class="T">Save</span> かつ Valueが <span class="T">1</span>
- Actionが <span class="F">Don't Save</span> かつ前のtickの出力が <span class="T">1</span>

これをそのまま回路に実装すると次のようになります。

![](https://gyazo.com/358e176acdfb5f978393b252c57d380e.png)

</div>