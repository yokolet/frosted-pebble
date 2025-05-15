---
layout: algo_page
group: Arrays
title: Contains Duplicate II
algo_menubar: algo_menu
tags:
- Easy
- Hash Table
- Sliding Window
- Array
date: 2022-10-21 13:59 +0900
---

## Problem Description
> Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the
> array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `-10**9 <= nums[i] <= 10**9`
> - `0 <= k <= 10**5`
>
> [https://leetcode.com/problems/contains-duplicate-ii/](https://leetcode.com/problems/contains-duplicate-ii/)

## Examples
```
Example 1
Input: nums = [1,2,3,1], k = 3
Output: true
```

```
Example 2
Input: nums = [1,0,1,1], k = 1
Output: true
```

```
Example 3
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```

## How to Solve
This is not a difficult problem.
Multiple O(n) iterations would be the easiest, brute force approach.
However, making the solution efficient, say, O(n), needs a bit of considerations.
While we check all values from index 0 to n, what we care about is the last index of the same value only.
When the same value appears, check the last index.
If the difference is less than or equals to k, return True.

The Hash Table is a good data structure to save the value and its last index pair.
If the same value is in the Hash Table, check the difference between the last and current index.
Return true if the difference is less than or equals to k.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <unordered_map>
#include <vector>

using namespace std;

class ContainsDuplicate2 {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int i = 0; i < nums.size(); ++i) {
            if (counts.find(nums[i]) != counts.end() && i - counts[nums[i]] <= k) {
                return true;
            }
            counts[nums[i]] = i;
        }
        return false;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

class ContainsDuplicate2 {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < nums.length; ++i) {
            if (counts.containsKey(nums[i]) && i - counts.get(nums[i]) <= k) {
                return true;
            }
            counts.put(nums[i], i);
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
var containsNearbyDuplicate = function(nums, k) {
  const counts = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (counts.has(nums[i]) && i - counts.get(nums[i]) <= k) {
      return true;
    }
    counts.set(nums[i], i);
  }
  return false;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ContainsDuplicate2:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        counts = {}
        for idx, v in enumerate(nums):
            if v in counts and idx - counts[v] <= k:
                return True
            counts[v] = idx
        return False
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} k
# @return {Boolean}
def contains_nearby_duplicate(nums, k)
  counts = {}
  (0...nums.size).each do |i|
    if counts.has_key?(nums[i]) && i - counts[nums[i]] <= k
      return true
    end
    counts[nums[i]] = i
  end
  false
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
