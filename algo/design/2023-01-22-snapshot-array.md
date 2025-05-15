---
layout: algo_page
group: Design
title: Snapshot Array
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- Binary Search
- Design
date: 2023-01-22 21:49 +0900
---

## Problem Description
> Implement a SnapshotArray that supports the following interface:
> - `SnapshotArray(int length)` initializes an array-like data structure with the given length. Initially, each element
>     equals 0.
> - `void set(index, val)` sets the element at the given `index` to be equal to `val`.
> - `int snap()` takes a snapshot of the array and returns the `snap_id`: the total number of times we called `snap()`
>     minus 1.
> - `int get(index, snap_id)` returns the value at the given `index`, at the time we took the snapshot with the given
>     `snap_id`
>
> Constraints:
> - `1 <= length <= 5 * 10**4`
> - `0 <= index < length`
> - `0 <= val <= 10**9`
> - `0 <= snap_id <` (the total number of times we call snap())
> - At most 5 * 10**4 calls will be made to `set`, `snap`, and `get`.


## Examples
```
Example 1
Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
```

## How to Solve
The key design for this problem is how to save or not to save each snapshot array.
One approach is to save snapshot array when the snap method is called.
The snapshot may or may not use by later get method calls.
However, it is easier to implement the get method.
Another approach is to use the binary search.
In this approach, the snap method just counts up the id.
When the get method is called, do binary search using ids of the given index.
The snap_id of get method call may or may not exist.
Find the upper (right) insertion point among ids of the specific index.
If it is 0, the ids array is empty. So, return 0.
If it is not 0, return the value of one index left of the insertion point.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class SnapshotArray {
private:
    vector<map<int, int>> values;
    int _id = 0;
public:
    SnapshotArray(int length) {
        values.resize(length);
    }

    void set(int index, int val) {
        values[index][_id] = val;
    }

    int snap() {
        return _id++;
    }

    int get(int index, int snap_id) {
        auto it = values[index].upper_bound(snap_id);
        return it == values[index].begin() ? 0 : prev(it)->second;
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
/**
 * @param {number} length
 */
var SnapshotArray = function(length) {
    this.values = Array.from({ length }).map((_) => new Object())
    this._id = 0
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function(index, val) {
    this.values[index][this._id] = val
}

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function() {
    this._id++
    return this._id - 1
}

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function(index, snap_id) {
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

    if (this.values[index][snap_id]) return this.values[index][snap_id]
    const ids = Object.keys(this.values[index]).toSorted((a, b) => a - b)
    const idx = search(ids, snap_id)
    return idx === 0 ? 0 : this.values[index][ids[idx - 1]]
}
```
{% endtab %}

{% tab solution Python %}
```python
class SnapshotArray:

    def __init__(self, length: int):
        self.values = [{} for _ in range(length)]
        self._id = 0

    def set(self, index: int, val: int) -> None:
        self.values[index][self._id] = val

    def snap(self) -> int:
        self._id += 1
        return self._id - 1

    def get(self, index: int, snap_id: int) -> int:
        if snap_id in self.values[index]:
            return self.values[index][snap_id]
        ids = sorted([k for k, _ in self.values[index].items()])
        idx = bisect.bisect_right(ids, snap_id)
        return 0 if idx == 0 else self.values[index][ids[idx - 1]]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
class SnapshotArray

=begin
    :type length: Integer
=end
    def initialize(length)
        @values = Array.new(length).map {|e| Hash.new }
        @_id = 0
    end


=begin
    :type index: Integer
    :type val: Integer
    :rtype: Void
=end
    def set(index, val)
        @values[index][@_id] = val
        nil
    end


=begin
    :rtype: Integer
=end
    def snap()
        @_id += 1
        @_id - 1
    end


=begin
    :type index: Integer
    :type snap_id: Integer
    :rtype: Integer
=end
    def get(index, snap_id)
        return @values[index][snap_id] if @values[index][snap_id]
        ids = @values[index].keys.sort
        idx = search(ids, snap_id)
        idx == 0 ? 0 : @values[index][ids[idx - 1]]
    end

    private

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
- Time: set: `O(1)`, snap: `O(1)`, get: `O(n * log(n))` -- n: number of snap ids in values' items
- Space: `O(m * n)` -- m: given length, n: number of snap ids
