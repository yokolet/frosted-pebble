---
layout: algo_page
group: Linked List
title: Odd Even Linked List
algo_menubar: algo_menu
tags:
- Medium
- Linked List
date: 2022-12-06 17:05 +0900
---
## Problem Description
> Given the `head` of a singly linked list, group all the nodes with odd indices together followed by
> the nodes with even indices, and return the reordered list.
>
> The first node is considered odd, and the second node is even, and so on.
>
> Note that the relative order inside both the even and odd groups should remain as it was in the input.
>
> You must solve the problem in `O(1)` extra space complexity and `O(n)` time complexity.
>
> Constraints:
> - The number of nodes in the linked list is in the range [0, 10**4].
> - `-10**6 <= Node.val <= 10**6`
>
> [https://leetcode.com/problems/odd-even-linked-list/](https://leetcode.com/problems/odd-even-linked-list/)

## Examples
```
Example 1
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
Explanation:
input: 1 -> 2 -> 3 -> 4 -> 5
output: 1 -> 3 -> 5 -> 2 -> 4
```

```
Example 2
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
Explanation:
input: 2 -> 1 -> 3 -> 5 -> 6 -> 4 -> 7
output: 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4
```

## How to Solve

It's not difficult to think of the solution for this problem.
Use two pointers for odd and even indicies.
The odd pointer picks up the first node then its next of next.
The even pointer picks up the second node then its next of next.
As we do always, increment the pointers.
In the end, connect the tail of odd pointer and the head of even pointer.
The answer is the odd head pointer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class OddEvenLinkedList {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }
        ListNode *odd_head = NULL, *cur_odd = NULL, *even_head = NULL, *cur_even = NULL;
        odd_head = head; cur_odd = odd_head;
        even_head = head->next; cur_even = even_head;
        while (cur_odd && cur_odd->next && cur_even && cur_even->next) {
            cur_odd->next = cur_odd->next->next;
            cur_odd = cur_odd->next;
            cur_even->next = cur_even->next->next;
            cur_even = cur_even->next;
        }
        cur_odd->next = even_head;
        return odd_head;
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
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class OddEvenLinkedList:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        odd_head, cur_odd = head, head
        even_head, cur_even = head.next, head.next
        while cur_odd and cur_odd.next and cur_even and cur_even.next:
            cur_odd.next = cur_odd.next.next
            cur_odd = cur_odd.next
            cur_even.next = cur_even.next.next
            cur_even = cur_even.next
        cur_odd.next = even_head
        return odd_head
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
