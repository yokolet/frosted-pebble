---
layout: algo_page
group: Design
title: Online Stock Span
algo_menubar: algo_menu
tags:
- Medium
- Monotonic Stack
- Data Stream
- Design
date: 2022-11-09 17:08 +0900
---
## Introduction
If we trace how the results come out one by one, we can figure out it is a monotonic stack problem.
However, the values in the stack is not like other monotonic stack problems.
It will be the pair of current price and span so far.
By that value pair, stack top span plus one will the the span of the current price.
When a new price come in, pop out previous lower prices to form the monotonic decreasing stack.

## Problem Description
> Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for
> the current day.
> 
> The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and
> going backward) for which the stock price was less than or equal to today's price.
> - For example, if the price of a stock over the next 7 days were `[100,80,60,70,60,75,85]`, then the stock spans
>   would be `[1,1,1,2,1,4,6]`.
>
> Implement the StockSpanner class:
> - `StockSpanner()` Initializes the object of the class.
> - `int next(int price)` Returns the span of the stock's price given that today's price is price.
>
> Constraints:
> - `1 <= price <= 10**5`
> - At most 10**4 calls will be made to next.
>
> [https://leetcode.com/problems/online-stock-span/](https://leetcode.com/problems/online-stock-span/)

## Examples
```
Example 1
Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
```

## Analysis
Initialize the stack with a pair of integer max as a price and 0 as a span.
When a new price comes in, the current span will be the stack top span plus one.
To form the monotonic decreasing stack, pop out pairs whose price is less than or equals to the current price.
The span result at that point is the current span minus stack top span.
For the further process, save the current pair to the stack.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class StockSpanner {
private:
    stack<pair<int, int>> stack;
public:
    StockSpanner() {
        stack.push({numeric_limits<int>::max(), 0});
    }
    
    int next(int price) {
        int cur_span = stack.top().second + 1;
        while (stack.top().first <= price) {
            stack.pop();
        }
        int span = cur_span - stack.top().second;
        stack.push({price, cur_span});
        return span;
    }
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner* obj = new StockSpanner();
 * int param_1 = obj->next(price);
 */
```
{% endtab %}

{% tab solution Java %}
```java
import java.util.Stack;

class StockSpanner {
    private Stack<int[]> stack = new Stack();

    public StockSpanner() {
        stack.push(new int[] {Integer.MAX_VALUE, 0});
    }
    
    public int next(int price) {
        int cur_span = stack.peek()[1] + 1;
        while (stack.peek()[0] <= price) {
            stack.pop();
        }
        int span = cur_span - stack.peek()[1];
        stack.push(new int[] {price, cur_span});
        return span;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner obj = new StockSpanner();
 * int param_1 = obj.next(price);
 */
```
{% endtab %}

{% tab solution JavaScript %}
```js
var StockSpanner = function() {
    this.stack = [[Number.MAX_VALUE, 0]];
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    cur_span = this.stack[this.stack.length - 1][1] + 1;
    while (this.stack[this.stack.length - 1][0] <= price) {
        this.stack.pop();
    }
    span = cur_span - this.stack[this.stack.length - 1][1];
    this.stack.push([price, cur_span]);
    return span;
};

/** 
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 *
```
{% endtab %}

{% tab solution Python %}
```python
class StockSpanner:

    def __init__(self):
        self.stack = [(float('inf'), 0)]  # (price, span)

    def next(self, price: int) -> int:
        cur_span = self.stack[-1][1] + 1
        while self.stack[-1][0] <= price:
            self.stack.pop(-1)
        span = cur_span - self.stack[-1][1]
        self.stack.append((price, cur_span))
        return span


# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
class Integer
    N_BYTES = [42].pack('i').size
    N_BITS = N_BYTES * 16
    MAX = 2 ** (N_BITS - 2) - 1
end

class StockSpanner
    def initialize()
        @stack = [[Integer::MAX, 0]]
    end

=begin
    :type price: Integer
    :rtype: Integer
=end
    def next(price)
        cur_span = @stack[-1][1] + 1
        while @stack[-1][0] <= price
            @stack.pop
        end
        span = cur_span - @stack[-1][1]
        @stack.push([price, cur_span])
        span
    end
end

# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner.new()
# param_1 = obj.next(price)
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n)`
- Space: `O(n)`
