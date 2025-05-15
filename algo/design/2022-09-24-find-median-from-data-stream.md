---
layout: algo_page
group: Design
title: Find Median from Data Stream
algo_menubar: algo_menu
tags:
- Hard
- Design
- Heap (Priority Queue)
- Data Stream
- Sorting
- Two Pointers
date: 2022-09-24 20:15 +0900
---

## Problem Description
> The median is the middle value in an ordered integer list.
> If the size of the list is even, there is no middle value and the median is the mean of the two middle values.
> 
> - For example, for `arr = [2,3,4]`, the median is `3`.
> - For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.
>
> Implement the MedianFinder class:
> - `MedianFinder()` initializes the `MedianFinder` object.
> - `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
> - `double findMedian()` returns the median of all elements so far.
>    Answers within `10**(-5)` of the actual answer will be accepted.
>
> Constraints:
> - `-10**5 <= num <= 10**5`
> - There will be at least one element in the data structure before calling `findMedian`.
> - At most `5 * 10**4` calls will be made to `addNum` and `findMedian`.
>
> [https://leetcode.com/problems/find-median-from-data-stream/](https://leetcode.com/problems/find-median-from-data-stream/)

## Examples
```
Example 1

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

## How to solve
A stream of data is the input for this problem.
In such a case, how to maintain the input data so far is a key to solve the problem.
The approach taken here is two heaps which maintain smaller and bigger values compared to the median.
When a query comes in, the heap data structure is able to return the answer by O(1).

The solution has two heaps: max heap to maintain smaller values than median,
min heap to maintain bigger values then median.
In Python, the heap is always non-decreasing order and no way around.
A common practice is save (-1) * value to make it non-increasing order.

We want to make min heap (bigger number) to larger or equal to max heap (smaller number).
If two heaps have the same size, min heap should have a new value.
At first, push -num to max heap, then pop from max heap. Finally, push (-1) * value to min heap.
If not (min heap is larger), max heap should have a new value.
At first, push num to min heap, then pop from min heap. Finally, push (-1) * value to max heap.

To answer the query, check how many values came in so far.
If it is odd, min heap top has the median.
If it is even, the average of min and max heap's top values is the median.

## Solution
{% tabs solution %}

{% tab solution C++ %}
```cpp
class MedianFinder {
private:
    int count = 0;
    priority_queue<int> max_heap;
    priority_queue<int, vector<int>, greater<int>> min_heap;

public:
    MedianFinder() {}

    void addNum(int num) {
        if (max_heap.size() == min_heap.size()) {
            max_heap.push(num);
            min_heap.push(max_heap.top());
            max_heap.pop();
        } else {
            min_heap.push(num);
            max_heap.push(min_heap.top());
            min_heap.pop();
        }
        ++count;
    }

    double findMedian() {
        return count % 2 == 1 ? (float) min_heap.top() : (min_heap.top() + max_heap.top()) / 2.0;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.*;

class MedianFinder {
    private int count = 0;
    private Queue<Integer> min_heap = new PriorityQueue<>();
    private Queue<Integer> max_heap = new PriorityQueue<>(Collections.reverseOrder());

    public MedianFinder() {}

    public void addNum(int num) {
        if (min_heap.size() == max_heap.size()) {
            max_heap.add(num);
            min_heap.add(max_heap.poll());
        } else {
            min_heap.add(num);
            max_heap.add(min_heap.poll());
        }
        ++count;
    }

    public double findMedian() {
        return count % 2 == 1 ? (double) min_heap.peek() : (min_heap.peek() + max_heap.peek()) / 2.0;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
var MedianFinder = function() {
    this.count = 0;
    this.min_heap = new MinPriorityQueue(); // already included by leetcode
    this.max_heap = new MaxPriorityQueue(); // already included by leetcode
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if (this.max_heap.size() == this.min_heap.size()) {
        this.max_heap.enqueue(num);
        this.min_heap.enqueue(this.max_heap.dequeue().element);
    } else {
        this.min_heap.enqueue(num);
        this.max_heap.enqueue(this.min_heap.dequeue().element);
    }
    this.count++;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    return this.count % 2 == 1 ?
        this.min_heap.front().element.toFixed(1) :
        (this.min_heap.front().element + this.max_heap.front().element) / 2.0;
};
```
{% endtab %}

{% tab solution Python %}
```python
class MedianFinder:

    def __init__(self):
        self.count = 0
        self.maxheap = []
        self.minheap = []

    def addNum(self, num: int) -> None:
        if len(self.maxheap) == len(self.minheap):
            heapq.heappush(self.minheap,
                          -heapq.heappushpop(self.maxheap, -num))
        else:
            heapq.heappush(self.maxheap,
                          -heapq.heappushpop(self.minheap, num))
        self.count += 1

    def findMedian(self) -> float:
        if self.count % 2 == 1:
            return float(self.minheap[0])
        else:
            return (-self.maxheap[0] + self.minheap[0]) / 2.0
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# This solution gets Time Limit Exceeded, so doesn't pass
require 'algorithms'

class MedianFinder
  def initialize()
    @count = 0
    @min_heap = Containers::MinHeap.new
    @max_heap = Containers::MaxHeap.new
  end

=begin
    :type num: Integer
    :rtype: Void
=end
  def add_num(num)
    if @min_heap.size == @max_heap.size
      @max_heap.push(num)
      @min_heap.push(@max_heap.pop)
    else
      @min_heap.push(num)
      @max_heap.push(@min_heap.pop)
    end
    @count += 1
  end

=begin
    :rtype: Float
=end
  def find_median()
    @count % 2 == 1 ? @min_heap.min.to_f : (@min_heap.min + @max_heap.max) / 2.0
  end
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: addNum: `O(log(n))`, findMedian: `O(1)`
- Space: `O(n)`
