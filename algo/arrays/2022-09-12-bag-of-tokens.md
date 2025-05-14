---
layout: algo_page
group: Arrays
title: Bag of Tokens
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- Two Pointers
- Greedy
date: 2022-09-12 13:08 +0900
---

## Problem Description
> You have an initial power of `power`, an initial score of `0`, and
> a bag of `tokens` where `tokens[i]` is the value of the i-th token (0-indexed).
> Your goal is to maximize your total score by potentially playing each token in one of two ways:
> - If your current `power` is at least `tokens[i]`, you may play the i-th token face up,
>   losing `tokens[i]` power and gaining `1` score.
> - If your current `score` is at least 1, you may play the i-th token face down,
>   gaining `tokens[i]` power and losing `1` score.
>   
> Each token may be played at most once and in any order. You do not have to play all the tokens.
>
>Return the largest possible score you can achieve after playing any number of tokens.
>
> Constraints:
> - `0 <= tokens.length <= 1000`
> - `0 <= tokens[i], power < 10**4`
>
> [https://leetcode.com/problems/bag-of-tokens/](https://leetcode.com/problems/bag-of-tokens/)

## Examples
```
Example 1:
Input: tokens = [100], power = 50
Output: 0
Explanation: Playing the only token in the bag is impossible because you either have too little power or
too little score.
```

```
Example 2:
Input: tokens = [100,200], power = 150
Output: 1
Explanation: Play the 0th token (100) face up, your power becomes 50 and score becomes 1.
There is no need to play the 1st token since you cannot play it face up to add to your score.
```

```
Example 3:
Input: tokens = [100,200,300,400], power = 200
Output: 2
Explanation: Play the tokens in this order to get a score of 2:
1. Play the 0th token (100) face up, your power becomes 100 and score becomes 1.
2. Play the 3rd token (400) face down, your power becomes 500 and score becomes 0.
3. Play the 1st token (200) face up, your power becomes 300 and score becomes 1.
4. Play the 2nd token (300) face up, your power becomes 0 and score becomes 2.
```

## How to Solve
Since the order of the given array doesn't matter, start from sorting the array.
Then, the greedy approach by two pointers works in this case.

The idea is to take smaller token to get a score or take bigger token to gain power.
The process lose opposites: power for more scores, scores for more power.
Use two pointers, low and high.
As the low pointer proceeds, it gains the score and loses power.
When the power becomes lower than the current token, the high pointer starts working.
When the score becomes 0, it's back to low pointer to get more scores.

## Solution
{% tabs solution %}

{% tab solution C++ %}
```cpp
class BagOfTokens {
public:
    int bagOfTokensScore(vector<int>& tokens, int power) {
        sort(tokens.begin(), tokens.end());
        int score = 0, low = 0, high = tokens.size() - 1;
        while (low <= high) {
            if (power >= tokens[low]) {
                power -= tokens[low];
                ++score;
                ++low;
            } else if (low < high && score > 0) {
                power += tokens[high];
                --score;
                --high;
            } else {
                break;
            }
        }
        return score;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class BagOfTokens {
    public int bagOfTokensScore(int[] tokens, int power) {
        Arrays.sort(tokens);
        int score = 0, low = 0, high = tokens.length - 1;
        while (low <= high) {
            if (power >= tokens[low]) {
                power -= tokens[low];
                ++score;
                ++low;
            } else if (low < high && score > 0) {
                power += tokens[high];
                --score;
                --high;
            } else {
                break;
            }
        }
        return score;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */
var bagOfTokensScore = function(tokens, power) {
  tokens.sort((a, b) => { return a - b; });
  let score = 0, low = 0, high = tokens.length - 1;
  while (low <= high) {
    if (power >= tokens[low]) {
      power -= tokens[low];
      ++score;
      ++low;
    } else if (low < high && score > 0) {
      power += tokens[high];
      --score;
      --high;
    } else {
      break;
    }
  }
  return score;
};
```
{% endtab %}

{% tab solution Python %}
```python
class BagOfTokens:
    def bagOfTokensScore(self, tokens: List[int], power: int) -> int:
        tokens.sort()
        score = 0
        low, high = 0, len(tokens) - 1
        while low <= high:
            if power >= tokens[low]:
                power -= tokens[low]
                score += 1
                low += 1
            elif low < high and score:
                power += tokens[high]
                score -= 1
                high -= 1
            else:
                break
        return score
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} tokens
# @param {Integer} power
# @return {Integer}
def bag_of_tokens_score(tokens, power)
    tokens.sort!
    score, low, high = 0, 0, tokens.size - 1
    while low <= high
        if power >= tokens[low]
            power -= tokens[low]
            score += 1
            low += 1
        elsif low < high && score > 0
            power += tokens[high]
            score -= 1
            high -= 1
        else
            break
        end
    end
    score
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n*log(n))`
- Space: `O(1)`
