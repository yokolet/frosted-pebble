---
layout: algo_page
group: Trees
title: Increasing Order Search Tree
algo_menubar: algo_menu
tags:
- Easy
- Depth-First Search
- Binary Search Tree
date: 2022-10-14 17:09 +0900
---
## Introduction
The problem doesn't require to return original node object.
The brute force solution would be creating new nodes while traversing by an inorder manner.
However, the better solution is there.
While traversing, relink the nodes.
When the traversal goes to left, the left subtree should be converted to linked list + current node.
When the traversal goes to right, the right subtree should be converted to linked list + greater node.

## Problem Description
> Given the `root` of a binary search tree, rearrange the tree in in-order so that
> the leftmost node in the tree is now the root of the tree, and every node has no left child
> and only one right child.
>
> Constraints:
> - The number of nodes in the given tree will be in the range `[1, 100]`.
> - `0 <= Node.val <= 1000`
>
> [https://leetcode.com/problems/increasing-order-search-tree/](https://leetcode.com/problems/increasing-order-search-tree/)

## Examples
```
Example 1
Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
Explanation:
          5           -->   1
       /     \               \
     3        6               2
   /   \       \               \
  2     4       8               3
 /             / \               \
1             7   9               4
                                   \
                                    5
                                     \
                                      6
                                       \
                                        7
                                         \
                                          8
                                           \
                                            9
```

```
Example 2
Input: root = [5,1,7]
Output: [1,null,5,null,7]
Explanation:
   5   --->     1
 /   \           \
1     7           5
                   \
                    7
```

## Analysis
The increasing order of the binary search tree can get by inorder traversal.
Visit left, do something, then visit right.
When it goes to left or right child, bring the greater node with it.
The left subtree's greater node is a parent node.
It returns linked list + current node.
The right subtree's greater node is the greater node so far.
It returns linked list + greater node.
When the recursive traversal is over, the answer is there.

## Solution
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class IncreasingOrderSearchTree:
    def increasingBST(self, root: TreeNode) -> TreeNode:
        def helper(root, greater):
            if not root:
                return greater
            left = helper(root.left, root)
            root.left = None
            root.right = helper(root.right, greater)
            return left
        return helper(root, None)
```

## Complexities
- Time: `O(n)`
- Space: `O(h)`  -- h: height of tree
