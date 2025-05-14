---
layout: algo_page
group: Trees
title: Lowest Common Ancestor of a Binary Tree
algo_menubar: algo_menu
tags:
- Medium
- Binary Tree
- Depth-First Search
date: 2022-09-26 17:37 +0900
---

## Problem Description
> Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
>
> According to the definition of LCA on Wikipedia: “The lowest common ancestor is
> defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q`
> as descendants (where we allow a node to be a descendant of itself).”
>
> Constraints:
> - The number of nodes in the tree is in the range `[2, 10**5]`.
> - `-10**9 <= Node.val <= 10**9`
> - All Node.val are unique.
> - `p != q`
> - `p` and `q` will exist in the tree.
>
> [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

## Examples
```
Example 1
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
        3
     /     \
   5        1
 /   \     /  \
6     2   0    8
     /  \
    7    4
```

```
Example 2
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself
according to the LCA definition.
        3
     /     \
   5        1
 /   \     /  \
6     2   0    8
     /  \
    7    4
```

```
Example 3
Input: root = [1,2], p = 1, q = 2
Output: 1
```

## How to Solve
This is a popular LCA problem.
The depth-first search by recursion is a common solution.
The recursion's base case is, whether root is None, p or q.
If both left and right subtree return nodes, the current root is the LCA.
If one of left or right subtree returns the node, the current root is on the path to LCA.
In such a case, return the node comes from the subtree.

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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class LCA {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q)
            return root;
        TreeNode *left = lowestCommonAncestor(root->left, p, q);
        TreeNode *right = lowestCommonAncestor(root->right, p, q);
        if (left && right)
            return root;
        else if (left)
            return left;
        else
            return right;
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
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class LCA:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left or right
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
