---
layout: algo_page
group: Trees
title: Add One Row to Tree
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- Depth-First Search
- Binary Tree
date: 2022-10-05 14:13 +0900
---

## Problem Description
> Given the `root` of a binary tree and two integers `val` and `depth`, add a row of nodes with value `val` at
> the given depth `depth`. Note that the root node is at depth 1.
>
> The adding rule is:
> - Given the integer `depth`, for each not null tree node `cur` at the depth `depth - 1`, create two tree nodes
>   with value `val` as cur's left subtree root and right subtree root.
> - `cur`'s original left subtree should be the left subtree of the new left subtree root.
> - `cur`'s original right subtree should be the right subtree of the new right subtree root.
> - If `depth == 1` that means there is no depth `depth - 1` at all, then create a tree node with value `val`
>   as the new root of the whole original tree, and the original tree is the new root's left subtree.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 10**4]`.
> - The depth of the tree is in the range `[1, 10**4]`.
> - `-100 <= Node.val <= 100`
> - `-10**5 <= val <= 10**5`
> - `1 <= depth <= the depth of tree + 1`
>
> [https://leetcode.com/problems/add-one-row-to-tree/](https://leetcode.com/problems/add-one-row-to-tree/)

## Examples
```
Example 1
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
Explanation:
Input:
      4
    /   \
  2      6
 / \    /
3   1   5

Output:
       4
     /   \
    1     1
   /       \
  2        6
 / \      /
3   1    5
```

```
Example 2
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]
Explanation:
Input:
     4
    /
  2
 / \
3   1

Output:
      4
     /
    2
   /  \
  1    1
 /      \
3        1
```

## How to Solve
Both of depth-first search with/without stack and the breadth-first search work.
Once the level to add new nodes is found, just create two new nodes and set those in the tree.

We should be careful when depth is 1. It needs a special treatment.
The solution taken here is the breadth-first search approach.
The node and depth pair is saved in a queue.
When the current depth - 1 is the given depth, create two new nodes and add those to the current parent.
The new nodes' children are current parent's children.

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
class AddOneRowToTree {
public:
    TreeNode* addOneRow(TreeNode* root, int val, int depth) {
        if (depth == 1) {
            return new TreeNode(val, root, nullptr);
        }
        queue<pair<TreeNode*, int>> q;
        q.push({root, 1});
        while (!q.empty()) {
            auto [cur, d] = q.front();
            q.pop();
            if (d == depth - 1) {
                TreeNode* left = cur->left;
                TreeNode* right = cur->right;
                cur->left = new TreeNode(val, left, nullptr);
                cur->right = new TreeNode(val, nullptr, right);
            } else {
                if (cur->left) {
                    q.push({cur->left, d + 1});
                }
                if (cur->right) {
                    q.push({cur->right, d + 1});
                }
            }
        }
        return root;
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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function(root, val, depth) {
  if (depth === 1) {
    return new TreeNode(val, root, null);
  }
  let queue = [[root, 1]];
  let cur = null, left = null, right = null, d = 0;
  while (queue.length > 0) {
    [cur, d] = queue.shift();
    if (d === depth - 1) {
      left = cur.left, right = cur.right;
      cur.left = new TreeNode(val, left, null);
      cur.right = new TreeNode(val, null, right);
    } else {
      if (cur.left) { queue.push([cur.left, d + 1]); }
      if (cur.right) { queue.push([cur.right, d + 1]); }
    }
  }
  return root;
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
class AddOneRowToTree:
    def addOneRow(self, root: Optional[TreeNode], val: int, depth: int) -> Optional[TreeNode]:
        if depth == 1:
            return TreeNode(val=val, left=root)
        q = [(root, 1)]
        while q:
            cur, d = q.pop(0)
            if d == depth - 1:
                left, right = cur.left, cur.right
                cur.left = TreeNode(val, left, None)
                cur.right = TreeNode(val, None, right)
            else:
                if cur.left:
                    q.append((cur.left, d + 1))
                if cur.right:
                    q.append((cur.right, d + 1))
        return root
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(k)`  -- k: number of the nodes in the same level
