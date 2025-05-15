---
layout: algo_page
group: Strings
title: Append Characters to String to Make Subsequence
algo_menubar: algo_menu
tags:
- Medium
- String
- Two Pointers
- Greedy
date: 2024-05-24 22:31 +0900
---
## Problem Description
> You are given two strings `s` and `t` consisting of only lowercase English letters.
>
> Return the minimum number of characters that need to be appended to the end of `s` so that `t` becomes
> a subsequence of `s`.
>
> A subsequence is a string that can be derived from another string by deleting some or no characters
> without changing the order of the remaining characters.
>
> Constraints:
> - `1 <= s.length, t.length <= 10**5`
> - `s` and `t` consist only of lowercase English letters.


## Examples
```
Example 1
Input: s = "coaching", t = "coding"
Output: 4
Explanation: Append the characters "ding" to the end of s so that s = "coachingding".
Now, t is a subsequence of s ("coachingding").
It can be shown that appending any 3 characters to the end of s will never make t a subsequence.
```

```
Example 2
Input: s = "abcde", t = "a"
Output: 0
Explanation: t is already a subsequence of s ("abcde").
```

```
Example 3
Input: s = "z", t = "abcde"
Output: 5
Explanation: Append the characters "abcde" to the end of s so that s = "zabcde".
Now, t is a subsequence of s ("zabcde").
It can be shown that appending any 4 characters to the end of s will never make t a subsequence.
```

## How to Solve

The question asks the length of `t`'s postfix.
Use two pointers to identify a prefix.
One goes through `s`, another goes through `t` sequentially.
Increment `s`'s index one by one.
Only when two characters in `s` and `t` are the same, increment `t`'s index.
When the loop is over, `t`'s length minus 't`'s index is the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class AppendCharsToMakeSubsequence {
public:
    int appendCharacters(string s, string t) {
        std::ios_base::sync_with_stdio(false);
        std::cin.tie(NULL);
        
        int m = s.size(), n = t.size(), j = 0;
        for (int i = 0; i < m && j < n; ++i) {
            if (s[i] == t[j]) j++;
        }
        return n - j;
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

```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @param {String} t
# @return {Integer}
def append_characters(s, t)
    m, n, i, j = s.length, t.length, 0, 0
    while i < m && j < n
      if s[i] == t[j]
        j += 1
      end
      i += 1
    end
    n - j
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
