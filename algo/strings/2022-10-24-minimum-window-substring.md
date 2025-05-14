---
layout: algo_page
group: Strings
title: Minimum Window Substring
algo_menubar: algo_menu
tags:
- Hard
- Sliding Window
- Hash Table
- String
date: 2022-10-24 16:18 +0900
---

## Problem Description
> Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s`
> such that every character in `t` (including duplicates) is included in the window. If there is no such substring,
> return the empty string "".
>
> The testcases will be generated such that the answer is unique.
>
> A substring is a contiguous sequence of characters within the string.
>
> Constraints:
> - `m == s.length`
> - `n == t.length`
> - `1 <= m, n <= 10**5`
> - `s` and `t` consist of uppercase and lowercase English letters.


## Examples
```
Example 1
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

```
Example 2
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

```
Example 3
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

## How to Solve

As the title says, this is a sliding window problem.
What makes this problem difficult is, the result substring is not just an anagram of the given pattern.
There might be extra characters between pattern characters.
Because of that, the result substring length might be much longer than the pattern.
The solution here uses a Hash table to save character counts of the given pattern, and a
missing number of characters to form the pattern.

While sliding the window, if the pattern table has enough characters of the current character,
missing count is decremented.
At this point, a tweak is added -- decrement the character in the hash table.
The character count table might have a negative count.

When the missing becomes zero, all necessary characters are found.
It's time to find the start index.
For this purpose, negative counts in the table is used.
While the counts in the table is negative, the start index is shift to the right.
Again, the counts are incremented as the pointer shifts.
When the start index is found, update the start and end indicies.
The answer is the substring from start to end indicies.

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
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const counts = [...t].reduce((acc, c) => {
        acc[c] = (acc[c] || 0) + 1
        return acc
    }, {})
    let missing = t.length
    let left = 0, right = 0
    let k = 0
    for (let i = 0; i < s.length; ++i) {
        let c = s[i]
        let j = i + 1
        counts[c] |= 0
        if (counts[c] > 0) missing--
        counts[c]--
        if (missing === 0) {
            while (k < j && (counts[s[k]] || 0) < 0) {
                counts[s[k]]++
                k++
            }
            counts[s[k]]++
            missing++
            if (right == 0 || right -left > j - k) {
                [left, right] = [k, j]
            }
            k++
        }
    }
    return s.substring(left, right)
};
```
{% endtab %}

{% tab solution Python %}
```python
class MinimumWindowSubstring:
    def minWindow(self, s: str, t: str) -> str:
        needs, missing = collections.Counter(t), len(t)
        start, end = 0, 0
        i = 0
        for j, c in enumerate(s, 1):
            if needs[c] > 0:
                missing -= 1
            needs[c] -= 1
            if missing == 0:
                while i < j and needs[s[i]] < 0:
                    needs[s[i]] += 1
                    i += 1
                needs[s[i]] += 1
                missing += 1
                if end == 0 or end - start > j - i:
                    start, end = i, j
                i += 1
        return s[start:end]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @param {String} t
# @return {String}
def min_window(s, t)
  counts = t.chars.tally
  missing = t.length
  left, right = 0, 0
  i = 0
  s.each_char.each_with_index do |c, idx|
    counts[c] ||= 0
    missing -= 1 if counts[c] > 0
    counts[c] -= 1
    if missing == 0
      j = idx + 1
      while i < j && (counts[s[i]] || 0) < 0
        counts[s[i]] += 1
        i += 1
      end
      counts[s[i]] += 1
      missing += 1
      if right == 0 || right - left > j - i
        left, right = i, j
      end
      i += 1
    end
  end
  s[left...right]
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m + n)` -- m: length of s, n: length of t
- Space: `O(m + n)`
