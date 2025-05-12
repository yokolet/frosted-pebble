---
layout: algo_page
title: Minimize Maximum -- Shipping Packages in D Days
date: 2022-07-22 17:27 +0900
algo_menubar: algo_menu
hero_height: is-small
tags: [Medium, Binary Search, Array]
---

## Problem Description
> A conveyor belt has packages that must be shipped from one port to another within days days.
>
> The i-th package on the conveyor belt has a weight of `weights[i]`.
> Each day, we load the ship with packages on the conveyor belt (in the order given by weights).
> We may not load more weight than the maximum weight capacity of the ship.
>
> Return the least weight capacity of the ship that will result in all the packages on the conveyor belt
> being shipped within days days.
> 
> [https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)

## Examples
```
example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Answer: 15
Explanation: weights to be shipped each day: [[1,2,3,4,5],[6,7],[8],[9],[10]], sums: [15,13,8,9,10]
15 is the minimized largest sum when the array is splitted into 5 groups
```
```
example 2:
Input: weights = [3,2,2,4,1,4], days = 3
Answer: 6
Explanation: weights to be shipped each day: [[3,2],[2,4],[1,4]], sums: [5,6,5]
6 is the minimized largest sum when the array is splitted into 3 groups
```
```
example 3:
Input: weights = [1,2,3,1,1], days = 4
Answer: 3
Explanation: weights to be shipped each day: [[1],[2],[3],[1,1]], sums: [1,2,3,2]
3 is the minimized largest sum when the array is splitted into 4 groups
```

## How to Solve
This is one of minimize-maximum algorithm problems.
This problem has a bit of disguise and looks not the minimize-maximum.
However, if we carefully read the description, the problem is about the type of minimize-maximum.

The given weight array should be divided into groups (days) based on a certain criteria.
In this case, the criteria is the subarray sum.
It lies between the largest value in the array (left) and total sum of the array (right).
The iteration starts off from the middle of those left and right values.
Based on the middle value, the array will be split comparing the sum so far and the middle value.
In the end, some number of subarrays will be created.

Next step is to adjust the left or right values.
If the number of subarrays is less than the specified value, the middle value should be smaller to create more subarrays.
If the number of subarrays is greater than the specified value, the middle value should be greater to create less subarrays.
This way, we can find the answer.

From the analysis above, it's obvious, the problem is identical with splitting array problem.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <numeric>
#include <vector>

using namespace std;

class CapacityToShipPackagesWithinDDays {
private:
    bool check(vector<int> &weights, int days, int mid) {
        int count = 1, cur = 0;
        for (int w : weights) {
            if (cur + w <= mid) {
                cur += w;
            } else {
                count++;
                cur = w;
            }
        }
        return count <= days;
    }

public:
    int shipWithinDays(vector<int>& weights, int days) {
        int left = *max_element(weights.begin(), weights.end());
        int right = accumulate(weights.begin(), weights.end(), 0);
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(weights, days, mid)) {
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

public class CapacityToShipPackagesWithinDDays {
    private boolean check(int[] weights, int days, int mid) {
        int count = 1, cur = 0;
        for (int v : weights) {
            if (cur + v <= mid) {
                cur += v;
            } else {
                count++;
                cur = v;
            }
        }
        return count <= days;
    }
    public int shipWithinDays(int[] weights, int days) {
        int left = Arrays.stream(weights).max().getAsInt();
        int right = Arrays.stream(weights).sum();
        while (left <= right) {
            int mid = (left + right) / 2;
            if (check(weights, days, mid)) {
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
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, days) {
  const check = (mid) => {
    let count = 1, cur = 0;
    for (let w of weights) {
      if (cur + w <= mid) {
        cur += w;
      } else {
        count += 1;
        cur = w;
      }
    }
    return count <= days;
  }

  let left = Math.max(...weights);
  let right = weights.reduce((acc, v) => acc + v, 0);
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

class CapacityToShipPackagesWithinDDays:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        def check(mid):
            count, cur = 1, 0
            for w in weights:
                if cur + w <= mid:
                    cur += w
                else:
                    count += 1
                    cur = w
            return count <= days

        left, right = max(weights), sum(weights)
        while left <= right:
            mid = (left + right) // 2
            if check(mid):
                right = mid -1
            else:
                left = mid + 1
        return left
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} weights
# @param {Integer} days
# @return {Integer}
def ship_within_days(weights, days)
  check = lambda do |mid|
    count, cur = 1, 0
    weights.each do |w|
      if cur + w <= mid
        cur += w
      else
        count += 1
        cur = w
      end
    end
    count <= days
  end

  left, right = weights.max, weights.sum
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
