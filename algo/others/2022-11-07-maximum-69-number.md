---
layout: algo_page
group: Others
title: Maximum 69 Number
algo_menubar: algo_menu
tags:
- Easy
- Greedy
- Math
date: 2022-11-07 15:08 +0900
---
## Introduction
The given number consists of only 6 and/or 9, and only one character is allowed to change.
Given that, find 6 from left, replace the first 6 to 9.
Only point we should care about is whether 6 exists or not.
If not, the given string is all 9s and no need to change.

## Problem Description
> You are given a positive integer `num` consisting only of digits 6 and 9.
>
> Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).
>
> Constraints:
> - `1 <= num <= 10**4`
> - num consists of only 6 and 9 digits.
>
> [https://leetcode.com/problems/maximum-69-number/](https://leetcode.com/problems/maximum-69-number/)

## Examples
```
Example 1
Input: num = 9669
Output: 9969
```

```
Example 2
Input: num = 9996
Output: 9999
```

```
Example 3
Input: num = 9999
Output: 9999
```

## Analysis
It's easy to check every digit if the number is string.
The solution here starts converting the given number to string.
Once the index of the first 6 is found, substring concatenation creates the answer.
Lastly, convert the result string to integer to meet with the requirement.

## Solution
{% tabs solution %}

{% tab solution C++ %}
```cpp
class Maximum69Number {
public:
    int maximum69Number (int num) {
        std::string s = std::to_string(num);
        std::size_t found = s.find("6");
        if (found != std::string::npos) {
            s.replace(found, 1, "9");
        }
        return std::stoi(s);
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class Maximum69Number {
    public int maximum69Number (int num) {
        String s = String.valueOf(num);
        int found = s.indexOf("6");
        if (found >= 0) {
            s = s.replaceFirst("6", "9");
        }
        return Integer.parseInt(s);
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number  = function(num) {
        let s = num.toString();
        let found = s.indexOf("6");
        if (found >= 0) {
            s = s.replace('6', '9');
        }
        return parseInt(s);
    };
```
{% endtab %}

{% tab solution Python %}
```python
class Maximum69Number:
    def maximum69Number (self, num: int) -> int:
        s = str(num)
        if '6' in s:
            idx = s.index('6')
            s = s[:idx] + '9' + s[idx+1:]
        return int(s)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer} num
# @return {Integer}
def maximum69_number (num)
  s = num.to_s
  if s.count('6') > 0
    idx = s.index('6')
    s = s[0...idx] + '9' + s[idx + 1..-1]
  end
  s.to_i
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)` -- n: number of digits
- Space: `O(1)`
 
