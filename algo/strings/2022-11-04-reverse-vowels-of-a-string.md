---
layout: algo_page
group: Strings
title: Reverse Vowels of a String
algo_menubar: algo_menu
tags:
- Easy
- Two Pointers
- String
date: 2022-11-04 14:20 +0900
---

## Problem Description
> Given a string `s`, reverse only all the vowels in the string and return it.
>
> The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.
>
> Constraints:
> - `1 <= s.length <= 3 * 10**5`
> - `s` consist of printable ASCII characters.


## Examples
```
Exmaple 1
Input: s = "hello"
Output: "holle"
```

```
Example 2
Input: s = "leetcode"
Output: "leotcede"
```

## How to Solve

Since the problem asks reversing vowels only, the two pointers approach works well.
Starting from leftmost and rightmost characters, increment or decrement indices until those hit the vowel.
Swap two vowels, then increment the left pointer and decrement the right pointer.
When the left exceeds the right, we can get the answer.


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
class ReverseVowelsOfAString:
    def reverseVowels(self, s: str) -> str:
        left, right = 0, len(s) - 1
        ss = list(s)
        while left < right:
            while left < len(ss) and ss[left] not in 'aeiouAEIOU':
                left += 1
            while right >= 0 and ss[right] not in 'aeiouAEIOU':
                right -= 1
            if left < right:
                ss[left], ss[right] = ss[right], ss[left]
                left += 1
                right -= 1
        return ''.join(ss)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {String}
def reverse_vowels(s)
  chars, sz = s.chars, s.size
    left, right = 0, chars.length - 1
    while left < right
      while left < sz && !"aeiouAEIOU".include?(chars[left])
        left += 1
      end
      while right >= 0 && !"aeiouAEIOU".include?(chars[right])
        right -= 1
      end
      if left < right
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
      end
    end
    chars.join
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
