---
layout: algo_page
group: Graphs
title: Evaluate Division
algo_menubar: algo_menu
tags:
- Medium
- Graph
- Breadth-First Search
date: 2022-10-20 20:19 +0900
---

## Problem Description
> You are given an array of variable pairs `equations` and an array of real numbers `values`, where
> `equations[i] = [A[i], B[i]]` and `values[i]` represent the equation `A[i] / B[i] = values[i]`. Each `A[i]`
> or `B[i]` is a string that represents a single variable.
>
> You are also given some `queries`, where `queries[j] = [C[j], D[j]]` represents the j-th query where you must
> find the answer for C[j] / D[j] = ?.
>
> Return the answers to all `queries`. If a single answer cannot be determined, return -1.0.
>
> Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and
> that there is no contradiction.
>
> Constraints:
> - `1 <= equations.length <= 20`
> - `equations[i].length == 2`
> - `1 <= A[i].length, Bi.length <= 5`
> - `values.length == equations.length`
> - `0.0 < values[i] <= 20.0`
> - `1 <= queries.length <= 20`
> - `queries[i].length == 2`
> - `1 <= C[j].length, D[j].length <= 5`
> - `A[i], B[i], C[j], D[j]` consist of lower case English letters and digits.


## Examples
```
Example 1
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
```

```
Example 2
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
```

```
Example 3
Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
```

## How to Solve
This problem might look like a simple math, and a greedy approach problem.
However, creating a graph works better.
The path, a to b's edge has a weight v, while b to a's edge has a weight 1 / v.
While visiting edges, it's weight will be multiplied.
The graph traversal can do by either of BFS or DFS.

The solution here starts from building a graph.
The adjacency list has a neighbor of itself to handle the ["a", "a"] query.
The neighbor list is a tuple of node and edge value.

The second step is a search.
Except the edge value calculation, it is nothing special.
When a popped out node is the destination, the path is found along with the edge value.
If not, add the neighbor node with updated edge value.
If queue becomes empty without finding the destination, the path doesn't exist.

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
class EvaluateDivision:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        graph = {}
        
        def buildGraph():
            for i in range(len(equations)):
                s, d, v = equations[i][0], equations[i][1], values[i]
                if s not in graph:
                    graph[s] = [(s, 1)]
                if d not in graph:
                    graph[d] = [(d, 1)]
                graph[s].append((d, v))
                graph[d].append((s, 1 / v))

        def search(src, dst):
            if src not in graph or dst not in graph:
                return -1
            queue = [(src, 1)]
            seen = {src}
            while queue:
                cur_n, cur_v = queue.pop(0)
                for next_n, next_v in graph[cur_n]:
                    if next_n == dst:
                        return cur_v * next_v
                    elif next_n not in seen:
                        seen.add(next_n)
                        queue.append((next_n, cur_v * next_v))
            return -1
        
        buildGraph()
        return [search(s, d) for s, d in queries]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
require 'set'

# @param {String[][]} equations
# @param {Float[]} values
# @param {String[][]} queries
# @return {Float[]}
def build_graph(equations, values)
  graph = {}
  # build graph
  equations.zip(values).each do |(s, d), value|
    graph[s] = [[s, 1]] if !graph.has_key?(s)
    graph[d] = [[d, 1]] if !graph.has_key?(d)
    graph[s] << [d, value.to_f]
    graph[d] << [s, 1 / value.to_f]
  end
  graph
end

def search(graph, src, dest)
  queue = [[src, 1]]
  seen = Set.new([src])
  while !queue.empty?
    cur_n, cur_v = queue.shift
    graph[cur_n].each do |(next_n, next_v)|
      if next_n == dest
        return cur_v * next_v
      elsif !seen.include?(next_n)
        seen << next_n
        queue << [next_n, cur_v * next_v]
      end
    end
  end
  -1
end

def make_queries(graph, queries)
  queries.map do |s, d|
    if !graph.has_key?(s) || !graph.has_key?(d)
      -1.0
    else
      search(graph, s, d)
    end
  end
end

def calc_equation(equations, values, queries)
  graph = build_graph(equations, values)
  make_queries(graph, queries)
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(mn)` -- m: number of queries, n: number of equations
- Space: `O(n)`
