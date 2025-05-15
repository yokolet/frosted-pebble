---
layout: algo_page
group: Strings
title: Sum of Prefix Scores of Strings
algo_menubar: algo_menu
tags:
- Hard
- Trie
- Counting
- String
date: 2022-12-26 16:26 +0900
---

## Problem Description
> You are given an array words of size `n` consisting of non-empty strings.
>
> We define the score of a string `word` as the number of strings `words[i]` such that `word` is a prefix of `words[i]`.
> - For example, if `words = ["a", "ab", "abc", "cab"]`, then the score of "ab" is 2, since "ab" is a prefix of both
> - "ab" and "abc".
>
> Return an array `answer` of size `n` where `answer[i]` is the sum of scores of every non-empty prefix of `words[i]`.
>
> Note that a string is considered as a prefix of itself.
>
> Constraints:
> - `1 <= words.length <= 1000`
> - `1 <= words[i].length <= 1000`
> - `words[i]` consists of lowercase English letters.
>
> [https://leetcode.com/problems/sum-of-prefix-scores-of-strings/](https://leetcode.com/problems/sum-of-prefix-scores-of-strings/)

## Examples
```
Example 1
Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
```

```
Example 2
Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.
```

## How to Solve
This is the Trie data structure problem.
The problem asks duplicated characters of traversing all words.
For example, when the two words are "abc" and "ab," a -> b -> c and a -> b are traversed.
While building a trie from given words, count up each character in each level.
Once the trie creation is completed, traverse the given words exactly the same as the trie is built.
Summing up each character's count to the last character will give us an answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
struct TrieNode {
    TrieNode *children[26];
    int count = 0;
};

class SumOfPrefixScoresOfStrings {
private:
    TrieNode *root = new TrieNode();

public:
    vector<int> sumPrefixScores(vector<string>& words) {
        TrieNode *root = new TrieNode();
        for (string word : words) {
            TrieNode *cur = root;
            for (char c : word) {
                if (!cur->children[c - 'a']) {
                    cur->children[c - 'a'] = new TrieNode();
                }
                cur = cur->children[c - 'a'];
                cur->count++;
            }
        }
        vector<int> answer;
        for (string word : words) {
            TrieNode *cur = root;
            int score = 0;
            for (char c : word) {
                cur = cur->children[c - 'a'];
                score += cur->count;
            }
            answer.push_back(score);
        }
        return answer;
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
class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.count = 0

class SumOfPrefixScoresOfStrings:
    def sumPrefixScores(self, words: List[str]) -> List[int]:
        root = TrieNode()
        for word in words:
            cur = root
            for c in word:
                cur = cur.children[c]
                cur.count += 1
        answer = []
        for word in words:
            cur = root
            score = 0
            for c in word:
                cur = cur.children[c]
                score += cur.count
            answer.append(score)
        return answer
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(m * n)` -- m: number of words, n: length of each word (average)
- Space: `O(m * n)`
