---
layout: algo_page
group: Sorting and Searching
title: Median of Two Sorted Arrays
algo_menubar: algo_menu
tags:
- Hard
- Binary Search
- Array
date: 2022-12-09 17:50 +0900
---
## Problem Description
> Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of
> the two sorted arrays.
>
> The overall run time complexity should be `O(log (m+n))`.
>
> Constraints:
> - `nums1.length == m`
> - `nums2.length == n`
> - `0 <= m <= 1000`
> - `0 <= n <= 1000`
> - `1 <= m + n <= 2000`
> - `-10**6 <= nums1[i], nums2[i] <= 10**6`
>
> [https://leetcode.com/problems/median-of-two-sorted-arrays/](https://leetcode.com/problems/median-of-two-sorted-arrays/)

## Examples
```
Example 1
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

```
Example 2
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

## How to Solve
An easy solution is: merge two arrays, sort it then return the middle value(s).
However, the problem requires O(log(m + n)) time complexity, which suggests the binary search approach.
The binary search indices will be based on the shorter array.
The solution starts from the shorter array's index, mid2 = (low + high) // 2,
and the longer array's index, mid1 = m + n - mid2. 
Next, values at four indices below are compared:
- nums1's middle 2 indices -- l1 (left), r1 (right)
- nums2's middle 2 indices -- l2 (left), r2 (right)

When l1 > r2, the median exists on the left half of nums1.
So, the high value should be decreased.
When l2 > r1, the median exists on the right half of nums1.
So, the low value should be increased.
Otherwise, the values for median were found. So, calculate and return the median.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MedianOfTwoSortedArrays {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        if (m < n) {
            return findMedianSortedArrays(nums2, nums1);
        }
        if (n == 0) {
            return (nums1[(m - 1) / 2] + nums1[m / 2]) / 2.0;
        }
        int low = 0, high = n * 2;
        while (low <= high) {
            int mid2 = (low + high) / 2;
            int mid1 = m + n - mid2;
            int l1 = mid1 == 0 ? INT_MIN : nums1[(mid1 - 1) / 2];
            int l2 = mid2 == 0 ? INT_MIN : nums2[(mid2 - 1) / 2];
            int r1 = mid1 == m * 2 ? INT_MAX : nums1[mid1 / 2];
            int r2 = mid2 == n * 2 ? INT_MAX : nums2[mid2 / 2];
            if (l1 > r2) {
                low = mid2 + 1;
            } else if (l2 > r1) {
                high = mid2 - 1;
            } else {
                return ((l1 < l2 ? l2 : l1) + (r1 < r2 ? r1 : r2)) / 2.0;
            }
        }
        return 0.0;
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
class MedianOfTwoSortedArrays:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        m, n = len(nums1), len(nums2)
        if m < n:
          return self.findMedianSortedArrays(nums2, nums1)
        if n == 0:
          return (nums1[(m - 1) // 2] + nums1[m // 2]) / 2.0
        
        low, high = 0, n * 2
        while low <= high:
            mid2 = (low + high) // 2
            mid1 = m + n - mid2
            l1 = float('-inf') if mid1 == 0 else nums1[(mid1 - 1) // 2]
            l2 = float('-inf') if mid2 == 0 else nums2[(mid2 - 1) // 2]
            r1 = float('inf') if mid1 == m * 2 else nums1[mid1 // 2]
            r2 = float('inf') if mid2 == n * 2 else nums2[mid2 // 2]
            if l1 > r2:
              low = mid2 + 1
            elif l2 > r1:
              high = mid2 - 1
            else:
              return (max([l1, l2]) + min([r1, r2])) / 2.0
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums1
# @param {Integer[]} nums2
# @return {Float}

class Integer
  N_BYTES = [42].pack('i').size
  N_BITS = N_BYTES * 16
  MAX = 2 ** (N_BITS - 2) - 1
  MIN = -MAX - 1
end
INT_MIN = Integer::MIN
INT_MAX = Integer::MAX

def find_median_sorted_arrays(nums1, nums2)
  m = nums1.length
  n = nums2.length
  return find_median_sorted_arrays(nums2, nums1) if m < n
  return (nums1[(m - 1) / 2].to_f + nums1[m / 2].to_f) / 2 if n == 0

  lo, hi = 0, n * 2
  while lo <= hi do
    mid2 = (lo + hi) / 2
    mid1 = m + n - mid2
    l1 = (mid1 == 0) ? INT_MIN : nums1[(mid1 - 1) / 2]
    l2 = (mid2 == 0) ? INT_MIN : nums2[(mid2 - 1) / 2]
    r1 = (mid1 == m * 2) ? INT_MAX : nums1[(mid1 / 2)]
    r2 = (mid2 == n * 2) ? INT_MAX : nums2[(mid2 / 2)]
    if l1 > r2
      lo = mid2 + 1
    elsif l2 > r1
      hi = mid2 - 1
    else
      return ([l1, l2].max.to_f + [r1, r2].min.to_f) / 2
    end
  end
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(log(m + n))` -- m, n: lengths of two arrays
- Space: `O(1)`
