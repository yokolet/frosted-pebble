---
layout: algo_page
group: Strings
title: Unique Email Addresses
algo_menubar: algo_menu
tags:
- Easy
- Set
- String
date: 2022-12-07 23:12 +0900
---
## Problem Description
> Every valid email consists of a local name and a domain name, separated by the '@' sign. Besides lowercase letters,
> the email may contain one or more '.' or '+'.
> - For example, in "alice@leetcode.com", "alice" is the local name, and "leetcode.com" is the domain name.
>
> If you add periods '.' between some characters in the local name part of an email address, mail sent there will be
> forwarded to the same address without dots in the local name. Note that this rule does not apply to domain names.
> - For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address.
>
> If you add a plus '+' in the local name, everything after the first plus sign will be ignored. This allows certain
> emails to be filtered. Note that this rule does not apply to domain names.
> - For example, "m.y+name@email.com" will be forwarded to "my@email.com".
>
> It is possible to use both of these rules at the same time.
>
> Given an array of strings `emails` where we send one email to each `emails[i]`, return the number of different
> addresses that actually receive mails.
>
> Constraints:
> - `1 <= emails.length <= 100`
> - `1 <= emails[i].length <= 100`
> - `emails[i]` consist of lowercase English letters, '+', '.' and '@'.
> - Each `emails[i]` contains exactly one '@' character.
> - All local and domain names are non-empty.
> - Local names do not start with a '+' character.
> - Domain names end with the ".com" suffix.
>
> [https://leetcode.com/problems/unique-email-addresses/](https://leetcode.com/problems/unique-email-addresses/)

## Examples
```
Exmaple 1

Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.
```

```
Example 2
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3
```

## How to Solve
This is a string manipulation problem.
Only substring before "@" needs some character elimination, but none after "@".
Use the set data structure to save unique emails.
In the end, the size of the set gives us the answer.

## Solution

{% tabs solution %}

{% tab solution C++ %}
```cpp
class UniqueEmailAddresses {
public:
    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> seen;
        for (string email : emails) {
            string::size_type idx = email.find('@');
            string name = email.substr(0, idx), domain = email.substr(idx);
            string clean_name = "";
            for (auto c : name) {
                if (c == '+') {
                    break;
                } else if (c == '.') {
                    continue;
                } else {
                    clean_name += c;
                }
            }
            seen.insert(clean_name + domain);
        }
        return seen.size();
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
class UniqueEmailAddresses:
    def numUniqueEmails(self, emails: List[str]) -> int:
        seen = set()
        for email in emails:
            local, domain = email.split("@")
            name = local.split('+')[0]
            name = name.replace('.', '')
            seen.add('@'.join([name, domain]))
        return len(seen)
```
{% endtab %}

{% tab solution Ruby %}
```ruby
# @param {String[]} emails
# @return {Integer}
def num_unique_emails(emails)
    seen = Set.new
    emails.each do |email|
      local, domain = email.split('@')
      local = local.split("+")[0]
      local = local.tr(".","")
      seen.add("#{local}@#{domain}")
    end
    seen.size
end
```
{% endtab %}

{% endtabs %}



## Complexities
- Time: `O(n * m)` -- n: number of emails, m: length of an email
- Space: `O(n)`
