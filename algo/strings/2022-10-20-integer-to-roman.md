---
layout: algo_page
group: Strings
title: Integer to Roman
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- String
date: 2022-10-20 13:43 +0900
---

## Problem Description
> Roman numerals are represented by seven different symbols: `I, V, X, L, C, D and M`.
> 
> | Symbol  |    Value   |
> |---------|------------|
> | I       |      1     |
> | V       |      5     |
> | X       |     10     |
> | L       |     50     |
> | C       |    100     |
> | D       |    500     |
> | M       |   1000     |
> 
> For example, `2` is written as `II` in Roman numeral, just two one's added together.
> `12` is written as `XII`, which is simply `X + II`. The number 27 is written as `XXVII`,
> which is `XX + V + II`.
>
> Roman numerals are usually written largest to smallest from left to right. However, the
> numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the
> one is before the five we subtract it making four. The same principle applies to the number
> nine, which is written as `IX`. There are six instances where subtraction is used:
> - `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
> - `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
> - `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.
>
> Given an integer, convert it to a roman numeral.
>
> Constraints:
> - `1 <= num <= 3999`


## Examples
```
Example 1
Input: num = 3
Output: "III"
Explanation: 3 is represented as 3 ones.
```

```
Example 2
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

```
Example 3
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## How to Solve

The problems, "Integer to Roman" and "Roman to Integer," are well-known pair.
Both, tricky conversions are one less to the next order.
In this case, the problem is a conversion from integer to string.
Defining the mapping is a key to solve the problem.
The keys include one less numbers such that 900, 400, 90 ... etc as well.

Divide the number by a factor from bigger to smaller. In the next iteration, the number is a reminder.
The quotient times mapped string should be added to the result, which gives us the answer.

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
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  const factors = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  let result = ""
  factors.forEach((f, i) => {
    if (num < f) {
      return
    }
    let q = (num - num % f) / f
    num %= f
    result += romans[i].repeat(q)
  })
  return result
}
```
{% endtab %}

{% tab solution Python %}
```python
class IntegerToRoman:
    def intToRoman(self, num: int) -> str:
        factors = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        result = ''
        for i, f in enumerate(factors):
            if num < f:
                continue
            q, num = divmod(num, f)
            result += romans[i] * q
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer} num
# @return {String}
def int_to_roman(num)
  factors = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  result = ''
  factors.each_with_index do |f, i|
    next if num < f
    q, num = num.divmod(f)
    result += romans[i] * q
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(1)` -- the number of iteration is 13, constant
- Space: `O(1)`
