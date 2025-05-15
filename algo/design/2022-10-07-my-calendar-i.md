---
layout: algo_page
group: Design
title: My Calendar I
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
- Design
date: 2022-10-07 17:48 +0900
---

## Problem Description
> You are implementing a program to use as your calendar. We can add a new event if adding the event will not
> cause a double booking.
> A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
>
> The event can be represented as a pair of integers `start` and `end` that represents a booking on
> the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.
>
> Implement the MyCalendar class:
> - `MyCalendar()` Initializes the calendar object.
> - `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar
>    successfully without causing a double booking. Otherwise, return `false` and do not add the event to the calendar.
>
> Constraints:
> - `0 <= start < end <= 10**9`
> - At most 1000 calls will be made to book.
>
> [https://leetcode.com/problems/my-calendar-i/](https://leetcode.com/problems/my-calendar-i/)

## Examples
```
Example 1
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20,
                            but not including 20.
```

## How to Solve
This problem is one of the calendar series and a relatively easy one.
The key to solve this problem is a data structure choice.
It can be solved by saving all start/end pair in an array and checking all those ranges, however it is not efficient.

In this solution, the start and end time pair is saved in a single flat array.
The array will have values: `[start[0], end[0], start[1], end[1], ...]`.
The start times are always on the even indices, while the end times are on odd indices.
If the start time insertion point is not on even index, the range overlaps to some of existing events.
If the end time insertion point is not the same as the start time insertion point, the range overlaps also.
This way, we can check a double booking.
If it is not a double booking, insert the start and end range at the insertion point.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MyCalendar {
private:
    vector<int> bookings;

public:
    MyCalendar() {}

    bool book(int start, int end) {
        vector<int> cur{start, end};
        int left = upper_bound(bookings.begin(), bookings.end(), start) - bookings.begin();
        if (left % 2 == 1) { return false; }
        int right = lower_bound(bookings.begin(), bookings.end(), end) - bookings.begin();
        if (left != right) { return false; }
        bookings.insert(bookings.begin() + left, cur.begin(), cur.end());
        return true;
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
class MyCalendar:

    def __init__(self):
        self.bookings = []
        

    def book(self, start: int, end: int) -> bool:
        left = bisect.bisect_right(self.bookings, start)
        if left % 2 == 1:
            return False
        right = bisect.bisect_left(self.bookings, end)
        if left != right:
            return False
        self.bookings[left:left] = [start, end]
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n + log(n))`
- Space: `O(n)`
