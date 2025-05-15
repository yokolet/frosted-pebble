---
layout: algo_page
group: Strings
title: Valid Parentheses
algo_menubar: algo_menu
tags:
- Easy
- String
- Stack
date: 2024-08-17 21:05 +0900
---

## Problem Description
> Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is
> valid.
>
> An input string is valid if:
> - Open brackets must be closed by the same type of brackets.
> - Open brackets must be closed in the correct order.
> - Every close bracket has a corresponding open bracket of the same type.
>
> Constraints:
> - `1 <= s.length <= 10**4`
> - `s` consists of parentheses only '()[]{}'.


## Examples
```
Example 1:

Input: s = "()"
Output: true
```

```
Example 2:

Input: s = "()[]{}"
Output: true
```

```
Example 3:

Input: s = "(]"
Output: false
```

## How to Solve

A stack is the data structure to solve this problem effectively.
While iterating over the given string character by character, push the char if it is an opening bracket.
If the current character is a closing bracket, check whether the stack's top element is a pair or not.
If matches, pop the element from the stack.
In the end, if the stack is empty, the given string is valid.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <iostream>
#include <unordered_map>
#include <stack>

using namespace std;

class ValidParentheses {
public:
    bool isValid(string s) {
        if (s.empty()) return true;
        unordered_map<char, char> pairs{ {')', '('}, {'}', '{'}, {']', '['} };
        stack<char> st;
        for (char c : s) {
            if (pairs.count(c) == 0) {
                st.push(c);
            } else {
                if (st.empty()) return false;
                if (st.top() == pairs[c]) {
                    st.pop();
                } else {
                    return false;
                }
            }
        }
        return st.empty();
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class ValidParentheses {
    public boolean isValid(String s) {
        if (s.isEmpty()) return true;
        Map<Character, Character> pairs  = new HashMap<Character, Character>() { {
            put(')', '(');
            put('}', '{');
            put(']', '[');
        } };
        Stack<Character> st = new Stack<>();
        for (char c : s.toCharArray()) {
            if (!pairs.containsKey(c)) {
                st.push(c);
            } else {
                if (st.isEmpty()) return false;
                if (st.peek() == pairs.get(c)) {
                    st.pop();
                } else {
                    return false;
                }
            }
        }
        return st.isEmpty();
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
var isValid = function(s) {
    if (!s) return true;
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    const st = [];
    for (let i = 0; i < s.length; ++i) {
        if (!pairs.hasOwnProperty(s[i])) {
            st.push(s[i]);
        } else {
            if (st.length === 0) {
                return false;
            }
            if (st[st.length - 1] === pairs[s[i]]) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    return st.length === 0;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ValidParentheses:
    def isValid(self, s: str) -> bool:
        pairs = {']': '[', ')': '(', '}': '{'}
        stack = []
        for i in range(len(s)):
            if s[i] in pairs:
                if len(stack) > 0 and stack[-1] == pairs[s[i]]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(s[i])
        return len(stack) == 0  
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Boolean}
def is_valid(s)
    return true if s.empty?
    pairs = {')' => '(', '}' => '{', ']' => '['}
    st = []
    s.each_char do |c|
        if !pairs.has_key?(c)
            st << c
        else
            return false if st.empty?
            if st[-1] == pairs[c]
                st.pop
            else
                return false
            end
        end
    end
    st.empty?
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
