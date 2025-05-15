---
layout: algo_page
group: Sorting and Searching
title: Minimum Cost to Connect Sticks
algo_menubar: algo_menu
tags:
- Medium
- Heap (Priority Queue)
- Greedy
- Array
date: 2022-09-13 17:04 +0900
---
## Introduction
The heap is a good data structure to solve this problem.
After creating a heap, process in greedy manner.

## Problem Description
> You have some number of sticks with positive integer lengths.
> These lengths are given as an array `sticks`, where `sticks[i]` is the length of the i-th stick.
>
> You can connect any two sticks of lengths `x` and `y` into one stick by paying a cost of `x + y`.
> You must connect all the sticks until there is only one stick remaining.
> 
> Return the minimum cost of connecting all the given sticks into one stick in this way.
>
> Constraints:
> - `1 <= sticks.length <= 10**4`
> - `1 <= sticks[i] <= 10**4`
>
> [https://leetcode.com/problems/minimum-cost-to-connect-sticks/](https://leetcode.com/problems/minimum-cost-to-connect-sticks/)

## Examples
```
Example 1:
Input: sticks = [2,4,3]
Output: 14
Explanation:
cost: 2 + 3 = 5, sticks: [5, 4]
cost: 5 + 4 = 9, sticks: [9]
total cost: 5 + 9 = 14
```

```
Example 2:
Input: sticks = [1,8,3,5]
Output: 30
Explanation:
cost: 1 + 3 = 4, sticks: [4, 8, 5]
cost: 4 + 5 = 9, sticks: [8, 9]
cost: 8 + 9 = 17, sticks: [17]
total cost: 4 + 9 + 17 = 30
```

```
Example 3:
Input: sticks = [5]
Output: 0
Explanation: not enough number of sticks to connect
```

## Analysis
Start from all sticks in the heap.
Pick up two shortest sticks and connect those.
Add up the cost and push the connected stick back to the heap.
When the heap has only on stick, the loop ends.

## Solution
```python
class MinimumCostToConnectSticks:
    def connectSticks(self, sticks: List[int]) -> int:
        cost, heap = 0, [*sticks]
        heapq.heapify(heap)
        while len(heap) > 1:
            x = heapq.heappop(heap)
            y = heapq.heappop(heap)
            cost += (x + y)
            heapq.heappush(heap, x + y)
        return cost
```

## Complexities
- Time: `O(nlog(n))`
- Space: `O(n)`
