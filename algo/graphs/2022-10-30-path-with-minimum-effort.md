---
layout: algo_page
group: Graphs
title: Path With Minimum Effort
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Heap (Priority Queue)
- Matrix
date: 2022-10-30 23:51 +0900
---
## Introduction
At a glance, this problem looks like a simple DP.
However, the problem asks a shortest path with a specific distance definition.
In this problem, the distance is the absolute value difference between neighboring cells.
The minimum distance will be updated in each cell while traversing all cells.
So, it still needs memoization.
The cell traverse is done using Dijkstra algorithm.
With these two algorithm combination, we can get the answer.

## Problem Description
> You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where
> `heights[row][col]` represents the height of cell `(row, col)`. You are situated in the top-left cell, `(0, 0)`,
> and you hope to travel to the bottom-right cell, `(rows-1, columns-1)` (i.e., 0-indexed). You can move up, down,
> left, or right, and you wish to find a route that requires the minimum effort.
>
> A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.
>
> Return the minimum effort required to travel from the top-left cell to the bottom-right cell.
>
> Constraints:
> - `rows == heights.length`
> - `columns == heights[i].length`
> - `1 <= rows, columns <= 100`
> - `1 <= heights[i][j] <= 10**6`
>
> [https://leetcode.com/problems/path-with-minimum-effort/](https://leetcode.com/problems/path-with-minimum-effort/)

## Examples
```
Example 1
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
```

```
Example 2
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better
than route [1,3,5,3,5].
```

```
Example 3
Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.
```

## Analysis
The solution starts from creating a table for memoization with infinite as the initial value.
The starting cell is top left corner, so memo[0][0] = 0.
The heap has a (distance, row, col) tuple.
When popped out cell's row, col is the bottom right corner, the answer is found.
All four cells around the current cell are checked.
If the neighboring cell's distance is smaller than the one in memoization table, the value is updated.
At the same time, (new distance, new row, new col) is pushed to heap.
This way, we can find the answer.

## Solution
```python
class PathWithMinimumEffort:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        m, n = len(heights), len(heights[0])
        memo = [[float('inf') for _ in range(n)] for _ in range(m)]
        memo[0][0] = 0
        queue = [(0, 0, 0)] # dist, row, col
        while queue:
            d, r, c = heapq.heappop(queue)
            if r == m - 1 and c == n - 1:
                return d
            if d > memo[r][c]:
                continue
            for nr, nc in [(r - 1, c), (r, c - 1), (r, c + 1), (r + 1, c)]:
                if 0 <= nr < m and 0 <= nc < n:
                    nd = max(d, abs(heights[nr][nc] - heights[r][c]))
                    if memo[nr][nc] > nd:
                        memo[nr][nc] = nd
                        heapq.heappush(queue, (nd, nr, nc))
```

## Complexities
- Time: `O(m*n*log(m*n))`
- Space: `O(m*n)`
