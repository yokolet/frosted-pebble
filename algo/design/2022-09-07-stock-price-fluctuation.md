---
layout: algo_page
group: Design
title: Stock Price Fluctuation
algo_menubar: algo_menu
tags:
- Medium
- Data Stream
- Heap (Priority Queue)
- Hash Table
- Design
date: 2022-09-07 15:42 +0900
---

## Problem Description
> You are given a stream of `record`s about a particular stock.
> Each record contains a `timestamp` and the corresponding `price` of the stock at that timestamp.\
> Unfortunately due to the volatile nature of the stock market, the records do not come in order.
> Even worse, some records may be incorrect.
> Another record with the same timestamp may appear later in the stream correcting the price of
> the previous wrong record.
>
> Design an algorithm that:
>
> - Updates the price of the stock at a particular timestamp,
>   correcting the price from any previous records at the timestamp.
> - Finds the latest price of the stock based on the current records.
>   The latest price is the price at the latest timestamp recorded.
> - Finds the maximum price the stock has been based on the current records.
> - Finds the minimum price the stock has been based on the current records.
>
> Implement the StockPrice class:
>
> - `StockPrice()` Initializes the object with no price records.
> - `void update(int timestamp, int price)` Updates the price of the stock at the given timestamp.
> - `int current()` Returns the latest price of the stock.
> - `int maximum()` Returns the maximum price of the stock.
> - `int minimum()` Returns the minimum price of the stock.
> 
> Constraints:
> 
> - `1 <= timestamp, price <= 10**9`\
> - At most `10**5` calls will be made in total to `update`, `current`, `maximum`, and `minimum`.
> - `current`, `maximum`, and `minimum` will be called only after `update` has been called at least once.
>
> [https://leetcode.com/problems/stock-price-fluctuation/](https://leetcode.com/problems/stock-price-fluctuation/)

## Examples
```
Example 1:
Input:
["StockPrice", "update", "update", "current", "maximum", "update", "maximum", "update", "minimum"]
[[], [1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
Output:
[null, null, null, 5, 10, null, 5, null, 2]

Explanation:
StockPrice stockPrice = new StockPrice();
stockPrice.update(1, 10); // Timestamps are [1] with corresponding prices [10].
stockPrice.update(2, 5);  // Timestamps are [1,2] with corresponding prices [10,5].
stockPrice.current();     // return 5, the latest timestamp is 2 with the price being 5.
stockPrice.maximum();     // return 10, the maximum price is 10 at timestamp 1.
stockPrice.update(1, 3);  // The previous timestamp 1 had the wrong price, so it is updated to 3.
                          // Timestamps are [1,2] with corresponding prices [3,5].
stockPrice.maximum();     // return 5, the maximum price is 5 after the correction.
stockPrice.update(4, 2);  // Timestamps are [1,2,4] with corresponding prices [3,5,2].
stockPrice.minimum();     // return 2, the minimum price is 2 at timestamp 4.
```

## How to Solve
This problem is a type of online or streaming algorithm.
The input data comes from a stream of data and be processed one by one.
A popular problem of this type is [Find Median from Data Stream](algo/design/2022-09-24-find-median-from-data-stream).
In this problem, stock prices are coming in one by one from data stream.

The problem asks maximum and/or minimum from the data stream, the heap data structure should be used.
To answer both maximum and minimum values, we need min and max heaps.
To support current value reference, we should keep values in a hash table.

Each method should focus on only necessary operations.
Heap updates will be done when maximum or minimum methods are called.
Because of that, the update method keeps old data in max/min heaps.
The old data will be eliminated when heap pop result mismatches values in the hash table.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class StockPrice {
private:
    int cur_id;
    unordered_map<int, int> id2price;  // id: price
    priority_queue<pair<int, int>> max_heap; // {price, id}
    priority_queue<pair<int, int>, vector<pair<int,int>>, greater<pair<int, int>>> min_heap; // {price, id}

public:
    StockPrice() {}

    void update(int timestamp, int price) {
        cur_id = max(cur_id, timestamp);
        id2price[timestamp] = price;
        max_heap.push({price, timestamp});
        min_heap.push({price, timestamp});
    }

    int current() {
        return id2price[cur_id];
    }

    int maximum() {
        while (!max_heap.empty() && id2price[max_heap.top().second] != max_heap.top().first) {
            max_heap.pop();
        }
        return max_heap.top().first;
    }

    int minimum() {
        while (!min_heap.empty() && id2price[min_heap.top().second] != min_heap.top().first) {
            min_heap.pop();
        }
        return min_heap.top().first;
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
class StockPrice:

    def __init__(self):
        self.cur_id = -1
        self.id2price = {}  # id: price
        self.max_heap = [] # (price, id)
        self.min_heap = [] # (price, id)


    def update(self, timestamp: int, price: int) -> None:
        self.cur_id = max(self.cur_id, timestamp)
        self.id2price[timestamp] = price
        heapq.heappush(self.max_heap, (-price, timestamp))
        heapq.heappush(self.min_heap, (price, timestamp))


    def current(self) -> int:
        return self.id2price[self.cur_id]


    def maximum(self) -> int:
        p, id = self.max_heap[0]
        while self.max_heap and self.id2price[id] != -p:
            heapq.heappop(self.max_heap)
            p, id = self.max_heap[0]
        return -p


    def minimum(self) -> int:
        p, id = self.min_heap[0]
        while self.min_heap and self.id2price[id] != p:
            heapq.heappop(self.min_heap)
            p, id = self.min_heap[0]
        return p
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: update: `O(log(n))`, current: `O(1)`,  maximum/minimum: `O(n*log(n))`
- Space: `O(n)`
