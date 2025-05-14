---
layout: algo_page
group: Dynamic Programming
title: Number of Ways to Select Buildings
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
- String
- Prefix Sum
date: 2022-09-10 20:52 +0900
---

## Problem Description
> You are given a 0-indexed binary string `s` which represents the types of buildings along a street where:
> - `s[i] = '0'` denotes that the i-th building is an office and
> - `s[i] = '1'` denotes that the i-th building is a restaurant.
> As a city official, you would like to select 3 buildings for random inspection.
> However, to ensure variety, no two consecutive buildings out of the selected buildings can be of the same type.
> - For example, given `s = "001101"`, we cannot select the 1st, 3rd, and 5th buildings
>   as that would form "011" which is not allowed due to having two consecutive buildings of the same type.
> Return the number of valid ways to select 3 buildings.
>
> Constraints:
> - `3 <= s.length <= 10**5`
> - `s[i]` is either `'0'` or `'1'`.


## Examples
```
Example 1:
Input: s = "001101"
Output: 6
Explanation: 
The following sets of indices selected are valid:
- [0,2,4] from "001101" forms "010"
- [0,3,4] from "001101" forms "010"
- [1,2,4] from "001101" forms "010"
- [1,3,4] from "001101" forms "010"
- [2,4,5] from "001101" forms "101"
- [3,4,5] from "001101" forms "101"
No other selection is valid. Thus, there are 6 total ways.
```

```
Example 2:
Input: s = "11100"
Output: 0
Explanation: It can be shown that there are no valid selections.
```

## How to Solve
If the problem asks "number of ways," it might be a dynamic programming.
Some state is there, and the next state depends on the previous state.
In this problem, we'll count "101" or "010" sub sequence.
When the character is '1', previous states should be '', '10', or '0'.
Those are counted and lead to the answer.

Only valid strings are "101" or "010".
We should focus on '0', '1', '01', '10', then the total.

When a current character is '1':
- count up '1' by 1
- update '01' by adding the value of '0'
- update the result by adding the value of '10'

When a current character is '0':
- count up '0' by 1
- update '10' by adding the value of '1'
- update the result by adding the value of '01'

In the end, we can get the answer.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class NumberOfWaysToSelectBuildings {
public:
    long long numberOfWays(string s) {
        unsigned long n0 = 0, n1 = 0, n01 = 0, n10 = 0, total = 0;
        for (char &c : s) {
            if (c == '1') {
                n1++;
                n01 += n0;
                total += n10;
            } else {
                n0++;
                n10 += n1;
                total += n01;
            }
        }
        return total;
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
class NumberOfWaysToSelectBuildings:
    def numberOfWays(self, s: str) -> int:
        n0, n1, n01, n10, total = 0, 0, 0, 0, 0
        for c in s:
            if c == '1':
                n1 += 1
                n01 += n0
                total += n10
            else:
                n0 += 1
                n10 += n1
                total += n01
        return total
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def number_of_ways(s)
  n0, n1, n01, n10, total = 0, 0, 0, 0, 0
  s.each_char do |c|
    if c == "1"
      n1 += 1
      n01 += n0
      total += n10
    else
      n0 += 1
      n10 += n1
      total += n01
    end
  end
  total
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
