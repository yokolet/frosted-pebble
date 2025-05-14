---
layout: algo_page
group: Trees
title: Two Sum IV - Input is a BST
algo_menubar: algo_menu
tags:
- Easy
- Hash Table
- Breadth-First Search
- Tree
- Binary Search Tree
date: 2022-12-06 21:48 +0900
---
## Problem Description
> Given the `root` of a Binary Search Tree and a target number `k`, return true if there exist
> two elements in the BST such that their sum is equal to the given target.
>
> Constraints:
> - The number of nodes in the tree is in the range [1, 10**4].
> - `-10**4 <= Node.val <= 10**4`
> - root is guaranteed to be a valid binary search tree.
> - `-10**5 <= k <= 10**5`
>
> [https://leetcode.com/problems/two-sum-iv-input-is-a-bst/](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)

## Examples
```
Example 1
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Explanation: (5, 4), (3, 6) and (2, 7)
       5
     /   \
    3     6
  /  \     \
2     4     7
```

```
Example 2
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
Explanation: None of pair sums up to 28.
       5
     /   \
    3     6
  /  \     \
2     4     7
```

## How to Solve
Although the given tree is the binary search tree (BST), its property doesn't help to find the answer.
A pair of two numbers can be found anywhere, not always from top to bottom.
Because of this, every tree node should be checked like a binary tree.

The solution here uses the breadth-first search.
While traversing the tree, (k - node value)s are saved in the set.
If the current node's value is in the set, the combination is found.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
/**
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class TwoSum4BST {
public:
    bool findTarget(TreeNode* root, int k) {
        if (!root) {
            return false;
        }
        queue<TreeNode*> q({root});
        set<int> seen;
        while (!q.empty()) {
            TreeNode* cur = q.front();
            q.pop();
            if (seen.find(cur->val) != seen.end()) {
                return true;
            }
            seen.insert(k - cur->val);
            if (cur->left) {
                q.push(cur->left);
            }
            if (cur->right) {
                q.push(cur->right);
            }
        }
        return false;
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
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class TwoSum4BST:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        if not root:
            return False
        seen, queue = set(), [root]
        while queue:
            cur = queue.pop(0)
            if cur.val in seen:
                return True
            seen.add(k - cur.val)
            if cur.left:
                queue.append(cur.left)
            if cur.right:
                queue.append(cur.right)
        return False
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
