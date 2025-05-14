---
layout: algo_page
group: Strings
title: Word Ladder II
algo_menubar: algo_menu
tags:
- Hard
- Breadth-First Search
- String
date: 2022-11-03 17:02 +0900
---
## Introduction
This is more difficult version of [Word Ladder](/algo/strings/2022-11-02-word-ladder).
Now, the paths from begin to end words are required.
To track the paths the solution here added a hash table to save parents of each word.
How to solve is very similar.
The breadth-first search would be a good algorithm.


## Problem Description
> A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of
> words `beginWord -> s[1] -> s[2] -> ... -> s[k]` such that:
> - Every adjacent pair of words differs by a single letter.
> - Every `s[i]` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
> - `sk == endWord`
>
> Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return all the shortest transformation
> sequences from `beginWord` to `endWord`, or an empty list if no such sequence exists. Each sequence should be
> returned as a list of the words `[beginWord, s[1], s[2], ..., s[k]]`.
>
> Constraints:
> - `1 <= beginWord.length <= 5`
> - `endWord.length == beginWord.length`
> - `1 <= wordList.length <= 500`
> - `wordList[i].length == beginWord.length`
> - `beginWord, endWord, and wordList[i]` consist of lowercase English letters.
> - `beginWord != endWord`
> - All the words in wordList are unique.
> - The sum of all shortest transformation sequences does not exceed 10**5.
>
> [https://leetcode.com/problems/word-ladder-ii/](https://leetcode.com/problems/word-ladder-ii/)

## Examples
```
Example 1
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"
```

```
Example 2
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

## Analysis
The solution starts from checking the end word is in the given word list.
If not, we don't do any, just return 0.
Instead of a queue, it uses a set to save one character changed words for the next layer.
Create a new word set which is one character changed from a to z in each index.
At the same time, the one character changed new word and current word pair are saved in the hash table to trace the path.
If the end word is in the next layer word set, traverse the hash table to find parent-child pairs.
Create a list of paths from begin to end words, which is the answer.
If all words in the next layer set are checked, update begin word set by the next layer set.

## Solution
```python
class WordLadderTwo:
    def findLadders(self, beginWord, endWord, wordList):
        """
        :type beginWord: str
        :type endWord: str
        :type wordList: List[str]
        :rtype: List[List[str]]
        """
        if endWord not in wordList: return []
        wordSet = set(wordList)
        beginSet = {beginWord}
        parents = collections.defaultdict(set)
        n = len(beginWord)
        while beginSet:
            nextLayer = set()
            wordSet -= beginSet
            for word in beginSet:
                for i in range(n):
                    prefix, suffix = word[:i], word[i+1:]
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        nextWord = prefix + c + suffix
                        if nextWord in wordSet:
                            nextLayer.add(nextWord)
                            parents[nextWord].add(word)
            if endWord in nextLayer:
                result = [[endWord]]
                while result[0][0] != beginWord:
                    result = [[pa] + r for r in result for pa in parents[r[0]]]
                return result
            beginSet = nextLayer
        return []
```

## Complexities
- Time: `O(m^2 * n)` -- m: length of each word, n: total number of words in the wordList
- Space: `O(m^2 * n)`
