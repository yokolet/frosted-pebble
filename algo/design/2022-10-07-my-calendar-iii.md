---
layout: algo_page
group: Design
title: My Calendar III
algo_menubar: algo_menu
tags:
- Hard
- Binary Search
- Design
date: 2022-10-07 17:10 +0900
---
## Introduction
How to maintain existing bookings is a key to solve this type of problems.
Sometime, start and end times are saved in a single array.
Sometime, start and end times are saved in different arrays.
We should figure out by understanding the problem's requirement(s).

In this case, start and end times are saved in two different arrays.
Except a range to count, a way to count events is similar to the problem,
[counting the minimum meeting rooms](/algo/sorting_and_searching/2022-09-10-meeting-rooms-ii).

## Problem Description
> A `k-booking` happens when `k` events have some non-empty intersection
> (i.e., there is some time that is common to all `k` events.)
>
> You are given some events `[start, end)`, after each given event, return an integer `k` representing the maximum
> `k-booking` between all the previous events.
>
> Implement the MyCalendarThree class:
> - `MyCalendarThree()` Initializes the object.
> - `int book(int start, int end)` Returns an integer `k` representing the largest integer such that
>    there exists a `k-booking` in the calendar.
>
> Constraints:
> - `0 <= start < end <= 10**9`
> - At most 400 calls will be made to book.
>
> [https://leetcode.com/problems/my-calendar-iii/](https://leetcode.com/problems/my-calendar-iii/)

## Examples
```
Example 1
Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]

Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1, The first event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
myCalendarThree.book(50, 60); // return 1, The second event can be booked and is disjoint, so the maximum k-booking is a 1-booking.
myCalendarThree.book(10, 40); // return 2, The third event [10, 40) intersects the first event, and the maximum k-booking is a 2-booking.
myCalendarThree.book(5, 15); // return 3, The remaining events cause the maximum K-booking to be only a 3-booking.
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3
```

## Analysis
The solution here uses two arrays for start and end times.
Also, the class maintains the maximum bookings events
since the counting is done in the range of given start and end times.
The book method finds left and right limits by the binary search.
To save start and end times, it uses Python's bisect.insort function.
The function insert a value to keep the array sorted.
To check the maximum bookings events, start and end times are compared within the range.
When start is less than end at the specific indices, count up and update maximum value.
Otherwise, count down.
Return the maximum value when all in the range are checked.

## Solution
```python
class MyCalendarThree:

    def __init__(self):
        self.starts = []
        self.ends = []
        self.k = 0

    def book(self, start: int, end: int) -> int:
        left = bisect.bisect_left(self.ends, start)
        right = bisect.bisect_right(self.starts, end)
        bisect.insort(self.starts, start)
        bisect.insort(self.ends, end)
        cur_cnt = 0
        i, j = left, left
        while i < right + 1 and j < right + 1:
            if self.starts[i] < self.ends[j]:
                cur_cnt += 1
                self.k = max(self.k, cur_cnt)
                i += 1
            else:
                cur_cnt -= 1
                j += 1
        return self.k
```

## Complexities
- Time: `O(n + log(n))`
- Space: `O(n)`
 
