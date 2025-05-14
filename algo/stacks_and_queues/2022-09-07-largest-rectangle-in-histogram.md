---
layout: algo_page
group: Stacks and Queues
title: Largest Rectangle in Histogram
algo_menubar: algo_menu
tags:
- Hard
- Monotonic Stack
date: 2022-09-07 22:21 +0900
---

## Problem Description
> Given an array of integers `heights` representing the histogram's bar height
> where the width of each bar is 1, return the area of the largest rectangle in the histogram.
>
> Constraints:
> - `1 <= heights.length <= 10**5`
> - `0 <= heights[i] <= 10**4`


## Examples
```
Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

  .
6 .       █
       +---+
  .    |█ █|
  .    |█ █|
  .    |█ █|  █
  . █  |█ █|█ █
  . █ █|█ █|█ █
0 . . . . . . . .
    0         5
```

```
Example 2:
Input: heights = [2,4]
Output: 4
Explanation: one of below.

     +-+     4 .   █
4 .  |█|       .   █
  .  |█|       .+---+
  . █|█|       .|█ █|
  . █|█|       .|█ █|
0 . . .      0 . . . 
    0 1          0 1
```

## How to Solve

A couple of approaches exist to solve this problem such as two pointers or divide and conquer.
The monotonically increasing stack is another approach.
Using stack, this problem can be solved by `O(n)` performance.

The monotonic stack saves indices.
If a smaller height comes in, indices of taller heights are popped out.
While popping out, calculate the area and update the max area.
At the end, process remaining indices in the stack.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp

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
class LargestRectangleInHistogram:
    def largestRectangleArea(self, heights: List[int]) -> int:
        if not heights: return 0
        max_area, stack, n = 0, [], len(heights)
        for i in range(len(heights)):
            while stack and heights[stack[-1]] > heights[i]:
                h = heights[stack.pop()]
                w = i if len(stack) == 0 else i - stack[-1] - 1
                max_area = max(max_area, w * h)
            stack.append(i)
        while stack:
            h = heights[stack.pop()]
            w = n if len(stack) == 0 else n - stack[-1] - 1
            max_area = max(max_area, w * h)
        return max_area
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} heights
# @return {Integer}
def largest_rectangle_area(heights)
  max_area, stack, n = 0, [], heights.size
  n.times do |i|
    while stack.any? && heights[stack[-1]] > heights[i]
      h = heights[stack.pop]
      w = stack.size == 0 ? i : i - stack[-1] -1
      max_area = [max_area, w * h].max
    end
    stack.append(i)
  end
  while stack.any?
    h = heights[stack.pop]
    w = stack.empty? ? n : n - stack[-1] - 1
    max_area = [max_area, w * h].max
  end
  max_area
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
