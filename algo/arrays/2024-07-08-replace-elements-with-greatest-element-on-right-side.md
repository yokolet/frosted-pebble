---
layout: algo_page
group: Arrays
title: Replace Elements with Greatest Element on Right Side
algo_menubar: algo_menu
tags:
- Easy
- Array
date: 2024-07-08 22:53 +0900
---
## Problem Description
> Given an array `arr`, replace every element in that array with the greatest element among the elements to its right,
> and replace the last element with -1.
>
> After doing so, return the array.
>
> Constraints:
> - `1 <= arr.length <= 10**4`
> - `1 <= arr[i] <= 10**5`
>
> [https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/)

## Examples
```
Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation: 
- index 0 --> the greatest element to the right of index 0 is index 1 (18).
- index 1 --> the greatest element to the right of index 1 is index 4 (6).
- index 2 --> the greatest element to the right of index 2 is index 4 (6).
- index 3 --> the greatest element to the right of index 3 is index 4 (6).
- index 4 --> the greatest element to the right of index 4 is index 5 (1).
- index 5 --> there are no elements to the right of index 5, so we put -1.
```

```
Example 2:

Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.
```

## How to Solve

The problem asks the greatest value of the right side of the current index.
In such type of problems, it's better to start from the last to first index.
While checking values one by one from right to left, the greatest value at each index can be found
by comparing the value at index and maximum value so far.
Also, while checking the greater values, update the value at the current index.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ReplaceWithGreatestOnRightSide {
public:
    vector<int> replaceElements(vector<int>& arr) {
        int max_v = -1, n = arr.size(), tmp;
        for (int i = n - 1; i >= 0; --i) {
          tmp = arr[i];
          arr[i] = max_v;
          max_v = max(max_v, tmp);
        }
        return arr;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ReplaceWithGreatestOnRightSide {
    public int[] replaceElements(int[] arr) {
        int max_v = -1, n = arr.length, tmp;
        for (int i = n - 1; i >= 0; --i) {
          tmp = arr[i];
          arr[i] = max_v;
          max_v = Math.max(max_v, tmp);
        }
        return arr;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
    const n = arr.length;
    let max_v = -1, tmp;
    for (let i = n - 1; i >= 0; --i) {
      tmp = arr[i];
      arr[i] = max_v;
      max_v = Math.max(max_v, tmp);
    }
    return arr;
};
```
{% endtab %}

{% tab solution Python %}
```python

```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} arr
# @return {Integer[]}
def replace_elements(arr)
    max_v, n = -1, arr.size
    (n - 1).downto(0) do |i|
      tmp = arr[i]
      arr[i] = max_v
      max_v = [max_v, tmp].max
    end
    arr
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
