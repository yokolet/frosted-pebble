---
layout: algo_page
group: Arrays
title: The Latest Time to Catch a Bus
algo_menubar: algo_menu
tags:
- Medium
- Two Pointers
- Array
date: 2023-01-31 15:11 +0900
---
## Problem Description
> You are given a 0-indexed integer array `buses` of length `n`, where `buses[i]` represents the departure time of the
> i-th bus. You are also given a 0-indexed integer array `passengers` of length `m`, where `passengers[j]` represents
> the arrival time of the j-th passenger. All bus departure times are unique. All passenger arrival times are unique.
>
> You are given an integer `capacity`, which represents the maximum number of passengers that can get on each bus.
>
> When a passenger arrives, they will wait in line for the next available bus. You can get on a bus that departs at
> x minutes if you arrive at y minutes where y <= x, and the bus is not full. Passengers with the earliest arrival
> times get on the bus first.
>
> More formally when a bus arrives, either:
> - If `capacity` or fewer passengers are waiting for a bus, they will all get on the bus, or
> - The `capacity` passengers with the earliest arrival times will get on the bus.
>
> Return the latest time you may arrive at the bus station to catch a bus. You cannot arrive at the same time as
> another passenger.
>
> Note: The arrays `buses` and `passengers` are not necessarily sorted.
>
> Constraints:
> - `n == buses.length`
> - `m == passengers.length`
> - `1 <= n, m, capacity <= 10**5`
> - `2 <= buses[i], passengers[i] <= 10**9`
> - Each element in buses is unique.
> - Each element in passengers is unique.


## Examples
```
Example 1
Input: buses = [10,20], passengers = [2,17,18,19], capacity = 2
Output: 16
Explanation: Suppose you arrive at time 16.
At time 10, the first bus departs with the 0th passenger. 
At time 20, the second bus departs with you and the 1st passenger.
Note that you may not arrive at the same time as another passenger, which is why you must arrive before the 1st
passenger to catch the bus.
```

```
Example 2
Input: buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2
Output: 20
Explanation: Suppose you arrive at time 20.
At time 10, the first bus departs with the 3rd passenger. 
At time 20, the second bus departs with the 5th and 1st passengers.
At time 30, the third bus departs with the 0th passenger and you.
Notice if you had arrived any later, then the 6th passenger would have taken your seat on the third bus.
```

## How to Solve
The combination of two pointers and greedy approach is used here.
As the problem mentions, the given arrays are not always sorted.
The solution starts from sorting both buses and passengers arrays in the ascending order.
Then, use one pointer for a bus and another pointer for a passenger.
A number of passengers can be incremented as far as the count is less than the given capacity.
The counting stops whether the passenger time becomes greater than the current bus time or the count exceeds the capacity.
When the counting loop stops, check the count is below the capacity or not.
If yes, the bus time is the latest of a current bus frame.
If yes, set the time as previous passenger minus one.
It might be duplicated time to the existing passenger, but it will be checked and eliminated at the end.
Repeat counting and setting the tentative result for all buses and passengers.
Once all are checked, test the current result time is not the duplicated to the passengers.
When the result time becomes unique, we find the answer.

For C++ and Python, searching a value in the array function runs fast enough.
However, Ruby and JavaScript get Time Limit Exceeded (TLE) error.
To avoid TLE, those use a binary search.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class TheLatestTimeToCatchABus {
public:
    int latestTimeCatchTheBus(vector<int>& buses, vector<int>& passengers, int capacity) {
        sort(buses.begin(), buses.end());
        sort(passengers.begin(), passengers.end());
        int result = 0, idx = 0, count;
        for (int bus : buses) {
            count = 0;
            while (idx < passengers.size() && passengers[idx] <= bus && count < capacity) {
                idx++;
                count++;
            }
            result = count < capacity ? bus : passengers[idx - 1] - 1;
        }
        while (find(passengers.begin(), passengers.end(), result) != passengers.end()) {
            result--;
        }
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
/**
 * @param {number[]} buses
 * @param {number[]} passengers
 * @param {number} capacity
 * @return {number}
 */
var latestTimeCatchTheBus = function(buses, passengers, capacity) {
    const search = (ary, value) => {
        let left = 0, right = ary.length - 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (ary[mid] > value) {
                right = mid - 1
            } else if (ary[mid] < value) {
                left = mid + 1
            } else {
                return true
            }
        }
        return false
    }

    buses.sort((a, b) => a - b)
    passengers.sort((a, b) => a - b)
    let result = 0, idx = 0
    for (const bus of buses) {
        let count = 0
        while (idx < passengers.length && passengers[idx] <= bus && count < capacity) {
            idx++
            count++
        }
        result = count < capacity ? bus : passengers[idx - 1] - 1
    }
    while (search(passengers, result)) {
        result--
    }
    return result
}
```
{% endtab %}

{% tab solution Python %}
```python
class TheLatestTimeToCatchABus:
    def latestTimeCatchTheBus(self, buses: List[int], passengers: List[int], capacity: int) -> int:
        buses.sort()
        passengers.sort()
        result, idx = 0, 0
        for bus in buses:
            count = 0
            while idx < len(passengers) and passengers[idx] <= bus and count < capacity:
                idx += 1
                count += 1
            result = bus if count < capacity else passengers[idx - 1] - 1
        while result in passengers:
            result -= 1
        return result
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {Integer[]} buses
# @param {Integer[]} passengers
# @param {Integer} capacity
# @return {Integer}
def latest_time_catch_the_bus(buses, passengers, capacity)
    passengers.sort!
    result, idx = 0, 0
    buses.sort.each do |bus|
      count = 0
      while idx < passengers.size && passengers[idx] <= bus && count < capacity
        idx += 1
        count += 1
      end
      result = count < capacity ? bus : passengers[idx - 1] - 1
    end
    while search(passengers, result)
      result -= 1
    end
    result
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
      return true
    end
  end
  false
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n + m)`
- Space: `O(1)`
