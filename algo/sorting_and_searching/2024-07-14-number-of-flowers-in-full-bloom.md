---
layout: algo_page
group: Sorting and Searching
title: Number of Flowers in Full Bloom
algo_menubar: algo_menu
tags:
- Hard
- Array
- Hash Table
- Binary Search
- Sorting
date: 2024-07-14 15:18 +0900
---
## Problem Description
> You are given a 0-indexed 2D integer array `flowers`, where `flowers[i] = [start_i, end_i]` means the i-th flower
> will be in full bloom from `start_i` to `end_i` (inclusive). You are also given a 0-indexed integer array `people`
> of size n, where `people[i]` is the time that the i-th person will arrive to see the flowers.
>
> Return an integer array answer of size n, where `answer[i]` is the number of flowers that are in full bloom when
> the i-th person arrives.
>
> Constraints:
> - `1 <= flowers.length <= 5 * 10**4`
> - `flowers[i].length == 2`
> - `1 <= start_i <= end_i <= 10**9`
> - `1 <= people.length <= 5 * 10**4`
> - `1 <= people[i] <= 10**9`
> 
> [https://leetcode.com/problems/number-of-flowers-in-full-bloom/](https://leetcode.com/problems/number-of-flowers-in-full-bloom/)

## Examples
```
Example 1:
Input: flowers = [[1,6],[3,7],[9,12],[4,13]], people = [2,3,7,11]
Output: [1,2,2,2]
Explanation: The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.
```

```
Example 2:
Input: flowers = [[1,10],[3,3]], people = [3,3,2]
Output: [2,2,1]
Explanation: The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.
```

## How to Solve

This problem can be solved in many ways including heap (or priority queue).
The approach here took a simple binary search on two arrays.
When a pair of start and end values are given, saving those in two arrays: starts and ends, and sorting two arrays
often lead to the answer.

After sorting starts and ends arrays, run two binary searches.
The first one is to find how many flowers are in bloom when a person p comes in.
The second one is to fine how many flowers are not in bloom when a person p comes in.
The upper_bound of C++ or bisect_right of Python3 are the functions to use here.
Other languages don't have an exact function, so it is implemented in the solutions.

Once indicies of starts and ends are found, start_idx - end_idx is the answer to each person.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class NumberOfFlowersInFullBloom {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        vector<int> starts, ends;
        for (vector<int> flower: flowers) {
          starts.push_back(flower[0]);
          ends.push_back(flower[1] + 1);
        }
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        vector<int> result;
        for (int p : people) {
          int start_idx = upper_bound(starts.begin(), starts.end(), p) - starts.begin();
          int end_idx = upper_bound(ends.begin(), ends.end(), p) - ends.begin();
          result.push_back(start_idx - end_idx);
        }
        return result;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class NumberOfFlowersInFullBloom {
    private int upperBound(int[] ary, int target) {
      int low = 0, high = ary.length;
      while (low < high) {
        int mid = (low + high) / 2;
        if (target < ary[mid]) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      return low;
    }

    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int[] starts = new int[flowers.length], ends = new int[flowers.length];
        for (int i = 0; i < flowers.length; ++i) {
          starts[i] = flowers[i][0];
          ends[i] = flowers[i][1] + 1;
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int [] result = new int[people.length];
        for (int i = 0; i < people.length; ++i) {
          int p = people[i];
          int start_idx = upperBound(starts, p);
          int end_idx = upperBound(ends, p);
          result[i] = start_idx - end_idx;
        }
        return result;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
const upperBound = (ary, target) => {
  let low = 0, high = ary.length, mid;
  while (low < high) {
    mid = (low + high) >> 1;
    if (target < ary[mid]) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
};

var fullBloomFlowers = function(flowers, people) {
    const starts = flowers.map((flower) => flower[0]).sort((a, b) => a - b);
    const ends = flowers.map((flower) => flower[1] + 1).sort((a, b) => a - b);
    const result = [];
    people.forEach((p) => {
      let start_idx = upperBound(starts, p);
      let end_idx = upperBound(ends, p);
      result.push(start_idx - end_idx);
    });
    return result;
};
```
{% endtab %}

{% tab solution Python %}
```python
class NumberOfFlowersInFullBloom:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        starts, ends = [], []
        for start, end in flowers:
          starts.append(start)
          ends.append(end + 1)
        starts.sort()
        ends.sort()
        result = []
        for p in people:
          start_idx = bisect_right(starts, p)
          end_idx = bisect_right(ends, p)
          result.append(start_idx - end_idx)
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[][]} flowers
# @param {Integer[]} people
# @return {Integer[]}
def upper_bound(ary, target)
  low, high = 0, ary.size
  while low < high
    mid = (low + high) >> 1
    if target < ary[mid]
      high = mid
    else
      low = mid + 1
    end
  end
  low
end

def full_bloom_flowers(flowers, people)
    starts = flowers.map {|flower| flower[0]}.sort
    ends = flowers.map {|flower| flower[1] + 1}.sort
    result = []
    people.each do |p|
      start_idx = upper_bound(starts, p)
      end_idx = upper_bound(ends, p)
      result << (start_idx - end_idx)
    end
    result
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O((m + n) * log(n))` -- m: number of people, n: numbers of flowers
- Space: `O(n)`
