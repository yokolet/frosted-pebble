---
layout: algo_page
group: Dynamic Programming
title: Filling Bookcase Shelves
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
date: 2022-12-27 23:48 +0900
---
## Problem Description
> You are given an array `books` where `books[i] = [thickness[i], height[i]]` indicates the thickness and height of
> the ith book. You are also given an integer shelfWidth.
>
> We want to place these books in order onto bookcase shelves that have a total width `shelfWidth`.
>
> We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to
> `shelfWidth`, then build another level of the shelf of the bookcase so that the total height of the bookcase has
> increased by the maximum height of the books we just put down. We repeat this process until there are no more books
> to place.
>
> Note that at each step of the above process, the order of the books we place is the same order as the given
> sequence of books.
> - For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf,
>    the third book on the second shelf, and the fourth and fifth book on the last shelf.
>
> Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.
>
> Constraints:
> - `1 <= books.length <= 1000`
> - `1 <= thicknessi <= shelfWidth <= 1000`
> - `1 <= heighti <= 1000`
>
> [https://leetcode.com/problems/filling-bookcase-shelves/](https://leetcode.com/problems/filling-bookcase-shelves/)

## Examples
```
Example 1
Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelf_width = 4
Output: 6
Explanation:
The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
Notice that book number 2 does not have to be on the first shelf.
```

```
Example 2
Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
Output: 4
```

## How to Solve
This is a knapsack type problem, so the dynamic programming is a good approach.
The auxiliary array saves the height so far.
The saved height at index i should be minimum of previous height plus maximum height up to index i.
This repeats width (thickness) is less than or equal to the given shelfWidth.
When the loop is over, the answer is in the last index of the auxiliary array.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class FillingBookcaseShelves {
public:
    int minHeightShelves(vector<vector<int>>& books, int shelfWidth) {
        int n = books.size();
        vector<int> memo(n + 1, 0);
        for (int i = 1; i < n + 1; ++i) {
            int width = books[i - 1][0], height = books[i - 1][1];
            memo[i] = memo[i - 1] + height;
            for (int j = i - 1; j > 0; --j) {
                if (books[j - 1][0] + width <= shelfWidth) {
                    memo[i] = min(memo[i], memo[j - 1] + max(height, books[j - 1][1]));
                } else {
                    break;
                }
                width += books[j - 1][0];
                height = max(height, books[j - 1][1]);
            }  
        }
        return memo[n];
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
class FillingBookcaseShelves:
    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        n = len(books)
        memo = [0 for _ in range(n + 1)]
        for i in range(1, n + 1):
            width, height = books[i - 1]
            memo[i] = memo[i - 1] + height
            for j in range(i - 1, 0, -1):
                if books[j - 1][0] + width <= shelfWidth:
                    memo[i] = min(memo[i], memo[j - 1] + max(height, books[j - 1][1]))
                else:
                    break
                width += books[j - 1][0]
                height = max(height, books[j - 1][1])
        return memo[n]
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n^2)`
- Space: `O(n)`
