---
layout: algo_page
group: Strings
title: Subdomain Visit Count
algo_menubar: algo_menu
tags:
- Medium
- Counting
- String
- Hash Table
date: 2022-09-24 21:48 +0900
---

## Problem Description
> A website domain `"discuss.leetcode.com"` consists of various subdomains.
> At the top level, we have `"com"`, at the next level, we have `"leetcode.com"` and
> at the lowest level, `"discuss.leetcode.com"`.
> When we visit a domain like `"discuss.leetcode.com"`, we will also visit the parent domains
> `"leetcode.com"` and `"com"` implicitly.
>
> A count-paired domain is a domain that has one of the two formats `"rep d1.d2.d3"` or `"rep d1.d2"`
> where `rep` is the number of visits to the domain and `d1.d2.d3` is the domain itself.
> - For example, `"9001 discuss.leetcode.com"` is a count-paired domain that indicates that `discuss.leetcode.com`
>   was visited `9001` times.
>
> Given an array of count-paired domains `cpdomains`, return an array of the count-paired domains of each subdomain in the input.
> You may return the answer in any order.
>
> Constraints:
> - `1 <= cpdomain.length <= 100`
> - `1 <= cpdomain[i].length <= 100`
> - `cpdomain[i]` follows either the `"repi d1i.d2i.d3i"` format or the `"repi d1i.d2i"` format.
> - `rep[i]` is an integer in the range `[1, 104]`.
> - `d1[i], d2[i], and d3[i]` consist of lowercase English letters.


## Examples
```
Example 1
Input: cpdomains = ["9001 discuss.leetcode.com"]
Output: ["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
```

```
Example 2
Input: cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
Output: ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
```

## How to Solve

As the title shows, this is a counting problem.
The hash table is a good data structure to save subdomain name and count pairs.

The first step is to divide each string by a space, which gives us a count and domain name.
While counting, each domain should be divided by a dot, then iterate in reverse order:
`com, leetcode.com, discuss.leetcode.com`.
Add count in all of concatenated subdomains.
Finally, hash table key-value pairs should be converted to strings.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp

```
{% endtab %}

{% tab solution Java %}
```java

```
{% endtab %}

{% tab solution JavaScript %}
```js
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function(cpdomains) {
    const domains = {}
    cpdomains.forEach((cpdomain) => {
        [cnt, domain] = cpdomain.split(" ")
        cnt = parseInt(cnt)
        const names = domain.split(".").reverse()
        let prev = names[0]
        for (let i = 1; i < names.length; ++i) {
            domains[prev] = (domains[prev] || 0) + cnt
            prev = [names[i], prev].join(".")
        }
        domains[prev] = (domains[prev] || 0) + cnt
    })
    return Object.keys(domains).map((k) => `${domains[k]} ${k}`)
}
```
{% endtab %}

{% tab solution Python %}
```python
class SubdomainVisitCount:
    def subdomainVisits(self, cpdomains: List[str]) -> List[str]:
        domains = collections.defaultdict(int)
        for cpdomain in cpdomains:
            cnt, domain = cpdomain.split(' ')
            cnt = int(cnt)
            names = domain.split('.')
            ns = names[-1]
            for i in range(len(names) - 2, -1, -1):
                domains[ns] += cnt
                ns = '.'.join([names[i], ns])
            domains[ns] += cnt
        return ['%s %s' % (v, k) for k, v in domains.items()]
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} cpdomains
# @return {String[]}
def subdomain_visits(cpdomains)
  domains = Hash.new(0)
  cpdomains.each do |cpdomain|
    cnt, domain = cpdomain.split(" ")
    cnt = cnt.to_i
    names = domain.split(".").reverse
    prev = names.shift
    names.each do |part|
      domains[prev] += cnt
      prev = [part, prev].join(".")
    end
    domains[prev] += cnt
  end
  domains.map {|k, v| "#{v} #{k}"}
end
```
{% endtab %}

{% endtabs %}


## Complexities
- Time: `O(n)`
- Space: `O(n)`
