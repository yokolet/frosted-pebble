---
layout: algo_page
group: Arrays
title: Minimum Swaps to Group All 1's Together II
algo_menubar: algo_menu
tags:
- Medium
- Sliding Window
- Array
date: 2022-09-18 12:36 +0900
---
## Introduction
This is almost identical to the problem,
[Minimum Swaps to Group All 1's Together](/algo/arrays/2022-09-18-minimum-swaps-to-group-all-1-s-together).
Only difference is the given array is circular.
If it is a circular array, in general, adding the same array in the end works.

## Problem Description
> A swap is defined as taking two distinct positions in an array and swapping the values in them.
> A circular array is defined as an array where we consider the first element and
> the last element to be adjacent.
>
> Given a binary circular array `nums`, return the minimum number of swaps
> required to group all 1's present in the array together at any location.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `nums[i]` is either 0 or 1.
>
> [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/)

## Examples
```
Example 1
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: Here are a few of the ways to group all the 1's together:
[0,0,1,1,1,0,0] using 1 swap.
[0,1,1,1,0,0,0] using 1 swap.
[1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
There is no way to group all 1's together with 0 swaps.
```

```
Example 2
Input: nums = [0,1,1,1,0,0,1,1,0]
Output: 2
Explanation: Here are a few of the ways to group all the 1's together:
[1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
[1,1,1,1,1,0,0,0,0] using 2 swaps.
There is no way to group all 1's together with 0 or 1 swaps.
```

```
Example 3
Input: nums = [1,1,0,0,1]
Output: 0
Explanation: All the 1's are already grouped together due to the circular property of the array.
Thus, the minimum number of swaps required is 0.
```

## Analysis
We should put all 1's in some area of the array.
It is not necessary at the end or beginning.
For example the given array is `[1, 0, 1, 0, 1]`, `[0, 1, 1, 1, 0]` is one of the final state.
From index 1 to 3, all 1's are put together.
In another word, a sum of index 1 to 3 is 3.
Given that, by looking at the range sum, we know how many swaps are needed in the range.

The first step is to get a sum of the given array, which is the same as the number of 1's.
Also, the sum is the same range all 1's put together.
Start the sum from index 0 to sum of the array.
Since this is a circular array, add the same array at the end.
Use two pointers, left and right, both are incremented by one each iteration.
Update the current sum, then compare maximum swaps.
Notice, it is the maximum not minimum.
In the end, the sum of the array value minus maximum swaps gives us the answer.

## Solution
```python
class MinimumSwapsToGroupAll1sTogetherTwo:
    def minSwaps(self, nums: List[int]) -> int:
        ones = sum(nums)
        cur = sum(nums[0:ones])
        max_v = cur
        nums += nums
        for right in range(ones, len(nums)):
            left = right - ones
            cur -= nums[left]
            cur += nums[right]
            max_v = max(max_v, cur)
        return ones - max_v
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
