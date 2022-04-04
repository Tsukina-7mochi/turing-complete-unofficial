# Fast Adder

## レベル

[Adding Bytes]

## 取得条件

> Complete the byte adder with a delay of 36 or less

(遅延36以下の回路のByte Adderを構成しステージをクリアする)

## 攻略・解答

### 問題点の整理

加算機の高速化を考えます。

まず、FAを利用した加算機は次のようになっていました。

![](https://gyazo.com/b70cef44e75aacf74df0c35a43bc37c5.png)

この回路は遅延スコアが64となっています。
この回路のクリティカルパス (遅延が最も大きい経路) は、
画像中に赤色で示したCarryの伝播の部分で、
FAの遅延が8で全体が8段あるため64遅延となっているわけです。

したがってこの部分を解消すれば高速化できそうです。

### CLA入門

ここで、FAの回路をもう一度確認してみると、次のようになっていました。

![](https://gyazo.com/2555d2b7e34e906bc4c74b6bfdda2e21.png)

これを見ると、Sumの計算は8遅延であるのに対し、
Carryの計算は6遅延で済むことがわかります。

したがって、Sumの結果を待たずにCarryを伝播させれば
1段あたり2遅延分の高速化ができることがわかります。

実際にこれを実装したものが次の画像に示す回路で、
遅延スコアは48と、16減少しています。

![](https://gyazo.com/d932dd39906e4bb46e1802f0fda792c8.png)

### Carry計算のさらなる高速化

しかし実績の解除条件は36遅延以下であるため、
ただFAの回路を展開しただけでは十分な高速化ができていません。

そこで、Carryの計算をさらに高速に行う方法を考えます。

### Carryを考える

ここで、一度Carryの計算方法を考え直していきます。
なお、下の桁からのCarry入力を $c$ 、入力2つを $a$ 、 $b$ 、
Carry出力を $C$ と表記します
(ブール代数の表記については [ブール代数](bool_algebra) のページを参照)。

現在の回路では次のようにしてCarryを計算しています。

$$
C = (a + b) \cdot (a + c) \cdot (b + c)
$$

これは次の式と等価です。

$$
\begin{array}{rcl}
C
&=& (a \cdot b) + (a \cdot c) + (b \cdot c) \\
&=& (a \cdot b) + ((a + b) \cdot c) \tag{1}
\end{array}
$$

この式は、次のように解釈することができます。

$$
C = \left\{
\begin{array}{ll}
1 & (a \cdot b = 1) \\
c & (a \cdot b \neq 1 \land a + b = 1) \\
0 & otherwise
\end{array}
\right.
$$

すなわち、

- $a$ と $b$ が両方 <span class="T">True</span> であれば $C = 1$
- どちらが一方が <span class="T">True</span> であれば $C = c$
- どちらも <span class="F">False</span> であれば $C = 0$

ということが$a$ と $b$ のみから決定されます。

ここで $G$ (Generate) 、 $P$ (Pass) を
$G = a \cdot b, P = a + b$ と定義します。
すると、

- $G$ が <span class="True">True</span> ならば $C = 1$
- $P$ が <span class="True">True</span> ならば $C = c$

と言うことができます。

次に、 $n$ 段の場合を考えます。このとき $i$ 段目の各記号を
$a_i, b_i, c_i, C_i, G_i, P_i$ と表すことにします。
$(1)$ 式を再帰的に展開していくと、次のようになります
(数式はしっかり見なくても大丈夫です)。

$$
\begin{array}{rcl}
C_i
&=& (a_i \cdot b_i) + ((a_i + b_i) \cdot c_i) \\
&=& G_i + P_i \cdot c_i \\
&=& G_i + P_i \cdot (G_{i-1} + P_{i-1} \cdot c_{i-1})
=   G_i + P_i \cdot G_{i-1} + P_i \cdot P_{i-1} \cdot c_{i-1} \\
&=& G_i + P_i \cdot G_{i-1} + P_i \cdot P_{i-1} \cdot G_{i-2}
  + P_i \cdot P_{i-1} \cdot P_{i-2} + c_{i-2} \\
&& \cdots \\
&=& G_i + \Sigma^{i-1}_{k=0} (\Pi^{i}_{l=i-k} P_l) \cdot G_{i-k-1}
  + (\Pi^{i}_{l=0} P_l) \cdot c_{-1}
\end{array}
$$

これは、$i$ 段目について次のことを意味します
(ただし上の行の条件が優先されるとします)。

$$
C_i = \left\{
\begin{array}{ll}
1 & (G_i = 1) \\
1 & (P_i = 1 \land G_{i-1} = 1) \\
1 & (P_i =  P_{i-1} = 1 \land G_{i-2} = 1) \\
\cdots \\
c_{-1} & (P_i = P_{i-1} = \cdots = P_0 = 1) \\
0 & otherwise
\end{array}
\right.
$$

これは、次のように解釈できます。

- その桁の $G$ が <span class="T">True</span> ならば、 $C = 1$
- そうでなくても、その桁の $P$ が <span class="T">True</span> で
  その下の桁の $G$ が <span class="T">True</span> ならば、 $C = 1$
- そうでなくても、さらにその下の桁の $P$ が<span class="T">True</span> で
  その下の桁の $G$ が <span class="T">True</span> ならば、 $C = 1$
- ...
- そうでなくても、下の桁全部の $P$ が<span class="T">True</span> ならば、
  $C = c_i$

ここで、 $c_{-1}$ は加算器自体へのCarry入力とします
(これは一般化して下の桁の $G$ と考えることもできます)。

つまり、 $C_i$ を求めるには、 $P_i, P_{i-1}, P_{i-2}, ..., P_0$ が
わかればよいということです。

### CLAにおけるCarryの計算コスト

先程の節で、 $C_i$ を求めるには $P_i, P_{i-1}, P_{i-2}, ..., P_0$ の
論理積を取ればよいということがわかりました。

今までのCLAでは、この演算を逐次追加的に行ってきていました
(すなわち $i$ 桁目で計算した $P_i \cdot P_{i-1} \cdots P_0$ に対して
$P_{i+1}$ の論理積を計算していました)。
この場合、 $C_n$ の計算を行うためには $n$ 回の論理積を取ることになります。
ANDゲートの遅延は2であるため、遅延スコアは $O(n)$ となります。

一方、 $n$ 個のAND演算はもっと高速に行うことができます。
論理積は結合則が成り立つため、 $n$ 個のAND演算 → $n/2$ 個のAND演算
→ $n/4$ 個のAND演算 → ... のように減らしていくことができ、
AND演算の回数は $\lceil log_2(n) \rceil$ となります
($\lceil\cdot\rceil$ は切り上げを意味します) 。
すなわち、効率よく計算を行った場合遅延コストは $O(log(n))$ となります
(基数は省略)。すなわち今までのCLAでは64bitの加算をするのに1bitの加算の64倍の遅延が
発生していましたが、新しい方法では8倍で済むということです。

ただし、この方法にも欠点はあり、ANDゲートの数が $O(n^2)$ で増加し、
それに従って回路面積も増えていくため回路の構築が困難になります。
そこで、これらの方法を併用することにします。
すなわち $N$ 段の加算を行うために $n$ 個のCLAを $\lceil N/n\rceil$ 個
直列に接続するという方法です。
この場合の遅延スコアは1段の加算に比べて $\lceil N/n\rceil log(n)$ 倍となります。
今回の場合は $N=8$ であり、1段の加算の遅延スコアが8であるため4倍に抑えたい
ところです。したがって $2 \leq n \leq 4$ の範囲で選択すればよいことがわかります。

なお、 $n=2$ では端数の関係で $n=2$ ではうまく構成できなかったため、
$n=4$ で構成することにします。

### 回路の構成

各桁の $G, P$ は単純に各桁のAND, OR演算を取ることで求められます。
これらを事前に準備した状態で各桁のCarryの計算を考えます。

$$
\begin{array}{rcl}
C_0 &=& G_0 + P_0 \cdot c_{-1} \\
C_1 &=& G_1
      + P_1 \cdot G_0
      + P_1 \cdot P_0 \cdot c-{-1} \\
C_2 &=& G_2
      + P_2 \cdot G_1
      + P_2 \cdot P_1 \cdot G_0
      + P_2 \cdot P_1 \cdot P_0 \cdot c_{-1} \\
C_3 &=& G_3
      + P_3 \cdot G_2
      + P_3 \cdot P_2 \cdot G_1
      + P_3 \cdot P_2 \cdot P_1 \cdot G_0
      + P_3 \cdot P_2 \cdot P_1 \cdot P_0 \cdot c_{-1} \\
\end{array}
$$

$P_i$ 同士のAND演算で出現しているものは次の6通りです。

$$
\{
    P_0 P_1,
    P_1 P_2,
    P_2 P_3,
    P_0 P_1 P_2,
    P_1 P_2 P_3,
    P_0 P_1 P_2 P_3
\}
$$

したがって、 $P_0 P_1, P_1 P_2, P_2 P_3$ を予め用意しておけば
ゲートの数を抑えることができそうです。

各桁のSumは、今までと同様に下の桁のCarryと2つの入力の
XORを取ることで求めることができます。

これを実装した回路を次の画像に示します。

![](https://gyazo.com/594afc9855b76a0a1136071a3477b6e8.png)

見事遅延スコアが32と、36以下に抑えることができました。
お疲れさまでした。