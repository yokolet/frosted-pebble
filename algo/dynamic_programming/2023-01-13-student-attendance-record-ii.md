---
layout: algo_page
group: Dynamic Programming
title: Student Attendance Record II
algo_menubar: algo_menu
tags:
- Hard
- Dynamic Programming
date: 2023-01-13 22:17 +0900
---
## Problem Description
> An attendance record for a student can be represented as a string where each character signifies whether the student
> was absent, late, or present on that day. The record only contains the following three characters:
> - 'A': Absent.
> - 'L': Late.
> - 'P': Present.
>
> Any student is eligible for an attendance award if they meet both of the following criteria:
> - The student was absent ('A') for strictly fewer than 2 days total.
> - The student was never late ('L') for 3 or more consecutive days.
>
> Given an integer `n`, return the number of possible attendance records of length n that make a student eligible for
> an attendance award. The answer may be very large, so return it modulo 10**9 + 7.
>
> Constraints:
> - `1 <= n <= 10**5`


## Examples
```
Example 1
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
```

```
Example 2
Input: n = 1
Output: 3
```

```
Example 3
Input: n = 10101
Output: 183236316
```

## How to Solve
As this problem categorized in Hard, it is truly a hard problem.
Easy solutions such as BSF or recursion get the Time Limit Exceeded error.
So, it's critical to improve the algorithm.

If we look into the problem well, we won't take long to figure out this is a dynamic programming (DP) problem.
A result of the given n depends on the result of n - 1 while n - 1 depends on n - 2.
If we look into the problem further, we will realise the character pattern is not important.
Looking at the number of patterns is the key to solve this problem.
Again, if we look into the problem more, we will know it is a variation of famous Fibonacci sequence.

How to count is not straightforward like Fibonacci.
The pattern counting is divided into two: with one A and without A.
The initial values are based on n = 1.
- AnoL: one A and zero L --- This is 'A'. The initial value is 1.
- A1L: one A and one L --- When n = 1, it's not possible. The initial value = 0.
- A2L: one A and two Ls --- When n = 1, it's not possible. The initial value = 0.
- noAnoL: zero A and zero L --- This is 'P'. The initial value is 1.
- noA1L: zero A and one L --- This is 'L'. The initial value is 1.
- noA2L: zero A and two Ls --- When n = 1, it's not possible. The initial value = 0.

The next state, n = 2, can be calculated as:
- AnoL: sum of previous all 6 patterns
- A1L: previous AnoL
- A2L: previous A1L
- noAnoL: sum of previous three noA patterns
- noA1L: previous noAnoL
- noA2L: previous noA1L

In the end, sum of all 6 patterns is the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class StudentAttendanceRecordTwo {
public:
    int checkRecord(int n) {
        int mod = pow(10, 9) + 7;
        long long int AnoL = 1, A1L = 0, A2L = 0, noAnoL = 1, noA1L = 1, noA2L = 0, tmp;
        for (int i = 1; i < n; ++i) {
            tmp = (AnoL + A1L + A2L + noAnoL + noA1L + noA2L) % mod;
            A2L = A1L;
            A1L = AnoL;
            AnoL = tmp;
            tmp = (noAnoL + noA1L + noA2L) % mod;
            noA2L = noA1L;
            noA1L = noAnoL;
            noAnoL = tmp;
        }
        return (AnoL + A1L + A2L + noAnoL + noA1L + noA2L) % mod;
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
class StudentAttendanceRecordTwo:
    def checkRecord(self, n: int) -> int:
        mod = 10 ** 9 + 7
        AnoL, A1L, A2L, noAnoL, noA1L, noA2L = 1, 0, 0, 1, 1, 0
        for _ in range(1, n):
            tmp = (AnoL + A1L + A2L + noAnoL + noA1L + noA2L) % mod
            A1L, A2L = AnoL, A1L
            AnoL = tmp
            tmp = (noAnoL + noA1L + noA2L) % mod
            noA1L, noA2L = noAnoL, noA1L
            noAnoL = tmp
        return (AnoL + A1L + A2L + noAnoL + noA1L + noA2L) % mod
```
{% endtab %}

{% tab solution Ruby %}
```ruby
MOD = 10 ** 9 + 7

# @param {Integer} n
# @return {Integer}
def check_record(n)
  a_no_l, a_1_l, a_2_l, no_a_no_l, no_a_1_l, no_a_2_l = 1, 0, 0, 1, 1, 0
  (1...n).each do |i|
    tmp = [a_no_l, a_1_l, a_2_l, no_a_no_l, no_a_1_l, no_a_2_l].sum % MOD
    a_1_l, a_2_l = a_no_l, a_1_l
    a_no_l = tmp
    tmp = [no_a_no_l, no_a_1_l, no_a_2_l].sum % MOD
    no_a_1_l, no_a_2_l = no_a_no_l, no_a_1_l
    no_a_no_l = tmp
  end
  [a_no_l, a_1_l, a_2_l, no_a_no_l, no_a_1_l, no_a_2_l].sum % MOD
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(1)`
