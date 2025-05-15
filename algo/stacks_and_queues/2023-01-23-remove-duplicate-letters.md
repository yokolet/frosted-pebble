---
layout: algo_page
group: Stacks and Queues
title: Remove Duplicate Letters
algo_menubar: algo_menu
tags:
- Medium
- Monotonic Stack
- Greedy
- String
date: 2023-01-23 23:38 +0900
---
## Problem Description
> Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your
> result is the smallest in lexicographical order among all possible results.
>
> Constraints:
> - `1 <= s.length <= 10**4`
> - `s` consists of lowercase English letters.
>
> [https://leetcode.com/problems/remove-duplicate-letters/](https://leetcode.com/problems/remove-duplicate-letters/)
> [https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)

## Examples
```
Example 1
Input: s = "bcabc"
Output: "abc"
```

```
Example 2
Input: s = "cbacdcbc"
Output: "acdb"
```

```
Example 3
Input: s = "bbcaac
Output: "bac"
```

## How to Solve
Creating a monotonic increasing stack is a good approach for this problem.
Since the indices of characters matter, simply sort and eliminate duplicates is not the answer.

If a current character is less than the last character in a stack, only when the last character appears in the
later index, the last character is popped out from the stack.
Once a character is put in the stack, the same character should not be added.
It is checked using seen vector (C++) or set (Python).

In the end, create the answer by concatenating the characters in stack.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class RemoveDuplicateLetters {
public:
    string removeDuplicateLetters(string s) {
        vector<int> counter(26, 0);
        for (char &c : s) { counter[c - 'a']++; }
        vector<bool> seen(26, false);
        stack<char> ss;
        for (char &c : s) {
            int idx = c - 'a';
            counter[idx]--;
            if (seen[idx]) { continue; }
            while (!ss.empty() && ss.top() > c && counter[ss.top() - 'a'] > 0) {
                seen[ss.top() - 'a'] = false;
                ss.pop();
            }
            if (!seen[idx]) {
                ss.push(c);
                seen[idx] = true;
            }
        }
        string result = "";
        while (!ss.empty()) {
            result = ss.top() + result;
            ss.pop();
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
class RemoveDuplicateLetters:
    def removeDuplicateLetters(self, s: str) -> str:
        counter = collections.Counter(s)
        seen, stack = set(), []
        for c in s:
            counter[c] -= 1
            if c in seen:
                continue
            while stack and stack[-1] > c and counter[stack[-1]] > 0:
                seen.remove(stack.pop())
            if c not in seen:
                stack.append(c)
                seen.add(c)
        return ''.join(stack)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n^2)`
- Space: `O(1)` -- counter, seen, and stack will have the size at most 26. constant 
