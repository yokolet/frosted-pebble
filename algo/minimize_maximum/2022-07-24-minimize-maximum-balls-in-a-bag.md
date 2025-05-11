---
layout: post
title: Minimize Maximum -- Minimum Limit of Balls in a Bag
date: 2022-07-24 22:59 +0900
algo_menubar: algo_menu
hero_height: is-small
tags: [Medium, Binary Search, Array]
---

## Problem Description
> You are given an integer array nums where the i-th bag contains `nums[i]` balls.
> You are also given an integer `maxOperations`.
>
> You can take any bag of balls and divide it into two new bags with a positive number of balls.
> Above operation can be performed at most maxOperations times.
> Example: `5` -> `[1, 4]` or `[2, 3]` by one operation.
> 
> Your penalty is the maximum number of balls in a bag.
> You want to minimize your penalty after the operations.
>
> Return the minimum possible penalty after performing the operations.
> 
> [https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/)

## Examples
```
example 1:
Input: nums = [9], maxOperations = 2
Answer: 3
Explanation: nums array goes: [9] -> [6,3] -> [3,3,3] by 2 operations. 
3 is the minimized largest penalty when the array elements are splitted.
```
```
example 2:
Input: nums = [2,4,8,2], maxOperations = 4
Answer: 2
Explanation: nums array goes:
[2,4,8,2] -> [2,4,4,4,2] -> [2,2,2,4,4,2] -> [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2] by 4 operations.
2 is the minimized largest penalty when the array elements are splitted.
```
```
example 3:
Input: nums = [7,17], maxOperations = 2
Answer: 7
Explanation: nums array goes: [7,17] -> [7,7,10] -> [7,7,3,7] by 2 operations.
7 is the minimized largest penalty when the array elements are splitted.
```

## How to Solve
This is one of minimize-maximum algorithm problems.
This problem has a variation compared to the basic problem of splitting array.
If we look around other minimize maximum problems, it is very close to the candies allocation to k children problem.
The problem might be as straightforward as the candies problem.
A difference is, the problem gives a number of operations rather than the number of groups to be created.

Each element of the given nums array should be divided into smaller number of pair based on a certain criteria.
The criteria is middle value of the array.

So, we will count how many elements can be divided in two based on the middle value.
The smallest value (left) can be 1, and the largest (right) will be the maximum value in the given array.
The middle value is set to `(left + right) / 2` as common binary search does.

Next step is to adjust the left or right values.
If the number of operations is less than the specified value, the middle value should be smaller to do more operations.
If the number of operations is greater than the specified value, the middle value should be greater to do less operations.
The left and right value updates follow a common way:  `right = mid - 1`, `left = mid + 1`;

When the binary search is over, we will get the answer.
The answer from the binary search is the left value.


## Solution

{% tabs solution %}

{% tab solution C++ %}

```cpp
#include <vector>
#include <numeric>

using namespace std;

class MinimumLimitOfBallsInABag {
public:
    bool check(vector<int> &nums, int maxOperations, int mid)
      {
        int count = 0;
        for (int i = 0; i < nums.size(); ++i)
          {
            if (nums[i] >= mid)
            {
              count += ceil((double)nums[i] / mid) - 1;
            }
          }
          return count <= maxOperations;
      }

    int minimumSize(vector<int>& nums, int maxOperations) {
        int left = 1, right = *max_element(nums.begin(), nums.end());
        while (left <= right)
        {
          int mid = (left + right) / 2;
          if (check(nums, maxOperations, mid))
          {
            right = mid - 1;
          }
          else
          {
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

public class MinimumLimitOfBallsInABag {
    private boolean check(int[] nums, int maxOperations, int mid) {
        int count = 0;
        for (int v : nums) {
            if (v >= mid) {
                count += Math.ceil((double)v / mid) - 1;
            }
        }
        return count <= maxOperations;
    }
    public int minimumSize(int[] nums, int maxOperations) {
        int left = 1, right = Arrays.stream(nums).max().getAsInt();
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(nums, maxOperations, mid)) {
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
 * @param {number} maxOperations
 * @return {number}
 */
var minimumSize = function(nums, maxOperations) {
  const check = (mid) => {
    let count = 0;
    for (let v of nums) {
      count += Math.ceil(v / mid) - 1
    }
    return count <= maxOperations;
  }

  let left = 1, right = Math.max(...nums);
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
from math import ceil
from typing import List


class MinimumLimitOfBallsInABag:
    def minimumSize(self, nums: List[int], maxOperations: int) -> int:
        def check(mid):
            count = 0
            for v in nums:
                if v >= mid:
                    count += ceil(v / mid) - 1
            return count <= maxOperations

        left, right = 1, max(nums)
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
# @param {Integer} max_operations
# @return {Integer}
def minimum_size(nums, max_operations)
  check = lambda do |mid|
    count = 0
    nums.each do |v|
      if v >= mid
        count += (v.to_f / mid).ceil - 1
      end
    end
    count <= max_operations
  end

  left, right = 1, nums.max
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
