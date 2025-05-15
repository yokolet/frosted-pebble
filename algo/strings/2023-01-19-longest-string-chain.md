---
layout: algo_page
group: Strings
title: Longest String Chain
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Two Pointers
- String
date: 2023-01-19 14:09 +0900
---

## Problem Description
> You are given an array of words where each word consists of lowercase English letters.
>
> `word[A]` is a predecessor of `word[B]` if and only if we can insert exactly one letter anywhere in `word[A]` without
> changing the order of the other characters to make it equal to `word[B]`.
>
> For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
> A word chain is a sequence of words `[word[1], word[2], ..., word[k]]` with `k >= 1`, where `word[1]` is a
> predecessor of `word[2]`, `word[2]` is a predecessor of `word[3]`, and so on. A single word is trivially a word chain
> with `k == 1`.
>
> Return the length of the longest possible word chain with words chosen from the given list of words.
>
> Constraints:
> - `1 <= words.length <= 1000`
> - `1 <= words[i].length <= 16`
> - `words[i] `only consists of lowercase English letters.
>
> [https://leetcode.com/problems/longest-string-chain/](https://leetcode.com/problems/longest-string-chain/)

## Examples
```
Example 1
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
```

```
Example 2
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
```

```
Example 3
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
```

## How to Solve
To create a path, a successor is one character longer to its predecessor and additional one character can be any.
Create one character shorter words and check if those are in the word list.
If exists, a path by two words is found.
While checking predecessors, count up the path.
In the end, the maximum length path will be found.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class LongestStringChain {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(),
            [](const string w1, const string w2) {
                return w1.size() < w2.size();
        });
        int max_path = 1;
        unordered_map<string, int> counter;
        for (string word : words) {
            int path = 1;
            for (int i = 0; i < word.size(); ++i) {
                string pred = word.substr(0, i) + word.substr(i + 1, word.length() + 1);
                if (counter.count(pred) != 0) {
                    path = max(path, counter[pred] + 1);
                }
            }
            counter[word] = path;
            max_path = max(max_path, path);
        }
        return max_path;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java

```
{% endtab %}

{% tab solution JavaScript %}
```js

```
{% endtab %}

{% tab solution Python %}
```python
class LongestStringChain:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=lambda x: len(x))
        max_path, counter = 1, {}
        for word in words:
            path = 1
            for i in range(len(word)):
                pred = word[:i] + word[i + 1:]
                if pred in counter:
                    path = max(path, counter[pred] + 1)
            counter[word] = path
            max_path = max(max_path, path)
        return max_path
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n) + n * m)` -- n: number of words, m: length of a word. It could be `O(1)` considering constraints.
- Space: `O(n * m)` -- It could be `O(1)` since n * m is at most 1000 * 16 (constant).
