---
layout: algo_page
group: Arrays
title: Valid Sudoku
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Matrix
date: 2022-09-26 17:04 +0900
---

## Problem Description
> Determine if a `9 x 9` Sudoku board is valid.
> Only the filled cells need to be validated according to the following rules:
> - Each row must contain the digits 1-9 without repetition.
> - Each column must contain the digits 1-9 without repetition.
> - Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
>
> Note:
> - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
> - Only the filled cells need to be validated according to the mentioned rules.
>
> Constraints:
> - `board.length == 9`
> - `board[i].length == 9`
> - `board[i][j]` is a digit 1-9 or '.'.


## Examples
```
Example 1
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
```

```
Example 2
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
```

## How to Solve

The idea to solve this problem is not difficult.
Going over each horizontal, vertical and box while check values are all.

Prepare two arrays of set for verticals and boxes, and a set for horizontal.
The horizontal check is easy. Clear the horizontal set every time row increments.
The vertical check is easy as well.
A column index is the vertical array's id.
The box check need a bit of consideration.
When the current row number modulo 3 is 0, box row id is incremented.
The box column id is the same.
The box id among 9 is calculated by (box row id * 3 + column / 3).
While checking horizontal, vertical, and box numbers,
if duplicates are found return False immediately.
When all could be checked, the board is valid.

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
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const vertical = Array.from({ length: 9}).map((_) => new Set())
    const horizontal = new Set()
    const boxes = Array.from({ length: 9}).map((_) => new Set())
    let box_row = -1
    for (let i = 0; i < 9; ++i) {
        horizontal.clear()
        if (i % 3 === 0) box_row++
        for (let j = 0; j < 9; ++j) {
            let c = board[i][j]
            if (c === ".") continue
            if (horizontal.has(c)) return false
            horizontal.add(c)
            if (vertical[j].has(c)) return false
            vertical[j].add(c)
            box_idx = box_row * 3 + Math.floor(j / 3)
            if (boxes[box_idx].has(c)) return false
            boxes[box_idx].add(c)
        }
    }
    return true
}
```
{% endtab %}

{% tab solution Python %}
```python
class ValidSudoku:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        vertical = [set() for _ in range(9)]
        horizontal = set()
        boxes, row_box = [set() for _ in range(9)], -1
        for i in range(9):
            horizontal.clear()
            if i % 3 == 0:
                row_box += 1
            for j in range(9):
                c = board[i][j]
                if c == ".":
                    continue
                if c in horizontal:
                    return False
                horizontal.add(c)
                if c in vertical[j]:
                    return False
                vertical[j].add(c)
                idx_box = row_box * 3 + j // 3
                if c in boxes[idx_box]:
                    return False
                boxes[idx_box].add(c)
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Character[][]} board
# @return {Boolean}
def is_valid_sudoku(board)
  vertical = Array.new(9).map {|_| Set.new }
  horizontal = Set.new
  boxes, box_row = Array.new(9).map {|_| Set.new }, -1
  9.times do |i|
    horizontal.clear
    box_row += 1 if i % 3 == 0
    9.times do |j|
      c = board[i][j]
      next if c == "."
      return false if horizontal.include?(c)
      horizontal << c
      return false if vertical[j].include?(c)
      vertical[j] << c
      box_idx = box_row * 3 + j / 3
      return false if boxes[box_idx].include?(c)
      boxes[box_idx] << c
    end
  end
  true
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(1)` -- double loop is 9 x 9, constant
- Space: `O(1)` -- auxiliary array sizes are fixed, constant
