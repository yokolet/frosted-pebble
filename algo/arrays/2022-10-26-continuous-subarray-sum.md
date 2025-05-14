---
layout: algo_page
group: Arrays
title: Continuous Subarray Sum
algo_menubar: algo_menu
tags:
- Medium
- Prefix Sum
- Hash Table
- Array
date: 2022-10-26 21:06 +0900
---

## Problem Description
>  Given an integer array `nums` and an integer `k`, return true if nums has a continuous subarray of size at least
> two whose elements sum up to a multiple of `k`, or false otherwise.
>
> An integer `x` is a multiple of `k` if there exists an integer `n` such that `x = n * k`. `0` is always a multiple of `k`.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `0 <= nums[i] <= 10**9`
> - `0 <= sum(nums[i]) <= 2**31 - 1`
> - `1 <= k <= 2**31 - 1`
>
> [https://leetcode.com/problems/continuous-subarray-sum/](https://leetcode.com/problems/continuous-subarray-sum/)

## Examples
```
Example 1
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
```

```
Example 2
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
```

```
Example 3
Input: nums = [23,2,6,4,7], k = 13
Output: false
```

## How to Solve
This problem is very similar to [Subarray Sum Equals K](/algo/arrays/2022-10-26-subarray-sum-equals-k).
Instead of "sum equals k", it is "sum divisible by k" here.
However, we can solve this problem in the same way.
Using an accumulated sum and hash table, go through like a 2-sum.
The main differences are the hash table keys and values.
Also, how to identify the answer.

The solution starts from initializing the accumulated sum and hash table.
The hash table's key is the accumulated sum modulo k.
The value is an index.
Given that, the hash table's initial values is {0: -1}.
When going over the given array, calculate the accumulated sum.
If the accumulated sum modulo k is not in the hash table, save it along with the index.
Otherwise, check the index difference. If it satisfies the condition, return True.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <unordered_map>
#include <vector>

using namespace std;

class ContinuousSubarraySum {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        int acc = 0;
        unordered_map<int, int> memo;
        memo[0] = -1;
        for (int i = 0; i < nums.size(); ++i) {
            acc += nums[i];
            if (memo.find(acc % k) == memo.end()) {
                memo[acc % k] = i;
            } else if (i - memo[acc % k] >= 2) {
                return true;
            }
        }
        return false;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

class ContinuousSubarraySum {
    public boolean checkSubarraySum(int[] nums, int k) {
        int acc = 0;
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(0, -1);
        for (int i = 0; i < nums.length; ++i) {
          acc += nums[i];
          if (!memo.containsKey(acc % k)) {
            memo.put(acc % k, i);
          } else if (i - memo.get(acc % k) >= 2) {
            return true;
          }
        }
        return false;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
    let acc = 0, memo = new Map();
    memo.set(0, -1);
    for (let i = 0; i < nums.length; i++) {
      acc += nums[i];
      if (!memo.has(acc % k)) {
        memo.set(acc % k, i);
      } else if (i - memo.get(acc % k) >= 2) {
        return true;
      }
    }
    return false;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class ContinuousSubarraySum:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        acc, memo = 0, {0: -1}
        for idx, v in enumerate(nums):
            acc += v
            if acc % k not in memo:
                memo[acc % k] = idx
            elif idx - memo[acc % k] >= 2:
                return True
        return False
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} k
# @return {Boolean}
def check_subarray_sum(nums, k)
    acc, memo = 0, {0 => -1}
    (0...nums.size).each do |i|
      acc += nums[i]
      if !memo.has_key?(acc % k)
        memo[acc % k] = i
      elsif i - memo[acc % k] >= 2
        return true
      end
    end
    false
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
