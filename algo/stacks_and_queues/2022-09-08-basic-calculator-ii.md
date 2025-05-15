---
layout: algo_page
group: Stacks and Queues
title: Basic Calculator II
algo_menubar: algo_menu
tags:
- Medium
- Stack
- String
- Math
date: 2022-09-08 14:38 +0900
---

## Problem Description
> Given a string `s` which represents an expression, evaluate this expression and return its value.
> The integer division should truncate toward zero.
>
> You may assume that the given expression is always valid.
> All intermediate results will be in the range of `[-2**31, 2**31 - 1]`.
>
> You are not allowed to use any built-in function which evaluates
> strings as mathematical expressions, such as `eval()`.
>
> Constraints:
> - `1 <= s.length <= 3 * 10**5`
> - `s` consists of integers and operators `('+', '-', '*', '/')` separated by some
>     number of spaces.
> - `s` represents a valid expression.
> - All the integers in the expression are non-negative integers in the range `[0, 2**31 - 1]`.
> - The answer is guaranteed to fit in a 32-bit integer.
>
> [https://leetcode.com/problems/basic-calculator-ii/](https://leetcode.com/problems/basic-calculator-ii/)

## Examples
```
Example 1:
Input: s = "3+2*2"
Output: 7
```

```
Example 2:
Input: s = " 3/2 "
Output: 1
```

```
Example 3:
Input: s = " 3+5 / 2 "
Output: 5
```

## How to Solve
This is the simplest problem among the basic calculator series.
The given string doesn't include parentheses, so the precedence handling is straightforward.
Operators are just four which need only two values apparently.
The calculation goes one step behind to the currently saved operator.

The problem can be solved using a stack which saves values.
The solution here starts from saving current digits in a variable.
When one of the operator is found, perform the previous operation.
Pop out the previous value from the stack and apply previous operator.
Then, save the calculation result to the stack and update the operator.

In the end, take sum of values in the stack, which is the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <algorithm>
#include <stack>

using namespace std;

class BasicCalculatorTwo {
public:
    int calculate(string s) {
        s.erase(remove(s.begin(), s.end(), ' '), s.end());
        stack<int> st;
        int digits = 0;
        char op = '+';
        int x;
        for (int i = 0; i < s.size(); ++i) {
            if (isdigit(s[i])) {
                digits = digits * 10 + (s[i] - '0');
            }
            if (!isdigit(s[i]) || i == s.size() - 1) {
                if (op == '+') {
                    st.push(digits);
                } else if (op == '-') {
                    st.push(-digits);
                } else if (op == '*') {
                    x = st.top();
                    st.pop();
                    st.push(x * digits);
                } else {
                    x = st.top();
                    st.pop();
                    st.push(x / digits);
                }
                digits = 0, op = s[i];
            }
        }
        int result = 0;
        while (!st.empty()) {
            result += st.top();
            st.pop();
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
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  s = s.replaceAll(" ", "");
  let op = "+", digits = 0, stack = new Array();
  for (let i  = 0; i < s.length; i++) {
    if ('0' <= s[i] && s[i] <= '9') {
      digits = digits * 10 + Number(s[i]);
    }
    if (s[i] < '0' || '9' < s[i] || i == s.length - 1) {
      if (op === "+") {
        stack.push(digits);
      } else if (op === "-") {
        stack.push(-digits);
      } else if (op === "*") {
        stack.push(stack.pop() * digits);
      } else {
        stack.push(Math.trunc(stack.pop() / digits));
      }
      digits = 0, op = s[i];
    }
  }
  return stack.reduce((acc, cur) => acc + cur, 0);
};
```
{% endtab %}

{% tab solution Python %}
```python
class BasicCalculatorTwo:
    def calculate(self, s: str) -> int:
        s = s.replace(' ', '')
        stack, digits, op = [], '', '+'
        for i in range(len(s)):
            c = s[i]
            if c not in '+-*/':
                digits += c
            if c in '+-*/' or i == len(s) - 1:
                if op == '+':
                    stack.append(int(digits))
                elif op == '-':
                    stack.append((-1) * int(digits))
                elif op == '*':
                    x = stack.pop()
                    stack.append(x * int(digits))
                elif op == '/':
                    x = stack.pop()
                    stack.append(int(x / int(digits)))
                digits, op = '', c
        return sum(stack)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
