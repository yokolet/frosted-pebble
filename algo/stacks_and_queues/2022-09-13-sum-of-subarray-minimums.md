---
layout: algo_page
group: Stacks and Queues
title: Sum of Subarray Minimums
algo_menubar: algo_menu
tags:
- Medium
- Monotonic Stack
- Array
- Dynamic Programming
- Stack
date: 2022-09-13 15:30 +0900
---
## Introduction
The monotonic stack is a good data structure to solve this problem.
For this problem, we should create two arrays by monotonically increasing manner from left and right.
The left saves next smaller value's indices, while the right saves previous smaller value's indices.

## Problem Description
> Given an array of integers `arr`, find the sum of `min(b)`,
> where `b` ranges over every (contiguous) subarray of arr.
> Since the answer may be large, return the answer `modulo 10**9 + 7`.
>
> Constraints:
> - `1 <= arr.length <= 3 * 10**4`
> - `1 <= arr[i] <= 3 * 10**4`
>
> [https://leetcode.com/problems/sum-of-subarray-minimums/](https://leetcode.com/problems/sum-of-subarray-minimums/)

## Examples
```
Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17
```

```
Example 2:
Input: arr = [11,81,94,43,3]
Output: 444
```

## Analysis
Create next smaller value's indices array, left, going over from left to right.
Create previous smaller value's indices array, right, going over from right to left.
Once next and previous smaller indices are created,
summing up the difference to the current index, times current value.

## Solution
```python
class SumOfSubarrayMinimums:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        mod = 10 ** 9 + 7
        n = len(arr)
        left, right = [n for _ in range(n)], [-1 for _ in range(n)]
        stack = []
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                left[stack.pop()] = i
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                right[stack.pop()] = i
            stack.append(i)
        result = 0
        for i in range(n):
            result += (right[i] - i) * (i - left[i]) * arr[i]
            result %= mod
        return result
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
 
