---
layout: algo_page
group: Arrays
title: Trapping Rain Water
algo_menubar: algo_menu
tags:
- Hard
- Two Pointers
- Array
date: 2022-09-18 21:00 +0900
---

## Problem Description
> Given `n` non-negative integers representing an elevation map where the width of each bar is 1,
> compute how much water it can trap after raining.
>
> Constraints:
> - `n == height.length`
> - `1 <= n <= 2 * 10**4`
> - `0 <= height[i] <= 10**5`


## Examples
```
Example 1
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: 6 units of rain water (blue section) are being trapped.
```

```
Example 2
Input: height = [4,2,0,3,2,5]
Output: 9
```

## How to Solve

This problem might look like monotonic stack or dynamic programming.
Both work, however, two pointers approach also works well.
The trapped water is bounded by a lower height of left and right.
Keep tracking the lower height is a key to solve this problem

The pointers start from leftmost and rightmost indicies.
Set initial max heights for both left and right with the value of leftmost and rightmost indices.
To keep tracking the lower height,
take (the lower side max height - bar height at lower side height) and add it up to the total.
Then, increment the pointer and maintain the max heights.

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
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if (height.length < 3) return 0
    let left = 0, right = height.length - 1, result = 0
    let left_max = height[left], right_max = height[right]
    while (left < right) {
        if (left_max <= right_max) {
            result += left_max - height[left]
            left++
            left_max = Math.max(left_max, height[left])
        } else {
            result += right_max - height[right]
            right--
            right_max = Math.max(right_max, height[right])
        }
    }
    return result
}
```
{% endtab %}

{% tab solution Python %}
```python
class TrappingRainWater:
    def trap(self, height: List[int]) -> int:
        n  = len(height)
        if n < 3:
            return 0
        left, right, total = 0, n - 1, 0
        left_max, right_max = height[left], height[right]
        while left < right:
            if left_max <= right_max:
                total += left_max - height[left]
                left += 1
                left_max = max(left_max, height[left])
            else:
                total += right_max - height[right]
                right -= 1
                right_max = max(right_max, height[right])
        return total
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} height
# @return {Integer}
def trap(height)
  return 0 if height.length < 3
  left, right, result = 0, height.length - 1, 0
  left_max, right_max = height[left], height[right]
  while left < right
    if left_max <= right_max
      result += left_max - height[left]
      left += 1
      left_max = [left_max, height[left]].max
    else
      result += right_max - height[right]
      right -= 1
      right_max = [right_max, height[right]].max
    end
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
 
