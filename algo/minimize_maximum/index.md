---
layout: page
title: Algorithm
subtitle: Minimize Maximum
menubar: minimize_maximum_menu
hero_height: is-small
hero_image: /assets/img/peach-camellia.jpeg
show_sidebar: false
---

## Algorithm
### Minimize Maximum
#### How to solve this type of problems
- Use binary search to find an optimal solution
1. Find low and high values. Those depend on the problems.
   Figure out what those should be by reading the problem carefully.
2. Run binary search
3. Based on the mid value, create groups checking given array's values one by one.
4. If the number of groups are small, mid value should be smaller to create more groups.
   Otherwise, mid value should be bigger to create less groups.
