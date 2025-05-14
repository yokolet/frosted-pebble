---
layout: algo_page
group: Minimize Maximum
title: Koko Eating Bananas
date: 2022-07-25 23:26 +0900
algo_menubar: algo_menu
tags: [Medium, Binary Search, Array]
---

## Problem Description
> Koko loves to eat bananas. There are `n` piles of bananas, the i-th pile has `piles[i]` bananas.
> The guards have gone and will come back in `h` hours.
>
> Koko can decide her bananas-per-hour eating speed of `k`.
> Each hour, she chooses some pile of bananas and eats `k` bananas from that pile.
> If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.
>
> Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
>
> Return the minimum integer k such that she can eat all the bananas within `h` hours.
>
> [https://leetcode.com/problems/koko-eating-bananas/](https://leetcode.com/problems/koko-eating-bananas/)

## Examples
```
example 1:
Input: piles = [3,6,7,11], h = 8
Answer: 4
Explanation: The optimal minimum eating speed is 4. At this speed, it will take 3/4->1, 6/4->2, 7/4->2, 11/4->3 hours each.
Summing up the each hours, 1 + 2 + 2 + 3 = 8. All bananas can be eaten before a guard comes back in 8 hours.
In another view, it creates subarrays: [[3],[4,2],[4,3],[4,4,3]]. The lengths of subarrays are [1,2,2,3].
Summing up the subarray lengths, we will get 8 which is the hour guard returns.
```
```
example 2:
Input: piles = [30,11,23,4,20], h = 5
Answer: 30
Explanation: Explanation: The optimal minimum eating speed is 30. At this speed, it will take
30/30->1, 11/30->1, 23/30->1, 4/30->1, 20/30->1 hours each.
Summing up the each hours, 1 + 1 + 1 + 1 + 1 = 5. All bananas can be eaten before a guard comes back in 5 hours.
```
```
example 3:
Input: piles = [30,11,23,4,20], h = 6
Answer: 23
Explanation: The optimal minimum eating speed is 23. At this speed, it will take
30/23->2, 11/23->1, 23/23->1, 4/23->1, 20/23->1 hours each.
Summing up the each hours, 2 + 1 + 1 + 1 + 1 = 6. All bananas can be eaten before a guard comes back in 6 hours.
```

## How to Solve
This is one of minimize-maximum algorithm problems.
This problem has a variation compared to the basic problem of splitting array.
If we look around other minimize maximum problems, it is very close to the balls in a bag problem.
The problem looks almost the same idea as the balls in a bag problem.
A difference is, the problem here doesn't split elements in the given array.

In this problem, each element of the given piles array will be used to calculate eating speed based on a certain criteria.
The criteria is the middle value of the array.
So, we will count necessary hours to consume each elements when consume speed is the middle value.
If a division leaves a reminder, it needs plus one hour for the pile.
The smallest value (left) can be 1, and the largest (right) will be the maximum value in the given array.
The middle value is set to `(left + right) / 2` as normal binary search.

Next step is to adjust the left or right values.
If the total hours to consume bananas is less than the specified value,
the middle value should be smaller to use more total hours.
If the total hours to consume bananas is greater than the specified value,
the middle value should be greater to use less hours.
The left and right value updates follow a common way:  `right = mid - 1`, `left = mid + 1`;

When the binary search is over, we will get the answer.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>
#include <numeric>

using namespace std;

class KokoEatingBananas
{
private:
  bool check(vector<int> &piles, int h, int mid)
  {
    long count = 0;
    for (int i = 0; i < piles.size(); ++i)
    {
      count += ceil((double)piles[i] / mid);
    }
    return count <= h;
  }

public:
  int minEatingSpeed(vector<int> &piles, int h)
  {
    int n = piles.size();
    int left = 1, right = *max_element(piles.begin(), piles.end());
    while (left <= right)
    {
      int mid = (left + right) / 2;
      if (check(piles, h, mid))
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

class KokoEatingBananas {
    private boolean check(int[] piles, int h, int mid) {
        long count = 0;
        for (int v : piles) {
            count += (long)Math.ceil((double)v / mid);
        }
        return count <= h;
    }

    public int minEatingSpeed(int[] piles, int h) {
        int left = 1, right = Arrays.stream(piles).max().getAsInt();
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(piles, h, mid)) {
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
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
  const check = (mid) => {
    let count = 0;
    for (let v of piles) {
      count += Math.ceil(v / mid);
    }
    return count <= h;
  }

  let left = 1, right = Math.max(...piles);
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

class KokoEatingBananas:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        def check(mid):
            count = 0
            for v in piles:
                count += ceil(v / mid)
            return count <= h

        left, right = 1, max(piles)
        while left <= right:
            mid = (left + right) // 2
            if (check(mid)):
                right = mid - 1
            else:
                left = mid + 1
        return left
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} piles
# @param {Integer} h
# @return {Integer}
def min_eating_speed(piles, h)
  check = lambda do |mid|
    count = 0
    piles.each do |v|
      count += (v.to_f / mid).ceil
    end
    count <= h
  end

  left, right = 1, piles.max
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
- Time: O(n log(m)) – n: length of the input array, m: maximum value in the input array
- Space: O(1)
