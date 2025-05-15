---
layout: algo_page
group: Graphs
title: Find All Possible Recipes from Given Supplies
algo_menubar: algo_menu
tags:
- Medium
- Topological Sort
- Hash Table
- Graph
date: 2023-01-20 11:48 +0900
---

## Problem Description
> You have information about `n` different recipes. You are given a string array `recipes` and a 2D string array
> `ingredients`. The i-th recipe has the name `recipes[i]`, and you can create it if you have all the needed
> ingredients from `ingredients[i]`. Ingredients to a recipe may need to be created from other recipes, i.e.,
> `ingredients[i]` may contain a string that is in `recipes`.
>
> You are also given a string array `supplies` containing all the ingredients that you initially have, and you have an
> infinite supply of all of them.
>
> Return a list of all the recipes that you can create. You may return the answer in any order.
>
> Note that two recipes may contain each other in their ingredients.
>
> Constraints:
> - `n == recipes.length == ingredients.length`
> - `1 <= n <= 100`
> - `1 <= ingredients[i].length, supplies.length <= 100`
> - `1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10`
> - `recipes[i], ingredients[i][j], and supplies[k]` consist only of lowercase English letters.
> - All the values of `recipes` and `supplies` combined are unique.
> - Each `ingredients[i]` does not contain any duplicate values.


## Examples
```
Example 1
Input: recipes = ["bread"],
       ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
Output: ["bread"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
```

```
Exmaple 2
Input: recipes = ["bread","sandwich"],
       ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
```

```
Example 3
Input: recipes = ["bread","sandwich","burger"],
       ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich","burger"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".
```

## How to Solve
The topological sort is a good approach for this problem.
A graph is created by mapping ingredients to recipes.
While creating a graph, count indegrees of each recipes.
Start graph traversal from the indegree 0 nodes.
To check visited nodes, decrement an indegree count.
When the indegree count becomes 0, the node should be added to the queue.
In the end, find the node whose indegree is 0 and the name is one of recipes.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class FindAllPossibleRecipesFromGivenSupplies {
public:
    vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {
        unordered_map<string, set<string>> graph;
        unordered_map<string, int> indegree;
        for (size_t i = 0; i < recipes.size(); ++i) {
            for (string &parent : ingredients[i]) {
                graph[parent].insert(recipes[i]);
                indegree[recipes[i]]++;
            }
        }
        queue<string> q;
        for (auto &sup : supplies) {
            if (indegree[sup] == 0) {
                q.push(sup);
            }
        }
        while (!q.empty()) {
            string cur = q.front();
            q.pop();
            for (auto &neigh : graph[cur]) {
                indegree[neigh]--;
                if (indegree[neigh] == 0) { q.push(neigh); }
            }
        }
        vector<string> result;
        for (auto &[key, value] : indegree) {
            if (value == 0 && find(recipes.begin(), recipes.end(), key) != recipes.end()) {
                result.push_back(key);
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
class FindAllPossibleRecipesFromGivenSupplies:
    def findAllRecipes(self, recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:
        graph = defaultdict(set)
        indegree = defaultdict(int)
        for child, parents in zip(recipes, ingredients):
            for p in parents:
                graph[p].add(child)
                indegree[child] += 1
        queue = []
        for sup in supplies:
            if indegree[sup] == 0:
                queue.append(sup)
        while queue:
            cur = queue.pop(0)
            for neigh in graph[cur]:
                indegree[neigh] -= 1
                if indegree[neigh] == 0:
                    queue.append(neigh)
        return [k for k, v in indegree.items() if v == 0 and k in recipes]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} recipes
# @param {String[][]} ingredients
# @param {String[]} supplies
# @return {String[]}
def find_all_recipes(recipes, ingredients, supplies)
  graph, indegrees = build_graph(recipes, ingredients)
  indegrees = search(graph, indegrees, supplies)
  indegrees.filter {|child, v| recipes.include?(child) && v == 0}.keys
end

def build_graph(recipes, ingredients)
  graph, indegrees = {}, {}
  recipes.zip(ingredients).each do |child, parents|
    indegrees[child] ||= 0
    parents.each do |parent|
      graph[parent] ||= Set.new
      graph[parent] << child
      indegrees[child] += 1
    end
  end
  [graph, indegrees]
end

def search(graph, indegrees, supplies)
  queue = []
  supplies.each do |supply|
    if indegrees[supply] == nil
      queue << supply
      indegrees[supply] ||= 0
      graph[supply] ||= Set.new
    end
  end
  while queue.any?
    cur = queue.shift
    next if !graph.has_key?(cur)
    graph[cur].each do |child|
      indegrees[child] -= 1
      queue << child if indegrees[child] == 0
    end
  end
  indegrees
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(m * n)`
- Space: `O(n)`
