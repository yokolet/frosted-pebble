---
layout: algo_page
group: Arrays
title: Partition Array Such That Maximum Difference Is K
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- Greedy
- Array
date: 2022-09-21 22:26 +0900
---

## Problem Description
> You are given an integer array `nums` and an integer `k`.
> You may partition `nums` into one or more subsequences such that
> each element in nums appears in exactly one of the subsequences.
>
> Return the minimum number of subsequences needed such that the difference between the maximum and minimum values
> in each subsequence is at most `k`.
>
> A subsequence is a sequence that can be derived from another sequence by deleting some or no elements
> without changing the order of the remaining elements.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `0 <= nums[i] <= 10**5`
> - `0 <= k <= 10**5`

## Examples
```
Example 1
Input: nums = [3,6,1,2,5], k = 2
Output: 2
Explanation:
We can partition nums into the two subsequences [3,1,2] and [6,5].
```

```
Example 2
Input: nums = [1,2,3], k = 1
Output: 2
Explanation:
We can partition nums into the two subsequences [1,2] and [3].
```

```
Example 3
Input: nums = [2,2,4,5], k = 0
Output: 3
Explanation:
We can partition nums into the three subsequences [2,2], [4], and [5].
```

## How to Solve

Since the given array's order does not matter, start sorting it.
We should focus only minimum and maximum in the range.
The idea of two pointers, left and right is useful here.

The initial minimum value is at index 0 since the array is sorted.
Going over sorted values one by one checking the difference between current and minimum values.
When it exceeds, update minimum values and count up.

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
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function(nums, k) {
    nums.sort((a, b) => a - b)
    let cur_min = nums[0], count = 1
    nums.forEach((num) => {
        if (num - cur_min <= k) return
        cur_min = num
        count++
    })
    return count
}
```
{% endtab %}

{% tab solution Python %}
```python
class PartitionArraySuchThatMaximumDifferenceIsK:
    def partitionArray(self, nums: List[int], k: int) -> int:
        nums.sort()
        cur_min, count = nums[0], 1
        for num in nums:
            if num - cur_min <= k:
                continue
            cur_min = num
            count += 1
        return count
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer}
def partition_array(nums, k)
  nums.sort!
  cur_min, count = nums[0], 1
  nums.each do |num|
    if num - cur_min <= k
      next
    end
    cur_min = num
    count += 1
  end
  count
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(nlog(n))`
- Space: `O(1)`
