---
layout: algo_page
group: Sorting and Searching
title: Divide Intervals Into Minimum Number of Groups
algo_menubar: algo_menu
tags:
- Medium
- Prefix Sum
- Heap (Priority Queue)
- Greedy
- Array
date: 2022-09-21 14:44 +0900
---

## Problem Description
> You are given a 2D integer array `intervals` where `intervals[i] = [left[i], right[i]]` represents
> the inclusive interval `[left[i], right[i]]`.
>
> You have to divide the intervals into one or more groups such that each interval is in exactly one group,
> and no two intervals that are in the same group intersect each other.
> Return the minimum number of groups you need to make.
>
> Two intervals intersect if there is at least one common number between them.
> For example, the intervals `[1, 5]` and `[5, 8]` intersect.
>
> Constraints:
> - `1 <= intervals.length <= 10**5`
> - `intervals[i].length == 2`
> - `1 <= left[i] <= right[i] <= 10**6`
>
> [https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/)

## Examples
```
Example 1
Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
```

```
Example 2
Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, so we can put all of them in one group.
```

## How to Solve
Interval problems have two well-used approaches.
One starts from sorting the given array and uses heap for comparison.
This type of approach is common to merging intervals problems.
Another counts plus/minus for start/end.
This approach is often useful to solve meeting room usage problems.

The solution here took the second, plus/minus, approach.
To divide into groups, we should find the maximum duplicates.
That will be the same as the minimum number of groups.
To save memory space, room usage counts are saved in a Hash Table except Java and JavaScript solution.
Java's sorted map, TreeMap, is not so fast compared to C++'s map.
In JavaScript, sorting a map is not so fast.
For those reasons, Java and JavaScript use int array of enough size.
For each interval, count up start time and count down end + 1 time.
Then, create a prefix sum ordered by the time.
The maximum value in the prefix sum is the answer.

For a reference, Python solution has the first approach, sorting and heap.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <map>
#include <vector>

using namespace std;


class DivideIntervalsIntoMinimumNumberOfGroups {
public:
    int minGroups(vector<vector<int>>& intervals) {
        map<int, int> rooms;
        for (int i = 0; i < intervals.size(); ++i) {
            rooms[intervals[i][0]]++;
            rooms[intervals[i][1] + 1]--;
        }
        int result = 0, cur = 0;
        for (auto &[key, value] : rooms) {
            cur += value;
            result = max(result, cur);
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

class DivideIntervalsIntoMinimumNumberOfGroups {
    public int minGroups(int[][] intervals) {
        int n = 1000002;
        int[] rooms = new int[n];
        for (int i = 0; i < intervals.length; ++i) {
            rooms[intervals[i][0]]++;
            rooms[intervals[i][1] + 1]--;
        }
        int result = 0;
        for (int i = 1; i < n; ++i) {
            rooms[i] += rooms[i - 1];
            result = Math.max(result, rooms[i]);
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minGroups = function(intervals) {
  const n = 1000002;
  let rooms = new Array(n).fill(0);
  for (let [s, e] of intervals) {
    rooms[s]++;
    rooms[e + 1]--;
  }
  let result = 0;
  for (let i = 1; i < n; i++) {
    rooms[i] += rooms[i - 1];
    result = Math.max(result, rooms[i]);
  }
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class DivideIntervalsIntoMinimumNumberOfGroups:
    def minGroups(self, intervals: List[List[int]]) -> int:
        rooms = collections.defaultdict(int)
        for s, e in intervals:
            rooms[s] += 1
            rooms[e + 1] -= 1
        result, cur = 0, 0
        for t in sorted(rooms):
            cur += rooms[t]
            result = max(result, cur)
        return result

    def minGroupsByHeap(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        q = []
        for s, e in intervals:
            if q and q[0] < s:
                heapq.heappop(q)
            heapq.heappush(q, e)
        return len(q)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} intervals
# @return {Integer}
def min_groups(intervals)
  rooms = {}
  intervals.each do |s, e|
    rooms[s] = (rooms[s] || 0) + 1
    rooms[e + 1] = (rooms[e + 1] || 0) - 1
  end
  result, cur = 0, 0
  rooms.sort.each do |_, value|
    cur += value
    result = [result, cur].max
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n + m)` -- n: number of intervals, m: number of unique start/end times
- Space: `O(m)`
