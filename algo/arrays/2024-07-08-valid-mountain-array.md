---
layout: algo_page
group: Arrays
title: Valid Mountain Array
algo_menubar: algo_menu
tags:
- Easy
- Array
date: 2024-07-08 21:34 +0900
---
## Problem Description
> Given an array of integers `arr`, return true if and only if it is a valid mountain array.
>
> Recall that `arr` is a mountain array if and only if:
> - `arr.length >= 3`
> - There exists some `i` with `0 < i < arr.length - 1` such that:
> - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
> - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`
>
> Constraints:
> - `1 <= arr.length <= 10**4`
> - `0 <= arr[i] <= 10**4`
>
> [https://leetcode.com/problems/valid-mountain-array/](https://leetcode.com/problems/valid-mountain-array/)

## Examples
```
Example 1:

Input: arr = [2,1]
Output: false
```

```
Example 2:

Input: arr = [3,5,5]
Output: false
```

```
Example 3:
Input: arr = [0,3,2,1]
Output: true
```

## How to Solve

This problem can be solved by one path. Verify an array size since it needs at least 3.
Starting from 0, increment an index while array values are strictly increasing.
Check the index when the first loop is over. The index should not be 0 or the last index of the array.
Then, again, increment the index while the array values are strictly decreasing.
At the end, check the index is the last index of array.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ValidMountainArry {
public:
    bool validMountainArray(vector<int>& arr) {
        int n = arr.size(), idx = 0;
        if (n < 3) return false;
        while (idx < n - 1 & arr[idx] < arr[idx + 1]) {
          idx++;
        }
        if (idx == 0 || idx == n - 1) return false;
        while (idx < n - 1 && arr[idx] > arr[idx + 1]) {
          idx++;
        }
        return idx == n - 1;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ValidMountainArry {
    public boolean validMountainArray(int[] arr) {
        int n = arr.length, idx = 0;
        if (n < 3) return false;
        while (idx < n - 1 && arr[idx] < arr[idx + 1]) {
          idx++;
        }
        if (idx == 0 || idx == n - 1) return false;
        while (idx < n - 1 && arr[idx] > arr[idx + 1]) {
          idx++;
        }
        return idx == n - 1;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    const n = arr.length;
    if (n < 3) return false;
    let idx = 0;
    while (idx < n - 1 && arr[idx] < arr[idx + 1]) idx++;
    if (idx == 0 || idx == n - 1) return false;
    while (idx < n - 1 && arr[idx] > arr[idx + 1]) idx++;
    return idx == n - 1;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ValidMountainArry:
    def validMountainArray(self, arr: List[int]) -> bool:
        n  = len(arr)
        idx = 0
        while idx < n - 1 and arr[idx] < arr[idx + 1]:
            idx += 1
        if idx == 0 or idx == n - 1:
            return False
        while idx < n - 1 and arr[idx] > arr[idx + 1]:
            idx += 1
        return idx == n - 1
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} arr
# @return {Boolean}
def valid_mountain_array(arr)
  n, idx = arr.size, 0
  return false if n < 3
  while idx < n - 1 && arr[idx] < arr[idx + 1]
    idx += 1
  end
  return false if idx == 0 || idx == n - 1
  while idx < n - 1 && arr[idx] > arr[idx + 1]
    idx += 1
  end
  idx == n - 1
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
