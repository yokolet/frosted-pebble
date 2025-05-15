---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock -- Basic
date: 2022-07-26 15:50 +0900
algo_menubar: algo_menu
tags: [Easy, Array, DP]
---

## Problem Description
> You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day.
>
> You want to maximize your profit by choosing a single day to buy one stock and choosing a different day
> in the future to sell that stock.
>
> Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
>
>
> Constraints:
> - `1 <= prices.length <= 10**5`
> - `0 <= prices[i] <= 10**4`
>
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Examples
```
example 1:
Input: prices = [7,1,5,3,6,4]
Answer: 5
Explanation: 5 is the best profit which is from buying on the index 1 an selling on the index 4.
```
```
example 2:
Input: prices = [7,6,4,3,1]
Answer: 0
Explanation: the array value is ever descreasing. There is no profit available.
```

## How to Solve
The problems of the best time to buy and sell stock have variations.
Each has a slight different criteria to find the answer.
This is the most basic and easy buy-sell-stock problem.

We are allowed to buy and sell only once.
The minimum price so far should be updated in each array index if necessary.
If the price at the current index is not the minimum, calculate profit so far.
Then, update the grand max profit comparing with the current profit.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>
#include <iostream>
using namespace std;

class BestTimeToBuyAndSellStock
{
public:
  int maxProfit(vector<int> &prices)
  {
    int min_v = INT_MAX;
    int max_profit = 0;
    for (int i = 0; i < prices.size(); ++i)
    {
      if (prices[i] < min_v)
      {
        min_v = prices[i];
      }
      else
      {
        max_profit = max(max_profit, prices[i] - min_v);
      }
    }
    return max_profit;
  }
};
```
{% endtab %}

{% tab solution Java %}
```java
class BestTimeToBuyAndSellStock {
    public int maxProfit(int[] prices) {
        int min_price = Integer.MAX_VALUE;
        int max_profit = 0;
        for (int i = 0; i < prices.length; ++i) {
            if (min_price > prices[i]) {
              min_price = prices[i];
            } else {
              max_profit = Math.max(max_profit, prices[i] - min_price);
            }
        }
        return max_profit;
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
    let min_price = Number.MAX_SAFE_INTEGER, max_profit = 0;
    for (let i = 0; i < prices.length; i++) {
      if (min_price > prices[i]) {
        min_price = prices[i];
      } else {
        max_profit = Math.max(max_profit, prices[i] - min_price)
      }
    }
    return max_profit;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class BestTimeToBuyAndSellStock:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit, min_price = 0, float('inf')
        if not prices:
            return 0
        min_price = prices[0]
        for i in range(1, len(prices)):
            if prices[i] < min_price:
                min_price = prices[i]
            else:
                max_profit = max(max_profit, prices[i] - min_price)
        return max_profit
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
    min_price = 10**4 + 1
    max_profit = 0
    prices.each do |price|
      if min_price > price
        min_price = price
      else
        max_profit = [max_profit, price - min_price].max
      end
    end
    max_profit
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n) – n: length of the input array.
- Space: O(1)
