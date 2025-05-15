---
layout: algo_page
group: Arrays
title: Merge Sorted Array
algo_menubar: algo_menu
tags:
- Easy
- Two Pointers
- Array
date: 2022-09-23 17:54 +0900
---
## Introduction
If the problem is about an array and says "don't return any," we'd better start from the end of array.
Two arrays are sorted, so compare two values from bigger to smaller.
The extra space in the first array will be filled out without any conflict.

## Problem Description
> You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`,
> representing the number of elements in `nums1` and `nums2` respectively.
> Merge `nums1` and `nums2` into a single array sorted in non-decreasing order.
>
> The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`.
> To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements
> that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.
>
> Constraints:
> - `nums1.length == m + n`
> - `nums2.length == n`
> - `0 <= m, n <= 200`
> - `1 <= m + n <= 200`
> - `-10**9 <= nums1[i], nums2[j] <= 10**9`
>
> [https://leetcode.com/problems/merge-sorted-array/](https://leetcode.com/problems/merge-sorted-array/)

## Examples
```
Example 1
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

```
Example 2
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
```

```
Example 3
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
```

## Analysis
Start from the last values of nums1 and nums2.
Fill the nums1 from the end so that indices won't have a conflict.
In the end, check all of nums2 is processed.
If not, copy the rest of nums2 values to nums1.

## Solution
```python
class MergeSortedArray:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        while m > 0 and n > 0:
            if nums1[m - 1] >= nums2[n - 1]:
                nums1[m + n - 1] = nums1[m - 1]
                m -= 1
            else:
                nums1[m + n - 1] = nums2[n - 1]
                n -= 1
        if n > 0:
            for k in range(n):
                nums1[k] = nums2[k]
```

## Complexities
- Time: `O(m + n)`
- Space: `O(1)`
