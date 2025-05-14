---
layout: algo_page
group: Arrays
title: Maximum Sum of Distinct Subarrays With Length K
algo_menubar: algo_menu
tags:
- Medium
- Array
- Hash Table
- Sliding Window
date: 2024-05-24 18:07 +0900
---
## Problem Description
> You are given an integer array nums and an integer `k`. Find the maximum subarray sum of all the subarrays of `nums`
> that meet the following conditions:
>
> - The length of the subarray is `k`, and
> - All the elements of the subarray are distinct.
>
> Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions,
> return 0.
>
> A subarray is a contiguous non-empty sequence of elements within an array.
>
> Constraints:
> - `1 <= k <= nums.length <= 10**5`
> - `1 <= nums[i] <= 10**5`
>
> [https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/)

## Examples
```
Example 1
Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
```

```
Example 2
Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
```

## How to Solve

Use hash table and sliding window.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MaxSumOfSubArrayLengthK {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> seen;
        long long curSum = 0, maxSum = 0;
        for (int i = 0; i < k; ++i) {
            seen[nums[i]]++;
            curSum += nums[i];
        }
        if (seen.size() == k) maxSum = max(maxSum, curSum);
        for (int i = k; i < nums.size(); ++i) {
            curSum -= nums[i - k];
            if (--seen[nums[i - k]] == 0) seen.erase(nums[i - k]);
            seen[nums[i]]++;
            curSum += nums[i];
            if (seen.size() == k) maxSum = max(maxSum, curSum);
        }
        return maxSum;
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

```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(k)`
