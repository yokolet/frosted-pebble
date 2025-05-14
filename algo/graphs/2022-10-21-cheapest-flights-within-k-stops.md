---
layout: algo_page
group: Graphs
title: Cheapest Flights Within K Stops
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Graph
date: 2022-10-21 23:08 +0900
---

## Problem Description
> There are `n` cities connected by some number of flights. You are given an array `flights` where
> `flights[i] = [from[i], to[i], price[i]]` indicates that there is a flight from city `from[i]` to city toi with cost
> `price[i]`.
>
> You are also given three integers `src`, `dst`, and `k`, return the cheapest price from `src` to `dst` with
> at most `k` stops. If there is no such route, return -1.
>
> Constraints:
> - 1 <= n <= 100`
> - `0 <= flights.length <= (n * (n - 1) / 2)`
> - `flights[i].length == 3`
> - `0 <= from[i], to[i] < n`
> - `from[i] != to[i]`
> - `1 <= price[i] <= 10**4`
> - There will not be any multiple flights between two cities.
> - `0 <= src, dst, k < n`
> - `src != dst`
>
> [https://leetcode.com/problems/cheapest-flights-within-k-stops/](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

## Examples
```
Example 1

Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
```

```
Exampoe 2

Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
```

```
Example 3

Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation:
The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.
```

## How to Solve
The problem asks the shortest path based on an edge weight.
Given that, Dijkstra or Bellman Ford might come up as a solution.
However, simple breadth first search (BFS) also works.
The solution here uses an array to save a total weights of the visited node.

The first step is to create a directed graph with edge weights.
The solution here uses a tuple or array of (node, weight).
Once the graph is created, do the graph traversal by BFS.
The visited state is saved in a queue instead of typical set data structure.
This is to handle at most k stops condition.
While traversing, if the visited count exceeds the currently visiting node, skip the further process.
When the popped out node is the destination, return the weight.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <queue>
#include <vector>

using namespace std;

class CheapestFlightsWithinKStops {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<vector<pair<int, int>>> graph(n);
        for (auto flight: flights) {
            int s = flight[0], d = flight[1], w = flight[2];
            graph[s].push_back({d, w});
        }
        vector<int> weights(n, INT_MAX);
        weights[src] = 0;
        queue<vector<int>> q;
        q.push({0, 0, src});  // weight, stops, node
        while (!q.empty()) {
            vector<int> cur = q.front();
            q.pop();
            int cur_w = cur[0], cur_s = cur[1], cur_n = cur[2];
            if (cur_s > k) { continue; }
            for (auto &[next_n, next_w] : graph[cur_n]) {
                if (cur_w + next_w < weights[next_n] && cur_s <= k) {
                    weights[next_n] = cur_w + next_w;
                    q.push({weights[next_n], cur_s + 1, next_n});
                }
            }
        }
        return weights[dst] == INT_MAX ? -1 : weights[dst];
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

class CheapestFlightsWithinKStops {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<List<Integer>>> graph = new ArrayList<>();
        for (int i = 0; i < n; ++i) { graph.add(new ArrayList<>()); }
        for (int i = 0; i < flights.length; ++i) {
            int s = flights[i][0], d = flights[i][1], w = flights[i][2];
            graph.get(s).add(new ArrayList<>(){ {
                add(d);
                add(w);
            } });
        }
        int[] weights = new int[n];
        Arrays.fill(weights, Integer.MAX_VALUE);
        weights[src] = 0;
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{0, 0, src});
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int cur_w = cur[0], cur_s = cur[1], cur_n = cur[2];
            if (cur_s > k) { continue; }
            List<List<Integer>> adjs = graph.get(cur_n);
            for (int i = 0; i < adjs.size(); ++i) {
                int next_n = adjs.get(i).get(0), next_w = adjs.get(i).get(1);
                if (cur_w + next_w < weights[next_n] && cur_s <= k) {
                    weights[next_n] = cur_w + next_w;
                    queue.add(new int[]{weights[next_n], cur_s + 1, next_n});
                }
            }
        }
        return weights[dst] == Integer.MAX_VALUE ? -1 : weights[dst];
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
  const graph = [...Array(n)].map(_ => []);
  for (const [s, d, w] of flights) {
    graph[s].push([d, w]);
  }
  const weights = Array(n).fill(Infinity);
  weights[src] = 0;
  const queue = [[0, 0, src]];     // weight, stops, node
  while (queue.length > 0) {
    const [cur_w, cur_s, cur_n] = queue.shift();
    if (cur_s > k) { continue; }
    for (const [next_n, next_w] of graph[cur_n]) {
      if ((cur_w + next_w) < weights[next_n] && cur_s <= k) {
        weights[next_n] = cur_w + next_w;
        queue.push([weights[next_n], cur_s + 1, next_n]);
      }
    }
  }
  return weights[dst] === Infinity ? -1 : weights[dst];
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class CheapestFlightsWithinKStops:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        graph = [[] for _ in range(n)]
        for s, d, w in flights:
            graph[s].append([d, w])
        weights = [float('inf') for _ in range(n)];
        weights[src] = 0
        queue = [[0, 0, src]]
        while queue:
            cur_w, cur_s, cur_n = queue.pop(0)
            if cur_s > k:
                continue
            for next_n, next_w in graph[cur_n]:
                if cur_w + next_w < weights[next_n] and cur_s <= k:
                    weights[next_n] = cur_w + next_w
                    queue.append([weights[next_n], cur_s + 1, next_n])
        return -1 if weights[dst] == float('inf') else weights[dst]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer} n
# @param {Integer[][]} flights
# @param {Integer} src
# @param {Integer} dst
# @param {Integer} k
# @return {Integer}
def find_cheapest_price(n, flights, src, dst, k)
  graph = Array.new(n){Array.new}
  flights.each do |s, d, w|
    graph[s] << [d, w]
  end
  weights = Array.new(n, Float::INFINITY)
  weights[src] = 0
  queue = [[0, 0, src]]
  while !queue.empty?
    cur_w, cur_s, cur_n = queue.shift
    if cur_s > k
      next
    end
    graph[cur_n].each do |next_n, next_w|
      if cur_w + next_w < weights[next_n] && cur_s <= k
        weights[next_n] = cur_w + next_w
        queue << [weights[next_n], cur_s + 1, next_n]
      end
    end
  end
  return weights[dst] == Float::INFINITY ? -1 : weights[dst]
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n + e * k)` -- n: number of vertices, e: number of edges, k: given k
- Space: `O(n + e)`
