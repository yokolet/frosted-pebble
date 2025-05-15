---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock with Transaction Fee
date: 2022-07-27 22:34 +0900
algo_menubar: algo_menu
tags: [Medium, Array, DP, Greedy]
---

## Problem Description
> You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day,
> and an integer fee representing a transaction fee.
>
> Find the maximum profit you can achieve.
> You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.
>
> > Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
>
>
> Constraints:
> - `1 <= prices.length <= 5 * 10**4`
> - `1 <= prices[i] < 5 * 10**4`
> - `0 <= fee < 5 * 10**4`
> 
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)


## Examples
```
example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Answer: 8
Explanation: 8 is the best profit which is from:
buy: index 0, sell: index 3, profit: 8 - 1 - 2 = 5
buy: index 4, sell: index 5, profit: 9 - 4 - 2 = 3
```
```
example 2:
Input: prices = [1,3,7,5,10,3], fee = 3
Answer: 6
Explanation: 6 is the best profit which is from:
buy: index 0, sell: index 4, profit: 10 - 1 - 3 = 6
```

## How to Solve
This is the sixth buy-sell-stock problem which has a slight variation to the basic one.
In this problem, we need to pay a transaction fee everytime we buy and sell stocks.
Aside of that, we can buy and sell as many times as we want.
That being said, the problem looks similar to the buy and sell multiple times.

The the problem states, we can buy and sell as many time as we want.
This indicates the profit can be calculated by day-to-day difference.
However, we should pay the transaction fee to sell stocks.
The solution uses the idea of DP: compare previous sell and current buying cost.
Also, it compares previous buy and current selling cost.
The approach is very similar to the buy-sell-stock with cooldown problem.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>
#include <iostream>
using namespace std;

class BestTimeToBuyAndSellStockWithTransactionFee
{
public:
  int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<int> buy(n, 0), sell(n, 0);
        buy[0] = -prices[0];
        for (int i = 1; i < n; ++i)
        {
          sell[i] = max(sell[i - 1], buy[i - 1] + prices[i] - fee);
          buy[i] = max(buy[i - 1], sell[i - 1] - prices[i]);
        }
        return sell[n - 1];
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class BestTimeToBuyAndSellStockWithTransactionFee {
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        int[] buy = new int[n], sell = new int[n];
        buy[0] = -prices[0];
        for (int i = 1; i < prices.length; ++i) {
            sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i] - fee);
            buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
        }
        return sell[n - 1];
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    const n = prices.length;
    const buy = new Array(n).fill(0), sell = new Array(n).fill(0);
    buy[0] = -prices[0];
    for (let i = 1; i < n; i++) {
        sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i] - fee);
        buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
    }
    return sell[n - 1];
};
```
{% endtab %}

{% tab solution Python %}
```python
class BestTimeToBuyAndSellStockWithTransactionFee:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        n = len(prices)
        buy, sell = [0 for _ in range(n)], [0 for _ in range(n)]
        buy[0] = -prices[0]
        for i in range(1, n):
            sell[i] = max(sell[i - 1], buy[i - 1] + prices[i] - fee)
            buy[i] = max(buy[i - 1], sell[i - 1] - prices[i])
        return sell[n - 1]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} prices
# @param {Integer} fee
# @return {Integer}
def max_profit(prices, fee)
    n = prices.length
    buy = Array.new(n, 0)
    sell = Array.new(n, 0)
    buy[0] = -prices[0]
    (1...prices.length).each do |i|
        sell[i] = [sell[i - 1], buy[i - 1] + prices[i] - fee].max
        buy[i] = [buy[i - 1], sell[i - 1] - prices[i]].max
    end
    sell[n - 1]
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n) – n: length of the input array.
- Space: O(n)
