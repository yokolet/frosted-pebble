---
layout: algo_page
group: Games
title: Predict the Winner
algo_menubar: algo_menu
tags:
- Medium
- Dynamic Programming
- Memoization
- Game Theory
date: 2024-07-23 14:15 +0900
---
## Problem Description
> You are given an integer array `nums`. Two players are playing a game with this array: player 1 and player 2.
>
> Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of 0.
> At each turn, the player takes one of the numbers from either end of the array \
> (i.e., `nums[0]` or `nums[nums.length - 1])` which reduces the size of the array by 1. The player adds
> the chosen number to their score. The game ends when there are no more elements in the array.
>
> Return `true` if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner,
> and you should also return `tru`e. You may assume that both players are playing optimally.
>
> Constraints:
> - `1 <= nums.length <= 20`
> - `0 <= nums[i] <= 10**7`
> 
> [https://leetcode.com/problems/predict-the-winner/](https://leetcode.com/problems/predict-the-winner/)

## Examples
```
Example 1:

Input: nums = [1,5,2]
Output: false
Explanation: Initially, player 1 can choose between 1 and 2. 
If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). 
So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. 
Hence, player 1 will never be the winner and you need to return false.
```

```
Example 2:

Input: nums = [1,5,233,7]
Output: true
Explanation: Player 1 first chooses 1. Then player 2 has to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.
Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.
```

## How to Solve

The basic idea is to think the possibility to get more score when the player 1 takes a leftmost or rightmost value.
The result depends on the values left in the array.
The recursive approach is used here to calculate the results coming from two ways: left and right.
When the leftmost value is taken, calculate the difference between the leftmost value and the result from left + 1, to right.
The same calculation is done using rightmost value. The difference will be the rightmost value and the result from left, to right -1.
The greater value is the result of the iteration.
In the end, check the score is positive or not. If it is positive, the player 1 wins.

Additionally, the solution here uses memoization to improve performance. The iteration ends earlier when the left and right
indices combination appears again.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class PredictWinner {
private:
    int helper(vector<int>& nums, int left, int right, int& memo[nums.size()][nums.size()]) {
        if (memo[left][right] != -1) return memo[left][right];
        if (left == right) return nums[left];
        int leftScore = nums[left] - helper(nums, left + 1, right, memo);
        int rightScore = nums[right] - helper(nums, left, right - 1, memo);
        memo[left][right] = max(leftScore, rightScore);
        return memo[left][right];
    }

public:
    bool predictTheWinner(vector<int>& nums) {
        int n = nums.size(), memo[n][n];
        memset(memo, -1, sizeof(memo));
        return helper(nums, 0, nums.size() - 1, memo) >= 0;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class PredictWinner {
    private int helper(int[] nums, int left, int right, int[][] memo) {
        if (memo[left][right] != -1) return memo[left][right];
        if (left == right) return nums[left];
        int leftScore = nums[left] - helper(nums, left + 1, right, memo);
        int rightScore = nums[right] - helper(nums, left, right - 1, memo);
        memo[left][right] = Math.max(leftScore, rightScore);
        return memo[left][right];
    }

    public boolean predictTheWinner(int[] nums) {
        int n = nums.length;
        int[][] memo = new int[n][n];
        for (int i = 0; i < n; ++i) {
            Arrays.fill(memo[i], -1);
        }
        return helper(nums, 0, nums.length - 1, memo) >= 0;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;
    const memo = Array.from({ length: n }, () => new Array(n).fill(-1));
    const helper = (left, right) => {
        if (memo[left][right] !== -1) return memo[left][right];
        if (left === right) return nums[left];
        const leftScore = nums[left] - helper(left + 1, right);
        const rightScore = nums[right] - helper(left, right - 1);
        memo[left][right] = Math.max(leftScore, rightScore);
        return memo[left][right];
    };

    return helper(0, nums.length - 1) >= 0;
};
```
{% endtab %}

{% tab solution Python %}
```python
class PredictWinner:
    def predictTheWinner(self, nums: List[int]) -> bool:
        memo = collections.defaultdict(int)

        def helper(left, right):
            if (left, right) in memo:
                return memo[(left, right)]
            if left == right:
                return nums[left]
            left_score = nums[left] - helper(left + 1, right)
            right_score = nums[right] - helper(left, right - 1)
            memo[(left, right)] = max(left_score, right_score)
            return memo[(left, right)]

        return helper(0, len(nums) - 1) >= 0
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} nums
# @return {Boolean}
def predict_the_winner(nums)
    return helper(nums, 0, nums.size - 1, {}) >= 0
end

def helper(nums, left, right, memo)
    return memo[[left, right]] if memo.include?([left, right])
    return nums[left] if left == right
    left_score = nums[left] - helper(nums, left + 1, right, memo)
    right_score = nums[right] - helper(nums, left, right -1, memo)
    memo[[left, right]] = [left_score, right_score].max
    memo[[left, right]]
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n^2)`
- Space: `O(n^2)`
