---
layout: algo_page
group: Arrays
title: Duplicate Zeros
algo_menubar: algo_menu
tags:
- Easy
- Array
- Two Pointers
date: 2024-07-06 19:04 +0900
---
## Problem Description
> Given a fixed-length integer array `arr`, duplicate each occurrence of zero, shifting the remaining elements to the right.
>
> Note that elements beyond the length of the original array are not written. Do the above modifications to the input
> array in place and do not return anything.
>
> Constraints:
> - `1 <= arr.length <= 10**4`
> - `0 <= arr[i] <= 9`
> 
> [https://leetcode.com/problems/duplicate-zeros/](https://leetcode.com/problems/duplicate-zeros/)

## Examples
```
Example 1:

Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
```

```
Example 2:

Input: arr = [1,2,3]
Output: [1,2,3]
Explanation: After calling your function, the input array is modified to: [1,2,3]
```

## How to Solve

Two paths with two pointers are the solution taken here.
The first path counts a number of zeros.
The second path moves values in an given array.
Suppose zeros are duplicated, the new index to be updated should be
the original index + number of zeros at that index: `idx = i + count`.
If the new index is in the range, update the value.
When the new index value is zero, update the value at index + 1 to zero.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class DuplicateZeros {
public:
    void duplicateZeros(vector<int>& arr) {
        int count = 0, n = arr.size();
        for (int i = 0; i < n; ++i) {
            if (arr[i] == 0) count++;
        }
        if (count == 0) return;
        int idx;
        for (int i = n - 1; i >= 0; --i) {
            if (arr[i] == 0) count--;
            idx = i + count;
            if (idx >= n) continue;
            arr[idx] = arr[i];
            if (arr[idx] == 0 && idx < n - 1) {
                arr[idx + 1] = 0;
            }
        }
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class DuplicateZeros {
    public void duplicateZeros(int[] arr) {
        int count = 0, n = arr.length;
        for (int i = 0; i < n; ++i) {
          if (arr[i] == 0) count++;
        }
        if (count == 0) return;
        int idx;
        for (int i = n - 1; i >= 0; --i) {
          if (arr[i] == 0) count--;
          idx = i + count;
          if (idx >= n) continue;
          arr[idx] = arr[i];
          if (arr[idx] == 0 && idx < n - 1) {
            arr[idx + 1] = 0;
          }
        }
    }
}
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
# @param {Integer[]} arr
# @return {Void} Do not return anything, modify arr in-place instead.
def duplicate_zeros(arr)
    count = arr.filter {|x| x.zero? }.size
    return if count.zero?
    (arr.size - 1).downto(0) do |i|
      count -= 1 if arr[i].zero?
      idx = i + count
      next if idx >= arr.size
      arr[idx] = arr[i]
      if arr[idx].zero? && idx < arr.size - 1
        arr[idx + 1] = 0
      end
    end
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
