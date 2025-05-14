---
layout: algo_page
group: Arrays
title: Minimum Knight Moves
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
date: 2022-09-25 23:04 +0900
---
## Introduction
This is a breadth-first search problem.
If it is an easy case, nothing is difficult.
However, once it goes to farther location, computation time goes up significantly.
The key to solve this problem is how to narrow down the search.
The solution takes two approaches:
- make x and y absolute values and limit directions
- use pruning to narrow down the search area

## Problem Description
> In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square `[0, 0]`.
> A knight has 8 possible moves it can make, as illustrated below.
> Each move is two squares in a cardinal direction, then one square in an orthogonal direction.
> 
> Return the minimum number of steps needed to move the knight to the square `[x, y]`.
> It is guaranteed the answer exists.
>
> Constraints:
> - `-300 <= x, y <= 300`
> - `0 <= |x| + |y| <= 300`
>
> [https://leetcode.com/problems/minimum-knight-moves/](https://leetcode.com/problems/minimum-knight-moves/)

## Examples
```
Example 1
Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]
```

```
Example 2
Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]
```

## Analysis
At first, make x and y positive (absolute) values.
In any case, the distance from (0, 0) doesn't change.
The problem says, moves are 8.
However, we don't need to check (x, y) = (-1, -2) and (-2, -1) since those are symmetric.
The approach is typical BSF, however, it does so-called pruning:
`(-1 <= next_x <= x + 2 and -1 <= next_y <= y + 2)`
The pruning significantly reduces the search area and leads to the answer quickly.

## Solution
```python
class MinimumKnightMoves:
    def minKnightMoves(self, x: int, y: int) -> int:
        x, y = abs(x), abs(y)
        dirs = [(1, 2), (2, 1), (2, -1), (1, -2), (-1, 2), (-2, 1)]
        queue = [(0, 0, 0)] # steps, x, y
        visited = set([(0, 0)])
        while queue:
            steps, cur_x, cur_y = queue.pop(0)
            if cur_x == x and cur_y == y:
                return steps
            for dx, dy in dirs:
                next_x, next_y = cur_x + dx, cur_y + dy
                if (next_x, next_y) not in visited and (-1 <= next_x <= x + 2 and -1 <= next_y <= y + 2):
                    visited.add((next_x, next_y))
                    queue.append((steps + 1, next_x, next_y))
        return -1
```

## Complexities
- Time: `O(|x|*|y|)`
- Space: `O(|x|*|y|)`
