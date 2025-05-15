---
layout: algo_page
group: Dynamic Programming
title: Longest Common Subsequence
algo_menubar: algo_menu
tags:
- Medium
- String
- Dynamic Programming
date: 2024-05-23 21:16 +0900
---
## Problem Description
> Given two strings `text1` and `text2`, return the length of their longest common subsequence.
> If there is no common subsequence, return 0.
>
> A subsequence of a string is a new string generated from the original string with some
> characters (can be none) deleted without changing the relative order of the remaining characters.
>
> For example, "ace" is a subsequence of "abcde".
> A common subsequence of two strings is a subsequence that is common to both strings.
>
> Constraints:
> - `1 <= text1.length, text2.length <= 1000`
> - `text1` and `text2` consist of only lowercase English characters.
>
> [https://leetcode.com/problems/longest-common-subsequence/description/](https://leetcode.com/problems/longest-common-subsequence/description/)

## Examples
```
Example 1
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
```

```
Example 2
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

```
Example 3
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

## How to Solve

This is a typical dynamic programming problem.
The easiest way is to create 2D array to save states up to indices i, j where i, j are index of
each text. If `text1[i]` is the same as `text2[j]`, the state will be `matrix[i-1][j-1]+1`.
If not the same, take the maximum of `matrix[i-1][j]` and `matrix[i][j-1]`.
The answer is in the bottom right of the matrix. For example, when "abcdef" and "acbcf" are given,
the algorithm works as in below:

```
  | -   a   b   c   d   e   f
--+--------------------------
- | 0   0   0   0   0   0   0
a | 0   1   1   1   1   1   1
c | 0   1   1   2   2   2   2
b | 0   1   2   2   2   2   2
c | 0   1   1   3   3   3   3
f | 0   1   1   3   3   3   4
```

The solution here uses two 1D auxiliary arrays instead of 2D matrix.
This is a memory performance tweak.
Allocating 1D array is much faster compared to 2D matrix even though it needs two arrays.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class LCS {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length(), n = text2.length();
        vector<int> prev(n + 1, 0);
        for (int i = 1; i <= m; ++i) {
            vector<int> cur(n + 1, 0);
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1]) {
                    cur[j] = prev[j - 1] + 1;
                } else {
                    cur[j] = max(cur[j - 1], prev[j]);
                }
            }
            prev = cur;
        }
        return prev[n];
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
class LCS:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1
        m, n = len(text1), len(text2)
        prev = [0 for _ in range(n+1)]
        for i in range(m):
            cur = [0 for _ in range(n+1)]
            for j in range(n):
                if text1[i] == text2[j]:
                    cur[j+1] = prev[j]+1
                else:
                    cur[j+1] = max(prev[j+1], cur[j])
            prev = cur
        return cur[-1]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(mn)`
- Space: `O(n)`
