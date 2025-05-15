---
layout: algo_page
group: Others
title: Largest Perimeter Triangle
algo_menubar: algo_menu
tags:
- Easy
- Math
- Sorting
- Greedy
date: 2022-10-20 15:12 +0900
---

## Problem Description
> Given an integer array `nums`, return the largest perimeter of a triangle with a non-zero area, formed from three of
> these lengths. If it is impossible to form any triangle of a non-zero area, return 0.
>
> Constraints:
> - `3 <= nums.length <= 10**4`
> - `1 <= nums[i] <= 10**6`


## Examples
```
Example 1
Input: nums = [2,1,2]
Output: 5
```

```
Example 2
Input: nums = [1,2,1,10]
Output: 0
```

## Analysis

This problem requires trigonometry knowledge.
To form a triangle, 3 sides a, b, c should have the length, a + b > c, where c is the longest side.
The first step is to sort the given array, and test three elements from the biggest ones as `c`, `b`, `a`.
If the condition, `a + b > c`, satisfies, the perimeter is `a + b + c`.
If not, shift the values to take the next biggest ones since the biggest value is too big to form a triangle.
After repeating this, we'll get the answer.


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
class LargestPerimeterTriangle:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums.sort()
        for i in range(len(nums) - 3, -1, -1):
            if nums[i] + nums[i + 1] > nums[i + 2]:
                return nums[i] + nums[i + 1] + nums[i + 2]
        return 0
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Integer}
def largest_perimeter(nums)
  nums.sort!
  (nums.length-3).downto(0) do |i|
    if nums[i] + nums[i+1] > nums[i+2]
      return [nums[i], nums[i+1], nums[i+2]].sum
    end
  end
  0
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(nlog(n))`
- Space: `O(1)`
