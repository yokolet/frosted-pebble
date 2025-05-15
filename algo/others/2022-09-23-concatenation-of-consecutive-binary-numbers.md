---
layout: algo_page
group: Others
title: Concatenation of Consecutive Binary Numbers
algo_menubar: algo_menu
tags:
- Medium
- Bit Manipulation
- Simulation
- Math
date: 2022-09-23 14:50 +0900
---

## Problem Description
> Given an integer `n`, return the decimal value of the binary string formed by concatenating
> the binary representations of `1` to `n` in order, `modulo 10**9 + 7`.
>
> Constraints:
> - `1 <= n <= 10**5`
>
> [https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/)

## Examples
```
Example 1
Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 
```

```
Example 2
Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.
```

```
Example 3
Input: n = 12
Output: 505379714
```

## How to Solve
The idea of this problem is not so difficult.
The previous result gets bit-shifted by the bits of current number, then add the current number to that.
However, the problem mentions `modulo 10**9 + 7`, which alerts we need to do something more.
There are a couple of approaches such as converting to string problem or bitwise operation.

The solution here uses bitwise operations.
The solution has two keys to solve the problem effectively.
One is to determine how many bits should be shifted.
The bit shift size changes when x & (x - 1) = 0.
For example, 11 to 100, 111 to 1000, 1111 to 10000, ...
Given that, when x & (x - 1) = 0, shift size is incremented.
Another key is the addition.
All bits for current value i are zero since the previous value is shifted to left for the bit size of the current value.
In this case, OR operator works as the addition.
This way, we get the answer.


JavaScript needs a bit of different calculation.
Bitwise operations used in other languages don't work because the number of bits of numeric is short for this calculation.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <numeric>

using namespace std;

class ConcatenationOfConsecutiveBinaryNumbers {
public:
    int concatenatedBinary(int n) {
        const int mod = pow(10, 9) + 7;
        int shift = 0;
        long long int result = 0;
        for (int i = 1; i <= n; ++i) {
            if ((i & (i - 1)) == 0) {
                shift++;
            }
            result = ((result << shift) | i) % mod;
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class ConcatenationOfConsecutiveBinaryNumbers {
    public int concatenatedBinary(int n) {
        int mod = (int)Math.pow(10, 9) + 7;
        int shift = 0;
        long result = 0;
        for (int i = 1; i <= n; ++i) {
            if ((i & (i - 1)) == 0) {
                shift++;
            }
            result = ((result << shift) | i) % mod;
        }
        return (int)result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function(n) {
  const mod = Math.pow(10, 9) + 7;
  let shift = 0, result = 0;
  for (let i = 1; i <= n; i++) {
    if ((i & (i - 1)) === 0) {
      shift += 1;
    }
    result *= (1 << shift);
    result += i;
    result %= mod;
  }
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class ConcatenationOfConsecutiveBinaryNumbers:
    def concatenatedBinary(self, n: int) -> int:
        mod = 10 ** 9 + 7
        result, shift = 0, 0
        for i in range(1, n + 1):
            if i & (i - 1) == 0:
                shift += 1
            result = (result << shift | i) % mod
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer} n
# @return {Integer}
def concatenated_binary(n)
  mod = 10.pow(9) + 7
  shift, result = 0, 0
  (1..n).each do |i|
    if (i & (i - 1)) == 0
      shift += 1
    end
    result = ((result << shift) | i) % mod
  end
  result
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(1)`
