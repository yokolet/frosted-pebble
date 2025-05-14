---
layout: algo_page
group: Strings
title: Minimum Genetic Mutation
algo_menubar: algo_menu
tags:
- Medium
- Breadth-First Search
- String
date: 2022-11-02 17:16 +0900
---
## Introduction
When words are given, and each character in the word should be replaced and checked one by one,
the breadth-first search is a good algorithm to find the answer.
Use queue to save the path (word mutation) along with the steps.
Also use a set to avoid repetition.
When the popped out word from queue is the end word, return the steps.


## Problem Description
> A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.
> Suppose we need to investigate a mutation from a gene string `start` to a gene string `end` where one mutation is
> defined as one single character changed in the gene string.
> - For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
>
> There is also a gene bank `bank` that records all the valid gene mutations. A gene must be in bank to make it a valid
> gene string.
>
> Given the two gene strings `start` and `end` and the gene bank `bank`, return the minimum number of mutations needed
> to mutate from start to end. If there is no such a mutation, return -1.
>
> Note that the starting point is assumed to be valid, so it might not be included in the bank.
>
> Constraints:
> - `start.length == 8`
> - `end.length == 8`
> - `0 <= bank.length <= 10`
> - `bank[i].length == 8`
> - `star`t, `end`, and `bank[i]` consist of only the characters `['A', 'C', 'G', 'T']`.
>
> [https://leetcode.com/problems/minimum-genetic-mutation/](https://leetcode.com/problems/minimum-genetic-mutation/)

## Examples
```
Example 1
Input: start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

```
Example 2
Input: start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2
```

```
Example 3
Input: start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
Output: 3
```

## Analysis
Use a queue data structure to save paths, in another word, mutations.
Also, save steps along with the mutated word.
While going over each word, change each character to one of ACGT.
If one-character mutated word is in the bank, add it to the queue along with current step plus one.
When the pooped out word from the queue is the end, the answer is found.

## Solution
```python
class MinimumGeneticMutation:
    def minMutation(self, start: str, end: str, bank: List[str]) -> int:
        queue = [(start, 0)]  # word, steps
        seen = {start}
        while queue:
            w, st = queue.pop(0)
            if w == end:
                return st
            for i in range(len(w)):
                neighbors = [w[:i] + c + w[i + 1:] for c in 'ACGT']
                for neigh in neighbors:
                    if neigh not in seen and neigh in bank:
                        queue.append([neigh, st + 1])
                        seen.add(neigh)
        return -1
```

## Complexities
- Time: `O(n)` -- n: length of bank
- Space: `O(1)` -- The word length is always 8. Both queue and seen have constant space.
