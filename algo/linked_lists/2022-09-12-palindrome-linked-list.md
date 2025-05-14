---
layout: algo_page
group: Linked List
title: Palindrome Linked List
algo_menubar: algo_menu
tags:
- Easy
- Linked List
- Two Pointers
date: 2022-09-12 15:25 +0900
---
## Introduction
A brute force solution would be saving values to an array, then compared both start and end.
Another solutions is reversing first half and compares the values.

## Problem Description
> Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.
>
> Constraints:
> - The number of nodes in the list is in the range `[1, 10**5]`. 
> - `0 <= Node.val <= 9`
>
> [https://leetcode.com/problems/palindrome-linked-list/](https://leetcode.com/problems/palindrome-linked-list/)

## Examples
```
Example 1:
Input: head = [1,2,2,1]
Output: true
```

```
Example 2:
Input: head = [1,2]
Output: false
```

## Analysis
The solution here reverses the first half of the linked list.
It uses three pointers, slow, fast, and reversed.
When the fast pointer reaches to the end, the first half is reversed.
The slow pointer is on the middle.
If the length of the linked list is odd, fast pointer has a next node still.
In this case, slow pointer is incremented by one.
The comparison ends when revered pointer reaches to the end.

## Solution
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class PalindromeLinkedList:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        fast, slow, rev = head, head, None
        while fast and fast.next:
            fast = fast.next.next
            rev, rev.next, slow = slow, rev, slow.next
        if fast:
            slow = slow.next
        while rev:
            if rev.val != slow.val:
                return False
            rev, slow = rev.next, slow.next
        return True
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
