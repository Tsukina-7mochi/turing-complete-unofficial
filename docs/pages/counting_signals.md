# Counting Signals

## 概要

4つの入力のうちTrueであるものの数を数えて2進数として出力する回路を構成する問題です。

## 攻略

それぞれの桁について論理回路を考えます。

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

### 下位1bit目

4つの入力のうち <span class="T">True</span> であるものが1, 3個であるときに <span class="True">True</span> となります。
すなわち [ODD Number of Signals] で構成した回路そのものです。

### 下位2bit目

4つの入力のうち <span class="T">True</span> であるものが2, 3個であるときに <span class="True">True</span> となります。
[Double Trouble] で構成した回路で、4つとも <span class="T">True</span> の場合を除いたものを用意すればよさそうです。

### 下位3bit目

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

4つともTrueであるときにTrueとなります。4つのビットのANDを取ればよいです。

したがって、次のような回路を構成すれば良いとわかります。
画面上部から下位1, 2, 3bit目の回路です。ただし下位3bit目がTrueのとき (= 4つともTrueのとき) 下位2bit目がFalseになるようにAND演算をしてあります。これは下位3bit目がFalseの場合だけ値を通過させていると考えることができます。

![](https://gyazo.com/f52726695b72c064358a18a155d16cab.png)

</div>