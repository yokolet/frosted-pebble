---
layout: algo_page
group: Arrays
title: Remove Duplicates from Sorted Array
algo_menubar: algo_menu
tags:
- Easy
- Array
- Two Pointers
date: 2024-07-08 15:40 +0900
---
## Problem Description
> Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique
> element appears only once. The relative order of the elements should be kept the same. Then return the number of
> unique elements in nums.
>
> Consider the number of unique elements of `nums` to be `k`, to get accepted, you need to do the following things:
> - Change the array nums such that the first `k` elements of nums contain the unique elements in the order
>   they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
> - Return `k`.
>
> Constraints:
> - `1 <= nums.length <= 3 * 10**4`
> - `-100 <= nums[i] <= 100`
> - `nums` is sorted in non-decreasing order.
>
> [https://leetcode.com/problems/remove-duplicates-from-sorted-array/](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

## Examples
```
Example 1:

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

```
Example 2:

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

## How to Solve

Two-pointers are a good approach here. Since swapping values is not required, only unique values should be
put in the nums one by one. One pointer goes one by one, while another pointer increments only when the value
is not the same as the previous one.

As for Ruby code, another simple and easy solution is added. Since the length of the given array doesn't matter,
call array's `uniq!` method then return the size. This solution works well.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class RemoveDuplicatesFromSortedArray {
public:
    int removeDuplicates(vector<int>& nums) {
        int idx = 0, prev = -101;
        for (int i = 0; i < nums.size(); ++i) {
          if (nums[i] != prev) {
            nums[idx] = nums[i];
            prev = nums[idx];
            idx++;
          }
        }
        return idx;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class RemoveDuplicatesFromSortedArray {
    public int removeDuplicates(int[] nums) {
        int idx = 0, prev = -101;
        for (int i = 0; i < nums.length; ++i) {
          if (nums[i] != prev) {
            nums[idx] = nums[i];
            prev = nums[idx];
            idx++;
          }
        }
        return idx;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let idx = 0, prev = -101;
    for (let i = 0; i < nums.length; ++i) {
      if (nums[i] !== prev) {
        nums[idx] = nums[i]
        prev = nums[idx];
        idx++;
      }
    }
    return idx;
};
```
{% endtab %}

{% tab solution Python %}
```python

```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Integer}
def remove_duplicates(nums)
  nums.uniq!
  nums.size
end

def remove_duplicates(nums)
  idx, prev = 0, -101
  0.upto(nums.size - 1) do |i|
    if nums[i] != prev
      nums[idx] = nums[i]
      prev = nums[idx]
      idx += 1;
    end
  end
  idx
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
