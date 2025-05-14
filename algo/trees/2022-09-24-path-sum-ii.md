---
layout: algo_page
group: Trees
title: Path Sum II
algo_menubar: algo_menu
tags:
- Medium
- Binary Tree
- Depth-First Search
date: 2022-09-24 17:56 +0900
---
## Introduction
The traversing tree node is nothing special.
Just going over by preorder traversal can visit all leaf nodes.
The paths to the leaf nodes should be saved in the array.
The key here is how to make the array back to the previous state when the traversal comes back from deeper level.
One would be to pop the last element from path array.
Another is to add the current root value when the traversal goes deeper level.
Latter doesn't need to pop the value.

## Problem Description
> Given the `root` of a binary tree and an integer `targetSum`, return all root-to-leaf paths
> where the sum of the node values in the path equals `targetSum`.
> Each path should be returned as a list of the node values, not node references.
>
> A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.
>
> Constraints:
> - The number of nodes in the tree is in the range `[0, 5000]`.
> - `-1000 <= Node.val <= 1000`
> - `-1000 <= targetSum <= 1000`
>
> [https://leetcode.com/problems/path-sum-ii/](https://leetcode.com/problems/path-sum-ii/)

## Examples
```
Example 1
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation:
          5
        /   \
      4      8
    /       /  \
  11      13    4
 /  \          /  \
7    2        5    1
There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
```

```
Example 2
Input: root = [1,2,3], targetSum = 5
Output: []
```

```
Example 3
Input: root = [1,2], targetSum = 0
Output: []
```

## Analysis
The solution here didn't took popping the last value from the path array.
Instead, the solution doesn't add the current value to the path array in the current level.
Only when the traversal goes to deeper level, the root value is added to the path array.
When it comes back to the upper level, the path array doesn't have deeper level values.
This way, we can create the path from root to leaf without add other paths.

## Solution
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class PathSumTwo:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:            
        def helper(root, cur, result):
            if not root:
                return
            if not root.left and not root.right:
                if sum(cur) + root.val == targetSum:
                    result.append(cur + [root.val])
                return
            if root.left:
                helper(root.left, cur + [root.val], result)
            if root.right:
                helper(root.right, cur + [root.val], result)
            return
        
        result = []
        helper(root, [], result)
        return result
```

## Complexities
- Time: `O(n^2)`  -- n: number of tree nodes
- Space: `O(n + h)` -- h: height of the tree
