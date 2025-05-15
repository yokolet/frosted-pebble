---
layout: algo_page
group: Others
title: Find Triangular Sum of an Array
algo_menubar: algo_menu
tags:
- Medium
- Math
- Array
date: 2022-09-10 23:16 +0900
---

## Problem Description
> You are given a 0-indexed integer array `nums,` where `nums[i]` is a digit between 0 and 9 (inclusive).
> The triangular sum of `nums` is the value of the only element present in nums
> after the following process terminates:
> 1. Let nums comprise of `n` elements. If `n == 1`, end the process.
>    Otherwise, create a new 0-indexed integer array `newNums` of length `n - 1`.
> 2. For each index `i`, where `0 <= i < n - 1`, assign the value of `newNums[i]` as `(nums[i] + nums[i+1]) % 10`,
>    where `%` denotes modulo operator.
> 3. Replace the array `nums` with `newNums`.
> 4. Repeat the entire process starting from step 1.
> Return the triangular sum of `nums`.
>
> Constraints:
> - `1 <= nums.length <= 1000`
> - `0 <= nums[i] <= 9`


## Examples
```
Example 1:
Input: nums = [1,2,3,4,5]
Output: 8

1, 2, 3, 4, 5
3, 5, 7, 9
8, 2, 6
0, 8,
8
```

```
Example 2:
Input: nums = [5]
Output: 5
```

## How to Solve

This is a math problem.
The brute force solution in Python barely passes all tests, however, it is very slow.
To finds an optimal solution, some mathematical insight is required.

The mathematical solution is from combination idea:
each number is multiplied by the number of routes to the top.
In the solution, this number is "`cnk`".
Additionally, the calculation uses: `(a % 10 + b % 10) % 10 = (a + b) % 10`.

For a reference, Python has a brute force solution as well.

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
class FindTriangularSumOfAnArrayMath:
    def triangularSum(self, nums: List[int]) -> int:
        n = len(nums)-1
        total = 0
        cnk = 1
        for i in range(len(nums)):
            total += nums[i] * cnk
            total %= 10
            cnk = cnk * (n-i) // (i+1)
        return total

class FindTriangularSumOfAnArrayBF:
    def triangularSum(self, nums: List[int]) -> int:
        n, prev = len(nums), nums
        for _ in range(n - 1):
            cur = []
            for i in range(len(prev) - 1):
                cur.append((prev[i] + prev[i + 1]) % 10)
            prev = cur
        return prev[0]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Integer}
def triangular_sum(nums)
  n = nums.length - 1
  total, cnk = 0, 1
  nums.each_with_index do |num, i|
    total += num * cnk
    total %= 10
    cnk = cnk * (n - i) / (i + 1)
  end
  total
end
```
{% endtab %}

{% endtabs %}

## Complexities
- Time: `O(n)` -- math solution, `O(n^2)` -- brute force solution
- Space: `O(1)` -- math solution, `O(n)` -- brute force solution
