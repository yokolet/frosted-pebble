---
layout: algo_page
group: Trees
title: Unique Binary Search Trees
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
- Math
- Binary Search Tree
date: 2023-01-17 11:34 +0900
---

## Problem Description
> Given an integer `n`, return the number of structurally unique BST's (binary search trees) which has exactly `n`
> nodes of unique values from 1 to `n`.
>
> Constraints:
> - `1 <= n <= 19`
>
> [https://leetcode.com/problems/unique-binary-search-trees/](https://leetcode.com/problems/unique-binary-search-trees/)

## Examples
```
Example 1
Input: n = 3
Output: 5
```

```
Exmaple 2
Input: n = 1
Output: 1
```

## How to Solve
This problem asks the Catalan number.
The Catalan number is from combinatorial mathematics.
The sequence of natural numbers are: 1, 1, 2, 5, 14, 42, 132, 249, 1430, 4862, ...
To calculate the Catalan number, we can use a mathematical formula.
```
C[0] = 1
C[n + 1] = (2 * (2n + 1) / n + 2) * C[n]
```
Looping over the formula from 0 to n will give us the answer.

Aside of the mathematical formula, the problem can be solved by dynamic programming (DP).
The formula above says the next state is depends on the previous state.
It means the DP is a good approach.
The auxiliary array saves the Catalan numbers from 0 to n, which is calculated as:
```
C[0] = 1
C[n + 1] = sum(C[i] * C[n - i]) where i = 0 to n
```

Above relation might be easier to understand compared to the mathematical formula.

The solutions here show both mathematical and DP approaches.

For the Catalan number, see [Catalan number](/2019/09/09/catalan-number.html) for details.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class UniqueBinarySearchTrees {
public:
    int numTreesMath(int n) {
        long C = 1;
        for (int i = 0; i < n; ++i)
        {
          C = C * 2 * (2 * i + 1) / (i + 2);
        }
        return C;
    }

    int numTreesDP(int n) {
        vector<long long int> memo(n + 1, 0);
        memo[0] = 1, memo[1] = 1;
        for (int i = 2; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                memo[i] += memo[j] * memo[i - j - 1];
            }
        }
        return (int)memo[n];
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class UniqueBinarySearchTrees {
    public int numTreesMaath(int n) {
        long C = 1;
        for (int i = 0; i < n; ++i)
        {
          C = C * 2 * (2 * i + 1) / (i + 2);
        }
        return (int)C;
    }

    public int numTreesDP(int n) {
        long[] memo = new long[n+1];
        memo[0] = memo[1] = 1;
        for (int i = 2; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                memo[i] += memo[j] * memo[i-j-1];
            }
        }
        return (int)memo[n];
    }
}

```
{% endtab %}

{% tab solution JavaScript %}
```js

```
{% endtab %}

{% tab solution Python %}
```python
class UniqueBinarySearchTrees:
    def numTreesMath(self, n: int) -> int:
        C = 1
        for i in range(n):
            C = C * 2 * (2 * i + 1) // (i + 2)
        return C

    def numTreesDP(self, n: int) -> int:
        memo = [0 for _ in range(n + 1)]
        memo[0], memo[1] = 1, 1
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                memo[i] += memo[j - 1] * memo[i - j]
        return memo[n]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Math
  - Time: `O(n)`
  - Space: `O(1)`
- DP
  - Time: `O(n^2)`
  - Space: `O(n)`
