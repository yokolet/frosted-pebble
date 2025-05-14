---
layout: algo_page
group: Strings
title: Flip String to Monotone Increasing
algo_menubar: algo_menu
tags:
- Medium
- String
- Dynamic Programming
date: 2022-09-12 20:57 +0900
---

## Problem Description
> A binary string is monotone increasing if it consists of some number of 0's (possibly none),
> followed by some number of 1's (also possibly none).
>
> You are given a binary string `s`. You can flip `s[i]` changing it from 0 to 1 or from 1 to 0.
> Return the minimum number of flips to make s monotone increasing.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s[i]` is either '0' or '1'


## Examples
```
Example 1:
Input: s = "00110"
Output: 1
Explanation: We flip the last digit to get 00111.
```

```
Example 2:
Input: s = "010110"
Output: 2
Explanation: We flip to get 011111, or alternatively 000111.
```

```
Example 3:
Input: s = "00011000"
Output: 2
Explanation: We flip to get 00000000.
```

## How to Solve

The string related problems often need much consideration to figure out how to solve.
Once it becomes clear, the solution might be very simple.

Let's start from a length 2. Valid patters are:
```
2: 00, 01, 11
3: 000, 001, 011, 111
4: 0000, 0001, 0011, 0111, 1111
...
```
How many ones are there -- this is a key to solve the problem.
While going over the string one by one, count up ones.
Count up flips and count down ones if the character is '0' and ones are not 0.
That's all to find the answer.

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
var minFlipsMonoIncr = function(s) {
    let flips = 0, ones = 0
    for (const c of s) {
        if (c === "1") {
            ones++
        } else if (ones > 0) {
            flips++
            ones--
        }
    }
    return flips
}
```
{% endtab %}

{% tab solution Python %}
```python
class FlipStringToMonotoneIncreasing:
    def minFlipsMonoIncr(self, s: str) -> int:
        flips = 0
        ones = 0        
        for c in s:
            if c == '1':
                ones += 1
            elif (ones > 0):
                flips += 1
                ones -= 1
        return flips
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def min_flips_mono_incr(s)
  flips, ones = 0, 0
  s.each_char do |c|
    if c == "1"
      ones += 1
    elsif ones > 0
      flips += 1
      ones -= 1
    end
  end
  flips
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
