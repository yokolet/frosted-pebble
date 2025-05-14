---
layout: algo_page
group: Games
title: Maximum Number of Coins You Can Get
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- Game Theory
date: 2024-07-23 16:47 +0900
---
## Problem Description
> There are `3n` piles of coins of varying size, you and your friends will take piles of coins as follows:
> - In each step, you will choose any 3 piles of coins (not necessarily consecutive).
> - Of your choice, Alice will pick the pile with the maximum number of coins.
> - You will pick the next pile with the maximum number of coins.
> - Your friend Bob will pick the last pile.
> - Repeat until there are no more piles of coins.
>
> Given an array of integers piles where `piles[i]` is the number of coins in the i-th pile.
>
> Return the maximum number of coins that you can have.
>
> Constraints:
> - `3 <= piles.length <= 10**5`
> - `piles.length % 3 == 0`
> - `1 <= piles[i] <= 10**4`
>
> [https://leetcode.com/problems/maximum-number-of-coins-you-can-get/](https://leetcode.com/problems/maximum-number-of-coins-you-can-get/)

## Examples
```
Example 1:

Input: piles = [2,4,1,2,7,8]
Output: 9
Explanation: Choose the triplet (2, 7, 8), Alice Pick the pile with 8 coins, you the pile with 7 coins and Bob the last one.
Choose the triplet (1, 2, 4), Alice Pick the pile with 4 coins, you the pile with 2 coins and Bob the last one.
The maximum number of coins which you can have are: 7 + 2 = 9.
On the other hand if we choose this arrangement (1, 2, 8), (2, 4, 7) you only get 2 + 4 = 6 coins which is not optimal.
```

```
Example 2:

Input: piles = [2,4,5]
Output: 4
```

```
Example 3:

Input: piles = [9,8,7,6,5,1,2,3,4]
Output: 18
```

## How to Solve

To solve this problem, it is important to understand how the game goes.

Three players are there: Alice, Bob, and we.
We have a freedom to pick up 3 piles. After 3 piles are picked up,
Alice chooses one pile first. We are the second. Lastly, Bob chooses.
In another words, Alice always takes the greatest value among three, while we take the second.
Not to give Bob a greater value, we can choose three piles by
the greatest, the second greatest, and the minimum values.

The solution goes like this.
- sort the piles array in ascending order
- one-third of piles from the smallest go to Bob
- start an iteration from the index of one-third of piles.
- count up every other piles to the end

The solution is fairly easy once we understand the game.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class MaximumCoins {
public:
    int maxCoins(vector<int>& piles) {
        sort(piles.begin(), piles.end());
        int result = 0;
        for (int i = piles.size() / 3; i < piles.size(); i += 2) {
            result += piles[i];
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class MaximumCoins {
    public int maxCoins(int[] piles) {
        Arrays.sort(piles);
        int result = 0;
        for (int i = piles.length / 3; i < piles.length; i += 2) {
            result += piles[i];
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
    piles.sort((a, b) => a - b);
    let result = 0;
    for (let i = Math.floor(piles.length / 3); i < piles.length; i += 2) {
        result += piles[i];
    }
    return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class MaximumCoins:
    def maxCoins(self, piles: List[int]) -> int:
        piles.sort()
        result = 0
        for i in range(len(piles) // 3, len(piles), 2):
            result += piles[i]
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} piles
# @return {Integer}
def max_coins(piles)
    piles.sort!
    result = 0
    ((piles.size / 3)...piles.size).step(2) {|i| result += piles[i]}
    result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * log(n))`
- Space: `O(1)` -- depends on the sorting algorithms implemented by languages, space may go up to `O(n)`.
