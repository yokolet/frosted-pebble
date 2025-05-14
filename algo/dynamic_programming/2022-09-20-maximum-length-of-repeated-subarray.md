---
layout: algo_page
group: Dynamic Programming
title: Maximum Length of Repeated Subarray
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
- Sliding Window
- Array
date: 2022-09-20 21:58 +0900
---
## Introduction
This problem can be solved by multiple approaches.
A naive solution would be to create a character map and check subarray equality.
However, the naive approach runs slow.
If we look at the problem carefully, the comparison should be done at each index while extending the range.
The next comparison is an extension of previous comparison.
This means the dynamic programing is among multiple approaches.

## Problem Description
> Given two integer arrays `nums1` and `nums2`, return the maximum length of a subarray
> that appears in both arrays.
>
> Constraints:
> - `1 <= nums1.length, nums2.length <= 1000`
> - `0 <= nums1[i], nums2[i] <= 100`
>
> [https://leetcode.com/problems/maximum-length-of-repeated-subarray/](https://leetcode.com/problems/maximum-length-of-repeated-subarray/)

## Examples
```
Example 1
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].
```

```
Example 2
Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5
```

## Analysis
The DP solution is the approach taken here.
The 2 dimensional auxiliary array is used to save the state so far.
If the array values are the same at index i of nums1 and j of nums2, extend the length by one.
Then compare the maximum value.
In the end, we get the answer.

## Solution
```python
class MaximumLengthOfRepeatedSubarray:
    def findLength(self, nums1: List[int], nums2: List[int]) -> int:
        m, n = len(nums1), len(nums2)
        memo = [[0 for _ in range(n + 1)] for _ in range(m + 1)]
        max_v = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    memo[i][j] = memo[i - 1][j - 1] + 1
                max_v = max(max_v, memo[i][j])
        return max_v
```

## Complexities
- Time: `O(mn)` -- m, n: length of nums1 and nums2
- Space: `O(mn)`
