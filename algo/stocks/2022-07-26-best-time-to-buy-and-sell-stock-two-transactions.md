---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock III -- Two Transactions
date: 2022-07-26 19:58 +0900
algo_menubar: algo_menu
tags: [Hard, Array]
---

## Problem Description
> You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day.
>
> Find the maximum profit you can achieve. You may complete at most two transactions.
> 
> Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
>
> Constraints:
> - `1 <= prices.length <= 10**5`
> - `0 <= prices[i] <= 10**5`
>
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

## Examples
```
example 1:
Input: prices = [3,3,5,0,0,3,1,4]
Answer: 6
Explanation: 6 is the best profit which is from:
buy: index 3, sell: index 5, profit: 3
buy: index 6, sell: index 7, profit: 3
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
This is the third buy-sell-stock problem which has a slight variation to the basic one.
In this problem, we can buy and sell stock at most twice.
This is not an easy problem.
However, if we focus on value differences in the array, we can find a couple of approaches to solve this.

Among those approaches, going over from left to right, from right to left, then, combine those might be an easy one.
Like the basic buy and sell stock problem, calculate max profit and save it in a memoization array.
Then, going over from right to left to calculate max profit and save it in another memoization array.
When the max profit is calculated from right side, it sees how much decreased.
Lastly, sum of left max profits and one index shifted right max profits are compared.
The right profits came from one index shifted to the right, which means ranges are not overlapped.
That's how max profit from at most two transactions will be found.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class BestTimeToBuyAndSellStockThree
{
public:
  int maxProfit(vector<int> &prices)
  {
    int n = prices.size();
    vector<int> left(n, 0), right(n + 1, 0);
    int left_min = prices[0], right_max = prices[n - 1];
    for (int i = 1; i < n; ++i)
    {
      left[i] = max(left[i - 1], prices[i] - left_min);
      left_min = min(left_min, prices[i]);
    }
    for (int i = n - 2; i >= 0; --i)
    {
      right[i] = max(right[i + 1], right_max - prices[i]);
      right_max = max(right_max, prices[i]);
    }
    int max_profit = 0;
    for (int i = 0; i < n; ++i)
    {
      max_profit = max(max_profit, left[i] + right[i + 1]);
    }
    return max_profit;
  }
};
```
{% endtab %}

{% tab solution Java %}
```java
class BestTimeToBuyAndSellStockThree {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[] left = new int[n], right = new int[n + 1];
        int left_min = prices[0], right_max = prices[n - 1];
        for (int i = 1; i < n; ++i) {
            left[i] = Math.max(left[i - 1], prices[i] - left_min);
            left_min = Math.min(left_min, prices[i]);
        }
        for (int i = n - 2; i >= 0; --i) {
            right[i] = Math.max(right[i + 1], right_max - prices[i]);
            right_max = Math.max(right_max, prices[i]);
        }
        int max_profit = 0;
        for (int i = 0; i < n; ++i) {
            max_profit = Math.max(max_profit, left[i] + right[i + 1]);
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
    const n = prices.length;
    let left = new Array(n).fill(0), right = new Array(n + 1).fill(0);
    let left_min = prices[0], right_max = prices[n - 1];
    for (let i = 1; i < n; i ++) {
      left[i] = Math.max(left[i - 1], prices[i] - left_min);
      left_min = Math.min(left_min, prices[i]);
    }
    for (let i = n - 2; i >= 0; i--) {
      right[i] = Math.max(right[i + 1], right_max - prices[i]);
      right_max = Math.max(right_max, prices[i]);
    }
    let max_profit = 0;
    for (let i = 0; i < n; i++) {
      max_profit = Math.max(max_profit, left[i] + right[i + 1]);
    }
    return max_profit;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class BestTimeToBuyAndSellStockThree:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        left, right = [0 for _ in range(n)], [0 for _ in range(n + 1)]
        left_min, right_max = prices[0], prices[n - 1]
        for i in range(1, n):
            left[i] = max(left[i - 1], prices[i] - left_min)
            left_min = min(left_min, prices[i])
        for i in range(n - 2, -1, -1):
            right[i] = max(right[i + 1], right_max - prices[i])
            right_max = max(right_max, prices[i])
        max_profit = 0
        for i in range(n):
            max_profit = max(max_profit, left[i] + right[i + 1])
        return max_profit
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
    n = prices.length
    left = Array.new(n, 0); right = Array.new(n + 1, 0)
    left_min = prices[0]; right_max = prices[n - 1]
    (1...n).each do |i|
      left[i] = [left[i - 1], prices[i] - left_min].max
      left_min = [left_min, prices[i]].min
    end
    (n - 2).downto(0).each do |i|
      right[i] = [right[i + 1], right_max - prices[i]].max
      right_max = [right_max, prices[i]].max
    end
    max_profit = 0
    (0...n).each do |i|
      max_profit = [max_profit, left[i] + right[i + 1]].max
    end
    max_profit
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n) – n: length of the input array.
- Space: O(n)
