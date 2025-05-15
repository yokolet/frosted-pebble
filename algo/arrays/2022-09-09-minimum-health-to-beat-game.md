---
layout: algo_page
group: Arrays
title: Minimum Health to Beat Game
algo_menubar: algo_menu
tags:
- Medium
- Arrays
- Greedy
date: 2022-09-09 22:03 +0900
---
## Introduction
The point here would be to understand the problem correctly.
If we could, this is not a difficult problem.
We can use the armor at most once, so this goes to the max value in the array.

## Problem Description
> You are playing a game that has `n` levels numbered from `0` to `n - 1`.
> You are given a 0-indexed integer array `damage`
> where `damage[i]` is the amount of health you will lose to complete the ith level.
> You are also given an integer `armor`.
> You may use your armor ability at most once during the game on any level
> which will protect you from at most armor damage.
>
> You must complete the levels in order
> and your health must be greater than 0 at all times to beat the game.
>
> Return the minimum health you need to start with to beat the game.
>
> Constraints:
> - `n == damage.length`
> - `1 <= n <= 10**5`
> - `0 <= damage[i] <= 10**5`
> - `0 <= armor <= 10**5`
>
> [https://leetcode.com/problems/minimum-health-to-beat-game/](https://leetcode.com/problems/minimum-health-to-beat-game/)

## Examples
```
Example 1:
Input: damage = [2,7,4,3], armor = 4
Output: 13
Explanation: One optimal way to beat the game starting at 13 health is:
On round 1, take 2 damage. You have 13 - 2 = 11 health.
On round 2, take 7 damage. You have 11 - 7 = 4 health.
On round 3, use your armor to protect you from 4 damage. You have 4 - 0 = 4 health.
On round 4, take 3 damage. You have 4 - 3 = 1 health.
Note that 13 is the minimum health you need to start with to beat the game.
```

```
Example 2:
Input: damage = [2,5,3,4], armor = 7
Output: 10
Explanation: One optimal way to beat the game starting at 10 health is:
On round 1, take 2 damage. You have 10 - 2 = 8 health.
On round 2, use your armor to protect you from 5 damage. You have 8 - 0 = 8 health.
On round 3, take 3 damage. You have 8 - 3 = 5 health.
On round 4, take 4 damage. You have 5 - 4 = 1 health.
Note that 10 is the minimum health you need to start with to beat the game.
```

```
Example 3:
Input: damage = [3,3,3], armor = 0
Output: 10
Explanation: One optimal way to beat the game starting at 10 health is:
On round 1, take 3 damage. You have 10 - 3 = 7 health.
On round 2, take 3 damage. You have 7 - 3 = 4 health.
On round 3, take 3 damage. You have 4 - 3 = 1 health.
Note that you did not use your armor ability.
```

## Analysis
In any case, at least 1 should be retained.
Also, the armor value reduction goes to the max value.
So, start from taking a sum of all values, plus one for minimum level,
minus max value or armor. This is the answer.

## Solution
```python
class MinimumHealthToBeatGame:
    def minimumHealth(self, damage: List[int], armor: int) -> int:
        return sum(damage) + 1 - min(max(damage), armor)
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
