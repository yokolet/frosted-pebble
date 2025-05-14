---
layout: algo_page
group: Strings
title: Minimum Number of Moves to Make Palindrome
algo_menubar: algo_menu
tags:
- Hard
- Two Pointers
- String
- Greedy
date: 2022-09-14 22:31 +0900
---

## Problem Description
> You are given a string `s` consisting only of lowercase English letters.
> In one move, you can select any two adjacent characters of s and swap them.
>
> Return the minimum number of moves needed to make `s` a palindrome.
>
> Note that the input will be generated such that `s` can always be converted to a palindrome.
>
> Constraints:
> - `1 <= s.length <= 2000`
> - `s` consists only of lowercase English letters.
> - `s` can be converted to a palindrome using a finite number of moves.
>
> [https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/](https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/)

## Examples
```
Example 1:
Input: s = "aabb"
Output: 2
Explanation: "aabb" -> "abab" -> "abba"
```

```
Example 2:
Input: s = "letelt"
Output: 2
Explanation: "letelt" -> "letetl" -> "lettel"
```

## How to Solve
The problem title uses the word "move," but it is a "swap" actually.
If the problem asks about swap something, think the two pointers approach.

The solution here is a slight deviation of the two pointers.
One points the rightmost character, while another points the leftmost same character.
To make the string palindrome, the leftmost-same-character-index times swaps are required.
At this stage, two characters are assumed to be arranged, so delete those for the next iteration.

The special case is the rightmost character's same character is also the rightmost.
It means the only one character exists.
The only one character should be on the center of the string to make it palindrome.
In this case, `index / 2` times swaps are required.

When all characters are eliminated, we get the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MinimumNumberOfMovesToMakePalindrome {
public:
    int minMovesToMakePalindrome(string s) {
        int result = 0;
        while (s.size()) {
            int idx = s.find(s.back());
            if (idx == s.size() - 1) {
                result += idx / 2;
            } else {
                result += idx;
                s.erase(idx, 1);
            }
            s.pop_back();
        }
        return result;
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
class MinimumNumberOfMovesToMakePalindrome:
    def minMovesToMakePalindrome(self, s: str) -> int:
        result = 0
        while len(s):
            idx, n = s.find(s[-1]), len(s)
            if idx == n - 1:
                result += idx // 2
                s = s[:-1]
            else:
                result += idx
                s = s[0:idx] + s[idx + 1:-1]
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n^2)`
- Space: `O(n)`
 
