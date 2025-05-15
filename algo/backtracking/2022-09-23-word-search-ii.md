---
layout: algo_page
group: Backtracking
title: Word Search II
algo_menubar: algo_menu
tags:
- Hard
- Backtracking
- Trie
- String
date: 2022-09-23 22:10 +0900
---
## Introduction
This problem looks a bit of extension of the basic word search version,
[Word Search](/algo/backtracking/2022-09-23-word-search).
At a glance, repeating the basic word search for a number of words in the list might give us the answer.
However, such solution runs very slow and leads to get a time limit exceeded error.
To accelerate the search, the trie is a good data structure to find words effectively.

## Problem Description
> Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.
>
> Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are
> horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
>
> Constraints:
> - `m == board.length`
> - `n == board[i].length`
> - `1 <= m, n <= 12`
> - `board[i][j]` is a lowercase English letter.
> - `1 <= words.length <= 3 * 10**4`
> - `1 <= words[i].length <= 10`
> - `words[i]` consists of lowercase English letters.
> - All the strings of words are unique.
>
> [https://leetcode.com/problems/word-search-ii/](https://leetcode.com/problems/word-search-ii/)

## Examples
```
Example 1
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
       words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

```
Example 2
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

## Analysis
The first step is to create a trie from the given word list.
The second step is define depth-first search using the trie.
If the current character is not in trie node's children list, the process quickly returns.
If the child node of the current character has the word, add it to the result.
For a backtracking, this solution uses the same approach as the basic one.
Set a special character to mark the visited cell in the board.
When it comes back from deeper level, make the original character back in the board.
As an additional performance tweak, delete a child node if child's children is empty.

## Solution
```python
class WordSearchTwo:
    class TrieNode:
        def __init__(self):
            self.children = {}
            self.word = None
    
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        m, n = len(board), len(board[0])
        result = set()

        def buildTrie():
            root = self.TrieNode()
            for word in words:
                cur = root
                for w in word:
                    if w not in cur.children:
                        cur.children[w] = self.TrieNode()
                    cur = cur.children[w]
                cur.word = word
            return root
        
        def dfs(row, col, parent):
            if board[row][col] not in parent.children:
                return
            w = board[row][col]
            child = parent.children[w]
            if child.word:
                result.add(child.word)
            
            board[row][col] = '#'
            next_rcs = [(next_r, next_c) for next_r, next_c in\
                        [(row - 1, col), (row, col - 1), (row, col + 1), (row + 1, col)]\
                       if 0 <= next_r < m and 0 <= next_c < n]
            for next_r, next_c in next_rcs:
                dfs(next_r, next_c, child)
            board[row][col] = w
            if not child.children:
                parent.children.pop(w)

        root = buildTrie()
        for row in range(m):
            for col in range(n):
                dfs(row, col, root)
        return list(result)
```

## Complexities
- Time: `O(m(4*3^k))` -- m: number of cells in the board, k: maximum length of words
- Space: `O(n)`  -- n: total number of letters in the dictionary
