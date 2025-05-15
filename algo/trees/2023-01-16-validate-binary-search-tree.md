---
layout: algo_page
group: Trees
title: Validate Binary Search Tree
algo_menubar: algo_menu
tags:
- Medium
- Binary Search Tree
- Depth-First Search
date: 2023-01-16 13:23 +0900
---

## Problem Description
> Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).
>
> A valid BST is defined as follows:
> - The left  subtree of a node contains only nodes with keys less than the node's key.
> - The right subtree of a node contains only nodes with keys greater than the node's key.
> - Both the left and right subtrees must also be binary search trees.
>
> Constraints:
> The number of nodes in the tree is in the range `[1, 10**4]`.
> - `-2**31 <= Node.val <= 2**31 - 1`
>
> [https://leetcode.com/problems/validate-binary-search-tree/](https://leetcode.com/problems/validate-binary-search-tree/)

## Examples
```
Example 1
Input: root = [2,1,3]
Output: true
Explanation:
    2
  /   \
1      3
```

```
Example 2
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
    5
  /   \
1      4
     /   \
    3     6
```

## How to Solve
Check each node value is less than upper bound and greater than lower bound.
Start from a minimum value as a lower bound and a maximum value as a upper bound.
The solution here took depth-first search (recursive).
When it goes to a left subtree, lower bound is from previous one and upper bound is a parent node value.
When it goes to a right subtree, lower bound is a parent node value and upper bound is from previous one.
If all node values are valid, the tree is a valid BST.

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
class ValidateBinarySearchTree {
private:
  bool helper(TreeNode* root, long long low, long long high)
  {
    if (!root)
      return true;
    if (root->val <= low || root->val >= high)
      return false;
    return helper(root->left, low, root->val) && helper(root->right, root->val, high);
  }
public:
    bool isValidBST(TreeNode* root) {
        return helper(root, LLONG_MIN, LLONG_MAX);
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
class ValidateBinarySearchTree:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def helper(root: Optional[TreeNode], low, high)-> bool:
            if not root:
                return True
            if root.val <= low or root.val >= high:
                return False
            return helper(root.left, low, root.val) and\
                helper(root.right, root.val, high)

        return helper(root, float('-inf'), float('inf'))
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
def helper(root, low, high)
    if !root
        return true
    end
    if root.val <= low || high <= root.val
        return false
    end
    return helper(root.left, low, root.val) && helper(root.right, root.val, high)
end

# @param {TreeNode} root
# @return {Boolean}
def is_valid_bst(root)
    return helper(root, -2**31-1, 2**31)
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(h)` -- h: height of the tree
