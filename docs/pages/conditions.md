# Conditions

## 概要

「値」と「条件を選択する3ビット」が入力されるので、
「値」が「条件」を満たす場合は<span class="T">ON</span>、
満たさない場合は<span class="F">OFF</span>を出力する回路を構築する問題です。

ビットと条件の対応は以下のものです。

| ビット3                    | ビット2                    | ビット1                    | 条件    |
| -------------------------- | -------------------------- | -------------------------- | ------- |
| <span class="F">OFF</span> | <span class="F">OFF</span> | <span class="F">OFF</span> | 常に偽  |
| <span class="F">OFF</span> | <span class="F">OFF</span> | <span class="T">ON</span>  | 値 ＝ 0 |
| <span class="F">OFF</span> | <span class="T">ON</span>  | <span class="F">OFF</span> | 値 ＜ 0 |
| <span class="F">OFF</span> | <span class="T">ON</span>  | <span class="T">ON</span>  | 値 ≦ 0  |
| <span class="T">ON</span>  | <span class="F">OFF</span> | <span class="F">OFF</span> | 常に真  |
| <span class="T">ON</span>  | <span class="F">OFF</span> | <span class="T">ON</span>  | 値 ≠ 0  |
| <span class="T">ON</span>  | <span class="T">ON</span>  | <span class="F">OFF</span> | 値 ≧ 0  |
| <span class="T">ON</span>  | <span class="T">ON</span>  | <span class="T">ON</span>  | 値 ＞ 0 |

## 攻略

ビットと条件の関係をよく見て、それに沿って回路を構成します。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

まず、ビット3が<span class="F">OFF</span>の場合を考えると、以下のことがわかります。

- ビット1が<span class="T">ON</span>、かつ値 ＝ 0 のとき、出力は<span class="T">ON</span>になる。
- ビット2が<span class="T">ON</span>、かつ値 ＜ 0 のとき、出力は<span class="T">ON</span>になる。
- これらの条件に当てはまらないとき、出力は<span class="F">OFF</span>になる。

さらに、ビット3が<span class="T">ON</span>の場合は、
ビット3が<span class="F">OFF</span>の場合の条件の反転になっていることがわかります。  
したがって、この場合はビット3が<span class="F">OFF</span>の場合の出力を反転させればいいです。

値 ＝ 0 かどうかの判定は、値の全ビットが<span class="F">OFF</span>になっているかをチェックすればよいです。  
すなわち、値の全ビットをORした結果が<span class="F">OFF</span>になっているかをチェックすればよいです。

値 ＜ 0 かどうかの判定は、値の最上位ビットが<span class="T">ON</span>になっているかをチェックすればよいです。

![](https://gist.githubusercontent.com/mikecat/b64b484ee0bfa969cc1e738af31e9e58/raw/4e53c2eaad1271a2fe6e4ded5aa0582402460e90/20220415223029_1.jpg)

</div>
