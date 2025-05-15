---
layout: algo_page
group: Stacks and Queues
title: Sum of Subarray Ranges
algo_menubar: algo_menu
tags:
- Medium
- Monotonic Stack
- Array
date: 2022-09-09 18:47 +0900
---
## Introduction
This is another problem of the monotonic stack.
At a glance, the problem looks just an array, not so difficult one.
However, naive solution hits the time limit exceeded.
Using two monotonic stack, we can solve this in a linear performance.

## Problem Description
> You are given an integer array `nums`.
> The range of a subarray of `nums` is the difference between the largest and smallest element in the subarray.
>
> Return the sum of all subarray ranges of `nums`.
>
> A subarray is a contiguous non-empty sequence of elements within an array.
>
> Constraints:
> - `1 <= nums.length <= 1000`
> - `-10**9 <= nums[i] <= 10**9`
>
> [https://leetcode.com/problems/sum-of-subarray-ranges/](https://leetcode.com/problems/sum-of-subarray-ranges/)

## Examples
```
Example 1:
Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0 
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
```

```
Example 2:
Input: nums = [1,3,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
```

```
Example 3:
Input: nums = [4,-2,-3,4,1]
Output: 59
Explanation: The sum of all subarray ranges of nums is 59.
```

## Analysis
The examples explain that max sum - min sum will be added to the current total while
creating subarrays.
However, sum of all range max minus sum of all range min in the end will give us the answer.
A naive solution can solve simple cases, but not for difficult level tests.
Those raise time limit exceeded error.

Here, two monotonic stacks are used.
One is a monotonically increasing stack to find range minimum.
Another is a monotonically decreasing stack to find range maximum.
To calculate range sum, multiply the number of range minimum/maximum value.
In the end, maximum sum - minimum sum will give us the answer.

## Solution
```python
class SumOfSubarrayRanges:
    def subArrayRanges(self, nums: List[int]) -> int:
        stack, min_sum = [], 0
        for i, v in enumerate(nums + [float('-inf')]):
            while stack and nums[stack[-1]] > v:
                j = stack.pop()
                start = stack[-1] if stack else -1
                min_sum += nums[j] * (i - j) * (j - start)
            stack.append(i)
        stack, max_sum = [], 0
        for i, v in enumerate(nums + [float('inf')]):
            while stack and nums[stack[-1]] < v:
                j = stack.pop()
                start = stack[-1] if stack else -1
                max_sum += nums[j] * (i - j) * (j - start)
            stack.append(i)
        return max_sum - min_sum
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
 
