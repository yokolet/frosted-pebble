---
layout: algo_page
group: Stacks and Queues
title: Minimum Remove to Make Valid Parentheses
algo_menubar: algo_menu
tags:
- Medium
- Stack
- String
date: 2022-09-07 17:47 +0900
---
## Introduction
Parentheses related string problems can be solved by a stack in general.
The string might include other characters.
However, focusing parentheses only would be enough in many cases.

## Problem Description
> Given a string `s` of '(' , ')' and lowercase English characters.
> Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions )
> so that the resulting parentheses string is valid and return any valid string.
>
> Formally, a parentheses string is valid if and only if:
> - It is the empty string, contains only lowercase characters, or
> - It can be written as AB (A concatenated with B), where A and B are valid strings, or
> - It can be written as (A), where A is a valid string.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s[i]` is either'(' , ')', or lowercase English letter.
> 
> [https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)

## Examples
```
Example 1:
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
```

```
Example 2:
Input: s = "a)b(c)d"
Output: "ab(c)d"
```

```
Example 3:
Input: s = "))(("
Output: ""
```

## Analysis
Using the stack, check the validity of parentheses.
At the same time, save invalid indices in a set.
The final step is to construct a valid string while omitting invalid indices.

## Solution
```python
class MinimumRemoveToMakeValidParentheses:
    def minRemoveToMakeValid(self, s: str) -> str:
        n, stack, ss = len(s), [], set()
        for i in range(n):
            if s[i] == '(':
                stack.append(i)
            elif s[i] == ')':
                if stack:
                    stack.pop()
                else:
                    ss.add(i)
        ss = ss.union(set(stack))
        result = []
        for i in range(n):
            if i not in ss:
                result.append(s[i])
        return ''.join(result)
```

## Complexities
- Time: `O(n)`
- Space: `O(n)`
 
