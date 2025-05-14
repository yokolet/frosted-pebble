---
layout: algo_page
group: Stacks and Queues
title: Sum of Total Strength of Wizards
algo_menubar: algo_menu
tags:
- Hard
- Monotonic Stack
- Prefix Sum
- Array
date: 2022-09-14 15:28 +0900
---
## Introduction
This can be solved using monotonic stack and prefix sum.
However, this is really a hard problem.
It need from left and right monotonic stacks.
The prefix sum is a doubly calculated prefix sum.
The way to summing up prefix sum is not straightforward.

## Problem Description
> As the ruler of a kingdom, you have an army of wizards at your command.
> You are given a 0-indexed integer array `strength`, where `strength[i]` denotes the strength of the ith wizard.
> For a contiguous group of wizards (i.e. the wizards' strengths form a subarray of strength),
> the total strength is defined as the product of the following two values:
> - The strength of the weakest wizard in the group.
> - The total of all the individual strengths of the wizards in the group.
>
> Return the sum of the total strengths of all contiguous groups of wizards.
> Since the answer may be very large, return it `modulo 10**9 + 7`.
>
> A subarray is a contiguous non-empty sequence of elements within an array.
>
> Constraints:
> - `1 <= strength.length <= 10**5`
> - `1 <= strength[i] <= 10**9`
>
> [https://leetcode.com/problems/sum-of-total-strength-of-wizards/](https://leetcode.com/problems/sum-of-total-strength-of-wizards/)

## Examples
```
Example 1:
Input: strength = [1,3,1,2]
Output: 44
Explanation:
subarrays: [1], [1,3], [1,3,1], [1,3,1,2], [3], [3,1], [3,1,2], [1], [1,2], [2]
min(subarray) * sum(subarray): 1, 4, 5, 7, 9, 4, 6, 1, 3, 4
total = 44
```

```
Example 2:
Input: strength = [5,4,6]
Output: 213
Explanation:
```

## Analysis
For the first step, create monotonically increasing stacks from left and right.
Next step is to calculate prefix sum.
It is a prefix sum of prefix sum.
Here, the solution uses Python's `itertools.accumulate` function.
Lastly, total strength is calculated using prefix sum with the range.

## Solution
```python
class SumOfTotalStrengthOfWizards:
    def totalStrength(self, strength: List[int]) -> int:
        mod = 10 ** 9 + 7
        n = len(strength)
        # next small on the right
        stack, right = [], [n for _ in range(n)]
        for i in range(n):
            while stack and strength[stack[-1]] > strength[i]:
                right[stack.pop()] = i
            stack.append(i)
        # next small on the left
        stack, left = [], [-1 for _ in range(n)]
        for i in range(n - 1, -1, -1):
            while stack and strength[stack[-1]] >= strength[i]:
                left[stack.pop()] = i
            stack.append(i)
        result = 0
        prefix = list(accumulate(accumulate(strength), initial=0))
        for i in range(n):
            l, r = left[i], right[i]
            l_pre = prefix[i] - prefix[max(l, 0)]
            r_pre = prefix[r] - prefix[i]
            result += strength[i] * (r_pre * (i - l) - l_pre * (r - i)) % mod
        return result % mod
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
