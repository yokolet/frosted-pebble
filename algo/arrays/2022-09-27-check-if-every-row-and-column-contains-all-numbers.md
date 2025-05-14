---
layout: algo_page
group: Arrays
title: Check if Every Row and Column Contains All Numbers
algo_menubar: algo_menu
tags:
- Easy
- Matrix
- Array
date: 2022-09-27 16:03 +0900
---

## Problem Description
> An `n x n` matrix is valid if every row and every column contains all the integers from 1 to n (inclusive).
>
> Given an `n x n` integer matrix `matrix`, return `true` if the matrix is valid. Otherwise, return `false`.
>
> Constraints:
> - `n == matrix.length == matrix[i].length`
> - `1 <= n <= 100`
> - `1 <= matrix[i][j] <= n`
>
> [https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/)

## Examples
```
Example 1
Input: matrix = [[1,2,3],[3,1,2],[2,3,1]]
Output: true
```

```
Example 2
Input: matrix = [[1,1,1],[1,2,3],[1,2,3]]
Output: false
```

## How to Solve
The problem is about n x n matrix and 1 to n (inclusive) values.
Using a set data structure, check the cell value of each row and column doesn't appear more than once.

The solution uses a set for horizontal and array of sets for vertical.
When a row is scanned, it checks the horizontal set.
When all rows are scanned, it checks the array of vertical sets.
If all are length n, return True.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class CheckIfEveryRowAndColumnContainsAllNumbers {
public:
    bool checkValid(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // check rows
        for (int r = 0; r < n; ++r) {
            vector<int> counts(n + 1, 0);
            for (int c = 0; c < n; ++c) {
                if (counts[matrix[r][c]] > 0) { return false; }
                counts[matrix[r][c]]++;
            }
        }
        // check cols
        for (int c = 0; c < n; ++c) {
            vector<int> counts(n + 1, 0);
            for (int r = 0; r < n; ++r) {
                if (counts[matrix[r][c]] > 0) { return false; }
                counts[matrix[r][c]]++;
            }
        }
        return true;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class CheckIfEveryRowAndColumnContainsAllNumbers {
    public boolean checkValid(int[][] matrix) {
        int n = matrix.length;
        // check rows
        for (int r = 0; r < n; ++r) {
            int[] counts = new int[n + 1];
            for (int c = 0; c < n; ++c) {
                if (counts[matrix[r][c]] > 0) { return false; }
                counts[matrix[r][c]]++;
            }
        }
        // check cols
        for (int c = 0; c < n; ++c) {
            int[] counts = new int[n + 1];
            for (int r = 0; r < n; ++r) {
                if (counts[matrix[r][c]] > 0) { return false; }
                counts[matrix[r][c]]++;
            }
        }
        return true;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function(matrix) {
    const n = matrix.length;
    // check rows
    for (let r = 0; r < n; r++) {
        let counts = new Array(n + 1);
        counts.fill(0);
        for (let c = 0; c < n; c++) {
            if (counts[matrix[r][c]] > 0) { return false; }
            counts[matrix[r][c]]++;
        }
    }
    //check cols
    for (let c = 0; c < n; c++) {
        let counts = new Array(n + 1);
        counts.fill(0);
        for (let r = 0; r < n; r++) {
            if (counts[matrix[r][c]] > 0) { return false; }
            counts[matrix[r][c]]++;
        }
    }
    return true;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CheckIfEveryRowAndColumnContainsAllNumbers:
    def checkValid(self, matrix: List[List[int]]) -> bool:
        n = len(matrix)
        # check rows
        for r in range(n):
            counts = [0 for _ in range(n + 1)]
            for c in range(n):
                if counts[matrix[r][c]] > 0:
                    return False
                counts[matrix[r][c]] += 1
        # check cols
        for c in range(n):
            counts = [0 for _ in range(n + 1)]
            for r in range(n):
                if counts[matrix[r][c]] > 0:
                    return False
                counts[matrix[r][c]] += 1
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} matrix
# @return {Boolean}
def check_valid(matrix)
    n = matrix.size
    # check rows
    (0...n).each do |r|
        counts = Array.new(n + 1, 0)
        (0...n).each do |c|
            if counts[matrix[r][c]] > 0
                return false
            end
            counts[matrix[r][c]] += 1
        end
    end
    # check cols
    (0...n).each do |c|
        counts = Array.new(n + 1, 0)
        (0...n).each do |r|
            if counts[matrix[r][c]] > 0
                return false
            end
            counts[matrix[r][c]] += 1
        end
    end
    return true
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n^2)`
- Space: `O(n^2)`
