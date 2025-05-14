---
layout: algo_page
group: Graphs
title: Network Delay Time
algo_menubar: algo_menu
tags:
- Medium
- Heap (Priority Queue)
- Breadth-First Search
- Shortest Path
- Graph
date: 2022-10-21 20:59 +0900
---

## Problem Description
> You are given a network of `n` nodes, labeled from `1 to n`. You are also given `times`, a list of travel times as
> directed edges `times[i] = (u[i], v[i], w[i])`, where `u[i]` is the source node, `v[i]` is the target node, and
> `w[i]` is the time it takes for a signal to travel from source to target.
>
> We will send a signal from a given node `k`. Return the minimum time it takes for all the `n` nodes to receive the
> signal. If it is impossible for all the `n` nodes to receive the signal, return -1.
>
> Constraints:
> - `1 <= k <= n <= 100`
> - `1 <= times.length <= 6000`
> - `times[i].length == 3`
> - `1 <= u[i], v[i] <= n`
> - `u[i] != v[i]`
> - `0 <= w[i] <= 100`
> - All the pairs `(u[i], v[i])` are unique. (i.e., no multiple edges.)


## Examples
```
Exmaple 1
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

```
Example 2
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

```
Example 3
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

## How to Solve

Typically, this kind of problem is solved by Dijkstra since it asks the shortest path with positive weights.
Additionally, the problem needs a data structure to save a sum of weight (delay time) to each node.

The first step is to create a graph with edge weights.
The second step is to traverse a graph using Dijkstra algorithm for Python.
The edge weight sum is a sorting key. The queue (heap) has tuples of weight sum and node.
While traversing, it saves the shortest path's sum of weights to each node.
In the end, the maximum of weights is the minimum time delay.

Ruby solution takes a Bellman-Ford approach since Ruby doesn't have heap (or priority queue) in the standard library.


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
class NetworkDelayTime:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = collections.defaultdict(list)
        def buildGraph():
            for s, d, w in times:
                graph[s].append((d, w))

        path = {}
        def traverse():
            queue = [(0, k)]
            while queue:
                cur_w, cur_n = heapq.heappop(queue)
                if cur_n in path:
                    continue
                path[cur_n] = cur_w
                for next_n, next_w in graph[cur_n]:
                    if next_n not in path:
                        heapq.heappush(queue, (cur_w + next_w, next_n))

        buildGraph()
        traverse()
        return max(path.values()) if len(path) == n else -1
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} times
# @param {Integer} n
# @param {Integer} k
# @return {Integer}
def network_delay_time(times, n, k)
  graph = build_graph(times, n)
  traverse(graph, n, k)
end

def build_graph(times, n)
  graph = {}
  (1..n).each do |i|
    graph[i] = []
  end
  times.each do |(s, d, w)|
    graph[s] << [d, w]
  end
  graph
end

def traverse(graph, n, k)
  infinity = (1 << 64) - 1
  distance = Array.new(n + 1, infinity)
  distance[k] = 0
  distance[0] = 0
  queue = [[k, 0]]
  while queue.any?
    cur_n, cur_w = queue.shift
    graph[cur_n].each do |(d, w)|
      if cur_w + w < distance[d]
        distance[d] = cur_w + w
        queue << [d, cur_w + w]
      end
    end
  end
  distance.any?(infinity) ? -1 : distance.max
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n + e * log(n))` -- n: number of vertices, e: number of edges
- Space: `O(n + e)`
