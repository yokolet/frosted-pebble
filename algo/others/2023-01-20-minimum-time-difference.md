---
layout: algo_page
group: Others
title: Minimum Time Difference
algo_menubar: algo_menu
tags:
- Medium
- Math
- Sorting
- String
date: 2023-01-20 16:33 +0900
---
## Problem Description
> Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two
> time-points in the list.
>
> Constraints:
> - `2 <= timePoints.length <= 2 * 10**4`
> - `timePoints[i]` is in the format "HH:MM".


## Examples
```
Example 1
Input: timePoints = ["23:59","00:00"]
Output: 1
```

```
Example 2
Input: timePoints = ["00:00","23:59","00:00"]
Output: 0
```

## How to Solve
A couple of key points are:
- convert time in string to minutes
- handle minimum + 1 day and maximum time

Other than that, nothing is special. Sort the minutes array and compare time difference to next time.
The problem asks the minimum time difference, so a comparison of two adjacent values is enough after sorting.
The tricky part is a time might be next day's time.
To handle this, the solution here added a time which is the minimum + 24 * 60 minutes.
When the loop is over, the minimum difference is there.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MinimumTimeDifference {
public:
    int findMinDifference(vector<string>& timePoints) {
        auto timeToMins = [](const string &t) {
            return stoi(t.substr(0, 2)) * 60 + stoi(t.substr(3, 2));
        };
        vector<int> points;
        for (auto &t : timePoints) {
            points.push_back(timeToMins(t));
        }
        sort(points.begin(), points.end());
        points.push_back(points[0] + 24 * 60);
        int min_diff = 24 * 60 + 1;
        for (int i = 1; i < points.size(); ++i) {
            min_diff = min(min_diff, points[i] - points[i - 1]);
        }
        return min_diff;
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
class MinimumTimeDifference:
    def findMinDifference(self, timePoints: List[str]) -> int:
        def timeToMins(t):
            return int(t[0:2]) * 60 + int(t[3:5])
        points = sorted([timeToMins(t) for t in timePoints])
        points.append(points[0] + 24 * 60)
        min_diff = float('inf')
        for i in range(1, len(points)):
            min_diff = min(min_diff, points[i] - points[i - 1])
        return min_diff
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} time_points
# @return {Integer}
def find_min_difference(time_points)
  points = time_points.map {|time| time_to_mins(time)}.sort
  points << points[0] + 24 * 60
  min_diff = 24 * 60 + 1
  (1...points.size).each do |i|
    min_diff = [min_diff, points[i] - points[i - 1]].min
  end
  min_diff
end

def time_to_mins(s)
  s[0, 2].to_i * 60 + s[3, 2].to_i
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(n)`
