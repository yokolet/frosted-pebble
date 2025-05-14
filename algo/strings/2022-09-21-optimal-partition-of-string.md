---
layout: algo_page
group: Strings
title: Optimal Partition of String
algo_menubar: algo_menu
tags:
- Medium
- String
- Hash Table
- Greedy
date: 2022-09-21 15:07 +0900
---

## Problem Description
> Given a string `s`, partition the string into one or more substrings
> such that the characters in each substring are unique.
> That is, no letter appears in a single substring more than once.
>
> Return the minimum number of substrings in such a partition.
>
> Note that each character should belong to exactly one substring in a partition.
>
> Constraints:
> - `1 <= s.length <= 10**5`
> - `s` consists of only English lowercase letters.
>
> [https://leetcode.com/problems/optimal-partition-of-string/](https://leetcode.com/problems/optimal-partition-of-string/)

## Examples
```
Example 1
Input: s = "abacaba"
Output: 4
Explanation:
Two possible partitions are ("a","ba","cab","a"), ("ab","a","ca","ba"), and ("ab","ac","ab","a").
```

```
Exammle 2
Input: s = "ssssss"
Output: 6
Explanation:
The only valid partition is ("s","s","s","s","s","s").
```

## How to Solve
To solve string partition problems, hash table or set is used to save a previous occurrence.
If the problem asks a length, it needs hash table.
However, this problem asks just a number of groups, so set is a good data structure.

Use a set to save the previous occurrence of a same character.
If the same character appears, count up and clear the set.
In the end, if the set is not empty, count up.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class OptimalPartitionString {
private:
  int count = 1;
  set<char> seen;
public:
  int partitionString(string s) {
    for (char& c : s) {
      if (seen.count(c)) {
        count++;
        seen.clear();
      }
      seen.emplace(c);
    }
    return count;
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
class OptimalPartitionString:
    def partitionString(self, s: str) -> int:
        count, seen = 0, set()
        for c in s:
            if c in seen:
                count += 1
                seen.clear()
            seen.add(c)
        return count + 1 if seen else count
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String} s
# @return {Integer}
def partition_string(s)
    count, seen = 1, Set.new
    s.each_char do |c|
      if seen.include?(c)
        count += 1
        seen.clear
      end
      seen.add(c)
    end
    count
end
```
{% endtab %}

{% endtabs %}

## Complexities
- Time: `O(n)`
- Space: `O(n)`
