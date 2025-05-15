---
layout: algo_page
group: Sorting and Searching
title: Search Suggestions System
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
- String
- Trie
date: 2022-09-10 16:07 +0900
---
## Introduction
This is a prefix search problem.
The size of prefix gets longer in each search.
Trie is a good data structure for this type of problems.
However, binary search is another good way to find the answer.
Since the problem asks "lexicographically minimums,"
input data should be sorted at the beginning.
If the language is Python, binary search is a good algorithm to apply.
Python's binary search function supports string like a number.

## Problem Description
> You are given an array of strings `products` and a string `searchWord`.
> Design a system that suggests at most three product names from `products`
> after each character of `searchWord` is typed.
> Suggested products should have common prefix with `searchWord`.
> If there are more than three products with a common prefix, return the three lexicographically minimums products.
>
> Return a list of lists of the suggested products after each character of `searchWord` is typed.
>
> Constraints:
> - `1 <= products.length <= 1000`
> - `1 <= products[i].length <= 3000`
> - `1 <= sum(products[i].length) <= 2 * 104`
> - All the strings of products are unique.
> - `products[i]` consists of lowercase English letters.
> - `1 <= searchWord.length <= 1000`
> - `searchWord` consists of lowercase English letters.
>
> [https://leetcode.com/problems/search-suggestions-system/](https://leetcode.com/problems/search-suggestions-system/)

## Examples
```
Example 1:
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
```

```
Example 2:
Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
```

## Analysis
The solution here uses the binary search.
The `products` list is sorted at the beginning.
The prefix will be extended a character by character.
Do bisect_left with the prefix, then add up to 3 words with the same prefix to the result.

## Solution
```python
class SearchSuggestionsSystem:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        products.sort()
        result = []
        for i in range(len(searchWord)):
            prefix = searchWord[:i + 1]
            sub = []
            idx = bisect.bisect_left(products, prefix)
            while idx < len(products) and len(sub) < 3 and products[idx][:i + 1] == prefix:
                sub.append(products[idx])
                idx += 1
            result.append(sub)
        return result    
```

## Complexities
- Time: `O(n*log(n))`
- Space: `O(1)`
