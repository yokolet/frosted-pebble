---
layout: algo_page
group: Strings
title: Counting Words With a Given Prefix
algo_menubar: algo_menu
tags:
- Easy
- String
date: 2023-01-12 14:05 +0900
---

## Problem Description
> You are given an array of strings `words` and a string `pref`.
>
> Return the number of strings in `words` that contain `pref` as a prefix.
>
> A prefix of a string `s` is any leading contiguous substring of `s`.
>
> Constraints:
> - `1 <= words.length <= 100`
> - `1 <= words[i].length, pref.length <= 100`
> - `words[i]` and `pref` consist of lowercase English letters.
>
> [https://leetcode.com/problems/counting-words-with-a-given-prefix/](https://leetcode.com/problems/counting-words-with-a-given-prefix/)

## Examples
```
Example 1
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
```

```
Example 2
Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.
```

## How to Solve
In general, languages have a function or method to check prefix characters.
For example, Python string has a startswith function while C++ string has an rfind function.
Use such built-in function and count up if an word starts with the given prefix.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class CountingWordsWithAGivenPrefix {
public:
    int prefixCount(vector<string>& words, string pref) {
        int result = 0;
        for (string w : words) {
            if (w.rfind(pref, 0) != string::npos) { result++; }
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CountingWordsWithAGivenPrefix {
    public int prefixCount(String[] words, String pref) {
        int result = 0;
        for (String word : words) {
            if (word.startsWith(pref)) { result++; }
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function(words, pref) {
    let result = 0;
    for (const w of words) {
        if (w.startsWith(pref)) {
            result++;
        }
    }
    return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CountingWordsWithAGivenPrefix:
    def prefixCount(self, words: List[str], pref: str) -> int:
        result = 0
        for w in words:
            if w.startswith(pref):
                result += 1
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} words
# @param {String} pref
# @return {Integer}
def prefix_count(words, pref)
  result = 0
  words.each do |word|
    if word.start_with?(pref)
      result += 1
    end
  end
  result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
