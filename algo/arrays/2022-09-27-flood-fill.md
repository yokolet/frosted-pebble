---
layout: algo_page
group: Arrays
title: Flood Fill
algo_menubar: algo_menu
tags:
- Easy
- Breadth-First Search
- Depth-First Search
- Matrix
date: 2022-09-27 15:50 +0900
---
## Introduction
This is a simple matrix search problem. Either of breadth-first or depth-first search works.
Since the cell color is changed when visited, it doesn't need to maintain visited cells.
Just visit and change color, then we will get the answer.

## Problem Description
> An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.
> You are also given three integers `sr`, `sc`, and `color`.
> You should perform a flood fill on the image starting from the pixel `image[sr][sc]`.
>
> To perform a flood fill, consider the starting pixel, plus any pixels connected
> 4-directionally to the starting pixel of the same color as the starting pixel,
> plus any pixels connected 4-directionally to those pixels (also with the same color), and so on.
> Replace the color of all of the aforementioned pixels with color.
>
> Return the modified image after performing the flood fill.
>
> Constraints:
> - `m == image.length`
> - `n == image[i].length`
> - `1 <= m, n <= 50`
> - `0 <= image[i][j], color < 2**16`
> - `0 <= sr < m`
> - `0 <= sc < n`
>
> [https://leetcode.com/problems/flood-fill/](https://leetcode.com/problems/flood-fill/)

## Examples
```
Example 1
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

```
Example 2
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
```

## Analysis
The solution here uses the breadth-first search (BFS).
BFS might run slow, but can avoid a stack level too deep error.
Before starting BFS, it check the color at the starting cell.
If the starting cell has the same color as the new color, there's nothing to do.
The BFS is nothing special.
It checks 4 neighbors, updates color and append the cell to the BFS queue.

## Solution
```python
class FloodFill:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        m, n = len(image), len(image[0])
        queue, prev = [(sr, sc)], image[sr][sc]
        if color == prev:
            return image
        while queue:
            row, col = queue.pop(0)
            image[row][col] = color
            for r, c in [(row - 1, col), (row, col - 1), (row, col + 1), (row + 1, col)]:
                if 0 <= r < m and 0 <= c < n and image[r][c] == prev:
                    queue.append((r, c))
        return image
```

## Complexities
- Time: `O(m * n)`
- Space: `O(1)`
