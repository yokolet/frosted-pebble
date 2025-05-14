---
layout: algo_page
group: Strings
title: Minimum Number of Swaps to Make the Binary String Alternating
algo_menubar: algo_menu
tags:
- Medium
- String
- Greedy
date: 2022-09-12 16:10 +0900
---

## Problem Description
> Given a binary string `s`, return the minimum number of character swaps to make it alternating,
> or -1 if it is impossible.
>
> The string is called alternating if no two adjacent characters are equal.
> For example, the strings "010" and "1010" are alternating, while the string "0100" is not.
>
> Any two characters may be swapped, even if they are not adjacent.
>
> Constraints:
> - `1 <= s.length <= 1000`
> - `s[i]` is either '0' or '1'


## Examples
```
Example 1:
Input: s = "111000"
Output: 1
Explanation: Swap positions 1 and 4: "111000" -> "101010"
The string is now alternating.
```

```
Example 2:
Input: s = "010"
Output: 0
Explanation: The string is already alternating, no swaps are needed.
```

```
Example 3:
Input: s = "1110"
Output: -1
```

## How to Solve

This problem has only two kinds of letters, so greedy approach would work.
At first, count zeros and ones.
The difference should be 0 or 1 to make an alternating string.
Next step is which one would be the first character.
Assuming, the first character is the one of more count,
if the current character is not the one supposed to be. In such a case, count up invalid.
The `swap` function counts doubly, so it returns the value divided by 2.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp

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
var minSwaps = function(s) {
    const counter = [...s].reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    const zeros = counter["0"] || 0
    const ones = counter["1"] || 0
    if (Math.abs(zeros - ones) > 1) return -1
    if (zeros > ones) {
        return countSwaps(s, "0")
    } else if (ones > zeros) {
        return countSwaps(s, "1")
    } else {
        return Math.min(countSwaps(s, "0"), countSwaps(s, "1"))
    }
}

const countSwaps = (s, first) => {
    let invalid = 0
    for (let i = 0; i < s.length; ++i) {
        if (i % 2 == 0 && s[i] !== first) invalid++
        if (i % 2 == 1 && s[i] === first) invalid++
    }
    return Math.floor(invalid / 2)
}
```
{% endtab %}

{% tab solution Python %}
```python
class MinimumNumberOfSwapsToMakeTheBinaryStringAlternating:
    def minSwaps(self, s: str) -> int:
        def swap(first):
            invalid = 0
            for i in range(len(s)):
                if i % 2 == 0 and s[i] != first:
                    invalid += 1
                if i % 2 == 1 and s[i] == first:
                    invalid += 1
            return invalid // 2
    
        counter = collections.Counter(list(s))
        zeros, ones = counter['0'], counter['1']
        if abs(zeros - ones) > 1:
            return -1
        if zeros > ones:
            return swap('0')
        elif ones > zeros:
            return swap('1')
        else:
            return min(swap('0'), swap('1'))
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def min_swaps(s)
  counter = s.chars.tally
  zeros = counter["0"] || 0
  ones = counter["1"] || 0
  return -1 if (zeros - ones).abs > 1
  if zeros > ones
    return swap(s, "0")
  elsif ones > zeros
    return swap(s, "1")
  else
    return [swap(s, "0"), swap(s, "1")].min
  end
end

def swap(s, first)
  invalid = 0
  s.chars.each_with_index do |c, i|
    if i.even? && c != first
      invalid += 1
    elsif i.odd? && c == first
      invalid += 1
    end
  end
  invalid / 2
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
 
