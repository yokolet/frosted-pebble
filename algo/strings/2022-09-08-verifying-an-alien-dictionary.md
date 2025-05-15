---
layout: algo_page
group: Strings
title: Verifying an Alien Dictionary
algo_menubar: algo_menu
tags:
- Easy
- String
- Array
- Hash Table
date: 2022-09-08 22:14 +0900
---

## Problem Description
> In an alien language, surprisingly, they also use English lowercase letters,
> but possibly in a different `order`.
> The order of the alphabet is some permutation of lowercase letters.
>
> Given a sequence of words written in the alien language, and the `order` of the alphabet,
> return true if and only if the given words are sorted lexicographically in this alien language.
>
> Constraints:
> - `1 <= words.length <= 100`
> - `1 <= words[i].length <= 20`
> - `order.length == 26`
> - All characters in `words[i]` and `order` are English lowercase letters.


## Examples
```
Example 1:
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
```

```
Example 2:
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
```

```
Example 3:
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
```

## How to Solve

This problem is a simple string traversal of a pair.
Take two words pair one by one.
Find the index of the first mismatch characters.
The given character order matters.
The previous word's mismatch character index should be smaller in the given order string to be valid.
The edge case is: one is a substring of another.
In this case, the previous word's length should be shorter.

If all conditions meet, the dictionary is valid.

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
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    let prev = words.shift()
    for (let i = 0; i < words.length; ++i) {
        cur = words[i]
        if (compareTwoWords(prev, cur, order) < 0) return false
        prev = cur
    }
    return true
};

const compareTwoWords = (prev, cur, order) => {
    let idx = 0
    while (idx < Math.min(prev.length, cur.length)) {
        if (prev.charAt(idx) !== cur.charAt(idx)) {
            break
        }
        if (idx === Math.min(prev.length, cur.length) - 1) {
            return cur.length - prev.length
        }
        idx++
    }
    return order.indexOf(cur[idx]) - order.indexOf(prev[idx])
}
```
{% endtab %}

{% tab solution Python %}
```python
class VerifyingAnAlianDictionary:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        def helper(prev, cur):
            for i in range(min(len(prev), len(cur))):
                if prev[i] != cur[i]:
                    break
                if i == min(len(prev), len(cur)) - 1:
                    return len(cur) - len(prev)
            return order.index(cur[i]) - order.index(prev[i])
        prev = words[0]
        for cur in words[1:]:
            if helper(prev, cur) < 0:
                return False
            prev = cur
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} words
# @param {String} order
# @return {Boolean}
def is_alien_sorted(words, order)
  prev = words.shift
  words.each do |cur|
    if compare_two_words(prev, cur, order) < 0
      return false
    end
    prev = cur
  end
  true
end

def compare_two_words(prev, cur, order)
  idx = 0
  while idx < [prev.size, cur.size].min
    break if prev[idx] != cur[idx]
    if idx == [prev.size, cur.size].min - 1
      return cur.size - prev.size
    end
    idx += 1
  end
  order.index(cur[idx]) - order.index(prev[idx])
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)` -- n is a total number of characters in words
- Space: `O(1)`
