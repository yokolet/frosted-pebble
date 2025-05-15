---
layout: algo_page
group: Trees
title: Pseudo-Palindromic Paths in a Binary Tree
algo_menubar: algo_menu
tags:
- Medium
- Depth-First Search
- Binary Tree
- Bit Manipulation
date: 2022-09-14 14:26 +0900
---
## Introduction
This is a binary tree's root to leaf node paths traversal problem.
The traversal itself is nothing special.
The key is how to check the pseudo-palindrome-ness.

## Problem Description
> Given a binary tree where node values are digits from 1 to 9.
> A path in the binary tree is said to be pseudo-palindromic
> if at least one permutation of the node values in the path is a palindrome.
>
> Return the number of pseudo-palindromic paths going from the root node to leaf nodes.
>
> Constraints:
> - The number of nodes in the tree is in the range `[1, 10**5]`.
> - `1 <= Node.val <= 9`
>
> [https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/](https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/)

## Examples
```
Example 1:
Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation:
   2
  / \
  3  1
 / \  \
3   1  1
There are three paths going from the root node to leaf nodes: [2,3,3], [2,1,1] and [2,3,1].
Among these paths only [2,3,3] and [2,1,1] are pseudo-palindromic paths
since those can be rearranged to palindrome.
```

```
Example 2:
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation:
    2
   / \
  1   1
 / \ 
1   3
     \
      1
[2,1,1] is the only path which can be rearranged to palindrome.
```

## Analysis
The binary tree traversal is ordinary one, starting from root node, going down to leaf nodes.
When the current root node is not None, update the path parameter.
When the current root node is a leaf, check pseudo-palindrome-ness and count up.
Something special of this problem is how to check pseudo-palindrome-ness.

There are some ways to check that.
Here, a bit manipulation is used.
The root value is between 1 to 9 inclusive.
If `1` is shifted to root.val, we know what root value appeared so far.
Additionally, take XOR of bit shifted value.
When the same number appears even times on the path to leaf, that bit will be `0`.
When it comes to leaf node, set `0` to the right most bit by `path & (path - 1)`.
That means it checks a power of two and at most one digit has an odd count.

## Solution
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class PseudoPalindromicPathsInABinaryTree:
    def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
        def helper(root, path, count):
            if root:
                path = path ^ (1 << root.val)
                if not root.left and not root.right:
                    if path & (path - 1) == 0:
                        count += 1
                else:
                    count = helper(root.left, path, count)
                    count = helper(root.right, path, count)
            return count
        return helper(root, 0, 0)
```

## Complexities
- Time: `O(n)` -- n: number of nodes
- Space: `O(h)` -- h: tree height
