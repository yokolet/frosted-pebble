---
layout: algo_page
group: Arrays
title: Check if All the Integers in a Range Are Covered
algo_menubar: algo_menu
tags:
- Easy
- Array
date: 2022-12-12 22:36 +0900
---
## Problem Description
> You are given a 2D integer array `ranges` and two integers `left` and `right`. Each `ranges[i] = [start[i], end[i]]`
> represents an inclusive interval between `start[i]` and `end[i]`.
>
> Return `true` if each integer in the inclusive range `[left, right]` is covered by at least one interval in ranges.
> Return `false` otherwise.
>
> An integer `x` is covered by an interval `ranges[i] = [start[i], end[i]]` if `start[i] <= x <= end[i]`.
>
> Constraints:
> - `1 <= ranges.length <= 50`
> - `1 <= start[i] <= end[i] <= 50`
> - `1 <= left <= right <= 50`
>
> [https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/](https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/)

## Examples
```
Example 1
Input: ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5
Output: true
Explanation: Every integer between 2 and 5 is covered:
- 2 is covered by the first range.
- 3 and 4 are covered by the second range.
- 5 is covered by the third range.
```

```
Example 2
Input: ranges = [[1,10],[10,20]], left = 21, right = 21
Output: false
Explanation: 21 is not covered by any range.
```

## How to Solve
The brute force solution works in this problem considering the constraints.
Check every value between left and right inclusive whether the value is included in the range.
If one of the values between left and right is not found in any range, return false.
If two loops come to the end, all values are found. Return true.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class CheckIfAllTheIntegersInARangeAreCovered {
public:
    bool isCovered(vector<vector<int>>& ranges, int left, int right) {
        for (auto i = left; i <= right; ++i) {
            bool found = false;
            for (auto &range : ranges) {
                int s = range[0], e = range[1];
                if (s <= i && i <= e) {
                    found = true;
                    break;
                }
            }
            if (!found) { return false; }
        }
        return true;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CheckIfAllTheIntegersInARangeAreCovered {
    public boolean isCovered(int[][] ranges, int left, int right) {
        for (int i = left; i <= right; ++i) {
            boolean found = false;
            for (int[] range : ranges) {
                int s = range[0], e = range[1];
                if (s <= i && i <= e) {
                    found = true;
                    break;
                }
            }
            if (!found) { return false; }
        }
        return true;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
var isCovered = function(ranges, left, right) {
  for (let i = left; i <= right; i++) {
    let found = false;
    for (const [s, e] of ranges) {
      if (s <= i && i <= e) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CheckIfAllTheIntegersInARangeAreCovered:
    def isCovered(self, ranges: List[List[int]], left: int, right: int) -> bool:
        for i in range(left, right + 1):
            found = False
            for s, e in ranges:
                if s <= i <= e:
                    found = True
                    break
            if not found:
                return False
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} ranges
# @param {Integer} left
# @param {Integer} right
# @return {Boolean}
def is_covered(ranges, left, right)
    (left..right).each do |i|
        found = false
        ranges.each do |s, e|
            if s <= i && i <= e
                found = true
                break
            end
        end
        if (!found)
            return false
        end
    end
    return true
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * m)` -- n: right - left, m: number of ranges
- Space: `O(1)`
