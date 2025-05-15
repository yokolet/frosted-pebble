---
layout: algo_page
group: Strings
title: Count and Say
algo_menubar: algo_menu
tags:
- Medium
- String
date: 2022-10-18 15:30 +0900
---

## Problem Description
> The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
> - `countAndSay(1) = "1"`
> - `countAndSay(n)` is the way you would "say" the digit string from countAndSay(n-1), which is then
>    converted into a different digit string.
>
> To determine how you "say" a digit string, split it into the minimal number of substrings such that each substring
> contains exactly one unique digit. Then for each substring, say the number of digits, then say the digit. Finally,
> concatenate every said digit.
>
> For example, the saying and conversion for digit string "3322251":
> "23321511": two threes, three twos, one five, one one
>
> Given a positive integer n, return the nth term of the count-and-say sequence.
>
> Constraints:
> - `1 <= n <= 30`
>
> [https://leetcode.com/problems/count-and-say/](https://leetcode.com/problems/count-and-say/)

## Examples
```
Example 1
Input: n = 1
Output: "1"
Explanation: This is the base case.
```

```
Example 2
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
```

## How to Solve
This is a relatively straightforward problem.
Just count the same character and add count + character to the result.
Both iterative and recursion work to get the final answer.

The solution here took an iterative approach.
Check the current character is the same as the previous one.
If it is the same, count up. If not, update the result and initialize the counter.
This repeats n - 1 times. Then, we get the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class CountAndSay {
public:
    string countAndSay(int n) {
        string result = "1";
        for (int k = 0; k < n - 1; ++k) {
            char prev = '\0';
            string cur;
            int cnt = 0;
            for (int i = 0; i < result.size(); ++i) {
                if (prev && prev != result[i]) {
                    cur += (to_string(cnt) + prev);
                    cnt = 0;
                }
                prev = result[i];
                cnt++;
            }
            cur += (to_string(cnt) + prev);
            result = cur;
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class Solution {
    public String countAndSay(int n) {
        String result = "1";
        for (int k = 0; k < n - 1; ++k) {
            char prev = 0;
            String cur = "";
            int cnt = 0;
            for (int i = 0; i < result.length(); ++i) {
                if (prev != 0 && prev != result.charAt(i)) {
                    cur += (Integer.toString(cnt) + prev);
                    cnt = 0;
                }
                prev = result.charAt(i);
                cnt++;
            }
            cur += (Integer.toString(cnt) + prev);
            result = cur;
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  let result = "1";
  for (let k = 0; k < n - 1; k++) {
    let prev = '', cur = '', cnt = 0;
    for (let i = 0; i < result.length; i++) {
      if (prev && prev != result[i]) {
        cur += (cnt.toString() + prev);
        cnt = 0;
      }
      prev = result[i];
      cnt++;
    }
    cur += (cnt.toString() + prev);
    result = cur;
  }
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CountAndSay:
    def countAndSay(self, n: int) -> str:
        result = '1'
        for _ in range(n - 1):
            prev, cur, cnt = '', '', 0
            for i in range(len(result)):
                if prev and result[i] != prev:
                    cur += (str(cnt) + prev)
                    cnt = 0
                prev = result[i]
                cnt += 1
            cur += (str(cnt) + prev)
            result = cur
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer} n
# @return {String}
def count_and_say(n)
  result = "1"
  (0...n - 1).each do|k|
    prev, cur, cnt = "", "", 0
    (0...result.size).each do |i|
      if !prev.empty? && prev != result[i]
        cur += cnt.to_s + prev
        cnt = 0
      end
      prev = result[i]
      cnt += 1
    end
    cur += cnt.to_s + prev
    result = cur
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(4^(n/3))`
- Space: `O(4^(n/3))`
