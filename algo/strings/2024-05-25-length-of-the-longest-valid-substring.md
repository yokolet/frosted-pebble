---
layout: algo_page
group: Strings
title: Length of the Longest Valid Substring
algo_menubar: algo_menu
tags:
- Hard
- String
- Hash Table
- Sliding Window
- Array
date: 2024-05-25 12:25 +0900
---

## Problem Description
> You are given a string word and an array of strings forbidden. A string is called valid if none of its substrings
> are present in forbidden.
>
> Return the length of the longest valid substring of the string word.
>
> A substring is a contiguous sequence of characters in a string, possibly empty.
>
> Constraints:
> - `1 <= word.length <= 10**5`
> - word consists only of lowercase English letters.
> - `1 <= forbidden.length <= 10**5`
> - `1 <= forbidden[i].length <= 10`
> - `forbidden[i]` consists only of lowercase English letters.


## Examples
```
Example 1
Input: word = "cbaaaabc", forbidden = ["aaa","cb"]
Output: 4
Explanation: There are 11 valid substrings in word: "c", "b", "a", "ba", "aa", "bc", "baa", "aab", "ab", "abc" and "aabc". The length of the longest valid substring is 4. 
It can be shown that all other substrings contain either "aaa" or "cb" as a substring.
```

```
Example 2
Input: word = "leetcode", forbidden = ["de","le","e"]
Output: 4
Explanation: There are 11 valid substrings in word: "l", "t", "c", "o", "d", "tc", "co", "od", "tco", "cod", and "tcod". The length of the longest valid substring is 4.
It can be shown that all other substrings contain either "de", "le", or "e" as a substring.
```

## How to Solve

Basic idea is not complicated. Use a sliding window and check sub strings whether it is in the forbidden list or not.
However, as it is marked Hard, the implementation needs a tweak.
Unless, the solution gets a Memory Limit Exceeded or Time Limit Exceeded error.
The solution here uses substr function instead of extending the word one character by one character
to avoid the memory limit error.
Also, it limits the loop by `min(i + 9, right)` to avoid the time limit error.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class LengthOfTheLongestValidSubstring {
public:
    int longestValidSubstring(string word, vector<string>& forbidden) {
        unordered_set<string> seen(forbidden.begin(), forbidden.end());
        int n = word.size(), maxLen = 0;
        int right = n;
        for (int i = n - 1; i >= 0; --i) {
            for (int j = i; j <= min(i + 9, right); ++j) {
                string cur = word.substr(i, j - i + 1);
                if (seen.find(cur) != seen.end()) {
                    right = j;
                    break;
                }
            }
            maxLen = max(maxLen, right - i);
        }
        return maxLen;
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
/**
 * @param {string} word
 * @param {string[]} forbidden
 * @return {number}
 */
var longestValidSubstring = function(word, forbidden) {
    const seen = new Set(forbidden)
    let maxLen = 0
    let right = word.length
    for (let i = word.length - 1; i >= 0; --i) {
        for (let j = i; j <= Math.min(i + 9, right); ++j) {
            let cur = word.substring(i, j + 1)
            if (seen.has(cur)) {
                right = j
                break
            }
        }
        maxLen = Math.max(maxLen, right - i)
    }
    return maxLen
}
```
{% endtab %}

{% tab solution Python %}
```python

```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} word
# @param {String[]} forbidden
# @return {Integer}
def longest_valid_substring(word, forbidden)
  seen = Set.new(forbidden)
  max_len = 0
  right = word.length
  (word.length - 1).downto(0) do |idx|
    idx.upto([idx + 9, right].min) do |j|
      cur = word.slice(idx, j - idx + 1)
      if seen.include?(cur)
        right = j
        break
      end
    end
    max_len = [max_len, right - idx].max
  end
  max_len
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)` -- n: a length of the given word. The inner loop runs constant time.
- Space: `O(m)` -- m: number of the forbidden words.
