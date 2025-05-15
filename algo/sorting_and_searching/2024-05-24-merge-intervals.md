---
layout: algo_page
group: Sorting and Searching
title: Merge Intervals
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- Array
date: 2024-05-24 14:09 +0900
---
## Problem Description
> Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals,
> and return an array of the non-overlapping intervals that cover all the intervals in the input.
>
> Constraints:
> - `1 <= intervals.length <= 10**4`
> - `intervals[i].length == 2`
> - `0 <= start_i <= end_i <= 10**4`
>
> [https://leetcode.com/problems/merge-intervals/description/](https://leetcode.com/problems/merge-intervals/description/)

## Examples
```
Example 1
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

```
Example 2
nput: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 
```

## How to Solve

Sort intervals by start time. Compare one by one.
If previous end time is less than current start time, add current.
If previous end time is greater than or equal to current start time, update previous end time by
the current end time.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MergeIntervals {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> result{intervals[0]};
        for (int i = 1; i < intervals.size(); ++i) {
            if (result.back()[1] >= intervals[i][0]) {
                result.back()[1] = max(result.back()[1], intervals[i][1]);
            } else {
                result.push_back(intervals[i]);
            }
        }
        return result;
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
class MergeIntervals:
    def merge(self, intervals: 'List[List[int]]') -> 'List[List[int]]':
        if len(intervals) < 2: return intervals
        intervals.sort(key=lambda x: x[0])
        result = [intervals[0]]
        for value in intervals[1:]:
            if result[-1][1] < value[0]:
                result.append(value)
            elif result[-1][1] < value[1]:
                result[-1][1] = value[1]
        return result
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
