---
layout: algo_page
group: Linked List
title: Merge k Sorted Lists
algo_menubar: algo_menu
tags:
- Hard
- Linked List
date: 2022-09-22 22:21 +0900
---
## Introduction
Like other linked list problems, start from creating a dummy node as a head.
It's a good idea to try a brute force approach if the problem is the linked list.
Save values or nodes to an array, then apply necessary operation to the array.
Make those values back to the linked list.
If the tests' memory/cpu consumptions are not so extensive, the brute force might be enough.

## Problem Description
> You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.
>
> Merge all the linked-lists into one sorted linked-list and return it.
>
> Constraints:
> - `k == lists.length`
> - `0 <= k <= 10**4`
> - `0 <= lists[i].length <= 500`
> - -10**4 <= lists[i][j] <= 10**4`
> - `lists[i]` is sorted in ascending order.
> - The sum of `lists[i].length` will not exceed 10**4.
>
> [https://leetcode.com/problems/merge-k-sorted-lists/](https://leetcode.com/problems/merge-k-sorted-lists/)

## Examples
```
Example 1
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

```
Example 2
Input: lists = []
Output: []
```

```
Example 3
Input: lists = [[]]
Output: []
```

## Analysis
Create a dummy node since we don't know what linked list's head becomes ground total linked list head.
The cur pointer goes through all linked lists' all nodes as if those are one.
When all lists' nodes are checked, the dummy node as a head has all linked lists nodes.
Made the cur pointer back to dummy's next.
Update each list's node value by sorted values' each element.

## Solution
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class MergeKSortedLists:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        values = []
        for l in lists:
            while l:
                values.append(l.val)
                cur.next = l
                l = l.next
                cur = cur.next
        cur = dummy.next
        for v in sorted(values):
            cur.val = v
            cur = cur.next
        return dummy.next
```

## Complexities
- Time: `O(n)` -- n: total number of list nodes
- Space: `O(n)`
 
