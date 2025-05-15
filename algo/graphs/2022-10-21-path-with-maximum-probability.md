---
layout: algo_page
group: Graphs
title: Path with Maximum Probability
algo_menubar: algo_menu
tags:
- Medium
- Heap (Priority Queue)
- Shortest Path
- Graph
date: 2022-10-21 17:27 +0900
---
## Introduction
It's apparent, Dijkstra algorithm works to find the answer.
After creating a graph with edge weight, traverse the graph using heap.
When the node is the end node, the result is there.

## Problem Description
> You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where
> `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of
> traversing that edge `succProb[i]`.
>
> Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end`
> and return its success probability.
>
> If there is no path from `start` to `end`, return 0. Your answer will be accepted if it differs from the correct
> answer by at most 1e-5.
>
> Constraints:
> - `2 <= n <= 10^4`
> - `0 <= start, end < n`
> - `start != end`
> - `0 <= a, b < n`
> - `a != b`
> - `0 <= succProb.length == edges.length <= 2*10^4`
> - `0 <= succProb[i] <= 1`
> - There is at most one edge between every two nodes.
>
> [https://leetcode.com/problems/path-with-maximum-probability/](https://leetcode.com/problems/path-with-maximum-probability/)

## Examples
```
Example 1
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has
0.5 * 0.5 = 0.25.
```

```
Example 2
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000
```

```
Example 3
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.
```

## Analysis
The solution here uses Python's collections.defaultdict for isolated node (no edges) to return empty array.
The adjacency list has the neighbor node with edge weight.
Once the graph is created, the next step is to traverse the graph.
To make it max heap, the probability is a negative value.
Except probability calculation, traversal is nothing special.
When popped out node is the end node, return the probability making it positive.

## Solution
```python
class PathWithMaximumProbability:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start: int, end: int) -> float:
        graph = collections.defaultdict(list)
        def buildGraph():
            for i in range(len(edges)):
                s, d, v = edges[i][0], edges[i][1], succProb[i]
                graph[s].append((d, v))
                graph[d].append((s, v))

        def search():
            visited = set()
            queue = [(-1, start)]
            while queue:
                cur_prob, cur_n = heapq.heappop(queue)
                if cur_n == end:
                    return (-1) * cur_prob
                visited.add(cur_n)
                for next_n, next_prob in graph[cur_n]:
                    if next_n not in visited:
                        heapq.heappush(queue, (next_prob * cur_prob, next_n))
            return 0
        
        buildGraph()
        return search() 
```

## Complexities
- Time: `O(e * log(v))` -- v: number of vertices, n: number of edges on each vertex
- Space: `O(e + v)`
