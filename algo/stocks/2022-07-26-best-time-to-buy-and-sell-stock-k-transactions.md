---
layout: algo_page
group: Stocks
title: Best Time to Buy and Sell Stock IV -- At Most K Transactions
date: 2022-07-26 23:09 +0900
algo_menubar: algo_menu
tags: [Hard, Array, DP]
---

## Problem Description
> You are given an integer array `prices` where `prices[i]` is the price of a given stock on the i-th day, and an integer `k`.
>
> Find the maximum profit you can achieve. You may complete at most `k` transactions.
>
> Constraints:
> - `1 <= k <= 100`
> - `1 <= prices.length <= 1000`
> - `0 <= prices[i] <= 1000`
>
> [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

## Examples
```
example 1:
Input: k = 2, prices = [2,4,1]
Answer: 2
Explanation: 2 is the best profit which is from:
buy: index 0, sell: index 1, profit: 2
```
```
example 2:
Input: k = 2, prices = [3,2,6,5,0,3]
Answer: 7
Explanation: 7 is the best profit which is from:
buy: index 1, sell: index 2, profit: 4
buy: index 4, sell: index 5, profit: 3
```

## How to Solve
This is the fourth buy-sell-stock problem which has another variation to the basic one.
In this problem, we can buy and sell stock at most given k times.
This is not an easy problem.
It looks just an extension of at most two transactions problem.
However, bi-directional profit calculation doesn't work any more.

In general, this kind of problems can be solved by DP.
For a memoization, the solution uses a matrix of k + 1 * n (n is a size of prices).
Starting from smaller k, calculate larger k one by one.
The previous profit calculation looks at the previous transaction and price of previous day.
The maximum of current previous profit and calculated value will be next previous profit.
To calculate today's profit, it looks at the same transaction and today's price.
The maximum of previous day's profit and previous value + today's price will be the current profit.

In the end, the answer will be bottom right of the memoization matrix.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>
#include <iostream>
using namespace std;

class BestTimeToBuyAndSellStockFour
{
public:
  int maxProfit(int k, vector<int> &prices)
  {
    int n = prices.size();
    if (n == 0)
      return 0;
    vector<vector<int>> memo(k + 1, vector<int>(n, 0));
    int prev;
    for (int i = 1; i <= k; ++i)
    {
      prev = INT_MIN;
      for (int j = 1; j < n; ++j)
      {
        prev = max(prev, memo[i - 1][j - 1] - prices[j - 1]);
        memo[i][j] = max(memo[i][j - 1], prev + prices[j]);
      }
    }
    return memo[k][n - 1];
  }
};
```
{% endtab %}

{% tab solution Java %}
```java

```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  const n = prices.length;
  if (n === 0) { return 0; }
  const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));
  const memo = zeros(k + 1, n);
  let prev;
  for (let i = 1; i <= k; i++) {
    prev = Number.MIN_SAFE_INTEGER;
    for (let j = 1; j < n; j++) {
      prev = Math.max(prev, memo[i - 1][j - 1] - prices[j - 1]);
      memo[i][j] = Math.max(memo[i][j - 1], prev + prices[j]);
    }
  }
  return memo[k][n - 1];
};
```
{% endtab %}

{% tab solution Python %}
```python
class BestTimeToBuyAndSellStockFour:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        if n == 0:
            return 0
        memo = [[0 for _ in range(n)] for _ in range(k + 1)]
        for i in range(1, k + 1):
            prev = float('-inf')
            for j in range(1, n):
                prev = max(prev, memo[i - 1][j - 1] - prices[j - 1])
                memo[i][j] = max(memo[i][j - 1], prev + prices[j])
        return memo[k][n - 1]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(kn) – n: length of the input array.
- Space: O(kn)
