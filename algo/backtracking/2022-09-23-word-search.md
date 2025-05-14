---
layout: algo_page
group: Backtracking
title: Word Search
algo_menubar: algo_menu
tags:
- Medium
- Backtracking
- Matrix
- Array
date: 2022-09-23 17:11 +0900
---

## Problem Description
> Given an `m x n` grid of characters `board` and a string `word`, return true if word exists in the grid.
>
> The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
> horizontally or vertically neighboring. The same letter cell may not be used more than once.
>
> Constraints:
> - `m == board.length`
> - `n = board[i].length`
> - `1 <= m, n <= 6`
> - `1 <= word.length <= 15`
> - `board` and `word` consists of only lowercase and uppercase English letters.


## Examples
```
Example 1
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Explanation:
[A] [B] [C]  E
 S   F  [C]  S
 A  [D] [E]  E
```

```
Example 2
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Explanation:
 A   B   C   E
 S   F   C  [S]
 A   D  [E] [E]
```

```
Example 3
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

## How to Solve
This is a typical backtracking problem. Normally, a depth-first search works well.
For the backtracking problem, how to get the state back to previous one is important.
The solution here uses a special character "#" as visited status and set it back when the process goes back.

The loop goes the given word one by one. When the process reaches the last character of the given word, the loop finishes.

Ruby solution has two tweaks since the same Ruby solution as C++ or Python gets TLE.
Especially, the character frequency based word reversing preprocess works well to cut down DFS loops.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class WordSearch {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();

        function<bool(int, int, int)> dfs = [&](int row, int col, int idx) {
            if (idx == word.size()) return true;
            if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] != word[idx]) return false;

            char cur = board[row][col];
            board[row][col] = '\0';

            bool down = dfs(row + 1, col, idx + 1);
            bool up = dfs(row - 1, col, idx + 1);
            bool right = dfs(row, col + 1, idx + 1);
            bool left = dfs(row, col - 1, idx + 1);
            if (down || up || right || left) return true;

            board[row][col] = cur;
            return false;
        };

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (dfs(i, j, 0)) return true;
            }
        }

        return false;
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
class WordSearch:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])

        def dfs(row, col, suffix):
            if not suffix:
                return True
            cur = board[row][col]
            board[row][col] = '#'
            up = row - 1 >= 0 and board[row - 1][col] == suffix[0] and dfs(row - 1, col, suffix[1:])
            left = col - 1 >= 0 and board[row][col - 1] == suffix[0] and dfs(row, col - 1, suffix[1:])
            right = col + 1 < n and board[row][col + 1] == suffix[0] and dfs(row, col + 1, suffix[1:])
            down = row + 1 < m and board[row + 1][col] == suffix[0] and dfs(row + 1, col, suffix[1:])
            if up or left or right or down:
                return True
            board[row][col] = cur

        for row in range(m):
            for col in range(n):
                if board[row][col] == word[0] and dfs(row, col, word[1:]):
                    return True
        return False
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Character[][]} board
# @param {String} word
# @return {Boolean}
def exist(board, word)
  return false unless word.chars.all? { |char| board.flatten.include?(char) }
  word = preprocess(board, word)
  return false if word.nil?
  m, n, l = board.size, board[0].size, word.size
  board.size.times do |row|
    board[0].size.times do |col|
      return true if dfs(board, m, n, l, word, row, col, 0)
    end
  end
  false
end

def preprocess(board, word)
  board_freq = Hash.new(0)
  board.each do |row|
    row.each do |c|
      board_freq[c] += 1
    end
  end
  word_freq = word.chars.tally
  word_freq.each do |c, count|
    return nil if board_freq[c] < count
  end
  board_freq[word[0]] > board_freq[word[-1]] ? word.reverse : word
end

def dfs(board, m, n, l, word, row, col, idx)
  return true if idx == l
  return false if row < 0 || col < 0 || row >= m || col >= n || board[row][col] != word[idx]

  cur = board[row][col]
  board[row][col] = "#"

  up = dfs(board, m, n, l, word, row - 1, col, idx + 1)
  left = dfs(board, m, n, l, word, row, col - 1, idx + 1)
  right = dfs(board, m, n, l, word, row, col + 1, idx + 1)
  down = dfs(board, m, n, l, word, row + 1, col, idx + 1)

  board[row][col] = cur
  up || left || right || down
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n * 3 ^ k)` -- n: number of cells, k: length of the word, 3: one of four directions is where it comes from
- Space: `O(k)`
