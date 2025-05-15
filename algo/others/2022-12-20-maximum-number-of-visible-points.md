---
layout: algo_page
group: Others
title: Maximum Number of Visible Points
algo_menubar: algo_menu
tags:
- Hard
- Geometry
- Sorting
- Sliding Window
- Array
date: 2022-12-20 15:19 +0900
---
## Problem Description
> You are given an array `points`, an integer `angle`, and your `location`, where `location = [pos[x], pos[y]]`
> and `points[i] = [x[i], y[i]]` both denote integral coordinates on the X-Y plane.
>
> Initially, you are facing directly east from your position. You cannot move from your position, but you can rotate.
> In other words, `pos[x]` and `pos[y]` cannot be changed. Your field of view in degrees is represented by angle,
> determining how wide you can see from any given view direction. Let `d` be the amount in degrees that you rotate
> counterclockwise. Then, your field of view is the inclusive range of angles `[d - angle/2, d + angle/2]`.
>
> You can see some set of points if, for each point, the angle formed by the point, your position, and the immediate
> east direction from your position is in your field of view.
>
> There can be multiple points at one coordinate. There may be points at your location, and you can always see these
> points regardless of your rotation. Points do not obstruct your vision to other points.
>
> Return the maximum number of points you can see.
>
> Constraints:
> - `1 <= points.length <= 10**5`
> - `points[i].length == 2`
> - `location.length == 2`
> - `0 <= angle < 360`
> - `0 <= pos[x], pos[y], x[i], y[i] <= 100`
>
> [https://leetcode.com/problems/maximum-number-of-visible-points/](https://leetcode.com/problems/maximum-number-of-visible-points/)

## Examples
```
Example 1
Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
Output: 3
Explanation: All points can be made visible in your field of view, including [3,3] even though [2,2] is in front and
in the same line of sight.
```

```
Example 2
Input: points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]
Output: 4
Explanation: All points can be made visible in your field of view, including the one at your location.
```

```
Example 3
Input: points = [[1,0],[2,1]], angle = 13, location = [1,1]
Output: 1
Explanation: You can only see one of the two points, as shown above.
```

## How to Solve
This problem requires trigonometry knowledge.
To find points within the given angle, each point should be converted to an angle from the given location.
For this purpose, atan2 function (common function name in many languages) is a good choice.
The atan2 measures the counterclockwise angle theta in radians from x-axis to a line formed by two points.
While calculating the angles in radians, angles plus 2 * pi will be added.
This is because points in 3rd, or 4th quadrants can be checked in 1st or 2nd quadrants.
Once all angles are calculated, check those are within the given angle and count it.
Lastly, the points on the given location will be added to the result as the problem describes.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MaximumNumberOfVisiblePoints {
public:
    int visiblePoints(vector<vector<int>>& points, int angle, vector<int>& location) {
        int x0 = location[0], y0 = location[1];
        int dups = 0;
        vector<double> angles;
        for (auto point : points) {
            int x = point[0], y = point[1];
            if (x == x0 && y == y0) { ++dups; }
            else {
                double a = atan2(y - y0, x - x0);
                double a2 = a + 2.0 * M_PI;
                angles.push_back(a);
                angles.push_back(a2);
            }
        }
        sort(angles.begin(), angles.end());
        double theta = angle * M_PI / 180.0;
        int max_v = 0, right = 0;
        for (int left = 0; left < angles.size(); ++left) {
            while (right < angles.size() && angles[right] <= angles[left] + theta) {
                right += 1;
            }
            max_v = max(max_v, right - left);
        }
        return max_v + dups;
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
class MaximumNumberOfVisiblePoints:
    def visiblePoints(self, points: List[List[int]], angle: int, location: List[int]) -> int:
        x0, y0 = location
        dups = len([x for x, y in points if x == x0 and y == y0])
        angles = sorted([math.atan2(y - y0, x - x0) for x, y in points if x != x0 or y != y0])
        angles += [(a + 2.0 * math.pi) for a in angles]
        angle = math.radians(angle)
        max_v, right = 0, 0
        for left in range(len(angles)):
            while right < len(angles) and angles[left] + angle >= angles[right]:
                right += 1
            max_v = max(max_v, right - left)
        return max_v + dups
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(n)`
