---
layout: algo_page
group: Strings
title: Longest Palindrome by Concatenating Two Letter Words
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Counting
- Greedy
- String
date: 2022-11-03 14:41 +0900
---
## Introduction
This type of palindrome problems can be seen here and there.
The problem gives characters or word list to create a palindrome.
Not always, the palindrome string can be created.
Often, multiple palindromes can be created.
Start from counting the characters or words.
Then, check each character or word with a reversed word whether the count is even or odd.
If the word list is given, check the word itself is a palindrome or not.
Count those to meet with the requirements, then we can get the answer.

## Problem Description
> You are given an array of strings `words`. Each element of `words` consists of two lowercase English letters.
> Create the longest possible palindrome by selecting some elements from words and concatenating them in any order.
> Each element can be selected at most once.
>
> Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome,
> return 0.
>
> A palindrome is a string that reads the same forward and backward.
>
> Constraints:
> - `1 <= words.length <= 10**5`
> - `words[i].length == 2`
> - `words[i]` consists of lowercase English letters.
>
> [https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/](https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/)

## Examples
```
Example 1
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.
```

```
Example 2
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.
```

```
Example 3
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".
```

## Analysis
In this case, 2 letter word list is given to form a palindrome.
If the word itself is not a palindrome, add the minimum of the current and reverse word's counts to the result.
If the word itself is a palindrome, look at the count is even or odd.
When the count is odd, it goes to the center element, so add count - 1 during the iteration.
Only one of the palindrome words can make to to the center element, so in the end, add 1.
This problem gives two letter words.
The result times 2 is the length -- the answer.

## Solution
```python
class LongestPalindromeByConcatenatingTwoLetterWords:
    def longestPalindrome(self, words: List[str]) -> int:
        counts = collections.Counter(words)
        result = 0
        center = False
        for word, cnt in counts.items():
            rev = word[::-1]
            if word == rev:
                if cnt % 2 == 0:
                    result += cnt
                else:
                    center = True
                    result += cnt - 1
            else:
                result += min(cnt, counts[rev])
        if center:
            result += 1
        return 2 * result
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
