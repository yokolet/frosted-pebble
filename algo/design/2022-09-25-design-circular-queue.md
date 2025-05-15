---
layout: algo_page
group: Design
title: Design Circular Queue
algo_menubar: algo_menu
tags:
- Medium
- Queue
- Design
- Array
date: 2022-09-25 21:18 +0900
---

## Problem Description
> Design your implementation of the circular queue.
> The circular queue is a linear data structure in which the operations are performed based on
> FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle.
> It is also called "Ring Buffer".
>
> One of the benefits of the circular queue is that we can make use of the spaces in front of the queue.
> In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue.
> But using the circular queue, we can use the space to store new values.
>
> Implementation the MyCircularQueue class:
> - `MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.
> - `int Front()` Gets the front item from the queue. If the queue is empty, return -1.
> - `int Rear()` Gets the last item from the queue. If the queue is empty, return -1.
> - `boolean enQueue(int value)` Inserts an element into the circular queue. Return true if the operation is successful.
> - `boolean deQueue()` Deletes an element from the circular queue. Return true if the operation is successful.
> - `boolean isEmpty()` Checks whether the circular queue is empty or not.
> - `boolean isFull()` Checks whether the circular queue is full or not.
>
> You must solve the problem without using the built-in queue data structure in your programming language.
>
> Constraints:
> - `1 <= k <= 1000`
> - `0 <= value <= 1000`
> - At most 3000 calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.
>
> [https://leetcode.com/problems/design-circular-queue/](https://leetcode.com/problems/design-circular-queue/)

## Examples
```
Example 1

Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]

Explanation
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
```

```
Example 2
Input
["MyCircularQueue","enQueue","Rear","Front","deQueue","Front","deQueue","Front","enQueue","enQueue","enQueue","enQueue"]
[[3],[2],[],[],[],[],[],[],[4],[2],[2],[3]]
Output
[null,true,2,2,true,-1,false,-1,true,true,true,false]
```

## How to Solve
Basically, an array and pointer is all to implement the circular queue.
However, it needs much consideration when the enqueue index comes back to the top.
An additional parameter, the size -- current size of the queue, will help implementing this easily.

The solution here has a capacity k, queue array, head pointer and queue size as instance variables.
When the size is zero, the queue is empty.
While the size is the same as the capacity k, the queue is full.
Only when the queue is not full, a new value can be added.
The index is the current head plus size modulo capacity.
Only when the queue is not empty, the deQueue operation is possible.
Move the head to the current head plus one module capacity.


## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
#include <vector>

using namespace std;

class MyCircularQueue {
private:
    int k_, head = 0, size = 0;
    vector<int> q;

public:
    MyCircularQueue(int k) : k_(k) {
        q.resize(k_);
    }

    bool enQueue(int value) {
        if (isFull()) { return false; }
        q[(head + size) % k_] = value;
        size++;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) { return false; }
        head = (head + 1) % k_;
        size--;
        return true;
    }

    int Front() {
        if (isEmpty()) { return -1; }
        return q[head];
    }

    int Rear() {
        if (isEmpty()) { return -1; }
        return q[(head + size - 1) % k_];
    }

    bool isEmpty() {
        return size == 0;
    }

    bool isFull() {
        return size == k_;
    }
};
```
{% endtab %}

{% tab solution Java %}
```java
class MyCircularQueue {
    private int k_, head = 0, size = 0;
    private int[] q;

    public MyCircularQueue(int k) {
        this.k_ = k;
        this.q = new int[k];
    }

    public boolean enQueue(int value) {
        if (this.isFull()) { return false; }
        this.q[(this.head + this.size) % this.k_] = value;
        this.size++;
        return true;
    }

    public boolean deQueue() {
        if (this.isEmpty()) { return false; }
        this.head = (this.head + 1) % this.k_;
        this.size--;
        return true;
    }

    public int Front() {
        if (this.isEmpty()) { return -1; }
        return this.q[this.head];
    }

    public int Rear() {
        if (this.isEmpty()) { return -1; }
        return this.q[(this.head + this.size - 1) % this.k_];
    }

    public boolean isEmpty() {
        return this.size == 0;
    }

    public boolean isFull() {
        return this.size == this.k_;
    }
}
```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.k_ = k, this.head = 0, this.size = 0;
  this.q = [];
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) { return false; }
  this.q[(this.head + this.size) % this.k_] = value;
  this.size += 1;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) { return false; }
  this.head = (this.head + 1) % this.k_;
  this.size -= 1;
  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if (this.isEmpty()) { return -1; }
  return this.q[this.head];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) { return -1; }
  return this.q[(this.head + this.size - 1) % this.k_]
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return this.size == 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return this.size == this.k_;
};
```
{% endtab %}

{% tab solution Python %}
```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.k = k
        self.queue = [-1 for _ in range(k)]
        self.head = 0
        self.size = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        idx = (self.head + self.size) % self.k
        self.queue[idx] = value
        self.size += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.k
        self.size -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        idx = (self.head + self.size - 1) % self.k
        return self.queue[idx]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.k
```
{% endtab %}

{% tab solution Ruby %}
```ruby
class MyCircularQueue

=begin
    :type k: Integer
=end
  def initialize(k)
    @k_ = k
    @head = 0
    @size = 0
    @q = Array.new(k)
  end


=begin
    :type value: Integer
    :rtype: Boolean
=end
  def en_queue(value)
    return false if is_full
    @q[(@head + @size) % @k_] = value
    @size += 1
    true
  end


=begin
    :rtype: Boolean
=end
  def de_queue()
    return false if is_empty
    @head = (@head + 1) % @k_
    @size -= 1
    true
  end


=begin
    :rtype: Integer
=end
  def front()
    return -1 if is_empty
    @q[@head]
  end


=begin
    :rtype: Integer
=end
  def rear()
    return -1 if is_empty
    @q[(@head + @size - 1) % @k_]
  end


=begin
    :rtype: Boolean
=end
  def is_empty()
    @size == 0
  end


=begin
    :rtype: Boolean
=end
  def is_full()
    @size == @k_
  end


end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(1)`
- Space: `O(k)`
 
