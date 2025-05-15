---
layout: algo_page
group: Others
title: Maximum AND Sum of Array
algo_menubar: algo_menu
tags:
- Hard
- Bit Manipulation
- Dynamic Programming
date: 2022-12-22 00:01 +0900
---
## Problem Description
> You are given an integer array `nums` of length `n` and an integer `numSlots` such that `2 * numSlots >= n`. There
> are `numSlots` slots numbered from `1` to `numSlots`.
>
> You have to place all `n` integers into the slots such that each slot contains at most two numbers. The AND sum of
> a given placement is the sum of the bitwise AND of every number with its respective slot number.
> - For example, the AND sum of placing the numbers `[1, 3]` into slot 1 and `[4, 6]` into slot 2 is equal to
>    `(1 AND 1) + (3 AND 1) + (4 AND 2) + (6 AND 2) = 1 + 1 + 0 + 2 = 4`.
>
> Return the maximum possible AND sum of `nums` given `numSlots` slots.
>
> Constraints:
> - `n == nums.length`
> - `1 <= numSlots <= 9`
> - `1 <= n <= 2 * numSlots`
> - `1 <= nums[i] <= 15`
>
> [https://leetcode.com/problems/maximum-and-sum-of-array/](https://leetcode.com/problems/maximum-and-sum-of-array/)

## Examples
```
Example 1
Input: nums = [1,2,3,4,5,6], numSlots = 3
Output: 9
Explanation: One possible placement is [1, 4] into slot 1, [2, 6] into slot 2, and [3, 5] into slot 3. 
This gives the maximum AND sum of:
(1 AND 1) + (4 AND 1) + (2 AND 2) + (6 AND 2) + (3 AND 3) + (5 AND 3) = 1 + 0 + 2 + 2 + 3 + 1 = 9.
```

```
Exmaple 2
Input: nums = [1,3,10,4,7,1], numSlots = 9
Output: 24
Explanation: One possible placement is [1, 1] into slot 1, [3] into slot 3, [4] into slot 4, [7] into slot 7, and [10]
into slot 9.
This gives the maximum AND sum of:
(1 AND 1) + (1 AND 1) + (3 AND 3) + (4 AND 4) + (7 AND 7) + (10 AND 9) = 1 + 1 + 3 + 4 + 7 + 8 = 24.
Note that slots 2, 5, 6, and 8 are empty which is permitted.
```

## How to Solve

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MaximumANDSumOfArray {
public:
    int helper(vector<int> &nums, int numSlots, int i,
               vector<int> &memo, map<pair<int, vector<int>>, int> &seen) {
        if (i == nums.size()) { return 0; }
        if (seen.find({i, memo}) != seen.end()) {
            return seen[{i, memo}];
        }
        int result = INT_MIN;
        for (int j = 0; j < numSlots; ++j) {
            if (memo[j] < 2) {
                memo[j]++;
                int cur = (nums[i] & (j + 1)) + helper(nums, numSlots, i + 1, memo, seen);
                memo[j]--;
                result = max(result, cur);
            }
        }
        seen[{i, memo}] = result;
        return result;
    }

    int maximumANDSum(vector<int>& nums, int numSlots) {
        vector<int> memo(numSlots, 0);
        map<pair<int, vector<int>>, int> seen;
        return helper(nums, numSlots, 0, memo, seen);
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
class MaximumANDSumOfArray:
    def maximumANDSum(self, nums: List[int], numSlots: int) -> int:
        memo = [0 for _ in range(numSlots)]
        seen = {}

        def helper(i):
            if i == len(nums):
                return 0
            key = (i, ''.join([str(x) for x in memo]))
            if key in seen:
                return seen[key]
            result = float('-inf')
            for j in range(numSlots):
                if memo[j] < 2:
                    memo[j] += 1
                    cur = (nums[i] & (j + 1)) + helper(i + 1)
                    memo[j] -= 1
                    result = max(result, cur)
            seen[key] = result
            return result

        return helper(0)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O()`
- Space: `O()`
