---
layout: algo_page
group: Design
title: Peeking Iterator
algo_menubar: algo_menu
tags:
- Medium
- Iterator
- Design
date: 2023-01-31 22:18 +0900
---

## Problem Description
> Design an iterator that supports the `peek` operation on an existing iterator in addition to the `hasNext` and the
> `next` operations.
>
> Implement the PeekingIterator class:
> - `PeekingIterator(Iterator<int> nums)` Initializes the object with the given integer iterator `iterator`.
> - `int next()` Returns the next element in the array and moves the pointer to the next element.
> - `boolean hasNext()` Returns true if there are still elements in the array.
> - `int peek()` Returns the next element in the array without moving the pointer.
>
> Note: Each language may have a different implementation of the constructor and `Iterator`, but they all support the
> `int next()` and `boolean hasNext()` functions.
>
> Constraints:
> - `1 <= nums.length <= 1000`
> - `1 <= nums[i] <= 1000`
> - All the calls to `next` and `peek` are valid.
> - At most 1000 calls will be made to `next`, `hasNext`, and `peek`.
>
> [https://leetcode.com/problems/peeking-iterator/](https://leetcode.com/problems/peeking-iterator/)

## Examples
```
Example 1
Input
["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
[[[1, 2, 3]], [], [], [], [], []]
Output
[null, 1, 2, 2, 3, false]

Explanation
PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]
peekingIterator.next();    // return 1, the pointer moves to the next element [1,2,3].
peekingIterator.peek();    // return 2, the pointer does not move [1,2,3].
peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,3]
peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
peekingIterator.hasNext(); // return False
```

## How to Solve
The key to solve this problem is how to implement peek() operation.
Since the base iterator class doesn't have peek(), calling next() to get a value shifts the pointer.
The solution here saves the next value in the subclass.
The next value is updated when the class is instantiated.
Also, it is updated when the next() operation gets called.
The solution has a slight variation among languages.
C++ doesn't allow setting nullptr to the int type.
The constraints says all values are greater than and equal to 1.
So, for C++, -1 is set instead of null or None.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
/*
 * Below is the interface for Iterator, which is already defined for you.
 * **DO NOT** modify the interface for Iterator.
 *
 *  class Iterator {
 *		struct Data;
 * 		Data* data;
 *  public:
 *		Iterator(const vector<int>& nums);
 * 		Iterator(const Iterator& iter);
 *
 * 		// Returns the next element in the iteration.
 *		int next();
 *
 *		// Returns true if the iteration has more elements.
 *		bool hasNext() const;
 *	};
 */

class PeekingIterator : public Iterator {
private:
	int next_;

public:
	PeekingIterator(const vector<int>& nums) : Iterator(nums) {
	    // Initialize any member here.
	    // **DO NOT** save a copy of nums and manipulate it directly.
	    // You should only use the Iterator interface methods.
		next_ = Iterator::hasNext() ? Iterator::next() : -1;
	}
	
    // Returns the next element in the iteration without advancing the iterator.
	int peek() {
        return next_;
	}
	
	// hasNext() and next() should behave the same as in the Iterator interface.
	// Override them if needed.
	int next() {
	    int tmp = next_;
		next_ = Iterator::hasNext() ? Iterator::next() : -1;
		return tmp;
	}
	
	bool hasNext() const {
	    return next_ > 0;
	}
};
```
{% endtab %}

{% tab solution Java %}
```java
// Java Iterator interface reference:
// https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html

class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> iter;
    private Integer next_;

	public PeekingIterator(Iterator<Integer> iterator) {
	    // initialize any member here.
	    iter = iterator;
        next_ = iter.hasNext() ? iter.next() : null;
	}
	
    // Returns the next element in the iteration without advancing the iterator.
	public Integer peek() {
        return next_;
	}
	
	// hasNext() and next() should behave the same as in the Iterator interface.
	// Override them if needed.
	@Override
	public Integer next() {
	    Integer tmp = next_;
        next_ = iter.hasNext() ? iter.next() : null;
        return tmp;
	}
	
	@Override
	public boolean hasNext() {
	    return next_ != null;
	}
}
```
{% endtab %}

{% tab solution JavaScript %}
```js

```
{% endtab %}

{% tab solution Python %}
```python
# Below is the interface for Iterator, which is already defined for you.
#
# class Iterator:
#     def __init__(self, nums):
#         """
#         Initializes an iterator object to the beginning of a list.
#         :type nums: List[int]
#         """
#
#     def hasNext(self):
#         """
#         Returns true if the iteration has more elements.
#         :rtype: bool
#         """
#
#     def next(self):
#         """
#         Returns the next element in the iteration.
#         :rtype: int
#         """

class PeekingIterator:
    def __init__(self, iterator):
        """
        Initialize your data structure here.
        :type iterator: Iterator
        """
        self.iter = iterator
        self.next_ = self.iter.next() if self.iter.hasNext() else None

    def peek(self):
        """
        Returns the next element in the iteration without advancing the iterator.
        :rtype: int
        """
        return self.next_

    def next(self):
        """
        :rtype: int
        """
        tmp = self.next_
        self.next_ = self.iter.next() if self.iter.hasNext() else None
        return tmp

    def hasNext(self):
        """
        :rtype: bool
        """
        return self.next_ != None
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(1)` for all operations
- Space: `O(1)`
