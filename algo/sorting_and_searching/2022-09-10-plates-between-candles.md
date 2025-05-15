---
layout: algo_page
group: Sorting and Searching
title: Plates Between Candles
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
- Array
- String
date: 2022-09-10 21:44 +0900
---

## Problem Description
> There is a long table with a line of plates and candles arranged on top of it.
> You are given a 0-indexed string `s` consisting of characters `'*'` and `'|'` only,
> where a `'*'` represents a plate and a `'|'` represents a candle.
>
> You are also given a 0-indexed 2D integer array `queries`
> where `queries[i] = [left(i), right(i)]` denotes the substring `s[left(i)...right(i)]` (inclusive).
> For each query, you need to find the number of plates between candles that are in the substring.
> A plate is considered between candles if there is at least one candle to its left
> and at least one candle to its right in the substring.
>
> - For example, `s = "||**||**|*"`, and a `query [3, 8]` denotes the substring `"*||**|"`.
>   The number of plates between candles in this substring is 2,
>   as each of the two plates has at least one candle in the substring to its left and right.
> Return an integer array `answer` where `answer[i]` is the answer to the i-th query.
>
> Constraints:
> - `3 <= s.length <= 10**5`
> - `s` consists of `'*'` and `'|'` characters.
> - `1 <= queries.length <= 10**5`
> - `queries[i].length == 2`
> - `0 <= left(i) <= right(i) < s.length`
> 
> [https://leetcode.com/problems/plates-between-candles/](https://leetcode.com/problems/plates-between-candles/)

## Examples
```
Exmaple 1:
Input: s = "**|**|***|", queries = [[2,5],[5,9]]
Output: [2,3]
Explanation:
- queries[0] has two plates between candles.
- queries[1] has three plates between candles.
```

```
Example 2:
Input: s = "***|**|*****|**||**|*", queries = [[1,17],[4,5],[14,17],[5,11],[15,16]]
Output: [9,0,0,0,0]
Explanation:
- queries[0] has nine plates between candles.
- The other queries have zero plates between candles.
```

## How to Solve
This problem tells us to focus on only indices of `'|'`.
Then it's easy to think of a binary search solution.
The tricky part is, candles might there continuously.
Those should be subtracted.

Since only indicies of candles matter, create an array of candle indicies.
Given left and right of a query, find left insertion point of left value.
Also, find right insertion point of right value.
We'll see indicies of candles, so calculate the range length.
However, the multiple candles might be there continuously, so subtract those.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class PlatesBetweenCandles {
public:
    vector<int> platesBetweenCandles(string s, vector<vector<int>>& queries) {
        vector<int> nums, answer;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '|') nums.push_back(i);
        }
        for (int i = 0; i < queries.size(); ++i) {
            int l = lower_bound(nums.begin(), nums.end(), queries[i][0]) - nums.begin();
            int r = upper_bound(nums.begin(), nums.end(), queries[i][1]) - nums.begin();
            answer.push_back(l != r ? nums[r - 1] - nums[l] - (r - l - 1) : 0);
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
class PlatesBetweenCandles:
    def platesBetweenCandles(self, s: str, queries: List[List[int]]) -> List[int]:
        nums = [i for i in range(len(s)) if s[i] == '|']
        answer = []
        for left, right in queries:
            l = bisect.bisect_left(nums, left)
            r = bisect.bisect_right(nums, right)
            if l == r:
                answer.append(0)
                continue
            idx_l, idx_r = nums[l], nums[r - 1]
            candles = r - l
            answer.append(idx_r - idx_l + 1 - candles)
        return answer
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m * log(n))` -- m: number of queries, n: number of candles
- Space: `O(n)`
