---
layout: algo_page
group: Design
title: Binary Search Tree Iterator
algo_menubar: algo_menu
tags:
- Medium
- Binary Search Tree
- Design
- Iterator
date: 2022-09-30 14:59 +0900
---

## Problem Description
> Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):
> - `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class.
>    The `root` of the BST is given as part of the constructor. The pointer should be
>    initialized to a non-existent number smaller than any element in the BST.
> - `boolean hasNext()` Returns true if there exists a number in the traversal to the right of the pointer,
>    otherwise returns false.
> - `int next()` Moves the pointer to the right, then returns the number at the pointer.
>
> Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return
> the smallest element in the BST.
>
> You may assume that `next()` calls will always be valid. That is, there will be at least a next number
> in the in-order traversal when `next()` is called.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 10**5]`.
> - `0 <= Node.val <= 10**6`
> - At most 10**5 calls will be made to `hasNext`, and `next`.
>
> [https://leetcode.com/problems/binary-search-tree-iterator/](https://leetcode.com/problems/binary-search-tree-iterator/)

## Examples
```
Example 1
   7
 /   \
3     15
     /  \
    9    20
Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]
```

## How to Solve
The problem asks the binary search tree (BST) inorder traversal.
However, it needs additional data structure to save parent nodes since there's no way to traverse back to the root.
Other than that, the next bigger value in BST is the one of the leftmost node in a right subtree if the node has right child.
If the node doesn't have the right subtree and is a left child, the parent is the successor.
Otherwise, no successor exists.

The solution here uses a stack to save parents to go back to its parent.
Also, the solution defines an utility method, find_next. This method finds the successor.
The next method's implementation uses find_next utility starting from a current node's right child.
The hasNext method checks the stack size which represents a number of parents of left child.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <stack>

using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class BSTIterator {
private:
    stack<TreeNode*> st;
    void findNext(TreeNode *root) {
        while (root) {
            st.push(root);
            root = root->left;
        }
    }

public:
    BSTIterator(TreeNode* root) {
        findNext(root);
    }

    int next() {
        TreeNode *cur = st.top();
        st.pop();
        if (cur->right) { findNext(cur->right); }
        return cur->val;
    }

    bool hasNext() {
        return !st.empty();
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
class BSTIterator {
    private Stack<TreeNode> stack = new Stack<TreeNode>();

    private void findNext(TreeNode root) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
    }

    public BSTIterator(TreeNode root) {
        findNext(root);
    }

    public int next() {
        TreeNode cur = stack.pop();
        if (cur.right != null) { findNext(cur.right); }
        return cur.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
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
 */
var BSTIterator = function(root) {
  this.stack = [];
  this.findNext(root);
};

BSTIterator.prototype.findNext = function(root) {
  while (root) {
    this.stack.push(root);
    root = root.left;
  }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  let cur = this.stack.pop();
  if (cur.right) { this.findNext(cur.right); }
  return cur.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  return this.stack.length > 0;
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
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self.find_next(root)

    def find_next(self, root: Optional[TreeNode]):
        while root:
            self.stack.append(root)
            root = root.left

    def next(self) -> int:
        cur = self.stack.pop()
        if cur.right:
            self.find_next(cur.right)
        return cur.val
        
    def hasNext(self) -> bool:
        return self.stack
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

class BSTIterator

=begin
    :type root: TreeNode
=end
    def initialize(root)
        @stack = []
        while root
          @stack << root
          root = root.left
        end
    end

=begin
    @return the next smallest number
    :rtype: Integer
=end
    def next()
        if has_next
          node = @stack.pop
          cur = node.right
          while !cur.nil?
            @stack << cur
            cur = cur.left
          end
          return node.val
        end
    end

=begin
    @return whether we have a next smallest number
    :rtype: Boolean
=end
    def has_next()
        @stack.size > 0
    end
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
