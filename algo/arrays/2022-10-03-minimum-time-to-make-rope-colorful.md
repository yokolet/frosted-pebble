---
layout: algo_page
group: Arrays
title: Minimum Time to Make Rope Colorful
algo_menubar: algo_menu
tags:
- Medium
- Two Pointers
- Greedy
- Array
- String
date: 2022-10-03 14:14 +0900
---
## Introduction
A couple of approaches are there. Among them, two pointers works well in this problem.
The problem asks to find a range sum and maximum while the same character repeats.
The left pointer is on the previous smaller values, and the right pointer goes on one by one.
When the character changes, update the left pointer.

## Problem Description
> Alice has `n` balloons arranged on a rope. You are given a 0-indexed string colors where `colors[i]` is
> the color of the ith balloon.
> Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color,
> so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful.
> You are given a 0-indexed integer array `neededTime` where `neededTime[i]` is the time (in seconds) that
> Bob needs to remove the i-th balloon from the rope.
>
> Return the minimum time Bob needs to make the rope colorful.
>
> Constraints:
> - `n == colors.length == neededTime.length`
> - `1 <= n <= 10**5`
> - `1 <= neededTime[i] <= 10**4`
> - colors contains only lowercase English letters.
>
> [https://leetcode.com/problems/minimum-time-to-make-rope-colorful/](https://leetcode.com/problems/minimum-time-to-make-rope-colorful/)

## Examples
```
Example 1
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: Optimal arrangement is "ab_ac." Total cost is 3.
```

```
Example 2
Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful.
```

```
Example 3
Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Optimal arrangement is "_aba_." Total cost is 2.
```


## Analysis
The solution here maintains a running sum.
When the same color's current neededTime (right pointer) is bigger,
add previous neededTime (left pointer) will be added to the total.
In such case, increment left pointer. Otherwise, add current neededTime (right pointer).
If the colors are different, set the current pointer to left pointer.

## Solution
```python
class MinimumTimeToMakeRopeColorful:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        n = len(colors)
        left = 0
        total = 0
        for i in range(1, n):
            if colors[i] == colors[left]:
                if neededTime[left] < neededTime[i]:
                    total += neededTime[left]
                    left = i
                else:
                    total += neededTime[i]
            else:
                left = i
        return total
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
