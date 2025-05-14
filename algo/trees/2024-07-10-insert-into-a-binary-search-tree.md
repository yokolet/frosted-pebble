---
layout: algo_page
group: Trees
title: Insert into a Binary Search Tree
algo_menubar: algo_menu
tags:
- Medium
- Binary Search Tree
date: 2024-07-10 15:48 +0900
---

## Problem Description
> You are given the `root` node of a binary search tree (BST) and a `value` to insert into the tree.
> Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the
> original BST.
>
> Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST
> after insertion. You can return any of them.
>
> Constraints:
> - The number of nodes in the tree will be in the range `[0, 10**4]`.
> - `-10**8 <= Node.val <= 10**8`
> - All the values Node.val are unique.
> - `-10**8 <= val <= 10**8`
> - It's guaranteed that val does not exist in the original BST.
>
> [https://leetcode.com/problems/insert-into-a-binary-search-tree/](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

## Examples
```
Example 1:
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation:
Input:          Output:
       4             4
     /   \         /   \
   2      7       2     7
 /   \           / \   / 
1     3         1   3 5
```

```
Example 2:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
```

```
Example 3:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
```

## How to Solve

The first step is to find an insertion point. Since the tree is a binary search tree, based on the value
the search goes left or right. The solution here took a recursion approach. When the root is null,
create and return a new node with the given value. If the node's value is greater than the given value,
traverse tree to the left. If the node's value is less then the given value, traverse to the right.

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
class InsertIntoABST {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (!root) return new TreeNode(val);
        if (root->val > val) {
            root->left = insertIntoBST(root->left, val);
        } else {
            root->right = insertIntoBST(root->right, val);
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
class InsertIntoABST {
    public TreeNode insertIntoBST(TreeNode root, int val) {
      if (root == null) return new TreeNode(val);
      if (root.val > val) {
        root.left = insertIntoBST(root.left, val);
      } else {
        root.right = insertIntoBST(root.right, val);
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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
    if (root === null) return new TreeNode(val);
    if (root.val > val) {
      root.left = insertIntoBST(root.left, val);
    } else {
      root.right = insertIntoBST(root.right, val);
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
class InsertIntoABST:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
      if not root:
        return TreeNode(val) 
      if root.val > val:
        root.left = self.insertIntoBST(root.left, val)
      else:
        root.right = self.insertIntoBST(root.right, val)
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
# @param {Integer} val
# @return {TreeNode}
def insert_into_bst(root, val)
    return TreeNode.new(val) if !root
    if root.val > val
      root.left = insert_into_bst(root.left, val)
    else
      root.right = insert_into_bst(root.right, val)
    end
    root
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(log(n))`
- Space: `O(h)`  -- h: height of a tree
