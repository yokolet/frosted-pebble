---
layout: algo_page
group: Arrays
title: Product of Array Except Self
algo_menubar: algo_menu
tags:
- Medium
- Array
- Prefix Sum
date: 2024-06-20 18:58 +0900
---
## Problem Description
> Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the
> elements of `nums` except `nums[i]`.
>
> The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
>
> You must write an algorithm that runs in O(n) time and without using the division operation.
>
> Constraints:
> - `2 <= nums.length <= 10**5`
> `-30 <= nums[i] <= 30`
> - The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
>
> [https://leetcode.com/problems/product-of-array-except-self/](https://leetcode.com/problems/product-of-array-except-self/)

## Examples
```
Example 1
Input: [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

```
Example 2
Input: [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
```

## How to Solve

This is a two-path problem.
Iterate the given array twice, from the beginning to end, then from the end to beginning.
The first path computes `1, 1 * nums[0], 1 * nums[0] * nums[1], 1 * nums[0] * nums[1] * nums[2], ...`.
Save those values to a results array.
The second path computes
`results[n - 1] * 1, results[n - 2] * 1 * nums[n - 1], results[n - 3] * 1 * nums[n - 1] * nums[n - 2], ...`.
Updates results array by calculated values.
This way, we can get a result.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <iostream>
#include <vector>

using namespace std;

class ProductOfArrayExceptSelf {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size(), acc = 1;
        vector<int> results(n);
        for (int i = 0; i < n; ++i) {
            results[i] = acc;
            acc *= nums[i];
        }
        acc = 1;
        for (int i = n - 1; i >= 0; --i) {
            results[i] *= acc;
            acc *= nums[i];
        }
        return results;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ProductOfArrayExceptSelf {
    public int[] productExceptSelf(int[] nums) {
        int acc = 1, n = nums.length;
        int[] result = new int[n];
        for (int i = 0; i < n; ++i) {
          result[i] = acc;
          acc *= nums[i];
        }
        acc = 1;
        for (int i = n - 1; i >= 0; --i) {
          result[i] *= acc;
          acc *= nums[i];
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length, result = [];
    let acc = 1;
    for (let i = 0; i < n; ++i) {
      result.push(acc);
      acc *= nums[i];
    }
    acc = 1;
    for (let i = n - 1; i >= 0; --i) {
      result[i] *= acc;
      acc *= nums[i];
    }
    return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ProductOfArrayExceptSelf:
    def productExceptSelf(self, nums: 'List[int]') -> 'List[int]':
        if not nums: return []
        acc, result = 1, []
        for n in nums:
            result.append(acc)
            acc *= n
        acc = 1
        for i in range(len(nums)-1, -1, -1):
            result[i] *= acc
            acc *= nums[i]
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Integer[]}
def product_except_self(nums)
    result = Array.new(nums.size)
    n, acc = nums.size, 1
    (0...n).each do |i|
        result[i] = acc
        acc *= nums[i]
    end
    acc = 1
    (nums.size - 1).downto(0) do |i|
        result[i] *= acc
        acc *= nums[i]
    end
    result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
