---
layout: algo_page
group: Arrays
title: Make Array Zero by Subtracting Equal Amounts
algo_menubar: algo_menu
tags:
- Easy
- Simulation
- Array
- Hash Table
date: 2022-09-21 16:20 +0900
---
## Introduction
This problem looks like a simulation required.
However, if we carefully read the problem, it turns out the answer is just a number of times.
Think what will go on from the problem description.
The number of unique non-zero values is the answer.

## Problem Description
> You are given a non-negative integer array `nums`.
> In one operation, you must:
> - Choose a positive integer `x` such that `x` is less than or equal to
>   the smallest non-zero element in `nums`.
> - Subtract `x` from every positive element in `nums`.
>
> Return the minimum number of operations to make every element in nums equal to 0.
>
> Constraints:
> - `1 <= nums.length <= 100`
> - `0 <= nums[i] <= 100`
>
> [https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/](https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/)

## Examples
```
Example 1
Input: nums = [1,5,0,3,5]
Output: 3
Explanation:
In the first operation, choose x = 1. Now, nums = [0,4,0,2,4].
In the second operation, choose x = 2. Now, nums = [0,2,0,0,2].
In the third operation, choose x = 2. Now, nums = [0,0,0,0,0].
```

```
Example 2
Input: nums = [0]
Output: 0
Explanation: Each element in nums is already 0 so no operations are needed.
```

## Analysis
The answer is the number of unique non-zero values, so take a set at first.
If 0 doesn't exist in the set, the length of the set is the answer.
Otherwise subtract 1 from the length of the set.

## Solution
```python
class MakeArrayZeroBySubtractingEqualAmounts:
    def minimumOperations(self, nums: List[int]) -> int:
        ss = set(nums)
        return len(ss) if 0 not in ss else len(ss) - 1
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
