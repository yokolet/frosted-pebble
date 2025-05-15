---
layout: algo_page
group: Strings
title: Find Words That Can Be Formed by Characters
algo_menubar: algo_menu
tags:
- Easy
- Hash Table
- String
date: 2022-09-24 22:56 +0900
---

## Problem Description
> You are given an array of strings `words` and a string `chars`.
> A string is good if it can be formed by characters from chars (each character can only be used once).
>
> Return the sum of lengths of all good strings in words.
>
> Constraints:
> - `1 <= words.length <= 1000`
> - `1 <= words[i].length, chars.length <= 100`
> - `words[i]` and `chars` consist of lowercase English letters.


## Examples
```
Example 1
Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
```

```
Example 2
Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.
```

## How to Solve

This is a kind of anagram problem.
A hash table is a good data structure to solve this problem.
Two types of hash tables are necessary: one for the given chars, another for each word.
If we compare these two hash tables, it's not difficult to find the answer.

The first step is to create a character frequency table for `chars`.
To check each word in the word list, create another frequency table for the word.
The condition to add up the word length is:
- all characters in the word frequency table exist in the given chars' frequency table
- the given chars' character count is greater than or equal to the word's character

If two conditions meet, the word length is added to the result.

## Solution

{% tabs solution %}


{% tab solution C++ %}
```cpp

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
class FindWordsThatCanBeFormedByCharacters:
    def countCharacters(self, words: List[str], chars: str) -> int:
        counter = collections.Counter(chars)

        def isGood(word):
            w_cnt = collections.Counter(word)
            for k, v in w_cnt.items():
                if k not in counter or counter[k] < v:
                    return False
            return True
        
        result = 0
        for word in words:
            if isGood(word):
                result += len(word)
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} words
# @param {String} chars
# @return {Integer}
def count_characters(words, chars)
    freq = chars.chars.tally
    words.map {|word| good_length(freq, word)}.sum
end

def good_length(freq, word)
  cur_freq = word.chars.tally
  cur_freq.each_pair do |char, count|
    if !freq.has_key?(char) || freq[char] < count
      return 0
    end
  end
   word.length
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m + n)` -- m: length of chars, n: number of words
- Space: `O(m + k)` -- k : length of each word
