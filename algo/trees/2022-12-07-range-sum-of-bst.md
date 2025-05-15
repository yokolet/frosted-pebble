---
layout: algo_page
group: Trees
title: Range Sum of BST
algo_menubar: algo_menu
tags: []
date: 2022-12-07 16:20 +0900
---
## Problem Description
> Given the `root` node of a binary search tree and two integers low and high, return the sum of values of all nodes
> with a value in the inclusive range `[low, high]`.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 2 * 10**4]`.
> - `1 <= Node.val <= 10**5`
> - `1 <= low <= high <= 10**5`
> - All Node.val are unique.
>
> [https://leetcode.com/problems/range-sum-of-bst/](https://leetcode.com/problems/range-sum-of-bst/)

## Examples
```
Example 1
Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.
      10
    /    \
  5       15
 / \        \
3   7        18
```

```
Example 2
Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.
        10
      /    \
    5      15
   / \    /  \
  3   7  13  18
 /   /
1   6
```

## How to Solve
This problem can be solved in multiple ways such that the breadth-first search, depth-first search, post-order or
in-order traversal.
The solution here took the depth-first search (recursion) approach.
Since the tree is BST, a direction to go left or right depends on the root value.
In another word, if the root value is smaller than low, no need to go left any further.
Same as right subtree, if the root value is greater than high, no need to go right any further.
Rather than controlling the flow by the root value comparison, the solution here sets null to the left or right node.
When the recursion go deeper, it returns 0 if the root is null.
When the root value is between low and high, the root value is added to the result from left and right subtrees.

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
class RangeSumOfBST {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        if (root->val < low) { root->left = nullptr; }
        if (root-> val > high) { root->right = nullptr; }
        return rangeSumBST(root->left, low, high) +
                rangeSumBST(root->right, low, high) +
                (low <= root->val && root->val <= high ? root->val : 0);
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    if (root == null) { return 0; }
    if (root.val < low) { root.left = null; }
    if (root.val > high) { root.high = null; }
    return rangeSumBST(root.left, low, high) +
            rangeSumBST(root.right, low, high) +
            (low <= root.val && root.val <= high ? root.val : 0);
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
class RangeSumOfBST:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root: return 0
        if root.val < low: root.left = None
        if root.val > high: root.high = None
        return self.rangeSumBST(root.left, low, high) + \
                self.rangeSumBST(root.right, low, high) + \
                (root.val if low <= root.val <= high else 0)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(h)` -- h: height of a tree
