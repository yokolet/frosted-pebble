---
layout: algo_page
group: Arrays
title: Number of Islands
algo_menubar: algo_menu
tags:
- Medium
- Depth-First Search
- Union-Find
- Matrix
date: 2022-09-10 14:57 +0900
---

## Problem Description
> Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water),
> return the number of islands.

> An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
> You may assume all four edges of the grid are all surrounded by water.
>
> Constraints:
> - `m == grid.length`
> - `n == grid[i].length`
> - `1 <= m, n <= 300`
> - `grid[i][j]` is '0' or '1'.
>
> [https://leetcode.com/problems/number-of-islands/](https://leetcode.com/problems/number-of-islands/)

## Examples
```
Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

```
Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

## How to Solve
This is a matrix search problem. Possible movements are four: up, right, down, and left.
To get the answer, we should look at an area of `1`s.
Given that, Depth-First or Breadth-First searches are the typical algorithm to solve the problem.
This type of problem can have one more way: union-find.
The Python solution here has DFS and union-find.

The solution by DFS is a common DFS search.
Starting from all positions of `1`, check up, right, down, left if those are '1' and not yet visited.
The DFS loop starts at every cell where the value is `1`.
When each loop completes, the counter is incremented.
In the end, we can get the answer.

On the other hand, the solution by union-find saves the group number in an auxiliary array.
It checks group id of up and left cells and updates current cell's group id.
In the end, the number of groups is calculated going over the group id array.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class NumberOfIslandsDFS {
public:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r - 1, c);
        dfs(grid, r, c - 1);
        dfs(grid, r, c + 1);
        dfs(grid, r + 1, c);
    }

    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty() || grid[0].empty()) return 0;
        int count = 0;
        for (int r = 0; r < grid.size(); ++r) {
            for (int c = 0; c < grid[0].size(); ++c) {
                if (grid[r][c] == '1') {
                    dfs(grid, r, c);
                    count++;
                }
            }
        }
        return count;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java

```
{% endtab %}

{% tab solution JavaScript %}
```js

```
{% endtab %}

{% tab solution Python %}
```python
class NumberOfIslandsDFS:
    def numIslands(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        visited = set()
        def dfs(r, c):
            visited.add((r, c))
            for next_r, next_c in [(r - 1, c), (r, c - 1), (r, c + 1), (r + 1, c)]:
                if 0 <= next_r < m and 0 <= next_c < n and\
                    grid[next_r][next_c] == '1' and\
                    (next_r, next_c) not in visited:
                    dfs(next_r, next_c)
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1' and (i, j) not in visited:
                    count += 1
                    dfs(i, j)
        return count


class NumberOfIslandsUF:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]: return 0

        cols = len(grid[0])
        memo = [0 for _ in range(cols)]
        groups = [0]
        gno = 1
        for row in grid:
            for i in range(cols):
                if row[i] == '0':
                    memo[i] = 0
                    continue
                up = groups[memo[i]]
                tmp = 0 if i == 0 else memo[i - 1]
                left = groups[tmp]
                if up == 0 and left == 0:
                    memo[i] = gno
                    groups.append(gno)
                    gno += 1
                elif up == 0:
                    memo[i] = left
                elif left == 0:
                    memo[i] = up
                elif up > left:
                    groups[up] = left
                    memo[i] = left
                else:
                    # up < left
                    groups[left] = up
                    memo[i] = up
        count = 0
        for i in range(1, len(groups)):
            if i == groups[i]:
                count += 1
        return count
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m * n)` -- m: rows, n: columns
- Space: `O(m * n)` -- Python DFS, `O(m)` -- Python UF, `O(1)` -- C++
