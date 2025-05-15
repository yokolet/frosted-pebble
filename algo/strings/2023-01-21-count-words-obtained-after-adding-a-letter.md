---
layout: algo_page
group: Strings
title: Count Words Obtained After Adding a Letter
algo_menubar: algo_menu
tags:
- Medium
- Sorting
- String
date: 2023-01-21 23:51 +0900
---

## Problem Description
> You are given two 0-indexed arrays of strings `startWords` and `targetWords`. Each string consists of lowercase
> English letters only.
> For each string in `targetWords`, check if it is possible to choose a string from `startWords` and perform a
> conversion operation on it to be equal to that from `targetWords`.
> The conversion operation is described in the following two steps:
> - Append any lowercase letter that is not present in the string to its end.
>   - For example, if the string is "abc", the letters 'd', 'e', or 'y' can be added to it, but not 'a'. If 'd' is
>     added, the resulting string will be "abcd".
> - Rearrange the letters of the new string in any arbitrary order.
>   - For example, "abcd" can be rearranged to "acbd", "bacd", "cbda", and so on. Note that it can also be rearranged
>     to "abcd" itself.
>
> Return the number of strings in `targetWords` that can be obtained by performing the operations on any string of
> `startWords`.
>
> Note that you will only be verifying if the string in `targetWords` can be obtained from a string in startWords by
> performing the operations. The strings in `startWords` do not actually change during this process.
>
> Constraints:
> - `1 <= startWords.length, targetWords.length <= 5 * 10**4`
> - `1 <= startWords[i].length, targetWords[j].length <= 26`
> - Each string of `startWords` and `targetWords` consists of lowercase English letters only.
> - No letter occurs more than once in any string of `startWords` or `targetWords`.
>
> [https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/](https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/)

## Examples
```
Exmaple 1
Input: startWords = ["ant","act","tack"], targetWords = ["tack","act","acti"]
Output: 2
Explanation:
act -> tack and act -> acti
```

```
Example 2
Input: startWords = ["ab","a"], targetWords = ["abc","abcd"]
Output: 1
Explanation:
ab -> abc
```

## How to Solve
This problem is an anagram comparison. The order of characters doesn't matter.
Sorting words and creating one letter shorter word from target words would be a reasonable approach.
However, it runs slow since it needs a lot of sorting and substring creation.

Instead, the approach here uses the idea of bitmask.
Each word is converted to an integer value by shifting and adding up.
The comparison is done by the integer subtraction.
If the integer for one letter shorter string is in the start word set, count up.

The bitmask approach runs faster than sorting with substring match in general.
However, as for Python, the sorting/substring match approach runs reasonably fast.
So, Python has two solutions.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <unordered_set>
#include <vector>

using namespace std;

class CountWordsObtainedAfterAddingALetter {
private:
    int s2i(string &s) {
        int ret = 0;
        for (auto c : s) {
            ret += 1 << c - 'a';
        }
        return ret;
    }

public:
    int wordCount(vector<string>& startWords, vector<string>& targetWords) {
        unordered_set<int> starts;
        for (auto &word : startWords) {
            starts.insert(s2i(word));
        }
        int result = 0, wi;
        for (auto &word : targetWords) {
            wi = s2i(word);
            for (auto &c : word) {
                if (starts.find(wi - (1 << c - 'a')) != starts.end()) {
                    result++;
                    break;
                }
            }
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

public class CountWordsObtainedAfterAddingALetter {
    private int s2i(String s) {
        int ret = 0;
        for (char c : s.toCharArray()) {
            ret += 1 << c - 'a';
        }
        return ret;
    }

    public int wordCount(String[] startWords, String[] targetWords) {
        Set<Integer> starts = new HashSet<>();
        for (String w : startWords) {
            starts.add(s2i(w));
        }
        int result = 0;
        for (String w : targetWords) {
            int wi = s2i(w);
            for (int i = 0; i < w.length(); ++i) {
                if (starts.contains(wi - (1 << w.charAt(i) - 'a'))) {
                    result++;
                    break;
                }
            }
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string[]} startWords
 * @param {string[]} targetWords
 * @return {number}
 */
var wordCount = function(startWords, targetWords) {
    const base = "a".charCodeAt(0), starts = new Set();
    const s2i = (s) => {
        let ret = 0;
        for (let c of s) {
            ret += 1 << (c.charCodeAt(0) - base);
        }
        return ret;
    }
    for (let word of startWords) {
        starts.add(s2i(word));
    }
    let result = 0;
    for (let word of targetWords) {
        let wi = s2i(word);
        for (let c of word) {
            if (starts.has(wi - (1 << (c.charCodeAt(0) - base)))) {
                result += 1;
                break;
            }
        }
    }
    return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class CountWordsObtainedAfterAddingALetter:
    def wordCount(self, startWords: List[str], targetWords: List[str]) -> int:
        base, starts, result = ord('a'), set(), 0
        def s2i(s):
            ret = 0
            for c in s:
                ret += 1 << ord(c) - base
            return ret

        for word in startWords:
            starts.add(s2i(word))
        for word in targetWords:
            wi = s2i(word)
            for c in word:
                if (wi - (1 << ord(c) - base)) in starts:
                    result += 1
                    break
        return result

    def wordCount2(self, startWords: List[str], targetWords: List[str]) -> int:
        starts = set()
        for word in startWords:
            word = "".join(sorted(word))
            starts.add(word)
        result = 0
        for word in targetWords:
            word = "".join(sorted(word))
            for i in range(len(word)):
                if word[:i] + word[i + 1:] in starts:
                    result += 1
                    break
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
require 'set'

# @param {String[]} start_words
# @param {String[]} target_words
# @return {Integer}
def word_count(start_words, target_words)
  base, starts, result = 'a'.ord, Set.new, 0
  s2i = lambda do |s|
    ret = 0
    (0...s.size).each do |i|
      ret += (1 << s[i].ord - base)
    end
    ret
  end
  start_words.each do |word|
    starts.add(s2i.call(word))
  end
  target_words.each do |word|
    wi = s2i.call(word)
    (0...word.size).each do |i|
      if starts.include?(wi - (1 << (word[i].ord - base)))
        result += 1;
        break
      end
    end
  end
  result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(m + n)` -- m, n: number of start and target words. Sorting/looping word is constant since each word has at most 26 characters.
- Space: `O(m)`
