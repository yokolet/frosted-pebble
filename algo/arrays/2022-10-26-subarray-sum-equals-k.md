---
layout: algo_page
group: Arrays
title: Subarray Sum Equals K
algo_menubar: algo_menu
tags:
- Medium
- Prefix Sum
- Hash Table
- Array
date: 2022-10-26 15:04 +0900
---

## Problem Description
> Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.
>
> A subarray is a contiguous non-empty sequence of elements within an array.
>
> Constraints:
> - `1 <= nums.length <= 2 * 10**4`
> - `-1000 <= nums[i] <= 1000`
> - `-10**7 <= k <= 10**7`


## Examples
```
Example 1
Input: nums = [1,1,1], k = 2
Output: 2
```

```
Example 2
Input: nums = [1,2,3], k = 3
Output: 2
```

## How to Solve

The problem gives us an array and asks about sum which is k.
This signals the prefix sum and hash table.
It is a kind of 2-sum problem.
That's why the hash table works.
The keys of the hash table are accumulated sums.
While going over the given array, if accumulated sum minus k exists in the table, the sum equals to k is found.

The solution here starts from initializing the accumulated value and hash table.
The value of the hash table is a number of times the accumulated value appeared.
So, the initial value is sum 0 and count 1.
While checking the array value one by one, find accumulated value minus k.
Like 2-sum problem, the accumulated sum minus k exists in the hash table, add up the count.
Then, count up at the current accumulated sum.

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
var subarraySum = function(nums, k) {
    const memo = {0: 1}
    let acc = 0, count = 0
    nums.forEach((v) => {
        acc += v
        let diff = acc - k
        if (diff in memo) count += memo[diff]
        if (acc in memo) {
            memo[acc] += 1
        } else {
            memo[acc] = 1
        }
    })
    return count
}
```
{% endtab %}

{% tab solution Python %}
```python
class SubarraySumEqualsK:
    def subarraySum(self, nums: List[int], k: int) -> int:
        acc, memo = 0, {0: 1}
        count = 0
        for v in nums:
            acc += v
            diff = acc - k
            if diff in memo:
                count += memo[diff]
            if acc in memo:
                memo[acc] += 1
            else:
                memo[acc] = 1
        return count
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer}
def subarray_sum(nums, k)
  acc, memo = 0, {0 => 1}
  count = 0
  nums.each do |v|
    acc += v
    diff = acc - k
    if memo.include?(diff)
      count += memo[diff]
    end
    if memo.include?(acc)
      memo[acc] += 1
    else
      memo[acc] = 1
    end
  end
  count
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
