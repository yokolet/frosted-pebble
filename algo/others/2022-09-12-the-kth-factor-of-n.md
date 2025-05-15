---
layout: algo_page
group: Others
title: The kth Factor of n
algo_menubar: algo_menu
tags:
- Medium
- Math
date: 2022-09-12 22:14 +0900
---
## Introduction
This is just a math problem.
It's good to try brute force.
It might be enough to get an answer.
If not, find something of math rules.

## Problem Description
> You are given two positive integers `n` and k`.
> A factor of an integer `n` is defined as an integer `i` where `n % i == 0`.
>
> Consider a list of all factors of n sorted in ascending order,
> return the kth factor in this list or return `-1` if `n` has less than `k` factors.
>
> Constraints:
> - `1 <= k <= n <= 1000`
>
> [https://leetcode.com/problems/the-kth-factor-of-n/](https://leetcode.com/problems/the-kth-factor-of-n/)

## Examples
```
Example 1:
Input: n = 12, k = 3
Output: 3
Explanation: Factors list is [1, 2, 3, 4, 6, 12], the 3rd factor is 3.
```

```
Example 2:
Input: n = 7, k = 2
Output: 7
Explanation: Factors list is [1, 7], the 2nd factor is 7.
```

```
Example 3:
Input: n = 4, k = 4
Output: -1
Explanation: Factors list is [1, 2, 4], there is only 3 factors. We should return -1.
```

## Analysis
Upper limit of this problem is not high.
Brute force is enough to solve the problem.
There's no need to check more than half of the given number, so the loop ends at `n // 2 + 1`.
In the end, k is still 1, n is the answer.
Otherwise, return -1.

## Solution
```python
class TheKThFactorOfN:
    def kthFactor(self, n: int, k: int) -> int:
        for x in range(1, n // 2 + 1):
            if n % x == 0:
                k -= 1
                if k == 0:
                    return x
        return n if k == 1 else -1
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
