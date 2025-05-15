---
layout: algo_page
group: Graphs
title: Number of Provinces
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Depth-First Search
- Graph
- Union Find
date: 2022-09-17 12:16 +0900
---
## Introduction
This is a typical graph traversal problem. Either of depth-first search or breadth-first search works.

## Problem Description
> There are `n` cities. Some of them are connected, while some are not.
> If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`,
> then city `a` is connected indirectly with city `c`.
> A province is a group of directly or indirectly connected cities and
> no other cities outside of the group.
>
> You are given an `n x n` matrix isConnected where `isConnected[i][j] = 1` if the ith city and
> the j-th city are directly connected, and `isConnected[i][j] = 0` otherwise.
>
> Return the total number of provinces.
>
> Constraints:
> - `1 <= n <= 200`
> - `n == isConnected.length`
> - `n == isConnected[i].length`
> - `isConnected[i][j]` is 1 or 0.
> - `isConnected[i][i] == 1`
> - `isConnected[i][j] == isConnected[j][i]`
>
> [https://leetcode.com/problems/number-of-provinces/](https://leetcode.com/problems/number-of-provinces/)

## Examples
```
Example 1
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

```
Example 2
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

## Analysis
In this problem, the adjacency matrix is already given.
We don't need to construct it.
Staring from 0, which means row 0, going over all nodes one by one while keeping a visited set.
When the current row's column value is 1, two nodes are connected.
If it is not yet visited, add the node to queue for further connectivity check.
When one round of BFS ends, a province is found, so count up.

## Solution
```python
class NumberOfProvinces:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        count, visited = 0, set()
        for i in range(n):
            if i in visited:
                continue
            queue = [i]
            count += 1
            while queue:
                cur = queue.pop(0)
                visited.add(cur)
                for j in range(n):
                    if isConnected[cur][j] == 1 and j not in visited:
                        queue.append(j)
        return count
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
 
