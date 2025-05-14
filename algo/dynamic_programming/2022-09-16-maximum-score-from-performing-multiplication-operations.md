---
layout: algo_page
group: Dynamic Programming
title: Maximum Score from Performing Multiplication Operations
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
date: 2022-09-16 14:03 +0900
---
## Introduction
At a glance, it looks a greedy problem.
However, if we look at the examples, we learn the greedy approach doesn't work.
So, this is a dynamic programming problem.

## Problem Description
> You are given two integer arrays `nums` and `multipliers` of size `n` and `m` respectively,
> where `n >= m`. The arrays are 1-indexed.
> You begin with a `score` of 0. You want to perform exactly `m` operations.
> On the i-th operation (1-indexed), you will:
> - Choose one integer `x` from either the start or the end of the array `nums`.
> - Add `multipliers[i] * x` to your score.
> - Remove `x` from the array `nums`.
>
> Return the maximum `score` after performing `m` operations.
>
> Constraints:
> - `n == nums.length`
> - `m == multipliers.length`
> - `1 <= m <= 10**3`
> - `m <= n <= 10**5`
> - `-1000 <= nums[i], multipliers[i] <= 1000`
>
> [https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/](https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/)

## Examples
```
Example 1:
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
3 * 3 + 2 * 2 + 1 * 1 = 14
```

```
Example 2:
Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
-5 * -10 + -3 * -5 + -3 * 3 + 1 * 4 + 7 * 6 = 102
Notice, the third multiplication is -3 * 3 not 1 * 3.
```

## Analysis
Among a couple dynamic programming approaches, the solution here uses bottom-up tabular approach.
The 2D array saves a maximum score so far.
Starting from multiplier operation from right to left,
compare the calculation with nums from left and right.
The calculation with nums from left, it sees previous row's right column as a previous score.
While the calculation with num from right, it sees previous row's same column as a previous score.
When the calculation ends, the answer is on the cell (0, 0).

## Solution
```python
class MaximumScoreFromPerformingMultiplicationOperations:
    def maximumScore(self, nums: List[int], multipliers: List[int]) -> int:
        m, n = len(multipliers), len(nums)
        memo = [[0 for _ in range(m + 1)] for _ in range(m + 1)]
        for i in range(m - 1, -1 ,-1):
            for j in range(i, -1, -1):
                memo[i][j] = max(nums[j] * multipliers[i] + memo[i + 1][j + 1],
                                nums[n - 1 - (i - j)] * multipliers[i] + memo[i + 1][j])
        return memo[0][0]
```

## Complexities
- Time: `O(m^2)`
- Space: `O(m^2)`
