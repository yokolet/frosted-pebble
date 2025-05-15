---
layout: algo_page
group: Others
title: Robot Bounded In Circle
algo_menubar: algo_menu
tags:
- Medium
- Math
- Simulation
- String
date: 2022-09-13 16:29 +0900
---
## Introduction
Just follow the instruction and construct a path.
If the path repeats four times, the robot comes back to the original point when possible.

## Problem Description
> On an infinite plane, a robot initially stands at `(0, 0)` and faces north. Note that:
> - The north direction is the positive direction of the y-axis.
> - The south direction is the negative direction of the y-axis.
> - The east direction is the positive direction of the x-axis.
> - The west direction is the negative direction of the x-axis.
>
> The robot can receive one of three instructions:
> - "G": go straight 1 unit.
> - "L": turn 90 degrees to the left (i.e., anti-clockwise direction).
> - "R": turn 90 degrees to the right (i.e., clockwise direction).
>
> The robot performs the instructions given in order, and repeats them forever.
>
> Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.
>
> Constraints:
> - `1 <= instructions.length <= 100`
> - `instructions[i]` is 'G', 'L' or, 'R'.
>
> [https://leetcode.com/problems/robot-bounded-in-circle/](https://leetcode.com/problems/robot-bounded-in-circle/)

## Examples
```
Example 1:
Input: instructions = "GGLLGG"
Output: true
Explanation:
(0, 0) -> north, (0, 1) -> north, (0, 2) -> west, (0, 2) -> south, (0, 2) -> south, (0, 1) -> south, (0, 0)
```

```
Example 2:
Input: instructions = "GG"
Output: false
```

```
Example 3:
Input: instructions = "GL"
Output: true
Explanation: GLGLGLGL comes back to (0, 0)
```

## Analysis
Construct a path from the given string and repeat it 4 times.
After the 4 times repetition, check the robot is on the original position, `(0, 0)`.

## Solution
```python
class RobotBoundedInCircle:
    def isRobotBounded(self, instructions: str) -> bool:
        def move(x, y, pos):
            dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)] # north, east, south, west
            for i in instructions:
                if i == 'L':
                    pos = (pos + 3) % 4
                elif i == 'R':
                    pos = (pos + 1) % 4
                else:
                    x += dirs[pos][0]
                    y += dirs[pos][1]
            return x, y, pos
        x, y, pos = 0, 0, 0
        for _ in range(4):
            x, y, pos = move(x, y, pos)
        return x == 0 and y == 0
```

## Complexities
- Time: `O(n)`
- Space: `O(1)`
