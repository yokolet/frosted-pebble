---
layout: algo_page
group: Trees
title: Delete Node in a BST
algo_menubar: algo_menu
tags:
- Medium
- Binary Search Tree
date: 2024-07-11 20:51 +0900
---

## Problem Description
> Given a root node reference of a BST and a key, delete the node with the given key in the BST.
> Return the root node reference (possibly updated) of the BST.
>
> Basically, the deletion can be divided into two stages:
> - Search for a node to remove.
> - If the node is found, delete the node.
>
> Constraints:
> - The number of nodes in the tree is in the range `[0, 10**4]`.
> - `-10**5 <= Node.val <= 10**5`
> - Each node has a unique value.
> - root is a valid binary search tree.
> - `-10**5 <= key <= 10**5`
>
> [https://leetcode.com/problems/delete-node-in-a-bst/](https://leetcode.com/problems/delete-node-in-a-bst/)

## Examples
```
Example 1:

Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.

Given tree         After removed node
      5                    5
    /   \                 / \
  3      6               4   6
 / \      \             /     \
2   4      7           2       7
```

```
Example 2:

Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.
```

```
Example 3:

Input: root = [], key = 0
Output: []
```

## How to Solve

A recursive approach is the best for this problem.
When the root node value is greater than the given key, go down to a left subtree.
When the root node value is less than the given key, go down to a right subtree.
When the root node value is the same as the given key, start the deleting process.
If the root node has only one child, return the existing child.
When the root node has both left and right children, find the successor first.
The successor is the leftmost node in the right subtree, so find it by going down to the left only.
Put the root node's left subtree to the successor's left subtree, then return root node's right subtree.
This way, the node can be deleted.

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
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left),
 * right(right) {}
 * };
 */
class DeleteNodeInBST {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return root;
        if (root->val == key) {
            if (!root->right) return root->left;
            if (!root->left) return root->right;
            TreeNode* cur = root->right;
            while (cur->left) {
                cur = cur->left;
            }
            cur->left = root->left;
            return root->right;
        } else if (root->val > key) {
            root->left = deleteNode(root->left, key);
        } else {
            root->right = deleteNode(root->right, key);
        }
        return root;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class DeleteNodeInBST {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return root;
        if (root.val == key) {
            if (root.right == null) return root.left;
            if (root.left == null) return root.right;
            TreeNode cur = root.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            cur.left = root.left;
            return root.right;
        } else if (root.val > key) {
            root.left = deleteNode(root.left, key);
        } else {
            root.right = deleteNode(root.right, key);
        }
        return root;
    }
}
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (root === null) return root;
    if (root.val === key) {
        if (!root.right) return root.left;
        if (!root.left) return root.right;
        let cur = root.right;
        while (cur.left) {
            cur = cur.left;
        }
        cur.left = root.left;
        return root.right;
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        root.right = deleteNode(root.right, key);
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
class DeleteNodeInBST:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root: return root
        if root.val == key:
            if not root.right: return root.left
            if not root.left: return root.right
            cur = root.right
            while cur.left:
                cur = cur.left
            cur.left = root.left
            return root.right
        elif root.val > key:
            root.left = self.deleteNode(root.left, key)
        else:
            root.right = self.deleteNode(root.right, key)
        return root
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val = 0, left = nil, right = nil)
#         @val = val
#         @left = left
#         @right = right
#     end
# end
# @param {TreeNode} root
# @param {Integer} key
# @return {TreeNode}
def delete_node(root, key)
  return root if !root
  if root.val == key
    return root.right if !root.left
    return root.left if !root.right
    cur = root.right
    while cur.left
      cur = cur.left
    end
    cur.left = root.left
    return root.right
  elsif root.val > key
    root.left = delete_node(root.left, key)
  else
    root.right = delete_node(root.right, key)
  end
  root
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(log(n))`
- Space: `O(h)` -- h: height of a tree
