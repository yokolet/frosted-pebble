---
layout: algo_page
group: Arrays
title: Move Zeroes
algo_menubar: algo_menu
tags:
- Easy
- Array
- Two Pointers
date: 2024-07-08 23:32 +0900
---
## Problem Description
> Given an integer array `nums`, move all 0's to the end of it while maintaining the relative order of
> the non-zero elements.
>
> __Note__ that you must do this in-place without making a copy of the array.
>
> Constraints:
> - `1 <= nums.length <= 10**4`
> - `-2**31 <= nums[i] <= 23**1 - 1`
>
> [https://leetcode.com/problems/move-zeroes/](https://leetcode.com/problems/move-zeroes/)

## Examples
```
Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

```
Example 2:

Input: nums = [0]
Output: [0]
```

## How to Solve

Two pointers are a good approach.
A left pointer saves the position to be updated with non-zero value.
A right pointer goes one by one.
When the current value at the right is not zero, swap the values on the left and right positions.
Then, increment the left.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MoveZeroes {
public:
    void moveZeroes(vector<int>& nums) {
      for (int i = 0, j = 0; i < nums.size(); ++i) {
        if (nums[i] != 0) {
          swap(nums[j++], nums[i]);
        }
      }
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class MoveZeroes {
    public void moveZeroes(int[] nums) {
      int tmp;
      for (int i = 0, j = 0; i < nums.length; ++i) {
        if (nums[i] != 0) {
          tmp = nums[i];
          nums[i] = nums[j];
          nums[j] = tmp;
          j++;
        }
      }
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for (let i = 0, j = 0; i < nums.length; ++i) {
      if (nums[i] != 0) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        j++;
      }
    }
};
```
{% endtab %}

{% tab solution Python %}
```python
class MoveZeroes:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        j = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[j], nums[i] = nums[i], nums[j]
                j += 1
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Void} Do not return anything, modify nums in-place instead.
def move_zeroes(nums)
    j = 0
    0.upto(nums.size - 1) do |i|
      if nums[i] != 0
        nums[i], nums[j] = nums[j], nums[i]
        j += 1
      end
    end
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
