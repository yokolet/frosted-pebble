---
layout: algo_page
group: Sorting and Searching
title: Find First and Last Position of Element in Sorted Array
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
date: 2022-12-12 17:38 +0900
---
## Problem Description
> Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given
> `target` value.
>
> If target is not found in the array, return [-1, -1].
>
> You must write an algorithm with `O(log n)` runtime complexity.
>
> Constraints:
> - `0 <= nums.length <= 10**5`
> - `-10**9 <= nums[i] <= 10**9`
> - `nums` is a non-decreasing array.
> - `-10**9 <= target <= 10**9`
>
> [https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## Examples
```
Example 1
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

```
Example 2
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

```
Example 3
Input: nums = [], target = 0
Output: [-1,-1]
```

## How to Solve
The problem asks O(log(n)) time complexity. This means we should use the binary search.
Python and C++ have convenient binary search features in the standard library.
When the left bound is found:
- check the left bound is not the last position since such position means the given array might be empty
- check the value at left bound is the target, unless the target does not exist in the given array.

If the left bound is good, find the right bound and return the result.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class FindFirstAndLastPositionOfElementInSortedArray {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
        if (left == nums.size() || nums[left] != target) { return {-1, -1}; }
        int right = upper_bound(nums.begin(), nums.end(), target) - nums.begin() - 1;
        return {left, right};
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
class FindFirstAndLastPositionOfElementInSortedArray:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left = bisect.bisect_left(nums, target)
        if left == len(nums) or nums[left] != target: return [-1, -1]
        right = bisect.bisect_right(nums, target) - 1
        return [left, right]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(log(n))`
- Space: `O(1)`
