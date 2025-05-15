---
layout: algo_page
group: Others
title: Alert Using Same Key-Card Three or More Times in a One Hour Period
algo_menubar: algo_menu
tags:
- Medium
- Hash Table
- String
- Sorting
date: 2022-09-26 14:30 +0900
---

## Problem Description
> LeetCode company workers use key-cards to unlock office doors.
> Each time a worker uses their key-card, the security system saves the worker's name and the time when it was used.
> The system emits an alert if any worker uses the key-card three or more times in a one-hour period.
>
> You are given a list of strings `keyName` and `keyTime` where `[keyName[i], keyTime[i]]` corresponds to
> a person's name and the time when their key-card was used in a single day.
> Access times are given in the 24-hour time format "HH:MM", such as "23:51" and "09:49".
>
> Return a list of unique worker names who received an alert for frequent keycard use.
> Sort the names in ascending order alphabetically.
>
> Notice that "10:00" - "11:00" is considered to be within a one-hour period,
> while "22:51" - "23:52" is not considered to be within a one-hour period.
>
> Constraints:
> - `1 <= keyName.length, keyTime.length <= 10**5`
> - `keyName.length == keyTime.length`
> - `keyTime[i]` is in the format "HH:MM".
> - `[keyName[i], keyTime[i]]` is unique.
> - `1 <= keyName[i].length <= 10`
> - `keyName[i]` contains only lowercase English letters.
>
> [https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/](https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/)

## Examples
```
Example 1
Input: keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"], keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
Output: ["daniel"]
Explanation: "daniel" used the keycard 3 times in a one-hour period ("10:00","10:40", "11:00").
```

```
Example 2
Input: keyName = ["alice","alice","alice","bob","bob","bob","bob"], keyTime = ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]
Output: ["bob"]
Explanation: "bob" used the keycard 3 times in a one-hour period ("21:00","21:20", "21:30").
```

## How to Solve
The problem asks individual's 3 consecutive time differences.
The hash table is a good data structure to save name and a list of key times pair.
Then, sort times of each person and compare.

The comparison will be made for each person's 3 consecutive time records.
It means the time of index i and i + 2 should be check whether the difference is less than or equal to 60 minutes.
If it is bigger, add the name to the result list.
At last, sort the names in the result list as the problem requires.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class SameKeyCardAlert {
private:
    int getMins(string &time) {
        return stoi(time.substr(0, 2)) * 60 + stoi(time.substr(3));
    }

public:
    vector<string> alertNames(vector<string>& keyName, vector<string>& keyTime) {
        unordered_map<string, vector<int>> workers;
        vector<string> alerts;
        for (int i = 0; i < keyName.size(); ++i) {
            workers[keyName[i]].push_back(getMins(keyTime[i]));
        }
        for (auto const &worker : workers) {
            vector<int> times = worker.second;
            sort(times.begin(), times.end());
            for (int idx = 0; idx < times.size() - 2; ++idx) {
                if (times[idx + 2] - times[idx] <= 60) {
                    alerts.push_back(worker.first);
                    break;
                }
            }
        }
        sort(alerts.begin(), alerts.end());
        return alerts;
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
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function(keyName, keyTime) {
  const getMin = function(time) {
    return parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3));
  }
  let workers = new Map();
  let alerts = new Array();
  for (let i = 0; i < keyName.length; i++) {
    let times = workers.has(keyName[i]) ? workers.get(keyName[i]) : new Array();
    times.push(getMin(keyTime[i]));
    workers.set(keyName[i], times);
  }
  workers.forEach((times, name) => {
    times.sort((a, b) => { return a - b; });
    for (let idx = 0; idx < times.length - 2; idx++) {
      if (times[idx + 2] - times[idx] <= 60) {
        alerts.push(name);
        break;
      }
    }
  })
  alerts.sort();
  return alerts;
};
```
{% endtab %}

{% tab solution Python %}
```python
class SameKeyCardAlert:
    def alertNames(self, keyName: List[str], keyTime: List[str]) -> List[str]:
        def getMins(time):
            hour, minute = time[:2], time[3:]
            return int(hour) * 60 + int(minute)

        workers, alerts = defaultdict(list), []
        for name, time in zip(keyName, keyTime):
            workers[name].append(getMins(time))
        for name in workers:
            times = sorted(workers[name])
            for idx, time in enumerate(times):
                if idx + 2 < len(times) and times[idx + 2] - time <= 60:
                    alerts.append(name)
                    break;
        return sorted(alerts)
```
{% endtab %}

{% tab solution Ruby %}
```ruby

```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n + m)` -- n: size of input arrays, m: number of unique workers
- Space: `O(m)`
