---
layout: algo_page
group: Dynamic Programming
title: Longest Increasing Path in a Matrix
algo_menubar: algo_menu
tags:
- Hard
- Dynamic Programming
- Depth-First Search
- Memoization
- Matrix
date: 2022-10-20 15:39 +0900
---
## Introduction
This is a 2D version of longest increasing subarray problem.
To solve this problem, dynamic programming (memoization) approach works along with the DFS.
It's also important to avoid repeatedly visit the same cell.
The solution here has a little tweak for that.

## Problem Description
> Given an `m x n` integers `matrix`, return the length of the longest increasing path in `matrix`.
>
> From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or
> move outside the boundary (i.e., wrap-around is not allowed).
>
> Constraints:
> - `m == matrix.length`
> - `n == matrix[i].length`
> - `1 <= m, n <= 200`
> - `0 <= matrix[i][j] <= 2**31 - 1`
>
> [https://leetcode.com/problems/longest-increasing-path-in-a-matrix/](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)

## Examples
```
Example 1
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
```

```
Example 2
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
```

```
Example 3
Input: matrix = [[1]]
Output: 1
```

## Analysis
For memoization, the solution here starts from creating 2D array to save path lengths.
At first, the 2D array is initialized by -1.
While visiting 4 neighbors, if the value is not -1, dfs skips the cell.
This way, the solution here avoids the repetition.
The dsf is nothing special. It visits 4 neighbors if it makes the path longer.
When the process comes back from deeper level, it saves the path to the 2D matrix.
The max length of all path lengths starting from each cell is the answer.

## Solution
```python
class LongestIncreasingPathInAMatrix:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        m, n = len(matrix), len(matrix[0])
        memo = [[-1 for _ in range(n)] for _ in range(m)]

        def dfs(r, c):
            if memo[r][c] != -1:
                return memo[r][c]
            max_v = 0
            for i, j in [(r - 1, c), (r, c - 1), (r, c + 1), (r + 1, c)]:
                if 0 <= i < m and 0 <= j < n and matrix[r][c] > matrix[i][j]:
                    max_v = max(max_v, dfs(i, j))
            memo[r][c] = max_v + 1
            return memo[r][c]

        max_path = 0
        for r in range(m):
            for c in range(n):
                max_path = max(max_path, dfs(r, c))
        return max_path
```

## Complexities
- Time: `O(mn)`
- Space: `O(mn)`
