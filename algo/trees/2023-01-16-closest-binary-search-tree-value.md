---
layout: algo_page
group: Trees
title: Closest Binary Search Tree Value
algo_menubar: algo_menu
tags:
- Easy
- Binary Search Tree
- Depth-First Search
date: 2023-01-16 11:05 +0900
---

## Problem Description
> Given the `root` of a binary search tree and a `target` value, return the value in the BST that is closest to the
> `target`.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 10**4]`.
> - `0 <= Node.val <= 10**9`
> - `-10**9 <= target <= 10**9`
>
> [https://leetcode.com/problems/closest-binary-search-tree-value/](https://leetcode.com/problems/closest-binary-search-tree-value/)

## Examples
```
Example 1
Input: root = [4,2,5,1,3], target = 3.714286
Output: 4
Explanation:
       4
     /   \
   2      5
 /   \
1     3
```

```
Example 2
Input: root = [1], target = 4.428571
Output: 1
```

## How to Solve
The tree traversal can be iterative or recursive.
It is a binary search tree, so looking the given target value, go deeper left or right.
The solution here took an iterative approach.
Stating from root node value, if a difference of current is smaller than previous, update the result value.
Then go left if the target is smaller than current node value.

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
class ClosestBinarySearchTreeValue {
public:
    int closestValue(TreeNode* root, double target) {
        int result = root->val;
        while (root) {
            if (abs(root->val - target) < abs(result - target)) {
                result = root->val;
            }
            if (root->val > target) {
                root = root->left;
            } else {
                root = root->right;
            }
        }
        return result;
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
    public int closestValue(TreeNode root, double target) {
        int result = root.val;
        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(result - target)) {
                result = root.val;
            }
            if (root.val > target) {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return result;
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
 * @param {number} target
 * @return {number}
 */
var closestValue = function(root, target) {
    let result = root.val;
    while (root) {
        if (Math.abs(root.val - target) < Math.abs(result - target)) {
            result = root.val;
        }
        if (root.val > target) {
            root = root.left;
        } else {
            root = root.right;
        }
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
class ClosestBinarySearchTreeValue:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        result = root.val
        while root:
            if abs(root.val - target) < abs(result - target):
                result = root.val
            if root.val > target:
                root = root.left
            else:
                root = root.right
        return result
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
# @param {Float} target
# @return {Integer}
def closest_value(root, target)
    result = root.val
    while root do
        if (root.val - target).abs < (result - target).abs
            result = root.val
        end
        if root.val > target
            root = root.left
        else
            root = root.right
        end
    end
    result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(log(n))`
- Space: `O(1)`
