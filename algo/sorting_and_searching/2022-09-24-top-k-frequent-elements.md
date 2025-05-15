---
layout: algo_page
group: Sorting and Searching
title: Top K Frequent Elements
algo_menubar: algo_menu
tags:
- Medium
- Counting
- Heap (Priority Queue)
- Sorting
- Hash Table
- Array
date: 2022-09-24 21:05 +0900
---
## Introduction
The problem asks about a frequency of array elements.
This means we should start from getting the frequency.
Then, sort the elements based on the frequencies.

## Problem Description
> Given an integer array `nums` and an integer `k`, return the k most frequent elements.
> You may return the answer in any order.
>
> Constraints:
> - `1 <= nums.length <= 10**5`
> - `-10**4 <= nums[i] <= 10**4`
> - `k` is in the range `[1, the number of unique elements in the array]`.
> - It is guaranteed that the answer is unique.
>
> [https://leetcode.com/problems/top-k-frequent-elements/](https://leetcode.com/problems/top-k-frequent-elements/)

## Examples
```
Example 1
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

```
Example 2
Input: nums = [1], k = 1
Output: [1]
```

## Analysis
The first step is to get a frequency list.
The following steps are: sort by frequency, then get first k elements.
The first solution uses heap's push and pop, which is a basic approach.
The second solution uses Python heap's `nlargest` function.
It is straightforward and effective, but only when the function came up in our mind.

## Solution
```python
class TopKFrequentElements:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = collections.Counter(nums)
        queue = []
        for num, counts in counter.items():
            heapq.heappush(queue, (-counts, num))
        result = []
        for _ in range(k):
            _, num = heapq.heappop(queue)
            result.append(num)
        return result
```

```python
class TopKFrequentElements:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = collections.Counter(nums)
        return heapq.nlargest(k, counter.keys(), key=counter.get)
```

## Complexities
- Time: `O(nlog(n))`
- Space: `O(n)`
