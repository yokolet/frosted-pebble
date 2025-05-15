---
layout: algo_page
group: Sorting and Searching
title: Contains Duplicate III
algo_menubar: algo_menu
tags:
- Hard
- Array
- Bucket Sort
- Sliding Window
date: 2024-07-13 17:41 +0900
---
## Problem Description
> You are given an integer array `nums` and two integers `indexDiff` and `valueDiff`.
> Find a pair of indices `(i, j) `such that:
> - `i != j`
> - `abs(i - j) <= indexDiff`
> - `abs(nums[i] - nums[j]) <= valueDiff`
>
> Return true if such pair exists or false otherwise.
>
> Constraints:
> - `2 <= nums.length <= 10**5`
> - `-10**9 <= nums[i] <= 10**9`
> - `1 <= indexDiff <= nums.length`
> - `0 <= valueDiff <= 10**9`
>
> [https://leetcode.com/problems/contains-duplicate-iii/](https://leetcode.com/problems/contains-duplicate-iii/)

## Examples
```
Example 1:

Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
Output: true
Explanation: We can choose (i, j) = (0, 3).
We satisfy the three conditions:
i != j --> 0 != 3
abs(i - j) <= indexDiff --> abs(0 - 3) <= 3
abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0
```

```
Example 2:

Input: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
Output: false
Explanation: After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.
```

## How to Solve

A couple of approaches are there. The most simple one would be a double loop to find two values.
However, such naive approach easily gets a time limit exceeded error.

Using a priority queue, sorted set, or sorted list would be another solution. Depending on the choice of language,
it is possible to solve the problem, However, inside of the language provided data structure, `O(n*log(n))` sorting
runs many times.

One more effective solution is to use the idea of bucket sort.
The key of hash table takes a range of valueDiff. Calculate the key from each number in the given array and valueDiff.
If the key (or bucket) is in the hash table, the condition is satisfied.
Then, check the next bucket, which is bucket + 1. If the next bucket's value and current value's absolute difference is
within the range, the condition is satisfied.
Lastly, check the previous bucket, which is bucket - 1. If the previous bucket's value and current value's absolute
difference is within the range, the condition is satisfied.

When adding the current value to the hash table, take care to keep the hash table size to be less than or equal to indexDiff.
The bucket sort approach runs in the linear time.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ContainsDuplicateThree {
private:
    long calcKey(long x, long w) { return x < 0 ? (x + 1) / w - 1 : x / w; }
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int indexDiff, int valueDiff) {
        unordered_map<long, long> buckets;
        long w = (long)valueDiff + 1;
        for (int i = 0; i < nums.size(); ++i) {
            long x = (long)nums[i];
            long bucket = calcKey(x, w);
            if (buckets.count(bucket) != 0    // same bucket
                // successor
                || buckets.count(bucket + 1) != 0 && abs(x - buckets[bucket + 1]) < w
                //predecessor
                || buckets.count(bucket - 1) != 0 && abs(x - buckets[bucket - 1]) < w) return true;
            buckets[bucket] = x;
            if (i >= indexDiff) buckets.erase(calcKey(nums[i - indexDiff], w));
        }
        return false;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
lass ContainsDuplicateThree {
    private long calcKey(long x, long w) {
        return x < 0 ? (x + 1) / w - 1 : x / w;
    }

    public boolean containsNearbyAlmostDuplicate(int[] nums, int indexDiff, int valueDiff) {
        Map<Long, Long> buckets = new HashMap();
        long w = (long)valueDiff + 1;
        for (int i = 0; i < nums.length; ++i) {
            long x = (long)nums[i];
            long bucket = calcKey(x, w);
            
            if (buckets.containsKey(bucket)    // same bucket
                // successor
                || buckets.containsKey(bucket + 1) && Math.abs(x - buckets.get(bucket + 1)) < w
                // predecessor
                || buckets.containsKey(bucket - 1) && Math.abs(x - buckets.get(bucket - 1)) < w) return true;
            buckets.put(bucket, x);
            if (i >= indexDiff) buckets.remove(calcKey(nums[i - indexDiff], w));
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
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    const buckets = new Map();
    const w = valueDiff + 1;;
    for (let i = 0; i < nums.length; ++i) {
        let x = nums[i];
        let bucket = Math.floor(x / w);
        if (buckets.has(bucket) // samge bucket
            // successor
            || buckets.has(bucket + 1) && Math.abs(x - buckets.get(bucket + 1)) < w
            // predecessor
            || buckets.has(bucket - 1) && Math.abs(x - buckets.get(bucket - 1)) < w) {
            return true;
        }
        buckets.set(bucket, x);
        if (i >= indexDiff) {
            buckets.delete(Math.floor(nums[i - indexDiff] / w));
        }
    }
    return false;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ContainsDuplicateThree:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        buckets = {}
        w = valueDiff + 1
        for i in range(len(nums)):
            x = nums[i]
            bucket = math.floor(x / w)
            if bucket in buckets or \
            (bucket + 1) in buckets and abs(x - buckets[bucket + 1]) < w or \
            (bucket - 1) in buckets and abs(x - buckets[bucket - 1]) < w:
                return True
            buckets[bucket] = x
            if i >= indexDiff:
                del buckets[math.floor(nums[i - indexDiff] / w)]
        return False
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @param {Integer} index_diff
# @param {Integer} value_diff
# @return {Boolean}
def calc_key(x, w)
    x < 0 ? (x + 1) / w - 1 : x / w
end

def contains_nearby_almost_duplicate(nums, index_diff, value_diff)
    buckets = {}
    w = value_diff + 1
    nums.each_with_index do |x, i|
        bucket = calc_key(x, w);
        if buckets.include?(bucket) ||
            buckets.include?(bucket + 1) && (x - buckets[bucket + 1]).abs < w ||
            buckets.include?(bucket - 1) && (x - buckets[bucket - 1]).abs < w
            return true
        end
        buckets[bucket] = x
        if i >= index_diff
            buckets.delete(calc_key(nums[i - index_diff], w))
        end
    end
    false
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(min(n, k))` -- k: indexDiff
