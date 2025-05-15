---
layout: algo_page
group: Arrays
title: Find the Difference of Two Arrays
algo_menubar: algo_menu
tags:
- Easy
- Array
date: 2023-02-09 13:42 +0900
---
## Problem Description
> Given two 0-indexed integer arrays `nums1` and `nums2`, return a list `answer` of size 2 where:
> - `answer[0]` is a list of all distinct integers in nums1 which are not present in nums2.
> - `answer[1]` is a list of all distinct integers in nums2 which are not present in nums1.
>
> Note that the integers in the lists may be returned in any order.
>
> Constraints:
> - `1 <= nums1.length, nums2.length <= 1000`
> - `-1000 <= nums1[i], nums2[i] <= 1000`
>
> [https://leetcode.com/problems/find-the-difference-of-two-arrays/](https://leetcode.com/problems/find-the-difference-of-two-arrays/)

## Examples
```
Example 1
Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
```

```
Example 2
Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
```

## How to Solve
Nothing is complicated in this problem.
Start from creating two sets from given two arrays since those arrays have duplicates.
The next step depends on the language.
Python has a feature to get sets difference by just a '-' (minus) operator.
Other languages don't have such handy feature, so easy way would be iterate the set one by one while
checking the presence of values in another set.
If the value is not present in another set, add it to the result array.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class FindTheDifferenceOfTwoArrays {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s1(nums1.begin(), nums1.end()), s2(nums2.begin(), nums2.end());
        vector<vector<int>> result(2, vector<int>{});
        for (auto v : s1) {
            if (s2.find(v) == s2.end()) { result[0].push_back(v); }
        }
        for (auto v : s2) {
            if (s1.find(v) == s1.end()) { result[1].push_back(v); }
        }
        return result;
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
**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function(nums1, nums2) {
  let s1 = new Set(nums1), s2 = new Set(nums2);
  let result = [[], []];
  s1.forEach(v => {
    if (!s2.has(v)) { result[0].push(v); }
  })
  s2.forEach(v => {
    if (!s1.has(v)) { result[1].push(v); }
  })
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class FindTheDifferenceOfTwoArrays:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        s1, s2 = set(nums1), set(nums2)
        return [list(s1 - s2), list(s2 -s1)]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
