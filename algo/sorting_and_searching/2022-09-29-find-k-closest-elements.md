---
layout: algo_page
group: Sorting and Searching
title: Find K Closest Elements
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
- Two Pointers
- Sorting
- Array
date: 2022-09-29 11:41 +0900
---
## Introduction
Since the given array is sorted, the binary search might be a key to solve the problem.
In fact, finding the closest index of the given value is the first step for one solution.
From the closest index, expanding left and/or right indices to a necessary range works.
Another solution would be to sort the given array using a custom comparator.
This solution is simple, but needs additional sortings.

## Problem Description
> Given a sorted integer array `arr`, two integers k and x, return the k closest
> integers to x in the array. The result should also be sorted in ascending order.
>
> An integer `a` is closer to `x` than an integer `b` if:
> - `|a - x| < |b - x|`, or
> - `|a - x| == |b - x|` and `a < b`
>
> Constraints:
> - `1 <= k <= arr.length`
> - `1 <= arr.length <= 10**4`
> - `arr` is sorted in ascending order.
> - `-10**4 <= arr[i], x <= 10**4`
>
> [https://leetcode.com/problems/find-k-closest-elements/](https://leetcode.com/problems/find-k-closest-elements/)

## Examples
```
Example 1
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
```

```
Example 2
Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]
```

## Analysis
The first step is to find the closest index to the given value x.
The x may or may not in the given array.
It might exists beyond the given array's range.
Once the closest index is found, expand left and right pointer until the range size becomes k.
We should be careful not to set left and right beyond the array range.
Other than that, decrement the left pointer or increment the right pointer based on
the difference between x and each element.

## Solution
```python
class FindKClosectElements:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        n = len(arr)
        if n == k:
            return arr
        left = bisect.bisect_left(arr, x) - 1
        right = left + 1
        while right - left - 1 < k:
            if left == -1:
                right += 1
                continue
            if right == n or abs(arr[left] - x) <= abs(arr[right] - x):
                left -= 1
            else:
                right += 1
        return arr[left + 1:right]
```

## Complexities
- Time: `O(long(n) + k)`
- Space: `O(1)`
