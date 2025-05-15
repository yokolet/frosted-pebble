---
layout: algo_page
group: Sorting and Searching
title: Reorder Data in Log Files
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- Array
- String
date: 2022-09-09 19:14 +0900
---
## Introduction
This is just a sorting problem.
However, some clever comparator is required.

## Problem Description
> You are given an array of `logs`.
> Each log is a space-delimited string of words, where the first word is the identifier.
>
> There are two types of logs:
> - Letter-logs: All words (except the identifier) consist of lowercase English letters.
> - Digit-logs: All words (except the identifier) consist of digits.
>
> Reorder these logs so that:
> 1. The letter-logs come before all digit-logs.
> 2. The letter-logs are sorted lexicographically by their contents.
>    If their contents are the same, then sort them lexicographically by their identifiers.
> 3. The digit-logs maintain their relative ordering.
>
> Return the final order of the logs.
>
> Constraints:
> - `1 <= logs.length <= 100`
> - `3 <= logs[i].length <= 100`
> - All the tokens of `logs[i]` are separated by a single space.
> - `logs[i]` is guaranteed to have an identifier and at least one word after the identifier.
>
> [https://leetcode.com/problems/reorder-data-in-log-files/](https://leetcode.com/problems/reorder-data-in-log-files/)

## Examples
```
Example 1:
Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
Explanation:
The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".
```

```
Example 2:
Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
```

## Analysis
The Python solution relies on a tuple sorting feature.
While sorting the tuple, the first element, the second element if the first is the same
will be used to compare.
The custom comparator returns `(1,)` for digit logs so that digit logs come later.
For letter logs, it returns `(0, string except id, id)` to comply with the condition.
With this custom comparator, just soring the log gives us the answer.

The C++ solution relies on the stable_sort function.
The custom comparator logic is similar to the Python's.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class ReorderDataInLogFiles {
public:
    vector<string> reorderLogFiles(vector<string>& logs) {
        stable_sort(logs.begin(), logs.end(),
            [](const string &a, const string &b) {
                if (isdigit(a.back())) return false;
                if (isdigit(b.back())) return true;
                const string aa = a.substr(a.find(' '));
                const string bb = b.substr(b.find(' '));
                if (aa == bb) return a < b;
                return aa < bb;
            });
        return logs;
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
class ReorderDataInLogFiles:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        def comp(log):
            id_, rest = log.split(' ', 1)
            if rest[0].isdigit():
                return (1, )
            else:
                return (0, rest, id_)
        return sorted(logs, key=comp)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}

## Complexities
- Time: `O(n * log(n))`
- Space: `O(1)`
