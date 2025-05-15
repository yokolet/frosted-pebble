---
layout: algo_page
group: Games
title: Stone Game
algo_menubar: algo_menu
tags:
- Medium
- Math
- Game Theory
date: 2024-07-22 17:30 +0900
---
## Problem Description
> Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row,
> and each pile has a positive integer number of stones `piles[i]`.
> 
> The objective of the game is to end with the most stones. The total number of stones across all the piles is odd,
> so there are no ties.
>
> Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either
> from the beginning or from the end of the row. This continues until there are no more piles left,
> at which point the person with the most stones wins.
>
> Assuming Alice and Bob play optimally, return `true` if Alice wins the game, or `false` if Bob wins.
>
> Constraints:
> - `2 <= piles.length <= 500`
> - `piles.length` is even.
> - `1 <= piles[i] <= 500`
> - `sum(piles[i])` is odd.
>
> [https://leetcode.com/problems/stone-game/](https://leetcode.com/problems/stone-game/)

## Examples
```
Example 1:

Input: piles = [5,3,4,5]
Output: true
Explanation: 
Alice starts first, and can only take the first 5 or the last 5.
Say she takes the first 5, so that the row becomes [3, 4, 5].
If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points.
If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alice, so we return true
```

```
Example 2:

Input: piles = [3,7,2,3]
Output: true
```

## How to Solve

This problem is a good example of a two-player game to think what happens once the game starts.
At a glance, it looks a DP problem. However, think twice.
Alice can take piles of every even indices or every odd indicies. A total sum of one of two is greater than another.
Alice can always choose the greater sum. That's why the answer is simply true in any case.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class StoneGame {
public:
    bool stoneGame(vector<int>& piles) {
        return true;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class StoneGame {
    public boolean stoneGame(int[] piles) {
        return true;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    return true;
};
```
{% endtab %}

{% tab solution Python %}
```python
class StoneGame:
    def stoneGame(self, piles: List[int]) -> bool:
        return True
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} piles
# @return {Boolean}
def stone_game(piles)
    true
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(1)`
- Space: `O(1)`
