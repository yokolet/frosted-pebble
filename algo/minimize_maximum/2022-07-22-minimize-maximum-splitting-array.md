---
layout: algo_page
title: Minimize Maximum -- Splitting Array
date: 2022-07-22 16:08 +0900
algo_menubar: algo_menu
hero_height: is-small
tags: [Hard, Binary Search, Array]
---

## Problem Description
> Given an array nums which consists of non-negative integers and an integer m,
> you can split the array into m non-empty continuous subarrays.
> Write an algorithm to minimize the largest sum among these m subarrays.
>
> [https://leetcode.com/problems/split-array-largest-sum/](https://leetcode.com/problems/split-array-largest-sum/)

## Examples
```
example 1:
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: splitted array: [[7,2,5],[10,8]], sums: [14, 18]
18 is the minimized largest sum when the array is splitted into 2 groups
```
```
example 2:
Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: splitted array: [[1,2,3],[4,5]], sums: [6, 9]
9 is the minimized largest sum when the array is splitted into 2 groups
```
```
example 3:
Input: nums = [1,4,4], k = 3
Output: 4
Explanation: splitted array: [[1],[4],[4]], sums: [1,4,4]
4 is the minimized largest sum when the array is splitted into 3 groups
```

## How to Solve
Some algorithm questions ask this sort – minimize the maximum.
In general, problems give an array and a value or values which will be a clue to split the array.
The key to solve this type is to figure out what is the criteria to split.
The patterns are similar, but we see many variations.

Well, how to solve this kind? At a glance, it looks like a dynamic programming problem.
Using memoization, bottom-up manner would lead to an answer.
However, surprisingly, the binary search approach works very well.

To solve this problem, the given array should be divided into groups based on a certain criteria.
In this case, the criteria is the subarray sum.
It lies between the largest value in the array (left) and total sum of the array (right).
The iteration starts off from the middle of those left and right values.
Based on the middle value, the array will be split comparing the sum so far and the middle value.
In the end, some number of subarrays will be created.

Next step is to adjust the left or right values.
If the number of subarrays is less than the specified value, the middle value should be smaller to create more subarrays.
If the number of subarrays is greater than the specified value, the middle value should be greater to create less subarrays.
This way, we will get the answer.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <numeric>
#include <vector>

using namespace std;

class SplitArrayLargestSum {
private:
    bool check(vector<int> &nums, int k, int mid) {
        int count = 1, cur = 0;
        for (int v : nums) {
            if (cur + v <= mid) {
                cur += v;
            } else {
                count++;
                cur = v;
            }
        }
        return count <= k;
    }

public:
    int splitArray(vector<int>& nums, int k) {
        int left = *max_element(nums.begin(), nums.end());
        int right = accumulate(nums.begin(), nums.end(), 0);
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(nums, k, mid)) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.Arrays;

public class SplitArrayLargestSum {
    private boolean check(int[] nums, int k, int mid) {
        int count = 1, cur = 0;
        for (int v : nums) {
            if (cur + v <= mid) {
                cur += v;
            } else {
                count++;
                cur = v;
            }
        }
        return count <= k;
    }

    public int splitArray(int[] nums, int k) {
        int left = Arrays.stream(nums).max().getAsInt();
        int right = Arrays.stream(nums).sum();
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(nums, k, mid)) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, k) {
  const check = (mid) => {
    let count = 1, cur = 0;
    for (let v of nums) {
      if (cur + v <= mid) {
        cur += v;
      } else {
        count += 1;
        cur = v;
      }
    }
    return count <= k;
  }

  let left = Math.max(...nums);
  let right = nums.reduce((acc, v) => acc + v, 0);
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class SplitArrayLargestSum:
    def splitArray(self, nums: List[int], k: int) -> int:
        def check(mid):
            count, cur = 1, 0
            for v in nums:
                if cur + v <= mid:
                    cur += v
                else:
                    count += 1
                    cur = v
            return count <= k

        left, right = max(nums), sum(nums)
        while left <= right:
            mid = (left + right) // 2
            if check(mid):
                right = mid - 1
            else:
                left = mid + 1
        return left
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer}
def split_array(nums, k)
  check = lambda do |mid|
    count, cur = 1, 0
    nums.each do |v|
      if cur + v <= mid
        cur += v
      else
        count += 1
        cur = v
      end
    end
    count <= k
  end

  left, right = nums.max, nums.sum
  while left <= right
    mid = (left + right) / 2
    if check.call(mid)
      right = mid - 1
    else
      left = mid + 1
    end
  end
  left
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n log(s)) – s: sum of elements in the array
- Space: O(1)
