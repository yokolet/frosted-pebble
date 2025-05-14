---
layout: algo_page
group: Dynamic Programming
title: Minimum Swaps To Make Sequences Increasing
algo_menubar: algo_menu
tags:
- Hard
- Dynamic Programming
date: 2023-01-25 17:29 +0900
---
## Problem Description
> You are given two integer arrays of the same length `nums1` and `nums2`. In one operation, you are allowed to swap
> `nums1[i]` with `nums2[i]`.
> - For example, if `nums1 = [1,2,3,8]`, and `nums2 = [5,6,7,4]`, you can swap the element at `i = 3` to obtain
>     `nums1 = [1,2,3,4]` and `nums2 = [5,6,7,8]`.
>
> Return the minimum number of needed operations to make `nums1` and `nums2` strictly increasing. The test cases are
> generated so that the given input always makes it possible.
>
> An array `arr` is strictly increasing if and only if `arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1]`.
>
> Constraints:
> - `2 <= nums1.length <= 10**5`
> - `nums2.length == nums1.length`
> - `0 <= nums1[i], nums2[i] <= 2 * 10**5`
>
> [https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/)

## Examples
```
Example 1
Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Output: 1
Explanation: 
Swap nums1[3] and nums2[3]. Then the sequences are:
nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
which are both strictly increasing.
```

```
Example 2
Input: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
Output: 1
```

## How to Solve
The approach taken here is a sort of bottom up dynamic programming.
We should consider two cases and two actions each. In total, four outcomes are there.
- case 1: nums1[i - 1] < nums1[i] and nums2[i - 1] < nums2[i]
  - action 1: keep original values: `cur_keep = keep`
  - action 2: swap at i - 1 and keep at i: `cur_swap = swap + 1`
- case 2: nums1[i - 1] < nums2[i] and nums2[i - 1] < nums1[i]
  - action 1: keep original at i - 1 and swap at i: min(cur_keep, swap)
  - action 2: swap at i - 1 and keep original at i: min(cur_swap, keep + 1)

Repeat above one by one to the end.
The answer is the minimum of two conditions: keep or swap.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MinimumSwapsToMakeSequencesIncreasing {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int keep = 0, swap = 1;
        for (int i = 1; i < n; ++i) {
            int cur_keep = n, cur_swap = n;
            if (nums1[i - 1] < nums1[i] && nums2[i - 1] < nums2[i]) {
                cur_keep = keep;
                cur_swap = swap + 1;
            }
            if (nums2[i - 1] < nums1[i] && nums1[i - 1] < nums2[i]) {
                cur_keep = min(cur_keep, swap);
                cur_swap = min(cur_swap, keep + 1);
            }
            keep = cur_keep;
            swap = cur_swap;
        }
        return min(keep, swap);
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
class MinimumSwapsToMakeSequencesIncreasing:
    def minSwap(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        keep, swap = 0, 1
        for i in range(1, n):
            cur_keep, cur_swap = n, n
            if nums1[i - 1] < nums1[i] and nums2[i - 1] < nums2[i]:
                cur_keep = keep
                cur_swap = swap + 1
            if nums2[i - 1] < nums1[i] and nums1[i - 1] < nums2[i]:
                cur_keep = min(cur_keep, swap)
                cur_swap = min(cur_swap, keep + 1)
            keep, swap = cur_keep, cur_swap
        return min(keep, swap)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
