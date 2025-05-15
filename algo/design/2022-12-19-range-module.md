---
layout: algo_page
group: Design
title: Range Module
algo_menubar: algo_menu
tags:
- Hard
- Binary Search
- Design
- Array
date: 2022-12-19 16:22 +0900
---
## Problem Description
> A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented
> as half-open intervals and query about them.
>
> A half-open interval `[left, right)` denotes all the real numbers `x` where `left <= x < right`.
> 
> Implement the RangeModule class:
> - `RangeModule()` Initializes the object of the data structure.
> - `void addRange(int left, int right)` Adds the half-open interval `[left, right)`, tracking every real number in
>     that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers
>     in the interval `[left, right)` that are not already tracked.
> - `boolean queryRange(int left, int right)` Returns true if every real number in the interval `[left, right)` is
>     currently being tracked, and false otherwise.
> - `void removeRange(int left, int right)` Stops tracking every real number currently being tracked in the half-open
>     interval `[left, right)`.
>
> Constraints:
> - `1 <= left < right <= 10**9`
> - At most 10**4 calls will be made to addRange, queryRange, and removeRange.
>
> [https://leetcode.com/problems/range-module/](https://leetcode.com/problems/range-module/)

## Examples
```
Example 1
Input:
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output:
[null, null, null, true, false, true]
Explanation:
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
```

## How to Solve
This is another range problem like: [My Calendar I](/algo/design/2022-10-07-my-calendar-i).
What data structure to use and how to maintain input data are the key to solve the problem.
The solution here took the same approach as the My Calendar I.
All start and end pairs are saved in a flat array.
The array will have values: `[left[0], right[0], left[1], right[1], ...]`.
The start position is on even indices, while the end position is on odd indicies.
Using the binary search, the solution finds lower and upper bound indicies for the given left and right values.
The range might be simply inserted, however, it might be replace left and/or right values.
If both lower and upper bound indicies are the same, it just an insertion.
If not, the existing range will be modified.
For queries, the given left and right should be on the same indicies.
If not, that means from left to right range crosses more than two ranges.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class RangeModule {
private:
    vector<int> ranges;

public:
    RangeModule() {}
    
    void addRange(int left, int right) {
        int i = lower_bound(ranges.begin(), ranges.end(), left) - ranges.begin();
        int j = upper_bound(ranges.begin(), ranges.end(), right) - ranges.begin();
        if (i != j) {
            ranges.erase(ranges.begin() + i, ranges.begin() + j);
        }
        vector<int> sub;
        if (i % 2 == 0) { sub.push_back(left); }
        if (j % 2 == 0) { sub.push_back(right); }
        ranges.insert(ranges.begin() + i, sub.begin(), sub.end());
    }
    
    bool queryRange(int left, int right) {
        int i = upper_bound(ranges.begin(), ranges.end(), left) - ranges.begin();
        int j = lower_bound(ranges.begin(), ranges.end(), right) - ranges.begin();
        return i == j && i % 2 == 1;
    }
    
    void removeRange(int left, int right) {
        int i = lower_bound(ranges.begin(), ranges.end(), left) - ranges.begin();
        int j = upper_bound(ranges.begin(), ranges.end(), right) - ranges.begin();
        if (i != j) {
            ranges.erase(ranges.begin() + i, ranges.begin() + j);
        }
        vector<int> sub;
        if (i % 2 == 1) { sub.push_back(left); }
        if (j % 2 == 1) { sub.push_back(right); }
        ranges.insert(ranges.begin() + i, sub.begin(), sub.end());
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
class RangeModule:

    def __init__(self):
        self.range = []

    def addRange(self, left: int, right: int) -> None:
        i = bisect.bisect_left(self.range, left)
        j = bisect.bisect_right(self.range, right)
        sub = []
        if i % 2 == 0:
            sub.append(left)
        if j % 2 == 0:
            sub.append(right)
        self.range[i:j] = sub


    def queryRange(self, left: int, right: int) -> bool:
        i = bisect.bisect_right(self.range, left)
        j = bisect.bisect_left(self.range, right)
        return i == j and i % 2 == 1


    def removeRange(self, left: int, right: int) -> None:
        i = bisect.bisect_left(self.range, left)
        j = bisect.bisect_right(self.range, right)
        sub = []
        if i % 2 == 1:
            sub.append(left)
        if j % 2 == 1:
            sub.append(right)
        self.range[i:j] = sub
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: addRange/removeRange - `O(n + log(n))`, queryRange - `O(log(n))`
- Space: `O(n)`
