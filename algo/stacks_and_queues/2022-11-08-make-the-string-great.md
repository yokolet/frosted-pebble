---
layout: algo_page
group: Stacks and Queues
title: Make The String Great
algo_menubar: algo_menu
tags:
- Easy
- Stack
- String
date: 2022-11-08 15:35 +0900
---
## Introduction
This problem makes us think of multiple approaches such that two pointers, recursion or stack.
Although it takes an extra space, the stack would be the easiest solution.
When the top of the stack is the same letter as the current letter but upper and lower opposite, pop out the stack top.
If not, push the current letter to the stack.
In the end, some letters thought to be great are left in the stack.

## Problem Description
> Given a string `s` of lower and upper case English letters.
> A good string is a string which doesn't have two adjacent characters `s[i]` and `s[i + 1]` where:
> - `0 <= i <= s.length - 2`
> - `s[i]` is a lower-case letter and `s[i + 1]` is the same letter but in upper-case or vice-versa.
>
> To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can
> keep doing this until the string becomes good.
>
> Return the string after making it good. The answer is guaranteed to be unique under the given constraints.
>
> Notice that an empty string is also good.
>
> Constraints:
> - `1 <= s.length <= 100`
> - `s` contains only lower and upper case English letters.
>
> [https://leetcode.com/problems/make-the-string-great/](https://leetcode.com/problems/make-the-string-great/)

## Examples
```
Example 1
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
```

```
Example 2
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""
```

```
Example 3
Input: s = "s"
Output: "s"
```

## Analysis
The solution here starts from creating a stack.
The upper/lower difference is 32 when the character is converted to an ascii code.
While iterating an each character, check the character ont the stack top.
If the ascii code difference is 32, pop out the stack top character.
If not, push the current character to the stack.
In the end, the stack has great characters, so concatenate those.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MakeTheStringGreat {
public:
    string makeGood(string s) {
        std::vector<char> stack;
        for (auto c : s) {
            if (!stack.empty() && (stack.back() == c + 32 || stack.back() == c - 32)) {
                stack.pop_back();
            } else {
                stack.push_back(c);
            }
        }
        string result(stack.begin(), stack.end());
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class MakeTheStringGreat {
    public String makeGood(String s) {
        Stack<Character> stack = new Stack();
        for (char c : s.toCharArray()) {
            if (!stack.empty() && (stack.lastElement() == c + 32 || stack.lastElement() == c - 32)) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (char c : stack) sb.append(c);
        return sb.toString();
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
var makeGood = function(s) {
    let stack = [];
    [...s].forEach(c => {
       if (stack.length > 0 &&
           (stack.at(-1).charCodeAt(0) == c.charCodeAt(0) + 32 ||
            stack.at(-1).charCodeAt(0) == c.charCodeAt(0) - 32)) {
           stack.pop();
       } else {
           stack.push(c);
       }
    });
    return stack.join('');
};
```
{% endtab %}

{% tab solution Python %}
```python
class MakeTheStringGreat:
    def makeGood(self, s: str) -> str:
        stack = []
        for c in s:
            if stack and (ord(stack[-1]) == ord(c) + 32 or ord(stack[-1]) == ord(c) - 32):
                stack.pop()
            else:
                stack.append(c)
        return ''.join(stack)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {String}
def make_good(s)
    stack = []
    s.each_char do |c|
        if !stack.empty? && (stack.last.ord == c.ord + 32 || stack.last.ord == c.ord - 32)
            stack.pop
        else
            stack.push(c)
        end
    end
    return stack.join()
end
```
{% endtab %}

{% endtabs %}

## Complexities
- Time: `O(n)`
- Space: `O(n)`
