---
layout: algo_page
group: Strings
title: Count Binary Substrings
algo_menubar: algo_menu
tags:
- Easy
- Two Pointers
- String
date: 2022-09-12 21:37 +0900
---

## Problem Description
> Given a binary string `s`, return the number of non-empty substrings that
> have the same number of 0's and 1's, and all the 0's
> and all the 1's in these substrings are grouped consecutively.
>
> Substrings that occur multiple times are counted the number of times they occur.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s[i]` is either '0' or '1'
>
> [https://leetcode.com/problems/count-binary-substrings/](https://leetcode.com/problems/count-binary-substrings/)

## Examples
```
Example 1:
Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's:
             "0011", "01", "1100", "10", "0011", and "01".
```

```
Example 2:
Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.
```

## How to Solve
The problem asks substrings, which means a sequential search is required.
If we look at the problem closely, the key to solve problem is that how many same characters continues.

Count the number of consecutive same characters.
When a different character comes in, compare previous and current counts.
For example, when the substring is `00111`, the previous and current counts will be 2 and 3.
Add up the minimum of previous and current counts to the result.
When all characters in the given string are checked, we will get the answer.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class CountBinarySubstrings {
public:
    int countBinarySubstrings(string s) {
        int prev = 0, cur = 1, result = 0;
        for (int i = 1; i < s.size(); ++i) {
            if (s[i - 1] == s[i]) {
                cur++;
            } else {
                result += min(prev, cur);
                prev = cur;
                cur = 1;
            }
        }
        return result + min(prev, cur);
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CountBinarySubstrings {
    public int countBinarySubstrings(String s) {
        int prev = 0, cur = 1, result = 0;
        for (int i = 1; i < s.length(); ++i) {
            if (s.charAt(i - 1) == s.charAt(i)) {
                cur++;
            } else {
                result += Math.min(prev, cur);
                prev = cur;
                cur = 1;
            }
        }
        return result + Math.min(prev, cur);
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let prev = 0, cur = 1, result = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i - 1] == s[i]) {
            cur++;
        } else {
            result += Math.min(prev, cur);
            prev = cur;
            cur = 1;
        }
    }
    return result + Math.min(prev, cur);
};
```
{% endtab %}

{% tab solution Python %}
```python
class CountBinarySubstrings:
    def countBinarySubstrings(self, s: str) -> int:
        prev, cur, result = 0, 1, 0
        for i in range(1, len(s)):
            if s[i - 1] == s[i]:
                cur += 1
            else:
                result += min(prev, cur)
                prev, cur = cur, 1
        return result + min(prev, cur)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def count_binary_substrings(s)
  prev, cur, result = 0, 1, 0
  (1...s.size).each do |i|
    if s[i - 1] == s[i]
      cur += 1
    else
      result += [prev, cur].min
      prev = cur
      cur = 1
    end
  end
  result + [prev, cur].min
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)` -- n: length of string
- Space: `O(1)`
