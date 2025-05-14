---
layout: algo_page
group: Strings
title: Text Justification
algo_menubar: algo_menu
tags:
- Hard
- Simulation
- String
- Array
date: 2022-09-23 15:10 +0900
---

## Problem Description
> Given an array of strings `words` and a width `maxWidth`, format the text such that each line has
> exactly `maxWidth` characters and is fully (left and right) justified.
> You should pack your words in a greedy approach; that is, pack as many words as you can in each line.
> Pad extra spaces ' ' when necessary so that each line has exactly `maxWidth` characters.
> 
> Extra spaces between words should be distributed as evenly as possible.
> If the number of spaces on a line does not divide evenly between words, the empty slots on the left
> will be assigned more spaces than the slots on the right.
>
> For the last line of text, it should be left-justified, and no extra space is inserted between words.
>
> Note:
> - A word is defined as a character sequence consisting of non-space characters only.
> - Each word's length is guaranteed to be greater than 0 and not exceed `maxWidth`.
> - The input array `words` contains at least one word.

>
> Constraints:
> - `1 <= words.length <= 300`
> - `1 <= words[i].length <= 20`
> - `words[i]` consists of only English letters and symbols.
> - `1 <= maxWidth <= 100`
> - `words[i].length <= maxWidth`
>
> [https://leetcode.com/problems/text-justification/](https://leetcode.com/problems/text-justification/)

## Examples
```
Example 1
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

```
Example 2
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
```

```
Example 3
Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
```

## How to Solve
Since this problem asks to create a fully justified result, actual simulation should be done.
When and how to add spaces in-between and right-end are the point we should consider.

The solution here consists of two steps.
For the first step, it creates words list for each lines.
To create a line array, it sums up:
- a number of characters so far
- current word length
- current array size (before adding current word) for spaces between words

The second step calculates and adds spaces between words or right end if it is the last line.
Count number of spaces left from a total word length and given maxWidth.
Then, find how many gaps are there and how many spaces should be put.
The solution here adds spaces to each word, then concatenate those words to one string.
The two step approach would be easier to reach to the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class TextJustification {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> line;
        vector<vector<string>> lines;
        int cur = 0;
        for (string &word : words) {
            if (cur + word.size() + line.size() <= maxWidth) {
                line.push_back(word);
                cur += word.size();
            } else {
                lines.push_back(line);
                line = {word};
                cur = word.size();
            }
        }
        lines.push_back(line);
        vector<string> result;
        auto join = [](string &a, string &b) { return a.empty() ? b : a + b; };
        for (int i = 0; i < lines.size() - 1; ++i) {
            vector<string> &ws = lines[i];
            int spaces = maxWidth;
            for (auto w : ws) {
                spaces -= w.size();
            }
            int gaps = max(1, (int)ws.size() - 1);
            auto [cnt, rem] = div(spaces, gaps);
            for (int j = 0; j < gaps; ++j) {
                ws[j] += string(cnt, ' ') + (j < rem ? " " : "");
            }
            result.push_back(accumulate(ws.begin(), ws.end(), string(), join));
        }
        auto join2 = [](string &a, string &b) { return a.empty() ? b : a + " " + b; };
        result.push_back(accumulate(lines.back().begin(), lines.back().end(), string(), join2));
        result[result.size() - 1] += string(maxWidth - result.back().size(), ' ');
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
class TextJustification:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        line, lines, cur = [], [], 0
        for word in words:
            if cur + len(word) + len(line) <= maxWidth:
                line.append(word)
                cur += len(word)
            else:
                lines.append(line)
                line = [word]
                cur = len(word)
        lines.append(line)
        for i in range(len(lines) - 1):
            ws = lines[i]
            spaces = maxWidth - sum([len(w) for w in ws])
            gaps = max(1, len(ws) - 1)
            cnt, rem = divmod(spaces, gaps)
            for j in range(gaps):
                ws[j] += ' ' * cnt + (' ' if j < rem else '')
            lines[i] = ''.join(ws)
        lines[-1] = ' '.join(lines[-1]).ljust(maxWidth)
        return lines
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(m + n)` -- m: number of words, n: number of lines
- Space: `O(n)`
