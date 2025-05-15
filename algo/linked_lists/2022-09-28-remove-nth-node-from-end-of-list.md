---
layout: algo_page
group: Linked List
title: Remove Nth Node From End of List
algo_menubar: algo_menu
tags:
- Medium
- Linked List
- Two Pointers
date: 2022-09-28 10:49 +0900
---
## Introduction
Some of linked list problems can be solved by two pointers like this one.
Using fast and slow pointers, move those to meet with the problem requirement.
In this case, move the fast pointer right to the given number.
Then, start shifting slow and fast.
When the fast pointer reaches to the end, the slow pointer is on the node,
just before the node to be removed.


## Problem Description
> Given the head of a linked list, remove the n-th node from the end of the list and
> return its head.
>
> Constraints:
> - The number of nodes in the list is `sz`.
> - `1 <= sz <= 30`
> - `0 <= Node.val <= 100`
> - `1 <= n <= sz`
>
> [https://leetcode.com/problems/remove-nth-node-from-end-of-list/](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

## Examples
```
Example 1
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

```
Example 2
Input: head = [1], n = 1
Output: []
```

```
Example 3
Input: head = [1,2], n = 1
Output: [1]
```

## Analysis
The first to do is to create a dummy node.
This is because the node to be deleted might be the first node.
Start from dummy node.
Move fast pointer by n, then move slow and fast pointer while fast has next node.
When the fast pointer reaches to the end, the slow pointer's next should be removed.
Change slow.next to slow.next.next and return dummy.next.

## Solution
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class RemoveNthNodeFromEndOfList:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode()
        dummy.next = head
        slow, fast = dummy, dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            slow, fast = slow.next, fast.next
        slow.next = slow.next.next
        return dummy.next
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
 
