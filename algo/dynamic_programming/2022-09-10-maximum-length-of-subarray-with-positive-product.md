---
layout: algo_page
group: Dynamic Programming
title: Maximum Length of Subarray With Positive Product
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
- Array
date: 2022-09-10 22:30 +0900
---
## Introduction
When the problem asks maximum or minimum of something in the given array,
it might be a dynamic programming problem.
It's not always, but good to consider dp solution.
This problem keeps the state of positive/negative results length.
The maximum length will be from positive length as the problem explains.

## Problem Description
> Given an array of integers `nums`, find the maximum length of a subarray
> where the product of all its elements is positive.
> Return the maximum length of a subarray with positive product.
>
> A subarray of an array is a consecutive sequence of zero or more values taken out of that array.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `-10**9 <= nums[i] <= 10**9`
> 
> [https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)

## Examples
```
Example 1:
Input: nums = [1,-2,-3,4]
Output: 4
Explanation: The array nums already has a positive product of 24.
```

```
Example 2:
Input: nums = [0,1,-2,-3,-4]
Output: 3
Explanation: The longest subarray with positive product is [1,-2,-3] which has a product of 6.
Notice that we cannot include 0 in the subarray since that'll make the product 0 which is not positive.
```

```
Example 3:
Input: nums = [-1,-2,-3,0,1]
Output: 2
Explanation: The longest subarray with positive product is [-1,-2] or [-2,-3].
```

## Analysis
Two states, the length of positive/negative products will be used.
When the value is 0, reset both states.

When the value is positive:
- increment positive length
- if negative length is greater than 0, increment negative length since positive value
  doesn't flip pos/neg.

When the value is negative:
- flip pos/neg
- positive length is negative length plus one if it's not 0
- negative length is positive length plus one

Additionally, compare maximum length with positive length in every iteration.

## Solution
```python
class MaximumLengthOfSubarrayWithPositiveProduct:
    def getMaxLen(self, nums: List[int]) -> int:
        pos, neg, max_v = 0, 0, 0
        for num in nums:
            if num == 0:
                pos, neg = 0, 0
            elif num > 0:
                pos += 1
                neg = 0 if neg == 0 else neg + 1
            else:
                pos, neg = neg + 1 if neg > 0 else 0, pos + 1
            max_v = max(max_v, pos)
        return max_v
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
