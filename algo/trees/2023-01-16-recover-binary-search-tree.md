---
layout: algo_page
group: Trees
title: Recover Binary Search Tree
algo_menubar: algo_menu
tags:
- Medium
- Depth-First Search
- Binary Search Tree
date: 2023-01-16 16:20 +0900
---

## Problem Description
> You are given the `root` of a binary search tree (BST), where the values of exactly two nodes of the tree were
> swapped by mistake. Recover the tree without changing its structure.
>
> Constraints:
> - The number of nodes in the tree is in the range `[2, 1000]`.
> - `-2**31 <= Node.val <= 2**31 - 1`
>
> [https://leetcode.com/problems/recover-binary-search-tree/](https://leetcode.com/problems/recover-binary-search-tree/)

## Examples
```
Example 1
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
   1
 /
3
 \
   2
```

```
Example 2
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
    3
  /   \
1      4
      /
     2
```

## How to Solve
The problem gives us a binary search tree (BST), which means the in-order traversal results in ordered values.
The solution here uses three pointers for the predecessor, first and second nodes.
While traversing the BST by the in-order manner, a current root value should be greater than predecessor's value.
If not, that is the node to be corrected.
In such a case, the first node pointer will be set if it is null.
The second node pointer will be set if the incorrect value is found.
Before going to right subtree, update the predecessor with the current root node.
When the in-order traversal is completed, two incorrect nodes will be found.
Swap values of those.

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
class RecoverBinarySearchTree {
private:
    TreeNode *pred = nullptr, *first = nullptr, *second = nullptr;
    void helper(TreeNode *root) {
        if (!root) { return; }
        helper(root->left);
        if (pred && root->val < pred->val) {
            if (!first) { first = pred; }
            second = root;
        }
        pred = root;
        helper(root->right);
    }

public:
    void recoverTree(TreeNode* root) {
        helper(root);
        swap(first->val, second->val);
        return;
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
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class RecoverBinarySearchTree:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        def helper(root, pred, first, second):
            if not root:
                return pred, first, second
            pred, first, second = helper(root.left, pred, first, second)
            if pred and root.val < pred.val:
                if not first:
                    first = pred
                second = root
            pred = root
            return helper(root.right, pred, first, second)
        
        pred, first, second = helper(root, None, None, None)
        first.val, second.val = second.val, first.val
        return
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(h)` -- h: height of the BST
