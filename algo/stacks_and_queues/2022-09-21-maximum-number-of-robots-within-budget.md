---
layout: algo_page
group: Stacks and Queues
title: Maximum Number of Robots Within Budget
algo_menubar: algo_menu
tags:
- Hard
- Monotonic Stack
- Sliding Window
- Array
date: 2022-09-21 21:54 +0900
---
## Introduction
This is a type of problem which uses subarray's minimum or maximum to calculate some value.
For such type, a monotonic stack is a good data structure to solve the problem.
The stack saves indices to make the stack monotonically increasing or decreasing.
As for this problem, the monotonically decreasing stack is used to save indices.
Also, this problem uses a sliding window to calculate a value.

## Problem Description
> You have `n` robots.
> You are given two 0-indexed integer arrays, `chargeTimes` and `runningCosts`, both of length `n`.
> The i-th robot costs `chargeTimes[i]` units to charge and costs `runningCosts[i]` units to run.
> You are also given an integer `budget`.
> The total cost of running `k` chosen robots is equal to `max(chargeTimes) + k * sum(runningCosts)`,
> where `max(chargeTimes)` is the largest charge cost among the `k` robots and
> `sum(runningCosts)` is the sum of running costs among the `k` robots.
>
> Return the maximum number of consecutive robots you can run such that the total cost does not exceed budget.
>
> Constraints:
> - `chargeTimes.length == runningCosts.length == n`
> - `1 <= n <= 5 * 10**4`
> - `1 <= chargeTimes[i], runningCosts[i] <= 10**5`
> - `1 <= budget <= 10**15`
>
> [https://leetcode.com/problems/maximum-number-of-robots-within-budget/](https://leetcode.com/problems/maximum-number-of-robots-within-budget/)

## Examples
```
Example 1
Input: chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
Output: 3
Explanation: 
It is possible to run all individual and consecutive pairs of robots within budget.
To obtain answer 3, consider the first 3 robots. The total cost will be max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 which is less than 25.
It can be shown that it is not possible to run more than 3 consecutive robots within budget, so we return 3.
```

```
Example 2
Input: chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
Output: 0
Explanation: No robot can be run that does not exceed the budget, so we return 0.
```

## Analysis
The sliding window starts from 0 and 0 as left and right.
The right pointer shifts using the monotonic stack to find a next bigger value's index.
The stack's index 0 has the index of maximum value between left and right pointers.
The range sum is calculated by subtracting left value and adding right value.
This makes easy to calculate max(chargeTimes) + k * sum(runningCosts).
The final answer is a length of subarray, so right - left + 1 is compared to the maximum so far. 

## Solution
```python
class MaximumNumberOfRobotsWithinBudget:
    def maximumRobots(self, chargeTimes: List[int], runningCosts: List[int], budget: int) -> int:
        left, right, stack, n = 0, 0, [], len(chargeTimes)
        cur_sum, result = 0, 0
        while left < n:
            for next_r in range(right, n):
                while stack and chargeTimes[stack[-1]] < chargeTimes[next_r]:
                    stack.pop()
                stack.append(next_r)
                while stack and stack[0] < left:
                    stack.pop(0)
                cur_max = chargeTimes[stack[0]]
                cur_sum += runningCosts[next_r]
                if cur_max + (next_r - left + 1) * cur_sum > budget:
                    break
                else:
                    result = max(result, next_r - left + 1)
            cur_sum -= runningCosts[left]
            left += 1
            right = next_r + 1
        return result
```

## Complexities
- Time: `O(n^2)`
- Space: `O(n)`
