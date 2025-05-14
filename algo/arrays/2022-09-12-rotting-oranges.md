---
layout: algo_page
group: Arrays
title: Rotting Oranges
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Array
- Matrix
date: 2022-09-12 14:42 +0900
---
## Introduction
This is a type of the Game of Life problem.
It requires phases to reach to the final (or next) state.
All grid cells should be checked and have an updated value if it needs.
So, brute force easily gets time limit exceeded error.
To avoid longer compute time, the breadth-first search is a good solution.

## Problem Description
> You are given an `m x n` grid where each cell can have one of three values:
> - 0 representing an empty cell,
> - 1 representing a fresh orange, or
> - 2 representing a rotten orange.
> Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
>
> Return the minimum number of minutes that must elapse until no cell has a fresh orange.
> If this is impossible, return -1.
>
> Constraints:
> - `m == grid.length`
> - `n == grid[i].length`
> - `1 <= m, n <= 10`
> - `grid[i][j] is 0, 1, or 2`
> 
> [https://leetcode.com/problems/rotting-oranges/](https://leetcode.com/problems/rotting-oranges/)

## Examples
```
Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
0: [[2,1,1],[1,1,0],[0,1,1]]
1: [[2,2,1],[2,1,0],[0,1,1]]
2: [[2,2,2],[2,2,0],[0,1,1]]
3: [[2,2,2],[2,2,0],[0,2,1]]
4: [[2,2,2],[2,2,0],[0,2,2]]
```

```
Exmaple 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten,
because rotting only happens 4-directionally.
```

```
Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

## Analysis
To find out terminal condition, count total and rotten number of oranges.
When rotten becomes total, the iteration should be stopped.
There might be a fresh orange never gets rotten since there's no fresh/rotten orange in 4 directions.
Even in a such case, breadth-first search works since it won't include that.
The breadth-first search starts from all rotten oranges in the grid.
Add 4 directions to the queue if a fresh orange exists, and change the state of the orange.
At the same time, count up rotten oranges.
Before go to the next iteration, count up the time.
When the queue becomes empty, the iteration finishes.

## Solution
```python
class RottingOranges:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        total, rotten = 0, 0
        queue = []
        for i in range(m):
            for j in range(n):
                if grid[i][j] >= 1:
                    total += 1
                if grid[i][j] == 2:
                    rotten += 1
                    queue.append((i, j))
        mins = 0
        while queue:
            q_len = len(queue)
            for _ in range(q_len):
                i, j = queue.pop(0)
                for r, c in [(i - 1, j), (i, j - 1), (i, j + 1), (i + 1, j)]:
                    if 0 <= r < m and 0 <= c < n and grid[r][c] == 1:
                        grid[r][c] = 2
                        queue.append((r, c))
                        rotten += 1
            if queue:
                mins += 1
        return mins if total == rotten else -1
```

## Complexities
- Time: `O(m * n)` -- m: grid rows, n: grid columns
- Space: `O(m * n)`
