---
layout: algo_page
group: Strings
title: Palindrome Pairs
algo_menubar: algo_menu
tags:
- Hard
- Hash Table
- String
- Array
- Trie
date: 2022-09-17 11:46 +0900
---
## Introduction
The problem asks about a palindrome, which means we should find a reversed word in some form.
Just concatenating two whole words (one is reversed) is not enough.
We should think about each word's prefix and suffix.
If the reversed of prefix or suffix is in the word list, it's possible to create a palindrome.

## Problem Description
> Given a list of unique `words`, return all the pairs of the distinct indices `(i, j)`
> in the given list, so that the concatenation of the two words `words[i] + words[j]` is a palindrome.
>
> Constraints:
> - `1 <= words.length <= 5000`
> - `0 <= words[i].length <= 300`
> - `words[i]` consists of lower-case English letters.
>
> [https://leetcode.com/problems/palindrome-pairs/](https://leetcode.com/problems/palindrome-pairs/)

## Examples
```
Example 1:
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]
```

```
Example 2:
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]
```

```
Example 3:
Input: words = ["a",""]
Output: [[0,1],[1,0]]
```

## Analysis
For the first step, create a reversed word to index map.
Then go over each word one by one.
Each word's all possible prefix/suffix combinations should be checked.
If the map has prefix's reversed and it is not the same index with a current word,
the reversed word can be added to the end of current word.
However, the suffix (to be a middle part) should be a palindrome itself.
The same check will be done on the suffix as well.
The reversed word can be added before the current word.

## Solution
```python
class PalindromePairs:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        n = len(words)
        result = []
        revwords = {w[::-1]: i for i, w in enumerate(words)}
        for i in range(n):
            word = words[i]
            for j in range(len(word) + 1):
                prefix, suffix = word[:j], word[j:]
                if prefix in revwords and\
                    revwords[prefix] != i and\
                    suffix == suffix[::-1]:
                    result.append([i, revwords[prefix]])
                if j > 0 and\
                    suffix in revwords and\
                    revwords[suffix] != i and\
                    prefix == prefix[::-1]:
                    result.append([revwords[suffix], i])
        return result
```

## Complexities
- Time: `O(n*m)` -- n: length of words, m: length of the longest word in words
- Space: `O(n)`
