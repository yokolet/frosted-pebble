---
layout: algo_page
group: Arrays
title: Check If N and Its Double Exist
algo_menubar: algo_menu
tags:
- Easy
- Array
- Hash Table
date: 2024-07-08 17:04 +0900
---
## Problem Description
> Given an array `arr` of integers, check if there exist two indices `i` and `j` such that :
> - `i != j`
> - `0 <= i, j < arr.length`
> - `arr[i] == 2 * arr[j]`
>
> Constraints:
> - `2 <= arr.length <= 500`
> - `-10**3 <= arr[i] <= 10**3`
>
> [https://leetcode.com/problems/check-if-n-and-its-double-exist/](https://leetcode.com/problems/check-if-n-and-its-double-exist/)

## Examples
```
Example 1:

Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
```

```
Example 2:

Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
```

## How to Solve

A few approaches are possible to solve this problem, for example, using a hash table, two pointers, sorting and binary
search. The solution here uses a set, which is similar to the hash table. The approach is a variation of 2 Sum.
While iterating through the given array, it checks that a current value's double or a half (if the value is even)
is in the set.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class CheckIfNandItsDoubleExist {
public:
    bool checkIfExist(vector<int>& arr) {
        unordered_set<int> seen;
        for (int i = 0; i < arr.size(); ++i) {
          if (seen.count(arr[i] * 2) != 0 || (arr[i] % 2 == 0 && seen.count(arr[i] / 2) != 0)) {
            return true;
          }
          seen.insert(arr[i]);
        }
        return false;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CheckIfNandItsDoubleExist {
    public boolean checkIfExist(int[] arr) {
        Set<Integer> seen = new HashSet();
        for (int i = 0; i < arr.length; ++i) {
          if (seen.contains(arr[i] * 2) || (arr[i] % 2 == 0 && seen.contains(arr[i] / 2))) {
            return true;
          }
          seen.add(arr[i]);
        }
        return false;
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
var checkIfExist = function(arr) {
    const seen = new Set();
    for (let i = 0; i < arr.length; ++i) {
      if (seen.has(arr[i] * 2) || (arr[i] % 2 === 0 && seen.has(arr[i] / 2))) {
        return true;
      }
      seen.add(arr[i]);
    }
    return false;
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
# @return {Boolean}
def check_if_exist(arr)
    seen = Set.new
    arr.each do |v|
      if seen.include?(v * 2) || (v.even? && seen.include?(v / 2))
        return true
      end
      seen.add(v);
    end
    false
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
