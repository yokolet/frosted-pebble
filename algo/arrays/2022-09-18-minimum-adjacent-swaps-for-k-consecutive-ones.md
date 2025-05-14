---
layout: algo_page
group: Arrays
title: Minimum Adjacent Swaps for K Consecutive Ones
algo_menubar: algo_menu
tags:
- Hard
- Sliding Window
- Prefix Sum
- Greedy
date: 2022-09-18 17:36 +0900
---
## Introduction
This is another 0, 1 minimum swap problem.
However, this problem is much complicated.
The swaps can be done only adjacent indicies.
Up to the given number of 1s could be rearranged to consecutive, the process is over.
For this problem, we should focus on the right and left side within the range.

## Problem Description
> You are given an integer array, `nums`, and an integer `k`.
> `nums` comprises of only 0's and 1's.
> In one move, you can choose two adjacent indices and swap their values.
>
> Return the minimum number of moves required so that nums has `k` consecutive 1's.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `nums[i]` is 0 or 1.
> - `1 <= k <= sum(nums)`
>
> [https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones/](https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones/)

## Examples
```
Example 1
Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
Explanation: In 1 move, nums could be [1,0,0,0,1,1] and have 2 consecutive 1's.
```

```
Example 2
Input: nums = [1,0,0,0,0,0,1,1], k = 3
Output: 5
Explanation: In 5 moves, the leftmost 1 can be shifted right until nums = [0,0,0,0,0,1,1,1].
```

```
Example 3
Input: nums = [1,1,0,1], k = 2
Output: 0
Explanation: nums already has 2 consecutive 1's.
```

## Analysis
Let's see the first example:
```
nums: [1, 0, 0, 1, 0, 1], k = 2
prefix: [0, 0, 3, 8]
```
When `k = 2`, we assume nums subarray`[1, 0, 0, 0, 1]` to become `[0, 0, 1, 1, 0]` (or `[0, 1, 1, 0, 0]`).
In this case, 3 swaps are required.
Going over to the right, let's think `[0, 0, 1, 0, 1]` to become `[0, 0, 1, 1, 0]`.
In this case, 1 swap is required.

The first step is to create a prefix sum of 1's indicies.
The prefix sum quickly finds the index of nums where the number of 1's are k.
Take k from prefix sum and find the middle as well as right and left sides sum.
To find minimum difference between right sum and left sum is the second step.
Lastly, subtract the center position since it doesn't move during the swapping.

## Solution
```python
class MinimumAdjacentSwapsForKConsecutiveOnes:
    def minMoves(self, nums: List[int], k: int) -> int:
        indices = [idx for idx, v in enumerate(nums) if v]
        n = len(indices)
        prefix = [0]
        for i in range(n):
            prefix.append(prefix[-1] + indices[i])
        min_v = float('inf')
        for i in range(n - k + 1):
            r_sum = prefix[i + k] - prefix[i + (k + 1) // 2]
            l_sum = prefix[i + k // 2] - prefix[i]
            min_v = min(min_v, r_sum - l_sum)
        return min_v - (k // 2) * ((k + 1) // 2)
```

## Complexities
- Time: `O(n)`
- Space: `O(m)` -- m: number of 1's
