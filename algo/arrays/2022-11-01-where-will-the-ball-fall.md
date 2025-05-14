---
layout: algo_page
group: Arrays
title: Where Will the Ball Fall
algo_menubar: algo_menu
tags:
- Medium
- Depth-First Search
- Simulation
- Matrix
date: 2022-11-01 22:03 +0900
---

## Problem Description
> You have a 2-D grid of size `m x n` representing a box, and you have `n` balls. The box is open on the top and
> bottom sides. Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to
> the right or to the left.
> - A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is
>   represented in the grid as 1.
> - A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented
>   in the grid as -1.
>
> We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom.
> A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either
> wall of the box.
>
> Return an array answer of size `n` where `answer[i]` is the column that the ball falls out of at the bottom after
> dropping the ball from the ith column at the top, or -1 if the ball gets stuck in the box.
>
> Constraints:
> - `m == grid.length`
> - `n == grid[i].length`
> - `1 <= m, n <= 100`
> - `grid[i][j]` is 1 or -1.


## Examples
```
Example 1
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
Explanation:
Ball b0 is dropped at column 0 and falls out of the box at column 1.
Ball b1 is dropped at column 1 and will get stuck in the box between column 2 and 3 and row 1.
Ball b2 is dropped at column 2 and will get stuck on the box between column 2 and 3 and row 0.
Ball b3 is dropped at column 3 and will get stuck on the box between column 2 and 3 and row 0.
Ball b4 is dropped at column 4 and will get stuck on the box between column 2 and 3 and row 1.
```

```
Example 2
Input: grid = [[-1]]
Output: [-1]
Explanation: The ball gets stuck against the left wall.
```

```
Example 3
Input: grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
Output: [0,1,2,3,4,-1]
```

## How to Solve

At a glance, this problem looks weird.
However, it is a relatively simple problem solved by the depth-first search.
When two adjacent cells have the same value (same direction of slanted boards), the ball goes through.
Otherwise, the ball gets stuck. Also, if the grid column size is 1, the ball gets stuck.
From row to row, the ball goes left and right by the value of the cell.
When the value is negative, the ball goes to left. If it is positive, the ball goes to right.
When the row comes to the bottom, return the column where the ball is located as a result of DFS.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp

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
class WhereWillTheBallFall:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        m, n = len(grid), len(grid[0])
        if n == 1:
            return [-1]
        result = []
        def dfs(r, c):
            if r == m:
                return c
            nc = c + grid[r][c]
            if nc < 0 or nc > n - 1 or grid[r][c] != grid[r][nc]:
                return -1
            return dfs(r + 1, nc)
        for i in range(n):
            result.append(dfs(0, i))
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} grid
# @return {Integer[]}
def find_ball(grid)
  rows, cols = grid.size, grid[0].size
  return [-1] if cols == 1
  result = []
  cols.times.each do |col|
    result << dfs(grid, rows, cols, 0, col)
  end
  result
end

def dfs(grid, rows, cols, row, col)
  return col if row == rows
  new_col = col + grid[row][col]
  if new_col < 0 || new_col >= cols || grid[row][col] != grid[row][new_col]
    return -1
  end
  return dfs(grid, rows, cols, row + 1, new_col)
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m*n)`
- Space: `O(m)`
