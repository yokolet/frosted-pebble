---
layout: algo_page
group: Strings
title: Longest Palindrome
algo_menubar: algo_menu
tags:
- Easy
- Hash Table
- Counting
- Greedy
- String
date: 2022-11-03 14:57 +0900
---
## Introduction
This type of palindrome problems are there.
Like [Longest Palindrome by Concatenating Two Letter Words](/algo/strings/2022-11-03-longest-palindrome-by-concatenating-two-letter-words),
not always, the palindrome string can be created.
Often, multiple palindromes can be created.
Start from counting the characters or words.
Then, check each character whether the count is even or odd.
Count those to meet with the requirements, then we can get the answer.

## Problem Description
> Given a string `s` which consists of lowercase or uppercase letters, return the length of the longest palindrome
> that can be built with those letters.
>
> Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
>
> Constraints:
> - `1 <= s.length <= 2000`
> - `s` consists of lowercase and/or uppercase English letters only.
>
> [https://leetcode.com/problems/longest-palindrome/](https://leetcode.com/problems/longest-palindrome/)

## Examples
```
Example 1
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
```

```
Example 2
Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.
```

## Analysis
In this case, the characters are given.
Start from counting each character.
Then, go over the count table.
If the character's count is even, add the count to the result.
If the character's count is odd, one forms a center element.
Add count - 1 to the result.
In the end, if the center element is found, add 1.
This way, we can find the answer.

## Solution
```python
class LongestPalindrome:
    def longestPalindrome(self, s: str) -> int:
        counts = collections.Counter(s)
        result = 0
        center = False
        for _, cnt in counts.items():
            if cnt % 2 == 0:
                result += cnt
            else:
                result += cnt - 1
                center = True
        if center:
            result += 1
        return result
```

## Complexities
- Time: `O(n)`
- Space: `O(1)` -- characters are only lower and/or upper case english letters, 52 at most which is constant
