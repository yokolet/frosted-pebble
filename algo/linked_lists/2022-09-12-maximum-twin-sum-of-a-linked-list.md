---
layout: algo_page
group: Linked List
title: Maximum Twin Sum of a Linked List
algo_menubar: algo_menu
tags:
- Medium
- Linked List
- Two Pointers
date: 2022-09-12 15:14 +0900
---
## Introduction
For a linked list problem, brute force solution might be easy to come up.
Save the value in an array while going over the linked list to the end.
Do something necessary using values in the array.
However, another linked list specific solution exists -- reverse the linked list.
Sometime, first half of the linked list should be reversed.
Then, do something while using values of revered and not reversed latter half.

## Problem Description
> In a linked list of size `n`, where n is even, the i-th node (0-indexed) of the linked list is
> known as the twin of the (n-1-i)th node, if `0 <= i <= (n / 2) - 1`.
> - For example, if `n = 4`, then node 0 is the twin of node 3, and node 1 is the twin of node 2.
>   These are the only nodes with twins for `n = 4`.
>
> The twin sum is defined as the sum of a node and its twin.
> Given the head of a linked list with even length, return the maximum twin sum of the linked list.
>
> Constraints:
> - The number of nodes in the list is an even integer in the range `[2, 10**5]`.
> - `1 <= Node.val <= 10**5`
>
> [https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/)

## Examples
```
Example 1:
Input: head = [5,4,2,1]
Output: 6
Explanation:
Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
There are no other nodes with twins in the linked list.
Thus, the maximum twin sum of the linked list is 6. 
```

```
Example 2:
Input: head = [4,2,2,3]
Output: 7
Explanation:
The nodes with twins present in this linked list are:
- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
Thus, the maximum twin sum of the linked list is max(7, 4) = 7. 
```

```
Example 3:
Input: head = [1,100000]
Output: 100001
Explanation:
There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.
```

## Analysis
The solution here reverses the first half of the linked list.
To reverse half, it uses slow and fast pointers.
When the fast pointer reaches to the end, first half is reversed.
While incrementing the reversed and slow pointers, it compares the sum of two values.
Once the reversed linked list pointer reaches to the end, all are checked.

## Solution
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class MaximumTwinSumOfALinkedList:
    def pairSum(self, head: Optional[ListNode]) -> int:
        fast, slow, rev = head, head, None
        while fast and fast.next:
            fast = fast.next.next
            rev, rev.next, slow = slow, rev, slow.next
        max_v = 0
        while rev:
            max_v = max(max_v, rev.val + slow.val)
            rev, slow = rev.next, slow.next
        return max_v
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
