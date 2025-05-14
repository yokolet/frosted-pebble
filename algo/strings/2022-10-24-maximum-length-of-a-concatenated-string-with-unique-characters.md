---
layout: algo_page
group: Strings
title: Maximum Length of a Concatenated String with Unique Characters
algo_menubar: algo_menu
tags:
- Medium
- String
- Bit Manipulation
- Array
date: 2022-10-24 14:43 +0900
---
## Introduction
This problem requires every combination of given array.
Each string has two conditions whether it is included or not.
The recursion might be the way to solve this problem.
Additionally, using set, bit manipulation style approach exists.
The solution here used the bit manipulation style to check the uniqueness.

## Problem Description
> You are given an array of strings `arr`. A string `s` is formed by the concatenation of a subsequence of `arr` that
> has unique characters.
>
> Return the maximum possible length of `s`.
>
> A subsequence is an array that can be derived from another array by deleting some or no elements without changing
> the order of the remaining elements.
>
> Constraints:
> - `1 <= arr.length <= 16`
> - `1 <= arr[i].length <= 26`
> - `arr[i]` contains only lowercase English letters.
>
> [https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/](https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/)

## Examples
```
Example 1
Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All the valid concatenations are:
- ""
- "un"
- "iq"
- "ue"
- "uniq" ("un" + "iq")
- "ique" ("iq" + "ue")
Maximum length is 4.
```

```
Example 2
Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").
```

```
Example 3
Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
Explanation: The only string in arr has all 26 characters.
```

```
Example 4
InputL arr = ["a", "abc", "d", "de", "def"]
Output: 6
```

## Analysis
The first step is to create string sets of only unique character set.
If the string in the given array is "aa," it will be omitted.
The next step is character comparison by set operations.
If the intersection of previous set is empty, take or and append it to the result array.
In the end, get the maximum length from the result array which is the answer.

## Solution
```python
class MaximumLengthOfAConcatenatedStringWithUniqueCharacters:
    def maxLength(self, arr: List[str]) -> int:
        charsets = []
        for s in arr:
            u = set(s)
            if len(u) == len(s): charsets.append(u)
        result = [set()]
        for c in charsets:
            for r in result:
                if not c & r:
                    result.append(c | r)
        return max(len(r) for r in result)
```

## Complexities
- Time: `O(2^n)`
- Space: `O(2^n)`
