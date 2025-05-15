---
layout: algo_page
group: Design
title: Detect Squares
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Counting
- Design
date: 2022-12-29 17:35 +0900
---

## Problem Description
> You are given a stream of points on the X-Y plane. Design an algorithm that:
> - Adds new points from the stream into a data structure. Duplicate points are allowed and should be treated as
>    different points.
> - Given a query point, counts the number of ways to choose three points from the data structure such that the three
>    points and the query point form an axis-aligned square with positive area.
>
> An axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to
> the x-axis and y-axis.
>
> Implement the DetectSquares class:
> - `DetectSquares()` Initializes the object with an empty data structure.
> - `void add(int[] point)` Adds a new point `point = [x, y]` to the data structure.
> - `int count(int[] point)` Counts the number of ways to form axis-aligned squares with point `point = [x, y]` as
>    described above.
>
> Constraints:
> - `point.length == 2`
> - `0 <= x, y <= 1000`
> - At most 3000 calls in total will be made to `add` and `count`.
>
> [https://leetcode.com/problems/detect-squares/](https://leetcode.com/problems/detect-squares/)

## Examples
```
Example 1
Input
["DetectSquares", "add", "add", "add", "count", "count", "add", "count"]
[[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]
Output
[null, null, null, null, 1, 0, null, 2]

Explanation
DetectSquares detectSquares = new DetectSquares();
detectSquares.add([3, 10]);
detectSquares.add([11, 2]);
detectSquares.add([3, 2]);
detectSquares.count([11, 10]); // return 1. You can choose:
                               //   - The first, second, and third points
detectSquares.count([14, 8]);  // return 0. The query point cannot form a square with any points in the data structure.
detectSquares.add([11, 2]);    // Adding duplicate points is allowed.
detectSquares.count([11, 10]); // return 2. You can choose:
                               //   - The first, second, and third points
                               //   - The first, third, and fourth points
```

## How to Solve
This problem requires an effective way of finding sides of squares.
Given the x, y coordinate, the first step is to find y coordinates whose x coordinate is the same.
The length of a side is easily calculated by a difference of the y coordinates.
Whether the supposed 3 points exist or not, multiply the counts of `[x0, y], [x0 + side, y0], [x0 + side, y]`.
This will narrow down count to the what we want.
Then, count for the other side, `[x0, y], [x0 - side, y0], [x0 - side, y]`.

The solution here used a single hash table.
It is a hash table of hash table and saves x to y counts.

The point here is what the hash table returns when the given key doesn't exist.
Python's collections.defaultdict and collections.Counter return 0 when the value is integer.
C++'s unordered_map also returns 0 when the value type is integer.
However, some other languages or data structures need to specify the value when the key doesn't exist.
We should be careful about that.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class DetectSquares {
private:
    unordered_map<int, unordered_map<int, int>> x_coord;

public:
    DetectSquares() {}

    void add(vector<int> point) {
        int x = point[0], y = point[1];
        x_coord[x][y]++;
    }

    int count(vector<int> point) {
        int x0 = point[0], y0 = point[1], result = 0;
        for (auto &[y, cnt] : x_coord[x0]) {
            if (y == y0) { continue; }
            int side = y - y0;
            result += cnt * x_coord[x0 + side][y0] * x_coord[x0 + side][y];
            result += cnt * x_coord[x0 - side][y0] * x_coord[x0 - side][y];
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.HashMap;
import java.util.Map;

public class DetectSquares {
    private Map<Integer, Map<Integer, Integer>> x_coord = new HashMap<>();

    public DetectSquares() {}

    public void add(int[] point) {
        Map<Integer, Integer> y_coord = x_coord.getOrDefault(point[0], new HashMap<>());
        int cnt = y_coord.getOrDefault(point[1], 0);
        y_coord.put(point[1], cnt + 1);
        x_coord.put(point[0], y_coord);
    }

    public int count(int[] point) {
        int x0 = point[0], y0 = point[1], result = 0;
        for (int y : x_coord.getOrDefault(x0, new HashMap<>()).keySet()) {
            if (y == y0) { continue; }
            int side = y - y0;
            int cnt = x_coord.getOrDefault(x0, new HashMap<>()).getOrDefault(y, 0);
            result += cnt *
                    x_coord.getOrDefault(x0 + side, new HashMap<>()).getOrDefault(y0, 0) *
                    x_coord.getOrDefault(x0 + side, new HashMap<>()).getOrDefault(y, 0);
            result += cnt *
                    x_coord.getOrDefault(x0 - side, new HashMap<>()).getOrDefault(y0, 0) *
                    x_coord.getOrDefault(x0 - side, new HashMap<>()).getOrDefault(y, 0);
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
var DetectSquares = function() {
  this.x_coord = new Map();
};

/**
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function(point) {
  const [x, y] = point;
  let y_coord = this.x_coord.has(x) ? this.x_coord.get(x) : new Map();
  let cnt = y_coord.has(y) ? y_coord.get(y) : 0;
  y_coord.set(y, cnt + 1);
  this.x_coord.set(x, y_coord);
};

/**
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function(point) {
  const [x0, y0] = point;
  let result = 0;
  const y_coord = this.x_coord.has(x0) ? this.x_coord.get(x0) : new Map();
  y_coord.forEach((cnt, y) => {
    if (y == y0) { return; }
    let side = y - y0;
    if (this.x_coord.has(x0 + side)) {
      let tmp1 = this.x_coord.get(x0 + side).has(y0) ? this.x_coord.get(x0 + side).get(y0) : 0;
      let tmp2 = this.x_coord.get(x0 + side).has(y) ? this.x_coord.get(x0 + side).get(y) : 0;
      result += cnt * tmp1 * tmp2;
    }
    if (this.x_coord.has(x0 - side)) {
      let tmp1 = this.x_coord.get(x0 - side).has(y0) ? this.x_coord.get(x0 - side).get(y0) : 0;
      let tmp2 = this.x_coord.get(x0 - side).has(y) ? this.x_coord.get(x0 - side).get(y) : 0;
      result += cnt * tmp1 * tmp2;
    }
  });
  return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class DetectSquares:

    def __init__(self):
        self.x_coord = collections.defaultdict(collections.Counter)

    def add(self, point: List[int]) -> None:
        x, y = point
        self.x_coord[x][y] += 1

    def count(self, point: List[int]) -> int:
        x0, y0 = point
        result = 0
        for y in self.x_coord[x0]:
            if y == y0: continue
            side = y - y0
            result += self.x_coord[x0][y] * self.x_coord[x0 + side][y0] * self.x_coord[x0 + side][y]
            result += self.x_coord[x0][y] * self.x_coord[x0 - side][y0] * self.x_coord[x0 - side][y]
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
class DetectSquares
  def initialize()
    @x_coord = Hash.new {|h0, k0| h0[k0] = Hash.new {|h1, k1| h1[k1] = 0}}
  end


=begin
    :type point: Integer[]
    :rtype: Void
=end
  def add(point)
    x, y = point
    @x_coord[x][y] += 1
  end


=begin
    :type point: Integer[]
    :rtype: Integer
=end
  def count(point)
    x0, y0 = point
    result = 0
    @x_coord[x0].each do |y, cnt|
      if y == y0
        next
      end
      side = y - y0
      result += cnt * @x_coord[x0 + side][y0] * @x_coord[x0 + side][y]
      result += cnt * @x_coord[x0 - side][y0] * @x_coord[x0 - side][y]
    end
    result
  end


end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: add: `O(1)`, count: `O(n)` -- n: number of unique y coordinates of a single x coordinate
- Space: `O(m)` -- m: number of unique x coordinates
