---
layout: algo_page
group: Strings
title: Reverse Words in a String
algo_menubar: algo_menu
tags:
- Medium
- String
date: 2024-07-20 22:21 +0900
---
## Problem Description
> Given an input string `s`, reverse the order of the words.
>
> A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.
>
> Return a string of the words in reverse order concatenated by a single space.
>
> __Note__ that `s` may contain leading or trailing spaces or multiple spaces between two words.
> The returned string should only have a single space separating the words. Do not include any extra spaces.
>
> Constraints:
> - `1 <= s.length <= 10**4`
> - `s` contains English letters (upper-case and lower-case), digits, and spaces ' '.
> - There is at least one word in `s`.
>
> [https://leetcode.com/problems/reverse-words-in-a-string/](https://leetcode.com/problems/reverse-words-in-a-string/)

## Examples
```
Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
```

```
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
```

```
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

## How to Solve

A solution depends on what language is used. JavaScript, Python3 and Ruby have handy functions, so those
solutions are the one-liner.
C++ is the hardest to handle this sort of problem. C++ doesn't have handy functions related to string.
The C++ solution here simply iterate the string one by one and construct the result.
As for Java, simple string concatenation is known to be slow. The Java solution uses java.lang.StringBuilder instead.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ReverseWordsInString {
public:
    string reverseWords(string s) {
        string result = "", cur = "";
        for (char c : s) {
            if (c == ' ') {
                if (cur != "") {
                    result = cur + ' ' + result;
                    cur = "";
                }
            } else {
                cur += c;
            }
        }
        if (cur != "") result = cur + ' ' + result;
        return result.back() != ' ' ? result : result.substr(0, result.size() - 1);
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ReverseWordsInString {
    public String reverseWords(String s) {
        String[] ary = s.trim().split("\\s+");
        StringBuilder result = new StringBuilder();
        for (int i = ary.length - 1; i >= 1; --i) {
            result.append(ary[i]).append(' ');
        }
        result.append(ary[0]);
        return result.toString();
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
```
{% endtab %}

{% tab solution Python %}
```python
class ReverseWordsInString:
    def reverseWords(self, s: str) -> str:
        return ' '.join(s.split()[::-1])
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {String}
def reverse_words(s)
     s.split(' ').reverse().join(' ')
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)` -- for C++, JavaScript, Python3, Ruby, O(m) for Java: m is a number of words
