---
layout: algo_page
group: Sorting and Searching
title: Earliest Possible Day of Full Bloom
algo_menubar: algo_menu
tags:
- Hard
- Sorting
- Greedy
- Array
date: 2022-10-29 13:36 +0900
---
## Introduction
This problem is very hard to understand.
The given examples add up confusion.
We should read the problem carefully and think well.
In the end, we can figure out this is a sorting and greedy problem.
One of the example shows a divided plant time, which makes us think of dynamic programming.
However, there's no difference whether the plant time is consecutive or non-consecutive.
We should sort based on the grow time longer to shorter.
Then, add up the plant and grow times while comparing the maximum time.
This way, we can find the answer.

## Problem Description
> You have `n` flower seeds. Every seed must be planted first before it can begin to grow, then bloom. Planting a seed
> takes time and so does the growth of a seed. You are given two 0-indexed integer arrays `plantTime` and `growTime`,
> of length `n` each:
> - `plantTime[i]` is the number of full days it takes you to plant the i-th seed. Every day, you can work on planting
>    exactly one seed. You do not have to work on planting the same seed on consecutive days, but the planting of a
>    seed is not complete until you have worked `plantTime[i]` days on planting it in total.
> - `growTime[i]` is the number of full days it takes the ith seed to grow after being completely planted. After the
>    last day of its growth, the flower blooms and stays bloomed forever.
>
> From the beginning of day 0, you can plant the seeds in any order.
>
> Return the earliest possible day where all seeds are blooming.
>
> Constraints:
> - `n == plantTime.length == growTime.length`
> - `1 <= n <= 10**5`
> - `1 <= plantTime[i], growTime[i] <= 10**4`
>
> [https://leetcode.com/problems/earliest-possible-day-of-full-bloom/](https://leetcode.com/problems/earliest-possible-day-of-full-bloom/)

## Examples
```
Example 1
Input: plantTime = [1,4,3], growTime = [2,3,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 0, plant the 0th seed. The seed grows for 2 full days and blooms on day 3.
On days 1, 2, 3, and 4, plant the 1st seed. The seed grows for 3 full days and blooms on day 8.
On days 5, 6, and 7, plant the 2nd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

```
Example 2
Input: plantTime = [1,2,3,2], growTime = [2,1,2,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 1, plant the 0th seed. The seed grows for 2 full days and blooms on day 4.
On days 0 and 3, plant the 1st seed. The seed grows for 1 full day and blooms on day 5.
On days 2, 4, and 5, plant the 2nd seed. The seed grows for 2 full days and blooms on day 8.
On days 6 and 7, plant the 3rd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

```
Example 3
Input: plantTime = [1], growTime = [1]
Output: 2
Explanation: On day 0, plant the 0th seed. The seed grows for 1 full day and blooms on day 2.
Thus, on day 2, all the seeds are blooming.
```

## Analysis
The first step is to sort the array.
The sorting is based on the grow time from longer to shorter.
The result of the sort is indices since both plant and grow time pair is used to calculate the bloom time.
The next step is greedily calculate the bloom time using plant time and grow time.
The plat time should not be overlapped, so simply add up the plant time.
The time to bloom is current plant time so far plus grow time.
Update the maximum of bloom time so far comparing the sum of current plant time so far and grow time.
In the end, the answer is the maximum bloom time.

## Solution
```python
class EarliestPossibleDayOfFullBloom:
    def earliestFullBloom(self, plantTime: List[int], growTime: List[int]) -> int:
        cur_time, max_time = 0, 0
        order = sorted(range(len(plantTime)), key=lambda x: -growTime[x])
        for x in order:
            cur_time += plantTime[x]
            max_time = max(max_time, cur_time + growTime[x])
        return max_time
```

## Complexities
- Time: `O(n*log(n))`
- Space: `O(1)`
