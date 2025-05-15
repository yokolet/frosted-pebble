---
layout: algo_page
group: Linked List
title: Merge Two Sorted Lists
algo_menubar: algo_menu
tags:
- Easy
- Linked List
- Recursion
date: 2022-09-22 21:22 +0900
---
## Introduction
This is a basic linked list problem.
When it is a linked list, we should always consider adding a dummy node at the head.
This makes easy to handle the given linked list's head node.

## Problem Description
> You are given the heads of two sorted linked lists `list1` and `list2`.
> Merge the two lists in a one sorted list.
> The list should be made by splicing together the nodes of the first two lists.
> 
> Return the head of the merged linked list.
>
> Constraints:
> - The number of nodes in both lists is in the range `[0, 50]`.
> - `-100 <= Node.val <= 100`
> - Both `list1` and `list2` are sorted in non-decreasing order.
>
> [https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

## Examples
```
Example 1
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

```
Example 2
Input: list1 = [], list2 = []
Output: []
```

```
Example 3
Input: list1 = [], list2 = [0]
Output: [0]

```

## Analysis
Create a dummy node first since we don't know which one will come first.
Also, use a current pointer to go forward.
While both list1 and list2 have nodes, add one of those with grater value to current's next.
If one of list1 or list2 comes to end, add entire rest to current's next.
In the end, return dummy node's next which points the head of list1 or list2.

## Solution
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class MergeTwoSortedLists:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next
```

## Complexities
- Time: `O(m + n)` -- m,n: length of list1, list2 respectively
- Space: `O(1)`
