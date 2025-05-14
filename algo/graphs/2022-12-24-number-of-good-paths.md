---
layout: algo_page
group: Graphs
title: Number of Good Paths
algo_menubar: algo_menu
tags:
- Hard
- Union Find
- Graph
date: 2022-12-24 22:42 +0900
---

## Problem Description
> There is a tree (i.e. a connected, undirected graph with no cycles) consisting of `n` nodes numbered
> from `0` to `n - 1` and exactly `n - 1` edges.
>
> You are given a 0-indexed integer array `vals` of length `n` where `vals[i]` denotes the value of the i-th node.
> You are also given a 2D integer array `edges` where `edges[i] = [a[i], b[i]]` denotes that there exists
> an undirected edge connecting nodes `a[i]` and `b[i]`.
>
> A good path is a simple path that satisfies the following conditions:
> - The starting node and the ending node have the same value.
> - All nodes between the starting node and the ending node have values less than or equal to the starting node
>    (i.e. the starting node's value should be the maximum value along the path).
>
> Return the number of distinct good paths.
>
> Note that a path and its reverse are counted as the same path. For example, 0 -> 1 is considered to be the same as
> 1 -> 0. A single node is also considered as a valid path.
>
> Constraints:
> - `n == vals.length`
> - `1 <= n <= 3 * 10**4`
> - `0 <= vals[i] <= 10**5`
> - `edges.length == n - 1`
> - `edges[i].length == 2`
> - `0 <= a[i], b[i] < n`
> - `a[i] != b[i]`
> - edges represents a valid tree.
>
> [https://leetcode.com/problems/number-of-good-paths/](https://leetcode.com/problems/number-of-good-paths/)

## Examples
```
Example 1
Input: vals = [1,3,2,1,3], edges = [[0,1],[0,2],[2,3],[2,4]]
Output: 6
Explanation: There are 5 good paths consisting of a single node.
There is 1 additional good path: 1 -> 0 -> 2 -> 4.
(The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].
```

```
Example 2
Input: vals = [1,1,2,2,3], edges = [[0,1],[1,2],[2,3],[2,4]]
Output: 7
Explanation: There are 5 good paths consisting of a single node.
There are 2 additional good paths: 0 -> 1 and 2 -> 3.
```

```
Example 3
Input: vals = [1], edges = []
Output: 1
Explanation: The tree consists of only one node, so there is one good path.
```

## How to Solve
This is another very hard problem.
At a glance, it looks a simple graph traversal: starting from all nodes to the same node values as a destination.
However, the problem requires very fast algorithm.
The effective solution is the union find with some optimizations.
The union find should do path compression by ranks unless it is not fast enough.
When creating a graph, it should look up node values to add effective nodes only.
The graph traversal starts from the smallest value to largest value in the given vals.
While traversing, the union find will be performed.
When the graph traversal for a single value in vals finishes, count the number of paths.
The path count is done based on the union find result.
If the path count is sz, the total paths are sz * (sz - 1) / 2 since it chooses 2 from sz without the order.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class NumberOfGoodPaths {
private:
    vector<int> parent, rank;
    int _find(int a) {
        while (a != parent[a]) {
            a = parent[a];
        }
        return a;
    }
    void _union(int a, int b) {
        int pa = _find(a), pb = _find(b);
        if (pa != pb) {
            if (rank[pa] == rank[pb]) { rank[pa]++; }
            else if (rank[pa] < rank[pb]) { swap(pa, pb); }
            parent[pb] = pa;
        }
    }
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        int result = n;
        parent.resize(n);
        rank.resize(n);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
            rank[i] = 1;
        }
        vector<vector<int>> graph(n);
        for (auto edge: edges) {
            int u = edge[0], v = edge[1];
            if (vals[u] >= vals[v]) { graph[u].push_back(v); }
            if (vals[u] <= vals[v]) { graph[v].push_back(u); }
        }
        map<int, vector<int>> val2nodes;
        for (int i = 0; i < n; ++i) { val2nodes[vals[i]].push_back(i); }
        for (auto it : val2nodes) {
            for (int node : it.second) {
                for (int neigh : graph[node]) {
                    _union(neigh, node);
                }
            }
            map<int, int> path;
            for (auto node : it.second) { path[_find(node)]++; }
            for (auto &[group, sz] : path) {
                if (sz > 1) { result += (sz * (sz - 1)) / 2; }
            }
        }
        return result;
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
class NumberOfGoodPaths:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        result = n = len(vals)
        parent, rank = [i for i in range(n)], [1 for _ in range(n)]

        def _find(a):
            while a != parent[a]:
                a = parent[a]
            return a

        def _union(a, b):
            pa, pb = _find(a), _find(b)
            if pa != pb:
                if rank[pa] == rank[pb]:
                    rank[pa] += 1
                elif rank[pa] < rank[pb]:
                    pa, pb = pb, pa
                parent[pb] = pa

        graph = defaultdict(list)
        for u, v in edges:
            if vals[u] >= vals[v]:
                graph[u].append(v)
            if vals[u] <= vals[v]:
                graph[v].append(u)
        val2nodes = defaultdict(list)
        for i in range(n):
            val2nodes[vals[i]].append(i)
        for k in sorted(val2nodes):
            for node in val2nodes[k]:
                for neigh in graph[node]:
                    _union(neigh, node)
            path = defaultdict(int)
            for node in val2nodes[k]:
                path[_find(node)] += 1
            for group, sz in path.items():
                if sz > 1:
                    result += (sz * (sz - 1) // 2)
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))` -- n: number of nodes
- Space: `O(n)`
