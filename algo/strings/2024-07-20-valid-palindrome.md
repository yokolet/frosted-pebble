---
layout: algo_page
group: Strings
title: Valid Palindrome
algo_menubar: algo_menu
tags:
- Easy
- String
- Two Pointers
date: 2024-07-20 17:50 +0900
---

## Problem Description
> A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
> non-alphanumeric characters, it reads the same forward and backward.
> Alphanumeric characters include letters and numbers.
>
> Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.
>
> Constraints:
> - `1 <= s.length <= 2 * 10**5`
> - s consists only of printable ASCII characters.
>
> [https://leetcode.com/problems/valid-palindrome/](https://leetcode.com/problems/valid-palindrome/)

## Examples
```
Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

```
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

```
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

## How to Solve

Use two pointers and move those from start and end of a given string.
The pointers are move forward or backward while the current character is not an alphabet or digit.
If those two points alphabet or digit character, compare the lower case of those.
C++, Java and Python3 have a convenient function to test the character is alphabet or digit.
However, JavaScript and Ruby don't have such function, so the functions were added to the solution.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ValidPalindrome {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ValidPalindrome {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
                return false;
            left++;
            right--;
        }
        return true;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string} s
 * @return {boolean}
 */
const isAlNum = (c) => (48 <= c && c <= 57) || (65 <= c && c <= 90) || (97 <= c && c <= 122);

var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !isAlNum(s[left].charCodeAt(0))) left++;
        while (left < right && !isAlNum(s[right].charCodeAt(0))) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ValidPalindrome:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Boolean}
def is_alnum(c)
  (48 <= c && c <= 57) || (65 <= c && c <= 90) || (97 <= c && c <= 122)
end

def is_palindrome(s)
  left, right = 0, s.size - 1
  while left < right
    while left < right && !is_alnum(s[left].ord)
      left += 1
    end
    while left < right && !is_alnum(s[right].ord)
      right -= 1
    end
    return false if s[left].downcase != s[right].downcase
    left += 1
    right -= 1
  end
  true
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
