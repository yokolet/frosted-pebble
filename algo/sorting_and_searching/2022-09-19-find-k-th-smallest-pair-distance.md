---
layout: algo_page
group: Sorting and Searching
title: Find K-th Smallest Pair Distance
algo_menubar: algo_menu
tags:
- Hard
- Binary Search
- Two Pointers
- Sorting
- Array
date: 2022-09-19 21:37 +0900
---
## Introduction
The solution of this problem might not come up easily.
In fact, the binary search works well to find the answer.
The order of the array doesn't matter, so the first step is to sort the array.
Then what's next?
Since the array is sorted, we should think of the possibility of the binary search.
In case of the binary search, the criteria to move left and right pointer is an important key.
Once we figure out the key, we can find the answer.

## Problem Description
> The distance of a pair of integers `a` and `b` is defined as the absolute difference between `a` and `b`.
>
> Given an integer array `nums` and an integer `k`, 
> return the k-th smallest distance among all the pairs `nums[i]` and `nums[j]` where `0 <= i < j < nums.length`.
>
> Constraints:
> - `n == nums.length`
> - `2 <= n <= 10**4`
> - `0 <= nums[i] <= 10**6`
> - `1 <= k <= n * (n - 1) / 2`
>
> [https://leetcode.com/problems/find-k-th-smallest-pair-distance/](https://leetcode.com/problems/find-k-th-smallest-pair-distance/)

## Examples
```
Example 1
Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
```

```
Example 2
Input: nums = [1,1,1], k = 2
Output: 0
```

```
Example 3
Input: nums = [1,6,1], k = 3
Output: 5
```

## Analysis
Since the binary search is the algorithm to solve the problem, start from sorting the given array.
The maximum difference comes from the sorted array's 0 and the last indices.
This is the initial value of the high pointer.
While searching the optimal value, it counts how many elements have the bigger differences between middle.
When the difference exceeds, the lower index is incremented one.
This way, the check function avoids a double loop.
If the count is greater than or equal to k, the right pointer moves.
Otherwise, the left pointer moves.

## Solution
```python
class FindKthSmallestPairDistance:
    def smallestDistancePair(self, nums: List[int], k: int) -> int:
        def check(mid):
            count, idx = 0, 0
            for i, v in enumerate(nums):
                while v - nums[idx] > mid:
                    idx += 1
                count += i - idx
            return count >= k
        
        nums.sort()
        left, right = 0, nums[-1] - nums[0]
        while left < right:
            mid = (left + right) // 2
            if check(mid):
                right = mid
            else:
                left = mid + 1
        return left
```

## Complexities
- Time: `O(nlog(n))`
- Space: `O(1)`
 
