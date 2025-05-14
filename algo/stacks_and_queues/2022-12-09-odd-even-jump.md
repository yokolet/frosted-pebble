---
layout: algo_page
group: Stacks and Queues
title: Odd Even Jump
algo_menubar: algo_menu
tags:
- Hard
- Monotonic Stack
- Sorting
- Array
date: 2022-12-09 13:27 +0900
---
## Problem Description
> You are given an integer array `arr`. From some starting index, you can make a series of jumps. The
> (1st, 3rd, 5th, ...) jumps in the series are called odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps
> in the series are called even-numbered jumps. Note that the jumps are numbered, not the indices.
>
> You may jump forward from index `i` to index `j` (with `i < j`) in the following way:
> - During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the index `j` such that `arr[i] <= arr[j]` and
>     `arr[j]` is the smallest possible value. If there are multiple such indices `j`, you can only jump to the
>     smallest such index `j`.
> - During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the index `j` such that `arr[i] >= arr[j]` and
>     `arr[j]` is the largest possible value. If there are multiple such indices `j`, you can only jump to the
>     smallest such index `j`.
> - It may be the case that for some index `i`, there are no legal jumps.
>
> A starting index is good if, starting from that index, you can reach the end of the array (index arr.length - 1)
> by jumping some number of times (possibly 0 or more than once).
> Return the number of good starting indices.
>
> Constraints:
> - `1 <= arr.length <= 2 * 10**4`
> - `0 <= arr[i] < 10**5`
>
> [https://leetcode.com/problems/odd-even-jump/](https://leetcode.com/problems/odd-even-jump/)

## Examples
```
Example 1
Input: arr = [10,13,12,14,15]
Output: 2
Explanation: 
From starting index i = 0, we can make our 1st jump to i = 2 (since arr[2] is the smallest among arr[1], arr[2], arr[3],
arr[4] that is greater or equal to arr[0]), then we cannot jump any more.
From starting index i = 1 and i = 2, we can make our 1st jump to i = 3, then we cannot jump any more.
From starting index i = 3, we can make our 1st jump to i = 4, so we have reached the end.
From starting index i = 4, we have reached the end already.
In total, there are 2 different starting indices i = 3 and i = 4, where we can reach the end with some number of
jumps.
```

```
Example 2
Input: arr = [2,3,1,1,4]
Output: 3
Explanation: 
From starting index i = 0, we make jumps to i = 1, i = 2, i = 3:
During our 1st jump (odd-numbered), we first jump to i = 1 because arr[1] is the smallest value in [arr[1], arr[2],
arr[3], arr[4]] that is greater than or equal to arr[0].
During our 2nd jump (even-numbered), we jump from i = 1 to i = 2 because arr[2] is the largest value in [arr[2], arr[3],
arr[4]] that is less than or equal to arr[1]. arr[3] is also the largest value, but 2 is a smaller index, so we can only
jump to i = 2 and not i = 3
During our 3rd jump (odd-numbered), we jump from i = 2 to i = 3 because arr[3] is the smallest value in [arr[3], arr[4]]
that is greater than or equal to arr[2].
We can't jump from i = 3 to i = 4, so the starting index i = 0 is not good.
In a similar manner, we can deduce that:
From starting index i = 1, we jump to i = 4, so we reach the end.
From starting index i = 2, we jump to i = 3, and then we can't jump anymore.
From starting index i = 3, we jump to i = 4, so we reach the end.
From starting index i = 4, we are already at the end.
In total, there are 3 different starting indices i = 1, i = 3, and i = 4, where we can reach the end with some
number of jumps.
```

```
Example 3
Input: arr = [5,1,3,4,2]
Output: 3
Explanation: We can reach the end from starting indices 1, 2, and 4.
```

## How to Solve
This problem asks indices of non-decreasing subsequence for the odd numbered jumps and non-increasing subsequences
for the even numbered jumps.
In the second example, `[2,3,1,1,4]`, if the start index is 0, non-decreasing subsequence after index 0 is `[3, 4]`.
The smallest index is 1 in the original array. This is the first jump.
The second jump finds the non-increasing subsequence after index 1. It is `[1, 1]`.
The smallest index is 2 in the original array.
The third jump goes back to find non-decreasing subsequence, which is `[1. 4]`.
The smallest index is 3 in the original array.
The forth jump finds non-increasing subsequence which doesn't exist.

One of approaches for this type of problem is monotonically increasing/decreasing stacks, which saves next jumping indices.
After creating the two monotonic stacks for odd and even jumps, iterate over the array from right to left.
This is because the problem asks a number of reachable indices to the end (ones).
Starting from the index n - 2, check the indices are reachable to the last index.
Since the jumps may or may not have multiple hops, use two auxiliary arrays to save the previous states.

In the end, the number of ones in the odd jumps is the answer.
The reason of picking up odd jumps only is the first jump is always the odd numbered.
Apparently, 1 is odd.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class OddEvenJump {
public:
    int oddEvenJumps(vector<int>& arr) {
        int n = arr.size();
        vector<pair<int, int> > v2i;
        for (size_t i = 0; i < n; ++i) {
            v2i.push_back({arr[i], i});
        }
        vector<int> next_odd(n, 0), next_even(n, 0);

        sort(v2i.begin(),
             v2i.end(),
             [](pair<int, int> a, pair<int, int> b) {
            return a.first == b.first ? a.second < b.second : a.first < b.first;
        });
        {
            stack<int> st;
            for (auto [_, i] : v2i) {
                while (!st.empty() && i > st.top()) {
                    next_odd[st.top()] = i;
                    st.pop();
                }
                st.push(i);
            }
        }

        sort(v2i.begin(),
             v2i.end(),
             [](pair<int, int> a, pair<int, int> b) {
            return a.first == b.first ? a.second < b.second : a.first > b.first;
        });
        {
            stack<int> st;
            for (auto [v, i] : v2i) {
                while (!st.empty() && i > st.top()) {
                    next_even[st.top()] = i;
                    st.pop();
                }
                st.push(i);
            }
        }

        vector<int> odds(n, 0), evens(n, 0);
        odds[n - 1] = 1, evens[n - 1] = 1;
        for (auto i = n - 2; i >= 0; --i) {
            odds[i] = evens[next_odd[i]];
            evens[i] = odds[next_even[i]];
        }
        return accumulate(odds.begin(), odds.end(), 0);
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
class OddEvenJump:
    def oddEvenJumps(self, arr: List[int]) -> int:
        n = len(arr)
        next_odd, next_even = [0 for _ in range(n)], [0 for _ in range(n)]
        stack = []
        for _, i in sorted([v, i] for i, v in enumerate(arr)):
            while stack and i > stack[-1]:
                next_odd[stack.pop()] = i
            stack.append(i)
        stack = []
        for _, i in sorted([-v, i] for i, v in enumerate(arr)):
            while stack and i > stack[-1]:
                next_even[stack.pop()] = i
            stack.append(i)
        odds, evens = [0 for _ in range(n)], [0 for _ in range(n)]
        odds[-1], evens[-1] = 1, 1
        for i in range(n - 2, -1, -1):
            odds[i] = evens[next_odd[i]]
            evens[i] = odds[next_even[i]]
        return sum(odds)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n*log(n))`
- Space: `O(n)`
