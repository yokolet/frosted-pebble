---
layout: algo_page
group: Arrays
title: Spiral Matrix
algo_menubar: algo_menu
tags:
- Medium
- Array
- Matrix
- Simulation
date: 2024-07-09 22:17 +0900
---
## Problem Description
> Given an `m` x `n` `matrix`, return all elements of the matrix in spiral order.
>
> Constraints:
> - `m == matrix.length`
> - `n == matrix[i].length`
> - `1 <= m, n <= 10`
> - `-100 <= matrix[i][j] <= 100`
>
> [https://leetcode.com/problems/spiral-matrix/](https://leetcode.com/problems/spiral-matrix/)

## Examples
```
Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

```
Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## How to Solve

Keep tracking start and end index for both rows and columns. Traverse indices within those four boundaries.
When a left to right traversal finishes, increment start row. When a top to bottom traversal finishes,
decrement end column. After a right to left traversal, decrement end row. After a bottom to top traversal,
increment start col.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class SpiralMatrix {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), count = m * n;
        vector<int> result;
        int row_start = 0, row_end = m - 1, col_start = 0, col_end = n - 1;
        while (count > 0) {
          for (int i = col_start; i <= col_end; ++i) {
            result.push_back(matrix[row_start][i]);
            count--;
          }
          if (count == 0) break;
          row_start++;
          for (int i = row_start; i <= row_end; ++i) {
            result.push_back(matrix[i][col_end]);
            count--;
          }
          if (count == 0) break;
          col_end--;
          for (int i = col_end; i >= col_start; --i) {
            result.push_back(matrix[row_end][i]);
            count--;
          }
          if (count == 0) break;
          row_end--;
          for (int i = row_end; i >= row_start; --i) {
            result.push_back(matrix[i][col_start]);
            count--;
          }
          if (count == 0) break;
          col_start++;
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class SpiralMatrix {
    public List<Integer> spiralOrder(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, count = m * n;
        int row_start = 0, row_end = m - 1, col_start = 0, col_end = n - 1;
        List<Integer> result = new ArrayList();
        while (count > 0) {
          for (int i = col_start; i <= col_end; ++i) {
            result.add(matrix[row_start][i]);
            count--;
          }
          if (count == 0) break;
          row_start++;
          for (int i = row_start; i <= row_end; ++i) {
            result.add(matrix[i][col_end]);
            count--;
          }
          if (count == 0) break;
          col_end--;
          for (int i = col_end; i >= col_start; --i) {
            result.add(matrix[row_end][i]);
            count--;
          }
          if (count == 0) break;
          row_end--;
          for (int i = row_end; i >= row_start; --i) {
            result.add(matrix[i][col_start]);
            count--;
          }
          if (count == 0) break;
          col_start++;
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let count = m * n, row_start = 0, row_end = m - 1, col_start = 0, col_end = n - 1;
    result = [];
    while (count > 0) {
      for (let i = col_start; i <= col_end; ++i) {
        result.push(matrix[row_start][i]);
        count--;
      }
      if (count === 0) break;
      row_start++;
      for (let i = row_start; i <= row_end; ++i) {
        result.push(matrix[i][col_end]);
        count--;
      }
      if (count === 0) break;
      col_end--;
      for (let i = col_end; i >= col_start; --i) {
        result.push(matrix[row_end][i]);
        count--;
      }
      if (count === 0) break;
      row_end--;
      for (let i = row_end; i >= row_start; --i) {
        result.push(matrix[i][col_start]);
        count--;
      }
      if (count === 0) break;
      col_start++;
    }
    return result;
```
{% endtab %}

{% tab solution Python %}
```python
class SpiralMatrix:
    def spiralOrder(self, matrix: 'List[List[int]]') -> 'List[int]':
        if not matrix or not matrix[0]: return []
        m, n, result = len(matrix), len(matrix[0]), []
        row_start, row_end, col_start, col_end = 0, m-1, 0, n-1
        count = m * n
        while row_start <= row_end and col_start <= col_end:
            for i in range(col_start, col_end+1):
                result.append(matrix[row_start][i])
                count -= 1
            if count == 0: break
            row_start += 1
            for i in range(row_start, row_end+1):
                result.append(matrix[i][col_end])
                count -= 1
            if count == 0: break
            col_end -= 1
            for i in range(col_end, col_start-1, -1):
                result.append(matrix[row_end][i])
                count -= 1
            if count == 0: break
            row_end -= 1
            for i in range(row_end, row_start-1, -1):
                result.append(matrix[i][col_start])
                count -= 1
            if count == 0: break
            col_start += 1
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} matrix
# @return {Integer[]}
def spiral_order(matrix)
    m, n, count = matrix.size, matrix[0].size
    count, row_start, row_end, col_start, col_end = m * n, 0, m - 1, 0, n - 1
    result = []
    while count > 0
      col_start.upto(col_end) do |i|
        result << matrix[row_start][i]
        count -= 1
      end
      break if count == 0
      row_start += 1
      row_start.upto(row_end) do |i|
        result << matrix[i][col_end]
        count -= 1
      end
      break if count == 0
      col_end -= 1
      col_end.downto(col_start) do |i|
        result << matrix[row_end][i]
        count -= 1
      end
      break if count == 0
      row_end -= 1
      row_end.downto(row_start) do |i|
        result << matrix[i][col_start]
        count -= 1
      end
      break if count == 0
      col_start += 1
    end
    result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(m * n)` -- m, n are number of rows and columns respectively
- Space: `O(1)`
