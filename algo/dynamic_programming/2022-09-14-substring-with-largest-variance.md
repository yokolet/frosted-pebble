---
layout: algo_page
group: Dynamic Programming
title: Substring With Largest Variance
algo_menubar: algo_menu
tags:
- Hard
- Dynamic Programming
- Array
date: 2022-09-14 16:51 +0900
---
## Introduction
The basic idea comes up easily for this problem.
Create substring and count characters.
A difference of maximum and minimum counts are the answer of the substring.
However, such brute force solution takes too long time to complete.
The key here is how to accelerate the process.

## Problem Description
> The variance of a string is defined as the largest difference between
> the number of occurrences of any 2 characters present in the string.
> Note the two characters may or may not be the same.
>
> Given a string `s` consisting of lowercase English letters only,
> return the largest variance possible among all substrings of `s`.
>
> A substring is a contiguous sequence of characters within a string.
>
> Constraints:
> - `1 <= s.length <= 10**4`
> - `s` consists of lowercase English letters.
>
> [https://leetcode.com/problems/substring-with-largest-variance/](https://leetcode.com/problems/substring-with-largest-variance/)

## Examples
```
Example 1:
Input: s = "aababbb"
Output: 3
Explanation: "babbb" has a variance 3.
```

```
Example 2:
Input: s = "abcde"
Output: 0
```

## Analysis
The solution starts from choosing two letters.
Python's permutation function takes too long for this problem.
So, a string of no-duplication is created first.
The loop goes over every two letter combinations.
Then, using an auxiliary array, calculate local max.
This leads to the ground max.

## Solution
```python
class SubstringWithLargestVariance:
    def largestVariance(self, s: str) -> int:
        def maxSubArray(nums: List[int]):
            max_v = float('-inf')
            runningSum = 0
            seen = False
            for x in nums:
                if x < 0:
                    seen = True
                runningSum += x
                if seen:
                    max_v = max(max_v, runningSum)
                else:
                    max_v = max(max_v, runningSum - 1)
                if runningSum < 0:
                    runningSum = 0
                    seen = False
            return max_v
        
        f = set()
        a = ''
        for c in s:
            if c not in f:
                a += c
            f.add(c)

        result = 0
        for i in range(len(a) - 1):
            for j in range(i + 1,len(a)):
                x, y = a[i], a[j]
                arr = []
                for c in s:
                    if c != x and c != y:
                        continue
                    elif c == x:
                        arr.append(1)
                    else:
                        arr.append(-1)
                result = max(result, maxSubArray(arr), maxSubArray([-v for v in arr]))    
        return result
```

## Complexities
- Time: `O(n^2)`
- Space: `O(n)`
