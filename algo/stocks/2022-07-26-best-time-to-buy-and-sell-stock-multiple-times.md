---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock II -- Multiple Times
date: 2022-07-26 16:10 +0900
algo_menubar: algo_menu
tags: [Medium, Array, DP, Greedy]
---

## Problem Description
> You are given an integer array `prices` where `prices[i]` is the price of a given stock on the i-th day.
>
> On each day, you may decide to buy and/or sell the stock.
> You can only hold at most one share of the stock at any time.
> However, you can buy it then immediately sell it on the same day.
>
> Find and return the maximum profit you can achieve.
>
>
> Constraints:
> - `1 <= prices.length <= 3 * 10**4`
> - `0 <= prices[i] <= 10**4`
>
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

## Examples
```
example 1:
Input: prices = [7,1,5,3,6,4]
Answer: 7
Explanation: 7 is the best profit which is from:
buy: index 1, sell: index 2, profit: 4
buy: index 3, sell: index 4, profit: 3
```
```
example 2:
Input: prices = [1,2,3,4,5]
Answer: 4
Explanation: 4 is the best profit which is from buying on the index 0 an selling on the index 4.
```
```
example 3:
Input: prices = [7,6,4,3,1]
Answer: 0
Explanation: the array value is ever descreasing. There is no profit available.
```

## How to Solve
This is the second buy-sell-stock problem which has a slight variation to the basic one.
In this problem, we can buy and sell stock as many times we want.

It is an interesting problem. It looks we should find multiple minimums and compare profits.
The brute force solution easily goes to O(n^2) time complexity.
However, if we look at the difference of each day, we should simply add up every day's profit unless it it not negative.
This is because we can sell and buy at the same day.
It turns out, the solution is not complicated.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>
#include <iostream>

using namespace std;

class BestTimeToBuyAndSellStockTwo
{
public:
  public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) { return 0; }
        int profit = 0;
        for (int i = 1; i <prices.size(); ++i)
        {
          if (prices[i] > prices[i - 1])
          {
            profit += prices[i] - prices[i - 1];
          }
        }
        return profit;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) { return 0; }
        int profit = 0;
        for (int i = 1; i < prices.length; ++i) {
            if (prices[i] > prices[i - 1]) {
              profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
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
    if (prices.length == 0) { return 0; }
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += (prices[i] - prices[i - 1]);
        }
    }
    return profit;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class BestTimeToBuyAndSellStockTwo:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += prices[i] - prices[i - 1]
        return profit
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
    if prices.empty?
      return 0
    end
    profit = 0
    (1...prices.length).each do |i|
      if prices[i] > prices[i - 1]
        profit += prices[i] - prices[i - 1]
      end
    end
    profit
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n) – n: length of the input array.
- Space: O(1)
