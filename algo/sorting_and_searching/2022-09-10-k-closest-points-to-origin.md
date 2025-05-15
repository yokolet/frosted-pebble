---
layout: algo_page
group: Sorting and Searching
title: K Closest Points to Origin
algo_menubar: algo_menu
tags:
- Medium
- Sort
- Math
- Geometry
- Array
date: 2022-09-10 16:26 +0900
---
## Introduction
This is a geometry problem, yet a simple sorting problem as well.
In any case, we should calculate distances to the origin on all points.

## Problem Description
> Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer k,
> return the `k` closest points to the origin `(0, 0)`.
> The distance between two points on the X-Y plane is the Euclidean distance `(i.e., √(x1 - x2)2 + (y1 - y2)2)`.
> You may return the answer in any order.
> The answer is guaranteed to be unique (except for the order that it is in).
>
> Constraints:
> - `1 <= k <= points.length <= 10**4`
> - `-10**4 < xi, yi < 10**4`
>
> [https://leetcode.com/problems/k-closest-points-to-origin/](https://leetcode.com/problems/k-closest-points-to-origin/)

## Examples
```
Example 1
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
```

```
Example 2
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
```

## Analysis
Sorting is done by an Euclidean distance to the origin `(0, 0)`.
We don't need actual distance, since comparison matters.
Instead, sorting key is `x * x + y * y`.
After sorting, return first `k` points.

## Solution
```python
class KClosestPointsToOrigin:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        points.sort(key = lambda x: x[0] * x[0] + x[1] * x[1])
        return points[:k]
```

## Complexities
- Time: `O(nlog(n))`
- Space: `O(1)`
