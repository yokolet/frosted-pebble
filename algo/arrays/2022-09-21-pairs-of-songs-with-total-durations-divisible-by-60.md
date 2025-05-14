---
layout: algo_page
group: Arrays
title: Pairs of Songs With Total Durations Divisible by 60
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Counting
- Array
date: 2022-09-21 17:47 +0900
---
## Introduction
Basically, the problem asks how many combinations of two are there.
In this case, we care about only modulo 60 of each value.
Using a hash table to count modulo 60 values is a key to solve this problem.

## Problem Description
> You are given a list of songs where the i-th song has a duration of `time[i]` seconds.
>
> Return the number of pairs of songs for which their total duration in seconds is
> divisible by 60. Formally, we want the number of indices `i, j` such that `i < j` with `(time[i] + time[j]) % 60 == 0`.
>
> Constraints:
> - `1 <= time.length <= 6 * 10**4`
> - `1 <= time[i] <= 500`
>
> [https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/](https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/)

## Examples
```
Example 1
Input: time = [30,20,150,100,40]
Output: 3
Explanation: Three pairs have a total duration divisible by 60:
(time[0] = 30, time[2] = 150): total duration 180
(time[1] = 20, time[3] = 100): total duration 120
(time[1] = 20, time[4] = 40): total duration 60
```

```
Example 2
Input: time = [60,60,60]
Output: 3
Explanation: All three pairs have a total duration of 120, which is divisible by 60.
```

## Analysis
The first step is to count modulo 60 values.
If modulo 60 is 0 or 30, within that value, two pairs can be created.
So, n * (n - 1) / 2 is the number of combinations.
If modulo 60 and 60 - modulo 60 are there, for example, 20 and 40,
combinations are number of 20 times number of 40.
To avoid the pair doubly, up to 30 condition is added.

## Solution
```python
class PairOfSongsWithTotalDurationsDivisibleBy60:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        counter = collections.Counter([t % 60 for t in time])
        result = 0
        for k, v in counter.items():
            if k == 0 or k == 30:
                result += (v * (v - 1) // 2)
            elif k < 30 and 60 - k in counter:
                result += (v * counter[60 - k])
        return result
```

## Complexities
- Time: `O(m + n)` -- m: length of given array, n: distinct values of x % 60
- Space: `O(n)`
