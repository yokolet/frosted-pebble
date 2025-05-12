---
layout: algo_page
title: Minimize Maximum -- Maximum Candies Allocated to K Children
date: 2022-07-24 21:57 +0900
algo_menubar: algo_menu
hero_height: is-small
tags: [Medium, Binary Search, Array]
---

## Problem Description
> You are given a 0-indexed integer array candies.
> Each element in the array denotes a pile of candies of size candies[i].
> You can divide each pile into any number of sub piles, but you cannot merge two piles together.
>
> You are also given an integer k.
> You should allocate piles of candies to k children such that each child gets the same number of candies.
> Each child can take at most one pile of candies and some piles of candies may go unused.
>
> Return the maximum number of candies each child can get.
> 
> [https://leetcode.com/problems/maximum-candies-allocated-to-k-children/](https://leetcode.com/problems/maximum-candies-allocated-to-k-children/)

## Examples
```
example 1:
Input: candies = [5,8,6], k = 3
Answer: 5
Explanation: candies subarrays after splitting: [[5],[5,3],[5,1]].
5 is the minimized largest candies when the array is splitted.
```
```
example 2:
Input: candies = [2,5], k = 11
Answer: 0
Explanation: sum of all candies are 7. Even the shortest count of 1 won't make 11 groups.
```

## How to Solve
This is one of minimize-maximum algorithm problems.
This problem has a variation compared to the basic problem of splitting array.
If we look around other minimize maximum problems, it is very close to the cutting ribbons problem.
The problem might be more straightforward compared to the cutting ribbons.

Each element of the given candies array should be divided into smaller piles based on a certain criteria.
The criteria is a number of candies in each piles.

So, we will count how many candy piles are created based on the number of candies in each pile (middle value).
The smallest value (left) is 1, and the largest (right) will be the maximum value in the given array.
The middle value is set to `(left + right) / 2` like a normal binary search.

Next step is to adjust the left or right values.
If the number of piles is less than the specified value, the middle value should be smaller to create more piles.
If the number of piles is greater than the specified value, the middle value should be greater to create less piles.
The left and right values are updated by `right = mid - 1` and `left = mid + 1`.

When the binary search is over, we will get the answer.
Here, we should be careful. The answer from the binary search is the right value.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class MaximumCandiesAllocatedToKChildren {
private:
    bool check(vector<int> &candies, long long k, int mid) {
        long long count = 0;
        for (auto v : candies) {
            count += v / mid;
        }
        return count < k;
    }

public:
    int maximumCandies(vector<int>& candies, long long k) {
        int mid, left = 1, right = *max_element(candies.begin(), candies.end());
        while (left <= right) {
            mid = (left + right) / 2;
            if (check(candies, k, mid)) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return right;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.Arrays;

public class MaximumCandiesAllocatedToKChildren {
    private boolean check(int[] candies, long k, int mid) {
        long count = 0;
        for (int v : candies) {
            count += v / mid;
        }
        return count < k;
    }

    public int maximumCandies(int[] candies, long k) {
        int mid, left = 1, right = Arrays.stream(candies).max().getAsInt();
        while (left <= right) {
            mid = (left + right) / 2;
            if (check(candies, k, mid)) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return right;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function(candies, k) {
  const check = (mid) => {
    let count = 0;
    for (let v of candies) {
      count += Math.floor(v / mid);
    }
    return count < k;
  }

  let left = 1, right = Math.max(...candies)
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
};
```
{% endtab %}

{% tab solution Python %}
```python
from typing import List

class MaximumCandiesAllocatedToKChildren:
    def maximumCandies(self, candies: List[int], k: int) -> int:
        def check(mid):
            count = 0
            for v in candies:
                count += v // mid
            return count < k

        left, right = 1, max(candies)
        while left <= right:
            mid = (left + right) // 2
            if check(mid):
                right = mid - 1
            else:
                left = mid + 1
        return right
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} candies
# @param {Integer} k
# @return {Integer}
def maximum_candies(candies, k)
  check = lambda do |mid|
    count = 0
    candies.each do |v|
      count += v / mid
    end
    count < k
  end

  left, right = 1, candies.max
  while left <= right
    mid = (left + right) / 2
    if check.call(mid)
      right = mid - 1
    else
      left = mid + 1
    end
  end
  right
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: O(n log(s)) – s: total number of divided piles
- Space: O(1)
