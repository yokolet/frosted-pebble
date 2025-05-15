---
layout: algo_page
group: Sorting and Searching
title: Reorganize String
algo_menubar: algo_menu
tags:
- Medium
- Heap
- String
- Greedy
date: 2022-09-12 18:03 +0900
---

## Problem Description
> Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same.
> Return any possible rearrangement of `s` or return `""` if not possible.
>
> Constraints:
> - `1 <= s.length <= 500`
> - s consists of lowercase English letters.
>
> [https://leetcode.com/problems/reorganize-string/](https://leetcode.com/problems/reorganize-string/)

## Examples
```
Example 1:
Input: s = "aab"
Output: "aba"
```

```
Example 2:
Input: s = "aaab"
Output: ""
```

## How to Solve
The problem asks to return a re-generated string, so, just count the character frequency is not enough.
Since reorder is required, it needs some sorting as well.
Using heap, generate a new string based on the character frequency is the way.

The first step is to create a heap based on the character frequency.
It is the max heap, so frequency values are negative for Python heap.
Take the most frequent character and add it to the result and count down the number of the character.
Still, the character's count is more than 0, push it back to the heap with decremented count.
If the last character in the result string is the same as the most frequent, take the second frequent character.
Do the same, add to the result, get it back to heap if necessary.
This way, the result string will be created.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ReorganizeString {
public:
    string reorganizeString(string s) {
        unordered_map<char, int> counter;
        for (char c : s) counter[c]++;

        priority_queue<pair<int, char>> heap;
        for (auto c : counter) heap.push({c.second, c.first});

        string result = "";
        while (!heap.empty()) {
            pair<int, char> h1 = heap.top();
            heap.pop();
            result.push_back(h1.second);
            if (heap.empty()) {
                if (h1.first - 1 > 0) heap.push({h1.first - 1, h1.second});
                break;
            }
            pair<int, char> h2 = heap.top();
            heap.pop();
            result.push_back(h2.second);
            if (h2.first - 1 > 0) heap.push({h2.first - 1, h2.second});
            if (h1.first - 1 > 0) heap.push({h1.first - 1, h1.second});
        }
        if (!heap.empty()) return "";
        return result;
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
class ReorganizeString:
    def reorganizeString(self, s: str) -> str:
        counter = collections.Counter(list(s))
        heap = []
        for k, v in counter.items():
            heapq.heappush(heap, (-v, k))
        result = ''
        while heap:
            cnt, c = heapq.heappop(heap)
            if result and result[-1] == c:
                if not heap:
                    return ''
                cnt2, c2 = heapq.heappop(heap)
                result += c2
                cnt2 += 1
                if cnt2:
                    heapq.heappush(heap, (cnt2, c2))
            else:
                result += c
                cnt += 1
            if cnt:
                heapq.heappush(heap, (cnt, c))
        return result
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
