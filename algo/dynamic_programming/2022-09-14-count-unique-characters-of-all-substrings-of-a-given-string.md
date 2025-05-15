---
layout: algo_page
group: Dynamic Programming
title: Count Unique Characters of All Substrings of a Given String
algo_menubar: algo_menu
tags:
- Hard
- Dynamic Programming
- Hash Table
- String
date: 2022-09-14 18:17 +0900
---

## Problem Description
> Let's define a function `countUniqueChars(s)` that returns the number of unique characters on `s`.
> - For example, calling `countUniqueChars(s`) if `s = "LEETCODE"`
>   then `"L", "T", "C", "O", "D"` are the unique characters since they appear only once in `s`,
>   therefore `countUniqueChars(s) = 5`.
>
> Given a string `s`, return the sum of `countUniqueChars(t)` where `t` is a substring of `s`.
> The test cases are generated such that the answer fits in a 32-bit integer.
>
> Notice that some substrings can be repeated so in this case you have to count the repeated ones too.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s` consists of uppercase English letters only.
>
> [https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/)

## Examples
```
Example 1:
Input: s = "ABC"
Output: 10
```

```
Example 2
Input: s = "ABA"
Output: 8
```

```
Example 3:
Input: s = "LEETCODE"
Output: 92
```

## How to Solve
In general, a solution of this type is to save the index of last occurrence.
The character and indices pair might be saved in a hash table.
But, also, the pair can be saved using array or vector since keys are A to Z only.
We can convert upper case alphabet character to integer from 0 to 25, which can be used as the index.

Something this problem requires more is that all substrings should be counted.
Given that, values in the array should be start and end indices of the character.
The number of substrings between start and end indicies is calculated as:
(current index - last occurrence index) * (last occurrence index - previous occurrence index).
Then, update the character's index pair for the upcoming occurrence.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class CountUniqueCharactersOfAllSubstringsOfAGivenString {
public:
    int uniqueLetterString(string s) {
        int n = s.size(), result = 0;
        vector<pair<int, int>> memo(26, make_pair(-1, -1));
        for (int i = 0; i < n; ++i) {
            int c = s[i] - 'A';
            result += (i - memo[c].second) * (memo[c].second - memo[c].first);
            memo[c] = {memo[c].second, i};
        }
        for (int i = 0; i < 26; ++i) {
            result += (n - memo[i].second) * (memo[i].second - memo[i].first);
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CountUniqueCharactersOfAllSubstringsOfAGivenString {
    public int uniqueLetterString(String s) {
        int n = s.length(), result = 0;
        int[][] memo = new int[26][2];
        for (int i = 0; i < 26; ++i) {
            memo[i] = new int[]{-1, -1};
        }
        for (int i = 0; i < n; ++i) {
            int c = s.charAt(i) - 'A';
            result += (i - memo[c][1]) * (memo[c][1] - memo[c][0]);
            memo[c][0] = memo[c][1];
            memo[c][1] = i;
        }
        for (int i = 0; i < 26; ++i) {
            result += (n - memo[i][1]) * (memo[i][1] - memo[i][0]);
        }
        return result;
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
var uniqueLetterString = function(s) {
  const n = s.length, base = "A".charCodeAt(0);
  const memo = Array.from(Array(26), () => {
    return [-1, -1];
  });
  let result = 0;
  for (let i = 0; i < n; ++i) {
    let c = s.charCodeAt(i) - base;
    result += (i - memo[c][1]) * (memo[c][1] - memo[c][0]);
    memo[c] = [memo[c][1], i]
  }
  for (let i = 0; i < 26; i++) {
    result += (n - memo[i][1]) * (memo[i][1] - memo[i][0]);
  }
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CountUniqueCharactersOfAllSubstringsOfAGivenString:
    def uniqueLetterString(self, s: str) -> int:
        n, result = len(s), 0
        memo = [[-1, -1] for _ in range(26)]
        for i in range(n):
            c = ord(s[i]) - ord('A')
            result += (i - memo[c][1]) * (memo[c][1] - memo[c][0])
            memo[c] = [memo[c][1], i]
        for i in range(26):
            result += (n - memo[i][1]) * (memo[i][1] - memo[i][0])
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def unique_letter_string(s)
  n, base, result = s.size, "A".ord, 0
  memo = Array.new(26) { [-1, -1] }
  (0...n).each do |i|
    c = s[i].ord - base
    result += (i - memo[c][1]) * (memo[c][1] - memo[c][0])
    memo[c] = [memo[c][1], i]
  end
  (0...26).each do |i|
    result += (n - memo[i][1]) * (memo[i][1] - memo[i][0])
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)` -- at most 26, so constant
