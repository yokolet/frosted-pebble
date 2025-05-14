---
layout: algo_page
group: Strings
title: Word Ladder
algo_menubar: algo_menu
tags:
- Hard
- Breadth-First Search
- String
date: 2022-11-02 17:54 +0900
---
## Introduction
When words are given, and each character in the word should be replaced and checked one by one,
the breadth-first search is a good algorithm to find the answer.
However, the problem is not just the breadth-first search.
It needs some more tweak to run faster.
The solution here uses two sets to save word path from start and end.
While checking one character changed words one by one, it switches the begin and end word sets.
By doing this, the process will quickly comes to the end.

## Problem Description
> A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of
> words `beginWord -> s1 -> s2 -> ... -> sk` such that:
> - Every adjacent pair of words differs by a single letter.
> - Every `s[i]` for `1 <= i <= k` is in wordList. Note that beginWord does not need to be in `wordList`.
> - `sk == endWord`
>
> Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest
> transformation sequence from `beginWord` to `endWord`, or 0 if no such sequence exists.
>
> Constraints:
> - `1 <= beginWord.length <= 10`
> - `endWord.length == beginWord.length`
> - `1 <= wordList.length <= 5000`
> - `wordList[i].length == beginWord.length`
> - `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
> - `beginWord != endWord`
> - All the words in `wordList` are unique.
>
> [https://leetcode.com/problems/word-ladder/](https://leetcode.com/problems/word-ladder/)

## Examples
```
Example 1
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

```
Example 2
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

## Analysis
The solution starts from checking the end word is in the given word list.
If not, we don't do any, just return 0.
Instead of a queue, it uses a set to save one character changed words for the next layer.
Create a new word set which is one character changed from a to z in each index.
If the end word is found while creating the new word set, the answer is found.
Otherwise, if the created word is in the given word list, add it to the next layer set.
If all words in the next layer set are checked, switch end and start word set based on the lengths.
The shorter one will be used for the next iteration.
This way, the computation burden can stay lesser.

## Solution
```python
class WordLadder:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList: return 0
        n, visited, wordSet = len(beginWord), set(), set(wordList)
        begin_set, end_set = {beginWord}, {endWord}
        level = 1 # begin word
        while begin_set and end_set:
            level += 1
            nextLayer = set()
            for word in begin_set:
                for i in range(n):
                    prefix, suffix = word[:i], word[i+1:]
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        nextWord = prefix + c + suffix
                        if nextWord in end_set: return level
                        if nextWord in wordSet and nextWord not in visited:
                            visited.add(nextWord)
                            nextLayer.add(nextWord)
            begin_set = nextLayer
            if len(begin_set) > len(end_set):
                begin_set, end_set = end_set, begin_set
        return 0
```

## Complexities
- Time: `O(m^2 * n)` -- m: length of each word, n: total number of words in the wordList
- Space: `O(m^2 * n)`
