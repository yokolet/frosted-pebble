---
layout: algo_page
group: Trees
title: Amount of Time for Binary Tree to Be Infected
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Depth-First Search
- Binary Tree
date: 2022-09-21 15:48 +0900
---

## Problem Description
> You are given the `root` of a binary tree with unique values, and an integer `start`.
> At minute 0, an infection starts from the node with value start.
> Each minute, a node becomes infected if:
> - The node is currently uninfected.
> - The node is adjacent to an infected node.
>
> Return the number of minutes needed for the entire tree to be infected.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 10**5]`.
> - `1 <= Node.val <= 10**5`
> - Each node has a unique value.
> - A node with a value of `start` exists in the tree.
>
> [https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/)

## Examples
```
Example 1
Input: root = [1,5,3,null,4,10,6,9,2], start = 3
Output: 4
Explanation:
      1
    /   \
 5       [3]
  \      / \
   4    10  6
  /  \
 3    2
- Minute 0: Node 3
- Minute 1: Nodes 1, 10 and 6
- Minute 2: Node 5
- Minute 3: Node 4
- Minute 4: Nodes 9 and 2
```

```
Example 2
Input: root = [1], start = 1
Output: 0
```

## How to Solve
Among a couple of possible solutions, the easiest would be to create a graph first.
Once the graph is created, the problem comes down to a simple graph traversal.

The solution here starts from creating a graph by traversing the binary tree.
Since the value is unique, node's value can be used as a node id.
The graph traversal starts from the given start value with time 0.
Do the breadth-first search like a level order traversal.
The internal loop processes nodes of the same distance from the start node.
When the internal loop completes, count up the result.
In the end, we get the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

#include <queue>
#include <unordered_set>
#include <unordered_map>
#include <vector>

using namespace std;

class AmountOfTimeForBinaryTreeToBeInfected {
private:
    unordered_map<int, vector<int>> graph;
    void buildGraph(TreeNode *root) {
        if (!root) { return; }
        if (root->left) {
            graph[root->val].push_back(root->left->val);
            graph[root->left->val].push_back(root->val);
            buildGraph(root->left);
        }
        if (root->right) {
            graph[root->val].push_back(root->right->val);
            graph[root->right->val].push_back(root->val);
            buildGraph(root->right);
        }
    }
public:
    int amountOfTime(TreeNode* root, int start) {
        buildGraph(root);
        int result = -1, cur_n, sz;
        queue<int> q;
        q.push(start);
        set<int> seen;
        seen.insert(start);
        while (!q.empty()) {
            sz = q.size();
            for (int i = 0; i < sz; ++i) {
                cur_n = q.front();
                q.pop();
                for (int next_n : graph[cur_n]) {
                    if (seen.count(next_n) == 0) {
                        seen.insert(next_n);
                        q.push(next_n);
                    }
                }
            }
            result++;
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
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
const graph = new Map();

var buildGraph = function(root) {
  if (!root) { return; }
  let adj_p = graph.has(root.val) ? graph.get(root.val) : new Array();
  if (root.left) {
    let adj_l = graph.has(root.left.val) ? graph.get(root.left.val) : new Array();
    adj_p.push(root.left.val);
    adj_l.push(root.val);
    graph.set(root.left.val, adj_l);
    buildGraph(root.left);
  }
  if (root.right) {
    let adj_r = graph.has(root.right.val) ? graph.get(root.right.val) : new Array();
    adj_p.push(root.right.val);
    adj_r.push(root.val);
    graph.set(root.right.val, adj_r);
    buildGraph(root.right);
  }
  graph.set(root.val, adj_p);
}

var amountOfTime = function(root, start) {
  buildGraph(root);
  let queue = new Array(); queue.push(start);
  let seen = new Set(); seen.add(start);
  let result = -1;
  while (queue.length > 0) {
    let sz = queue.length, cur_n;
    for (let i = 0; i < sz; i++) {
      cur_n = queue.shift();
      for (let next_n of graph.get(cur_n)) {
        if (!seen.has(next_n)) {
          seen.add(next_n);
          queue.push(next_n);
        }
      }
    }
    result++;
  }
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

import collections
from typing import Optional

class AmountOfTimeForBinaryTreeToBeInfected:
    def amountOfTime(self, root: Optional[TreeNode], start: int) -> int:
        graph = collections.defaultdict(list)

        def buildGraph(root):
            if not root:
                return
            if root.left:
                graph[root.val].append(root.left.val)
                graph[root.left.val].append(root.val)
                buildGraph(root.left)
            if root.right:
                graph[root.val].append(root.right.val)
                graph[root.right.val].append(root.val)
                buildGraph(root.right)

        buildGraph(root)
        result = -1
        queue, seen = [start], {start}
        while queue:
            for _ in range(len(queue)):
                cur_n = queue.pop(0)
                for next_n in graph[cur_n]:
                    if next_n not in seen:
                        seen.add(next_n)
                        queue.append(next_n)
            result += 1
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n + h)` -- h: height of the three
 
