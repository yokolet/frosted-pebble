---
layout: algo_page
group: Trees
title: Convert Sorted Array to Binary Search Tree
algo_menubar: algo_menu
tags:
- Easy
- Divide and Conquer
- Binary Search Tree
date: 2023-01-15 17:06 +0900
---

## Problem Description
> Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary
> search tree.
>
> Constraints:
> - `1 <= nums.length <= 10**4`
> - `-10**4 <= nums[i] <= 10**4`
> - nums is sorted in a strictly increasing order.
>
> [https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

## Examples
```
Example 1
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted.
       0                0
     /   \            /   \
   3      9        -10     5
  /      /           \       \
-10     5             -3       9
```

```
Example 2
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
    3     1
  /        \
1            3
```

## How to Solve
Since the given array is sorted, the root node should be in the middle of the array to create
a balanced binary search tree.
The divide and conquer would be the best approach for this problem.
Once the root node is created from the middle value, repeat the process using left and right halves.
The solution here uses a helper method for the divide and conquer.

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

#include <vector>

using namespace std

class ConvertSortedArrayToBinarySearchTree {
private:
    TreeNode* helper(vector<int> &nums, int left, int right) {
        if (left > right) { return nullptr; }
        int mid = (left + right) / 2;
        TreeNode *root = new TreeNode(nums[mid]);
        root->left = helper(nums, left, mid - 1);
        root->right = helper(nums, mid + 1, right);
        return root;
    }

public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
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
    private TreeNode helper(int[] nums, int left, int right) {
        if (left > right) { return null; }
        int mid = (left + right) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = helper(nums, left, mid - 1);
        root.right = helper(nums, mid + 1, right);
        return root;
    }

    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    const func = function helper(left, right) {
        if (left > right) { return null; }
        let mid = Math.floor((left + right) / 2);
        let root = new TreeNode(nums[mid]);
        root.left = helper(left, mid - 1);
        root.right = helper(mid + 1, right);
        return root;
    }
    return func(0, nums.length - 1);
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

from typing import List, Optional

class ConvertSortedArrayToBinarySearchTree:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def helper(nums: List[int], left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            mid = (left + right) // 2
            root = TreeNode(val = nums[mid])
            root.left = helper(nums, left, mid - 1)
            root.right = helper(nums, mid + 1, right)
            return root
        return helper(nums, 0, len(nums) - 1)
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
# @param {Integer[]} nums
# @return {TreeNode}
def sorted_array_to_bst(nums)
  helper = lambda do |left, right|
    if left > right
      return nil
    end
    mid = (left + right) / 2
    root = TreeNode.new(nums[mid])
    root.left = helper.call(left, mid - 1)
    root.right = helper.call(mid + 1, right)
    root
  end
  helper.call(0, nums.size - 1)
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(1)`
