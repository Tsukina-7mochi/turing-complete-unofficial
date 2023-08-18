# NOT Gate

## 概要

`NOTゲート` と呼ばれる部品を作成する問題です。

## 攻略

NOT演算 (否定) は、入力値の真偽を反転する演算です。真理値表は次のようになります。

```truth_table
入力1, 出力
F, T
T, F
```

## 解答

<div class="spoiler-controller material-icons">&#xE5CF;開く</div>
<div class="spoiler">

これに対してNAND演算の [真理値表](#truth_table) は次のようになっていました。

<table class="truth">
    <tbody>
        <tr>
            <td>入力</td>
            <td class="F">F</td>
            <td class="_">T</td>
            <td class="_">F</td>
            <td class="T">T</td>
        </tr>
        <tr>
            <td>入力2</td>
            <td class="F">F</td>
            <td class="_">F</td>
            <td class="_">T</td>
            <td class="T">T</td>
        </tr>
        <tr>
            <td>出力</td>
            <td class="T">T</td>
            <td class="_">T</td>
            <td class="_">T</td>
            <td class="F">F</td>
        </tr>
    </tbody>
</table>

色のついている部分に注目すると、NOT演算の真理値表と一致していることがわかります。
つまり、NANDゲートに対して同じ真偽値を入力することでNOTゲートとすることができます。

![](https://gyazo.com/e17616ac09dffbabb23b2e54ee4eb6a0.png)

</div>
