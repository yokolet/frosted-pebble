---
layout: algo_page
group: Strings
title: Push Dominoes
algo_menubar: algo_menu
tags:
- Medium
- String
- Two Pointers
date: 2022-09-27 14:47 +0900
---
## Introduction
Depending on how to think, this problem has a few approaches to solve.
The two pointers, DP would be one of them. Also, a string manipulation approach is there.

## Problem Description
> There are n dominoes in a line, and we place each domino vertically upright.
> In the beginning, we simultaneously push some of the dominoes either to the left or to the right.
>
> After each second, each domino that is falling to the left pushes the adjacent domino on the left.
> Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.
> When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.
> For the purposes of this question, we will consider that a falling domino expends
> no additional force to a falling or already fallen domino.
>
> You are given a string `dominoes` representing the initial state where:
> - `dominoes[i] = 'L'`, if the ith domino has been pushed to the left,
> - `dominoes[i] = 'R'`, if the ith domino has been pushed to the right, and
> - `dominoes[i] = '.'`, if the ith domino has not been pushed.
>
> Return a string representing the final state.
>
> Constraints:
> - `n == dominoes.length`
> - `1 <= n <= 10**5`
> - `dominoes[i]` is either 'L', 'R', or '.'.
>
> [https://leetcode.com/problems/push-dominoes/](https://leetcode.com/problems/push-dominoes/)

## Examples
```
Example 1
Input: dominoes = "RR.L"
Output: "RR.L"
```

```
Example 2
Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."
```

```
Example 3
Input: dominoes = "..R.."
Output: "..RRR"
```

## Analysis
The solution here took the string manipulation approach.
If the fragment is 'R.L', we want to keep it as is. So, replace it by '***' for now.
While 'R.' or '.L" patterns should be replaced by 'RR' or 'LL'.
If there's no more change, the process is over.
In the end, replace '***' to the original 'R.L'.

## Solution
```python
class PushDominoes:
    def pushDominoes(self, dominoes: str) -> str:
        nochange = '***'
        result = ''
        while result != dominoes:
            result = dominoes
            dominoes = dominoes.replace('R.L', nochange)
            dominoes = dominoes.replace('R.', 'RR')
            dominoes = dominoes.replace('.L', 'LL')
        return result.replace(nochange, 'R.L')
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
