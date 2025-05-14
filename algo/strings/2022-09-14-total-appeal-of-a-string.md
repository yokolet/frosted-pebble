---
layout: algo_page
group: Strings
title: Total Appeal of A String
algo_menubar: algo_menu
tags:
- Hard
- Hash Table
- String
- Dynamic Programming
date: 2022-09-14 22:48 +0900
---
## Introduction


## Problem Description
> The appeal of a string is the number of distinct characters found in the string.
> - For example, the appeal of `"abbca"` is 3 because it has 3 distinct characters: `'a', 'b', and 'c'`.
>
> Given a string `s`, return the total appeal of all of its substrings.
>
> A substring is a contiguous sequence of characters within a string.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s` consists of lowercase English letters
>
> [https://leetcode.com/problems/total-appeal-of-a-string/](https://leetcode.com/problems/total-appeal-of-a-string/)

## Examples
```
Example 1:
Input: s = "abbca"
Output: 28
```

```
Example 2:
Input: s = "code"
Output: 20
```

## Analysis

## Solution
```python
class TotalAppealOfAString:
    def appealSum(self, s: str) -> int:
        count, cur, prev = 0, 0, collections.defaultdict(lambda: -1)
        for idx, c in enumerate(s):
            cur += idx - prev[c]
            prev[c] = idx
            count += cur
        return count
```

## Complexities
- Time: `O(n)`
- Space: `O(1)` -- at most 26, constant
