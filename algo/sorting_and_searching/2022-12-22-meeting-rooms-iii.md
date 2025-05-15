---
layout: algo_page
group: Sorting and Searching
title: Meeting Rooms III
algo_menubar: algo_menu
tags:
- Hard
- Heap (Priority Queue)
- Array
date: 2022-12-22 17:21 +0900
---
## Problem Description
> You are given an integer `n`. There are `n` rooms numbered from `0` to `n - 1`.
> You are given a 2D integer array `meetings` where `meetings[i] = [start[i], end[i]]` means that a meeting will be
> held during the half-closed time interval `[start[i], end[i])`. All the values of `start[i]` are unique.
>
> Meetings are allocated to rooms in the following manner:
> - Each meeting will take place in the unused room with the lowest number.
> - If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should
>    have the same duration as the original meeting.
> - When a room becomes unused, meetings that have an earlier original start time should be given the room.
>
> Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the
> lowest number.
>
> A half-closed interval `[a, b)` is the interval between `a` and `b` including `a` and not including `b`.
>
> Constraints:
> - `1 <= n <= 100`
> - `1 <= meetings.length <= 10**5`
> - `meetings[i].length == 2`
> - `0 <= start[i] < end[i] <= 5 * 10**5`
> - All the values of s`tart[i]` are unique.
>
> [https://leetcode.com/problems/meeting-rooms-iii/](https://leetcode.com/problems/meeting-rooms-iii/)

## Examples
```
Example 1
Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0.
```

```
Example 2
Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1.
```

## How to Solve
Apparently, this is a sorting problem.
A priority queue (heap) is a good data structure to sort end times along with a room number.
Also, available room numbers are saved in the priority queue since the smallest room number is used first.
The solution here starts from sorting the input meetings.
Pop out previous entries in the min heap while end time is less than the current meeting's start time.
At the same time, previously used room number is pushed to the available room queue.
After that, if a room is still available, the next meeting doesn't need to wait or to be delayed.
So, pop out the room and push the end time and room number pair to the min heap.
If no room is available, the end time should be adjusted.
Pop out the smallest end time entry from the min heap and use that room number for the next meeting.
The end time will be the popped out ent time plus current meeting's duration, end - start.
Once heap maintenance is over, count up room usage. 
In the end, the earliest index of maximum values in the result array is the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MeetingRoomsIII {
public:
    int mostBooked(int n, vector<vector<int>>& meetings) {
        priority_queue<int, vector<int>, greater<int>> available;
        for (int i = 0; i < n; ++i) {
            available.push(i);
        }
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> min_heap;
        vector<int> result(n, 0);
        sort(meetings.begin(), meetings.end());
        for (auto &meeting : meetings) {
            int start = meeting[0], end = meeting[1], room = 0;
            while (!min_heap.empty() && min_heap.top().first <= start) {
                available.push(min_heap.top().second);
                min_heap.pop();
            }
            if (!available.empty()) {
                room = available.top();
                available.pop();
                min_heap.push({end, room});
            } else {
                long long endtime = min_heap.top().first;
                room = min_heap.top().second;
                min_heap.pop();
                min_heap.push({endtime + end - start, room});
            }
            result[room]++;
        }
        return distance(result.begin(), max_element(result.begin(), result.end()));
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
class MeetingRoomsIII:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        available = [i for i in range(n)]
        heapq.heapify(available)
        min_heap = []
        result = [0 for _ in range(n)]
        for start, end in sorted(meetings):
            while min_heap and min_heap[0][0] <= start:
                _, room = heapq.heappop(min_heap)
                heapq.heappush(available, room)
            if available:
                room = heapq.heappop(available)
                heapq.heappush(min_heap, (end, room))
            else:
                endtime, room = heapq.heappop(min_heap)
                heapq.heappush(min_heap, (endtime + end - start, room))
            result[room] += 1
        return result.index(max(result))
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(n)`
