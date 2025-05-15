---
layout: algo_page
group: Design
title: Time Based Key-Value Store
algo_menubar: algo_menu
tags:
- Medium
- Binary Search
- Hash Table
- Design
date: 2022-10-06 14:33 +0900
---

## Problem Description
> Design a time-based key-value data structure that can store multiple values for the same key
> at different time stamps and retrieve the key's value at a certain timestamp.
>
> Implement the TimeMap class:
> - `TimeMap()` Initializes the object of the data structure.
> - `void set(String key, String value, int timestamp)` Stores the key `key` with the value `value` at
>    the given time `timestamp`.
> - `String get(String key, int timestamp)` Returns a value such that `set` was called previously,
>    with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value
>    associated with the largest `timestamp_prev`. If there are no values, it returns "".
>
> Constraints:
> - `1 <= key.length, value.length <= 100`
> - `key` and `value` consist of lowercase English letters and digits.
> - `1 <= timestamp <= 10**7`
> - All the timestamps `timestamp` of `set` are strictly increasing.
> - At most `2 * 10**5` calls will be made to `set` and `get`.


## Examples
```
Example 1
Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
```

```
Example 2
Input
["TimeMap","set","set","get","get","get","get","get"]
[[],["love","high",10],["love","low",20],["love",5],["love",10],["love",15],["love",20],["love",25]]
Output
[null,null,null,"","high","high","low","low"]
```

## How to Solve

A design problem always requires a consideration on what data structure(s) to save input data.
This problem needs a key-value store (hash table) since get method needs key access.
However, even though the same key is used, the get result depends on the timestamp.
The solution here uses another hash table to save timestamps.
Given a key for the hash tables, the index is the same for both values and timestamps array.

Conveniently, the timestamp is given chronologically to the set method, which means it is sorted.
If the array is sorted, the binary search can be used to find the answer.
When the timestamp is given to get method, use the binary search to find the index in timestamps array.
The same index in values array is the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class TimeMap {
private:
    unordered_map<string, vector<string>> values;
    unordered_map<string, vector<int>> timestamps;
    int idx;

public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        values[key].push_back(value);
        timestamps[key].push_back(timestamp);
    }

    string get(string key, int timestamp) {
        if (timestamps.find(key) == timestamps.end()) { return ""; }
        if (timestamp < timestamps[key][0]) { return ""; }
        idx = upper_bound(timestamps[key].begin(), timestamps[key].end(), timestamp) - timestamps[key].begin();
        return idx > 0 ? values[key][idx - 1] : "";
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
var TimeMap = function() {
    this.values = {}
    this.timestamps = {}
}

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    if (!this.values[key]) this.values[key] = []
    this.values[key].push(value)
    if (!this.timestamps[key]) this.timestamps[key] = []
    this.timestamps[key].push(timestamp)
}

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    const search = (ary, value) => {
        let left = 0, right = ary.length - 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (ary[mid] > value) {
                right = mid - 1
            } else if (ary[mid] < value) {
                left = mid + 1
            } else {
                return mid + 1
            }
        }
        return left
    }

    if (!(key in this.values)) return ""
    const ts = this.timestamps[key]
    if (!ts || timestamp < ts[0]) return ""
    const idx = search(ts, timestamp)
    return idx < 1 ? "" : this.values[key][idx - 1]
}
```
{% endtab %}

{% tab solution Python %}
```python
class TimeMap:

    def __init__(self):
        self.values = collections.defaultdict(list)
        self.timestamps = collections.defaultdict(list)


    def set(self, key: str, value: str, timestamp: int) -> None:
        self.values[key].append(value)
        self.timestamps[key].append(timestamp)
        

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.timestamps:
            return ''
        ts = self.timestamps[key]
        if not ts or timestamp < ts[0]:
            return ''
        idx = bisect.bisect_right(ts, timestamp)
        return self.values[key][idx - 1] if idx else ''
```
{% endtab %}

{% tab solution Ruby %}
```ruby
class TimeMap
    def initialize()
        @values = {}
        @timestamps = {}
    end


=begin
    :type key: String
    :type value: String
    :type timestamp: Integer
    :rtype: Void
=end
    def set(key, value, timestamp)
        @values[key] ||= []
        @values[key] << value
        @timestamps[key] ||= []
        @timestamps[key] << timestamp
        nil
    end


=begin
    :type key: String
    :type timestamp: Integer
    :rtype: String
=end
    def get(key, timestamp)
        return "" if !@timestamps.include?(key)
        ts = @timestamps[key]
        return "" if ts.nil? || timestamp < ts[0]
        idx = search(ts, timestamp)
        idx < 1 ? "" : @values[key][idx - 1]
    end

    def search(ary, value)
        left, right = 0, ary.length - 1
        while left <= right
            mid = (left + right) / 2
            if ary[mid] > value
                right = mid - 1
            elsif ary[mid] < value
                left = mid + 1
            else
                return mid + 1
            end
        end
        left
    end
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: set -- `O(1)`, get -- `O(log(n))`: n is a number of timestamps associated to a key
- Space: `O(mn)`: m is a number of keys
