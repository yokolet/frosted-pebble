---
layout: algo_page
group: Design
title: Insert Delete GetRandom O(1)
algo_menubar: algo_menu
tags:
- Medium
- Design
- Hash Table
- Array
- Randomized
date: 2022-12-01 20:44 +0900
---
## Problem Description
> Implement the `RandomizedSet` class:
> - `RandomizedSet()` Initializes the `RandomizedSet` object.
> - `bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true`
>     if the item was not present, `false` otherwise.
> - `bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the
>     item was present, `false` otherwise.
> - `int getRandom()` Returns a random element from the current set of elements (it's guaranteed
>     that at least one element exists when this method is called). Each element must have the same
>     probability of being returned.
>
> You must implement the functions of the class such that each function works in average `O(1)` time complexity.
>
> Constraints:
> - `-2**31 <= val <= 2**31 - 1`
> - At most 2 * 10**5 calls will be made to `insert`, `remove`, and `getRandom`.
> - There will be at least one element in the data structure when `getRandom` is called.
>
> [https://leetcode.com/problems/insert-delete-getrandom-o1/](https://leetcode.com/problems/insert-delete-getrandom-o1/)

## Examples
```
Exampple 1
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
```

## How to Solve
The problem asks O(1) time complexity, so a hash table or set is the data structure to use here.
Both insert and remove can be done by the hash table (or set) only.
However, the getRandom method needs index access.
The index access is not easy to implement by the hash table (or set) for most languages
which don't keep keys in ordered manner.
To make the index access possible, the solution here adds an array as well.
The hash table maintains a value to array's index map.
The array maintains values so far.
The insert method adds value to both hash table and array.
The remove method replaces the given value to array's last element.
This way, we can implement methods by O(1) time complexity.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class RandomizedSet {
private:
    unordered_map<int, int> valToIdx;
    vector<int> values;

public:
    RandomizedSet() {
        ios::sync_with_stdio(false);
        cin.tie(0);
        cout.tie(0);
    }

    bool insert(int val) {
        if (valToIdx.find(val) != valToIdx.end()) {
            return false;
        }
        valToIdx.insert({val, values.size()});
        values.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (valToIdx.find(val) == valToIdx.end()) {
            return false;
        }
        int idx = valToIdx[val];
        int last = values.back();
        valToIdx[last] = idx;
        values[idx] = last;
        valToIdx.erase(val);
        values.pop_back();
        return true;
    }

    int getRandom() {
        return values[rand() % values.size()];
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

var RandomizedSet = function() {
    this.valToIdx = new Map();
    this.values = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.valToIdx.has(val)) {
        return false;
    }
    this.valToIdx.set(val, this.values.length);
    this.values.push(val);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.valToIdx.has(val)) {
        return false;
    }
    let idx = this.valToIdx.get(val);
    let last = this.values.at(-1);
    this.valToIdx.set(last, idx)
    this.values[idx] = last;
    this.valToIdx.delete(val);
    this.values.pop();
    return true;
}

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    return this.values[Math.floor(Math.random() * this.values.length)];
};
```
{% endtab %}

{% tab solution Python %}
```python
import random

class RandomizedSet:

    def __init__(self):
        self.valToIdx, self.values = {}, []


    def insert(self, val: int) -> bool:
        if val in self.valToIdx:
            return False
        self.valToIdx[val] = len(self.values)
        self.values.append(val)
        return True


    def remove(self, val: int) -> bool:
        if val not in self.valToIdx:
            return False
        idx, last = self.valToIdx[val], self.values[-1]
        self.valToIdx[last] = idx
        self.values[idx] = last
        del self.valToIdx[val]
        self.values.pop();
        return True


    def getRandom(self) -> int:
        return random.choice(self.values)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(1)`
- Space: `O(n)`
