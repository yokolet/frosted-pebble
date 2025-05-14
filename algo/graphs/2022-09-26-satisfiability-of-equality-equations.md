---
layout: algo_page
group: Graphs
title: Satisfiability of Equality Equations
algo_menubar: algo_menu
tags:
- Medium
- Graph
- Union Find
- String
date: 2022-09-26 14:39 +0900
---
## Introduction
This is a graph problem since the equations define the relations between two node.
The equations will create a directed cycle graph.
The depth-first search or union find will give us the answer.
In this case, the problem is related to groups, not like paths.
For this reason, the solution here took the union find approach.

## Problem Description
> You are given an array of strings `equations` that represent relationships between variables
> where each string `equations[i]` is of length 4 and takes one of two different forms: `"x[i]==y[i]"` or `"x[i]!=y[i]"`.
> Here, `x[i]` and `y[i]` are lowercase letters (not necessarily different) that represent one-letter variable names.
>
> Return `true` if it is possible to assign integers to variable names so as to satisfy all the given equations, or `false` otherwise.
>
> Constraints:
> - `1 <= equations.length <= 500`
> - `equations[i].length == 4`
> - `equations[i][0]` is a lowercase letter
> - `equations[i][1]` is either '=' or '!'
> - `equations[i][2] `is '='.
> - `equations[i][3]` is a lowercase letter.
>
> [https://leetcode.com/problems/satisfiability-of-equality-equations/](https://leetcode.com/problems/satisfiability-of-equality-equations/)

## Examples
```
Example 1
Input: equations = ["a==b","b!=a"]
Output: false
```

```
Example 2
Input: equations = ["b==a","a==b"]
Output: true
```

```
Example 3
Input: ["a==b","b!=c","c==a"]
Output: false
```

## Analysis
The approach here is a union find.
So, two functions, find and union were defined first.
Then, the solution took 2 step traversal of the equations (relations).
Pick up `==` equations to union groups.
Next, pick up `!=` equations to test two groups are not in the same group.

## Solution
```python
class SatisfiabilityOfEqualityEquations:
    def equationsPossible(self, equations: List[str]) -> bool:
        groups = [i for i in range(26)]
        
        def atoi(ch):
            return ord(ch) - ord('a')
        
        def find(x):
            while x != groups[x]:
                x = groups[x]
            return x
        
        def union(x, y):
            group_x, group_y = find(x), find(y)
            if group_x < group_y:
                groups[group_y] = group_x
            else:
                groups[group_x] = group_y

        for eq in equations:
            if eq[1] == '=':
                x, y = atoi(eq[0]), atoi(eq[3])
                union(x, y)
        for eq in equations:
            if eq[1] == '!':
                x, y = atoi(eq[0]), atoi(eq[3])
                if find(x) == find(y):
                    return False
        return True
```

## Complexities
- Time: `O(n)`
- Space: `O(1)` -- auxiliary array has always length 26, constant
