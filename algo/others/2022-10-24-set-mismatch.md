---
layout: algo_page
group: Others
title: Set Mismatch
algo_menubar: algo_menu
tags:
- Easy
- Math
- Hash Table
- Array
date: 2022-10-24 16:40 +0900
---
## Introduction
The problem has a number of ways to solve.
Sorting, using Hash Table, Bit Manipulation, and Math.
The problem is relatively easy, however, it needs both missing and duplicated numbers.
A bit of extra work is required.

## Problem Description
> You have a set of integers `s`, which originally contains all the numbers from `1` to `n`. Unfortunately, due to some
> error, one of the numbers in `s` got duplicated to another number in the set, which results in repetition of one
> number and loss of another number.
>
> You are given an integer array `nums` representing the data status of this set after the error.
>
> Find the number that occurs twice and the number that is missing and return them in the form of an array.
>
> Constraints:
> - `2 <= nums.length <= 10**4`
> - `1 <= nums[i] <= 10**4`
>
> [https://leetcode.com/problems/set-mismatch/](https://leetcode.com/problems/set-mismatch/)

## Examples
```
Example 1
Input: nums = [1,2,2,4]
Output: [2,3]
```

```
Exmaple 2
Input: nums = [1,1]
Output: [1,2]
```

## Analysis
The solution here took a math approach.
Suppose all numbers from 1 to n exist, the sum of all is calculated by `n * (n + 1) / 2`.
This is the original sum.
The missing number can be easily found from the difference between the original and number set sums.
The duplicated number is the sum of given numbers plus missing number minus original sum.
Just a simple math.
The answer is a list of duplicated and missing numbers.

## Solution
```python
class SetMismatch:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        original = n * (n + 1) // 2
        missing = original - sum(set(nums))
        dup = sum(nums) + missing - original
        return [dup, missing]
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
