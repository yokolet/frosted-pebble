---
layout: algo_page
group: Trees
title: Step-By-Step Directions From a Binary Tree Node to Another
algo_menubar: algo_menu
tags:
- Medium
- Depth-First Search
- Binary Tree
- String
date: 2022-12-17 23:52 +0900
---
## Problem Description
> You are given the `root` of a binary tree with `n` nodes. Each node is uniquely assigned a value from 1 to n.
> You are also given an integer `startValue` representing the value of the start node `s`, and a different integer
> `destValue` representing the value of the destination node `t`.
>
> Find the shortest path starting from node `s` and ending at node `t`. Generate step-by-step directions of such
> path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific
> direction:
> - 'L' means to go from a node to its left child node.
> - 'R' means to go from a node to its right child node.
> - 'U' means to go from a node to its parent node.
>
> Return the step-by-step directions of the shortest path from node `s` to node `t`.
>
> Constraints:
> - The number of nodes in the tree is `n`.
> - `2 <= n <= 10**5`
> - `1 <= Node.val <= n`
> - All the values in the tree are unique.
> - `1 <= startValue, destValue <= n`
> - `startValue != destValue`
>
> [https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)

## Examples
```
Example 1
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.
      5
    /   \
   1     2
 /     /   \
3     6     4
```

```
Example 2
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.
    2
  /
1
```

## How to Solve

Since it is a binary tree, there's no way to go up.
Using the depth-first search, find two paths from root to start and destination.
The solution here stacks up 'L' or 'R' from leaf to top.
The start and destination paths share some path from the root, then branches to two.
Create the destination path from the branching point.
For the start side path, 'U' should repeat the length of start path from the branching point.
This way, we can find the answer.

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
class StepByStepDirectionsFromABinaryTreeNodeToAnother {
private:
    bool dfs(TreeNode *root, int val, stack<string> &path) {
        if (root->val == val) {
            return true;
        }
        if (root->left && dfs(root->left, val, path)) {
            path.push("L");
        } else if (root->right && dfs(root->right, val, path)) {
            path.push("R");
        }
        return path.size() > 0;
    }

public:
    string getDirections(TreeNode* root, int startValue, int destValue) {
        stack<string> s, d;
        dfs(root, startValue, s);
        dfs(root, destValue, d);
        while (!s.empty() && !d.empty() && s.top() == d.top()) {
            s.pop();
            d.pop();
        }
        string result = "";
        while (!d.empty()) {
            result += d.top();
            d.pop();
        }
        return string(s.size(), 'U') + result;
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
class StepByStepDirectionsFromABinaryTreeNodeToAnother:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def dfs(root: TreeNode, val: int, path: List[str]) -> bool:
            if root.val == val:
                return True
            if root.left and dfs(root.left, val, path):
                path.append('L')
            elif root.right and dfs(root.right, val, path):
                path.append('R')
            return len(path) > 0
        s, d = [], []
        dfs(root, startValue, s)
        dfs(root, destValue, d)
        while s and d and s[-1] == d[-1]:
            s.pop()
            d.pop()
        return 'U' * len(s) + ''.join(reversed(d))
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)` -- n: number of tree nodes
- Space: `O(h)` -- h: height of a tree
