---
layout: algo_page
group: Trees
title: Binary Tree Inorder Traversal
algo_menubar: algo_menu
tags:
- Easy
- Depth-First Search
- Binary Tree
date: 2022-09-30 14:05 +0900
---

## Problem Description
> Given the `root` of a binary tree, return the inorder traversal of its nodes' values.
>
> Constraints:
> - The number of nodes in the tree is in the range `[0, 100]`.
> - `-100 <= Node.val <= 100`
>
> [https://leetcode.com/problems/binary-tree-inorder-traversal/](https://leetcode.com/problems/binary-tree-inorder-traversal/)

## Examples
```
Example 1
Input: root = [1,null,2,3]
Output: [1,3,2]
Explanation:
1
 \
  2
 /
3
```

```
Example 2
Input: root = []
Output: []
```

```
Example 3
Input: root = [1]
Output: [1]
```

## How to Solve
This is a basic inorder traversal problem.
Just visit all nodes in the binary tree following the inorder manner.

The tree traversal here takes the depth-first search (DFS) style.
The traverse function does the DFS and saves values between going left and right nodes.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 };

class BinaryTreeInorderTraversal {
private:
    vector<int> traverse(vector<int> &values, TreeNode *root)
    {
        if (root)
        {
            values = traverse(values, root->left);
            values.push_back(root->val);
            values = traverse(values, root->right);
        }
        return values;
    }
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> values;
        return traverse(values, root);
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
class BinaryTreeInorderTraversal {
    private List<Integer> traverse(List<Integer> values, TreeNode root) {
        if (root == null) { return values; }
        traverse(values, root.left);
        values.add(root.val);
        traverse(values, root.right);
        return values;
    }
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> values = new ArrayList<Integer>();
        return traverse(values, root);
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const traverse = function(values, root) {
    if (root === null) { return values; }
    values = traverse(values, root.left);
    values.push(root.val);
    values = traverse(values, root.right);
    return values
  }
  return traverse([], root);
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

from typing import Optional

class BinaryTreeInorderTraversal:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        def traverse(result, root):
            if not root:
                return result
            result = traverse(result, root.left)
            result.append(root.val)
            result = traverse(result, root.right)
            return result
        return traverse([], root)
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
# @return {Integer[]}
def traverse(values, root)
  if !root
    return values
  end
  traverse(values, root.left)
  values << root.val
  traverse(values, root.right)
  values
end

def inorder_traversal(root)
  traverse([], root)
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
