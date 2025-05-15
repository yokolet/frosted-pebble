---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock with Cooldown
date: 2022-07-27 21:29 +0900
algo_menubar: algo_menu
tags: [Medium, Array, DP]
---

## Problem Description
> You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day.
>
> Find the maximum profit you can achieve.
> You may complete as many transactions as you like
> (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
> - After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
> 
> Note: You may not engage in multiple transactions simultaneously
> (i.e., you must sell the stock before you buy again).
>
> Constraints:
> - `1 <= prices.length <= 5000`
> - `0 <= prices[i] <= 1000`
> 
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

## Examples
```
Example 1:
Input: prices = [1,2,3,0,2]
Answer: 3
Explanation: 3 is the best profit which is from:
buy: index 0, sell: index 1, profit: 1
buy: index 3, sell: index 4, profit: 2
```
```
Example 2:
Input: prices = [1]
Answer: 0
Explanation: Stocks must be bought before selling those. There's no way to make profit.
```

## How to Solve
This is the fifth buy-sell-stock problem which has a slight variation to the basic one.
In this problem, we need to hold a day after the stocks are sold.
Aside of that, we can buy and sell as many times as we want.
That being said, it looks similar to the buy and sell multiple times problem.
That indicates the profit can be calculated by day-to-day difference.
However, we should put the cooldown day before buying next.
The solution here uses the idea of the dynamic programming such that: compare buying today or keep previous buy.
Selling stocks is the same as buying. It compares selling today or keep previous sell.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class BestTimeToBuyAndSellStockWithCooldown {
public:
    int maxProfit(vector<int>& prices) {
        int buy = INT_MIN, sell = 0, prev_buy = 0, prev_sell = 0;
        for (auto price : prices)
        {
          prev_buy = buy;
          buy = max(prev_buy, prev_sell - price);
          prev_sell = sell;
          sell = max(prev_sell, prev_buy + price);
        }
        return sell;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class BestTimeToBuyAndSellStockWithCooldown {
    public int maxProfit(int[] prices) {
        int buy = Integer.MIN_VALUE, sell = 0, prev_buy = 0, prev_sell = 0;
        for (int price : prices) {
            prev_buy = buy;
            buy = Math.max(prev_buy, prev_sell - price);
            prev_sell = sell;
            sell = Math.max(prev_sell, prev_buy + price);
        }
        return sell;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let buy = Number.MIN_SAFE_INTEGER, sell = 0, prev_buy  = 0, prev_sell = 0;
  for (let price of prices) {
    prev_buy = buy
    buy = Math.max(prev_buy, prev_sell - price)
    prev_sell = sell
    sell = Math.max(prev_sell, prev_buy + price)
  }
  return sell;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class BestTimeToBuyAndSellStockWithCooldown:
    def maxProfit(self, prices: List[int]) -> int:
        buy, sell, prev_buy, prev_sell = float('-inf'), 0, 0, 0
        for price in prices:
            prev_buy = buy
            buy = max(prev_buy, prev_sell - price)
            prev_sell = sell
            sell = max(prev_sell, prev_buy + price)
        return sell
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
    buy = -5 * 10 ** 6 + 1; sell = 0; prev_buy = 0; prev_sell = 0;
    prices.each do |price|
        prev_buy = buy
        buy = [prev_buy, prev_sell - price].max
        prev_sell = sell
        sell = [prev_sell, prev_buy + price].max
    end
    sell
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: O(n) – n: length of the input array.
- Space: O(1)
