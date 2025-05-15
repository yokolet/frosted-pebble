---
layout: algo_page
group: Design
title: My Calendar II
algo_menubar: algo_menu
tags:
- Medium
- Design
- Binary Search
date: 2022-10-07 21:30 +0900
---
## Introduction
This problem is one of my calendar series and a bit tricky one.
Since it allows double booking but not triple booking, how to save start/end values is important.
One of the solution is to use 2 arrays for no-overbooking and double booking.
When the given start and end overlaps with some elements in double booking array, it will be triple booking.
When the given start and end overlaps with some elements in no-overbooking array, it will be double booking.
Using two arrays, we can check the given start/end pair can be checked.

## Problem Description
> You are implementing a program to use as your calendar. We can add a new event if adding the event will
> not cause a triple booking.
> A triple booking happens when three events have some non-empty intersection (i.e., some moment is
> common to all the three events.).
>
> The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open
> interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.
>
> Implement the MyCalendarTwo class:
> - `MyCalendarTwo()` Initializes the calendar object.
> - `boolean book(int start, int end)` Returns `true `if the event can be added to the calendar successfully
>    without causing a triple booking. Otherwise, return `false` and do not add the event to the calendar.
>
> Constraints:
> - `0 <= start < end <= 10**9`
> - At most 1000 calls will be made to book.
>
> [https://leetcode.com/problems/my-calendar-ii/](https://leetcode.com/problems/my-calendar-ii/)

## Examples
```
Example 1
Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]

Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booke
 with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with
 the second event.
```

## Analysis
The solution here uses two arrays for no-overbooking and double-booking.
The first step is to check double-booking array whether the given start/end overlaps or not.
The second step is to check no-overbooking array.
If there's an overlap, add the start/end range to overbooking array.
If there's no overlap, add the start/end range to non-overbooking array.

## Solution
```python
class MyCalendarTwo:

    def __init__(self):
        self.bookings = []
        self.overlaps = []
        
    def book(self, start: int, end: int) -> bool:
        for s, e in self.overlaps:
            if start < e and end > s:
                return False
        for s, e in self.bookings:
            if start < e and end > s:
                self.overlaps.append((max(start, s), min(end, e)))
        self.bookings.append((start, end))
        return True
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
