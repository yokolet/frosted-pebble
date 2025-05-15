---
layout: algo_page
group: Arrays
title: Find Original Array From Doubled Array
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Sorting
- Greedy
- Array
date: 2022-09-15 12:58 +0900
---
## Introduction
This problem needs a frequency table.
While checking the doubled value is in the frequency table,
the count should be decremented not to use the same value more than once.

## Problem Description
> An integer array `original` is transformed into a doubled array changed by
> appending twice the value of every element in original,
> and then randomly shuffling the resulting array.
>
> Given an array `changed`, return `original` if changed is a doubled array.
> If `changed` is not a doubled array, return an empty array.
> The elements in `original` may be returned in any order.
>
> Constraints:
> - `1 <= changed.length <= 10**5`
> - `0 <= changed[i] <= 10**5`
>
> [https://leetcode.com/problems/find-original-array-from-doubled-array/](https://leetcode.com/problems/find-original-array-from-doubled-array/)

## Examples
```
Example 1:
Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: One possible original array could be [1,3,4], [3,1,4] and any order
```

```
Example 2:
Input: changed = [6,3,0,1]
Output: []
Explanation: changed is not a doubled array.
```

```
Example 3:
Input: changed = [1]
Output: []
Explanation: changed is not a doubled array.
```

## Analysis
The first step is to create a frequency table and sort the given array.
Start from smallest value and check its doubled value exists and whose count is more than 0.
If it does, add the value to the result array and count down.
This way, we get the answer.

## Solution
```python
class FindOriginalArrayFromDoubledArray:
    def findOriginalArray(self, changed: List[int]) -> List[int]:
        freq = collections.Counter(changed)
        changed.sort()
        original = []
        for v in changed:
            if freq[v]:
                freq[v] -= 1
                twice = v * 2
                if twice in freq and freq[twice] > 0:
                    freq[twice] -= 1
                    original.append(v)
                else:
                    return []
        return original
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
