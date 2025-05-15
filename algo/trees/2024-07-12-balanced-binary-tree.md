---
layout: algo_page
group: Trees
title: Balanced Binary Tree
algo_menubar: algo_menu
tags:
- Easy
- Binary Tree
- Depth-First Search
date: 2024-07-12 22:04 +0900
---
## Problem Description
> Given a binary tree, determine if it is height-balanced.
> > A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never
> > differs by more than one.
>
> Constraints:
> - The number of nodes in the tree is in the range `[0, 5000]`.
> - `-10**4 <= Node.val <= 10**4`
>
> [https://leetcode.com/problems/balanced-binary-tree/](https://leetcode.com/problems/balanced-binary-tree/)

## Examples
```
Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true
    3
  /   \
9      20
      /  \
    15    7
```

```
Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
          1
        /   \
      2      2
    /   \
  3      3
 / \
4   4
```

```
Example 3:
Input: root = []
Output: true
```

## How to Solve

A bottom-up recursion is an approach taken here.
After reaching children of a leaf node, on the way back to the top, it checks a current height and subtree's validity.
Instead of keeping two values of the height and validity, the solution here uses only one value.
If the subtree is not balanced, it returns -1. If the subtree is balanced, it returns the height.
When the return value from left or right subtree is -1, return -1 since the tree is no more balanced.
If the absolute difference of left and right subtree's heights is greater than 1, the return value is -1.
Only when left and right subtree's heights are returned (the value other than -1), return the current height as
1 + max(left, right). In the end, check the final return value is -1 or not.


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
class Solution {
private:
    int helper(TreeNode* root) {
        if (!root) return 0;
        int left = helper(root->left);
        if (left == -1) return -1;
        int right = helper(root->right);
        if (right == -1) return -1;
        if (abs(left - right) > 1) return -1;
        return 1 + max(left, right);
    }
public:
    bool isBalanced(TreeNode* root) {
        return helper(root) != -1;
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
class Solution {
    private int helper(TreeNode root) {
        if (root == null) return 0;
        int left = helper(root.left);
        if (left == -1) return -1;
        int right = helper(root.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    public boolean isBalanced(TreeNode root) {
        return helper(root) != -1;
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
 * @return {boolean}
 */
var isBalanced = function(root) {
    const helper = (root) => {
        if (!root) return 0;
        const left = helper(root.left);
        if (left == -1) return -1;
        const right = helper(root.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    return helper(root) != -1
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
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def helper(root: Optional[TreeNode]) -> int:
            if not root: return 0
            left = helper(root.left)
            if left == -1: return -1
            right = helper(root.right)
            if right == -1: return -1
            if abs(left - right) > 1: return -1
            return 1 + max(left, right)
        return helper(root) != -
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
# @return {Boolean}
def helper(root)
    return 0 if !root
    left = helper(root.left)
    return -1 if left == -1
    right = helper(root.right)
    return -1 if right == -1
    return -1 if (left - right).abs > 1
    1 + [left, right].max
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
