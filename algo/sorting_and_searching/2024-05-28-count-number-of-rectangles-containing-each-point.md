---
layout: algo_page
group: Sorting and Searching
title: Count Number of Rectangles Containing Each Point
algo_menubar: algo_menu
tags:
- Sorting
- Binary Search
- Array
date: 2024-05-28 16:37 +0900
---
## Problem Description
> You are given a 2D integer array rectangles where `rectangles[i] = [l_i, h_i]` indicates that ith rectangle
> has a length of `l_i` and a height of `h_i`. You are also given a 2D integer array points where 
> `points[j] = [x_j, y_j]` is a point with coordinates `(x_j, y_j)`.
>
> The i-th rectangle has its bottom-left corner point at the coordinates `(0, 0)` and its top-right corner point at
> `(l_i, h_i)`.
>
> Return an integer array count of length points.length where `count[j]` is the number of rectangles
> that contain the j-th point.
>
> The i-th rectangle contains the j-th point if `0 <= x_j <= l_i` and `0 <= y_j <= h_i`. Note that points
> that lie on the edges of a rectangle are also considered to be contained by that rectangle.
>
> Constraints:
> - `1 <= rectangles.length, points.length <= 5 * 10**4`
> - `rectangles[i].length == points[j].length == 2`
> - `1 <= l_i, x_j <= 10**9`
> - `1 <= h_i, y_j <= 100`
> - All the rectangles are unique.
> - All the points are unique.
>
> [https://leetcode.com/problems/count-number-of-rectangles-containing-each-point/](https://leetcode.com/problems/count-number-of-rectangles-containing-each-point/)

## Examples
```
Example 1
Input: rectangles = [[1,2],[2,3],[2,5]], points = [[2,1],[1,4]]
Output: [2,1]
Explanation: 
The first rectangle contains no points.
The second rectangle contains only the point (2, 1).
The third rectangle contains the points (2, 1) and (1, 4).
The number of rectangles that contain the point (2, 1) is 2.
The number of rectangles that contain the point (1, 4) is 1.
Therefore, we return [2, 1].
```

```
Example 2
Input: rectangles = [[1,1],[2,2],[3,3]], points = [[1,3],[1,1]]
Output: [1,3]
Explanation:
The first rectangle contains only the point (1, 1).
The second rectangle contains only the point (1, 1).
The third rectangle contains the points (1, 3) and (1, 1).
The number of rectangles that contain the point (1, 3) is 1.
The number of rectangles that contain the point (1, 1) is 3.
Therefore, we return [1, 3].

```

## How to Solve

The solution here takes a binary search approach.
The max value of height is 100 from the constraint, so the solution creates a vector of size 101 whose index is a height.
Each vector element is a vector of lengths. The lengths should be sorted for the binary search.
Find the upper_bound index of lengths in the given point's height.
Add the identified index, which is a count of rectangles.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class NumberOfRectanglesContainingEachPoint {
public:
    vector<int> countRectangles(vector<vector<int>>& rectangles, vector<vector<int>>& points) {
        vector<vector<int>> heights(101);
        for (vector<int>& coord : rectangles) {
            heights[coord[1]].push_back(coord[0]);
        }
        for (vector<int>& height : heights) {
            sort(height.begin(), height.end());
        }
        vector<int> answer;
        for (vector<int>& point : points) {
            int total = 0;
            for (int i = point[1]; i <= 100; ++i) {
                total += heights[i].end() - upper_bound(heights[i].begin(), heights[i].end(), point[0] - 1);
            }
            answer.push_back(total);
        }
        return answer;
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

```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(1)`
