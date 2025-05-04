---
layout: post
title: What is bcrypt gem?
hero_height: is-small
date: 2024-07-05 23:33 +0900
---
When a Ruby on Rails application is created by `rails new` command, we typically see bcrypt gem in `Gemfile`.

```ruby
# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> [VERSION]"
```

The Rails generator adds commonly used gems to Gemfile so that developers can add those by just removing `#`
at the beginning of a line. That's pretty handy.

Okay, then, what is bcrypt gem actually doing?
The instruction at [https://guides.rubyonrails.org/active_model_basics.html#securepassword](https://guides.rubyonrails.org/active_model_basics.html#securepassword)
says:

> ActiveModel::SecurePassword depends on bcrypt, so include this gem in your Gemfile...."

We can understand how to setup and use the gem to make passwords secure,
but still it's not clear why the passwords become secure by bcrypt gem.

It's time google it!

### Hashing, not Encryption

If we see google search results about bcrypt, we notice many websites mention about hashing vs encryption.
The difference is a one-way or two-way algorithm or function.
The one-way function is able to generate a string of random characters based on the given string, but there's no way to
make the original string back. In another words, it is impossible to decrypt.
The generated string is called a hash or digital fingerprint.

On the other hand, the two-way algorithm or function can do both: encrypt and decrypt.
If the two-way function is used to generate a string of random characters based on the the given string,
the given string can be recovered from the generated string. This process is called an encryption and decryption.

Bcrypt is the one-way function, so we will never ever know what is the password actually.
The question now would be how to test a given password from a user A is correct.
To test the password, exactly the same hashing process runs to generate a hashed string,
then, compare the saved and generated hashed strings. If those matches, the given password is correct.

Since nobody can recover passwords from hashed string, the one-way function is commonly used to secure password storage.

What about the two-way function? The two-way function or encryption/decryption is used to secure communication
including emails, store sensitive data such as PII (personal identifiable information), and etc.

In the area of two-way function, many online articles mention symmetric and asymmetric key encryption.
The symmetric encryption uses the same key to both encryption and decryption.
While asymmetric encryption uses a key pair, which is known as a public/private key pair.
The private key is used to encrypt. The public key is used to decrypt.
Well-known algorithms are:
- Symmetric: Advanced Encryption Standard (AES), Data Encryption Standard (DES)
- Asymmetric: Rivest-Shamir-Adleman (RSA), Digital Signature Algorithm (DSA)

If you are a software developer, you should have used one when you generated a ssh key pair.
Then, you should have pasted a public key to the source code repository such as GitHub or GitLab.


### Bcrypt algorithm -- slow is good

Of course, bcrypt is not the only widely used hashing algorithm. 
Famous algorithms are [Argon2id](https://en.wikipedia.org/wiki/Argon2),
[scrypt](https://en.wikipedia.org/wiki/Scrypt), and
[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2).

Among those, bcrypt is said to be good since its computation is slow.
SLOW?? WHAT?
Yes, in the computing world, the faster, the better. To make it run faster, people use their brains and pay a lot of efforts.
Even though, bcrypt is good because it runs slow.

One of the purposes of the slow computation is to stop attackers in an early stage.
When a monitoring is in place, an administrator can spot a suspicious activity.
Thanks for the slow bcrypt, the attackers' progresses slow down, which effectively prevents further data breach.

Bcrypt has a cost parameter to control its slowness.
The Ruby world has another gem called [authlogic](https://github.com/binarylogic/authlogic), which covers bcrypt,
scrypt and a couple more hashing algorithm. Authlogic's API document has interesting benchmarks at:
[https://www.rubydoc.info/github/binarylogic/authlogic/Authlogic/CryptoProviders/BCrypt](https://www.rubydoc.info/github/binarylogic/authlogic/Authlogic/CryptoProviders/BCrypt)
```ruby
require "bcrypt"
require "digest"
require "benchmark"

Benchmark.bm(18) do |x|
  x.report("BCrypt (cost = 10:") {
    100.times { BCrypt::Password.create("mypass", :cost => 10) }
  }
  x.report("BCrypt (cost = 4:") {
    100.times { BCrypt::Password.create("mypass", :cost => 4) }
  }
  x.report("Sha512:") {
    100.times { Digest::SHA512.hexdigest("mypass") }
  }
  x.report("Sha1:") {
    100.times { Digest::SHA1.hexdigest("mypass") }
  }
end

#                          user     system      total        real
# BCrypt (cost = 10):  37.360000   0.020000  37.380000 ( 37.558943)
# BCrypt (cost = 4):    0.680000   0.000000   0.680000 (  0.677460)
# Sha512:               0.000000   0.000000   0.000000 (  0.000672)
# Sha1:                 0.000000   0.000000   0.000000 (  0.000454)
```

As the result shows, the cost 10 bcrypt runs very slow.

Bcrypt gem's default cost is 12 as explained at
[https://github.com/bcrypt-ruby/bcrypt-ruby](https://github.com/bcrypt-ruby/bcrypt-ruby).
So, by default, bcrypt-ruby runs much slower.

### It's salted

Another goodness of bcrypt is, it is salted.
The salt is a some length of random characters used by hashing functions.
As for bcrypt, the salt is randomly generated 16 byte value, which will be 22 characters after base 64 encoded.
Using salt, bcrypt generate a hash (or checksum) from `salt + password`.
This makes hashed strings really unique and almost impossible to find passwords. 

When the hashing is done, the generated string will have a format blow:

```
$2<a/b/x/y>$[cost]$[22 character salt][31 character hash]

$2a$12$K0ByB.6YI2/OYrB4fQOYLe6Tv0datUVf6VZ/2Jzwm879BW5K1cHey
\__/\/ \____________________/\_____________________________/
Alg Cost      Salt                  Hash (Checksum)
```

Since every password has a different salt, bcrypt makes guessing the passwords really hard.


### Devise and bcrypt gem

Bcrypt-ruby gem or simply bcrypt gem is a widely used hashing function in the Rails ecosystem.
For example, famous devise gem uses bcrypt as a default hashing algorithm.

Let's try what are going on by getting hands dirty.

#### Create a sample Rails app

As always, the first command is `rails new`. This can be very simple app, so --minimal option is added.
Also, `-d postgresql` option is added to see what are actually in the database.
Once the app is created, setup the database, install devise gem, and finally create a devise User model.

```bash
$ bundle exec rails new devise-sample --minimal -d postgresql
$ rake db:setup
$ bundle add devise
$ bundle exec rails g devise:install
$ bundle exec rails g devise User
$ bundle exec rails db:migrate
```

At this point, sign up, sign in, sign out and some more password related paths are already created.

```bash
$ bundle exec rails routes
                  Prefix Verb   URI Pattern                    Controller#Action
        new_user_session GET    /users/sign_in(.:format)       devise/sessions#new
            user_session POST   /users/sign_in(.:format)       devise/sessions#create
    destroy_user_session DELETE /users/sign_out(.:format)      devise/sessions#destroy
       new_user_password GET    /users/password/new(.:format)  devise/passwords#new
      edit_user_password GET    /users/password/edit(.:format) devise/passwords#edit
           user_password PATCH  /users/password(.:format)      devise/passwords#update
                         PUT    /users/password(.:format)      devise/passwords#update
                         POST   /users/password(.:format)      devise/passwords#create
cancel_user_registration GET    /users/cancel(.:format)        devise/registrations#cancel
   new_user_registration GET    /users/sign_up(.:format)       devise/registrations#new
  edit_user_registration GET    /users/edit(.:format)          devise/registrations#edit
       user_registration PATCH  /users(.:format)               devise/registrations#update
                         PUT    /users(.:format)               devise/registrations#update
                         DELETE /users(.:format)               devise/registrations#destroy
                         POST   /users(.:format)               devise/registrations#create
      rails_health_check GET    /up(.:format)                  rails/health#show
```

For a convenience, let's create a simple page which has buttons of sign up/in/out.

```bash
$ bundle exec rails g controller home index
```

Add below to `app/views/home/index.html.erb`.

```ruby
<% if notice %>
  <p class="alert alert-success"><%= notice %></p>
<% end %>
<% if alert %>
  <p class="alert alert-danger"><%= alert %></p>
<% end %>

<%= button_to(
        "Sign Up",
        new_user_registration_path,
        method: :get
      ) %>
<br/>
<%= button_to(
        "Sign In",
        new_user_session_path,
        method: :get
      ) %>
<br/>
<%= button_to(
        "Log Out",
        destroy_user_session_path,
        method: :delete
      ) %>
```

Update `config/routes.rb` as in blow:

```ruby
Rails.application.routes.draw do
  root 'home#index'
  #...
  # ...
end
```

All are ready. It's time to start a Rails server and create users.

```bash
$ bundle exec rails s
```

If the server starts, go to http://localhost:3000 on a browser.

<img width="500px" src="/assets/img/devise-sample-buttons.jpeg" alt="img: devise sample buttons">

Sign up the first user with:
- email: foo@example.com
- password: Foo'sPassw0rd!

<img width="500px" src="/assets/img/devise-sample-foo-signup.jpeg" alt="img: devise sample sign up foo">

Click the "Log Out" button and sign up the second user with exactly the same password as the first user:

- email: bar@example.com
- password: Foo'sPassw0rd!

<img width="500px" src="/assets/img/devise-sample-bar-signup.jpeg" alt="img: devise sample sign up bar">


#### What have been created

Now we had two devise users successfully signed up. Two users can be verified on a Rails console, but let's see
what are in PostgreSQL first.

```bash
# In this case, PostgreSQL was installed by brew on MacOS.
# On other OS, installation, or setup, psql command may start with different arguments. 
$ psql postgres
postgres=# \c devise_sample_development
devise_sample_development=# select * from users;

 id |      email      |                      encrypted_password                      | reset_password_token |...
----+-----------------+--------------------------------------------------------------+----------------------+...
  2 | foo@example.com | $2a$12$biaK7edYPkOMEKUFjt9rCucUrine6wP.La20blTv7.bvpxtPv/dYi |                      |...
  3 | bar@example.com | $2a$12$.e3uUveScoJJmjBg9FNozeU9G.knZVODPmmk6xCVU0Amwmk4Pg316 |                      |...
(2 rows)
```

The encrypted_password column has hashed values generated by bcrypt.
Although two users used the exactly the same password, salt strings (22 characters after "12$") are different.
As a result, hash values (last 31 characters) are different.

Open up the Rails console and test some bcrypt APIs.

```bash
$ bundle exec rails c
```

```ruby
# get bcrypt generated hash values
irb(main):001> hashes = User.all.map {|u| u.encrypted_password }
  User Load (0.9ms)  SELECT "users".* FROM "users"
=>
["$2a$12$biaK7edYPkOMEKUFjt9rCucUrine6wP.La20blTv7.bvpxtPv/dYi",
...
irb(main):002> hashes
=>
["$2a$12$biaK7edYPkOMEKUFjt9rCucUrine6wP.La20blTv7.bvpxtPv/dYi",
 "$2a$12$.e3uUveScoJJmjBg9FNozeU9G.knZVODPmmk6xCVU0Amwmk4Pg316"]

# try some bcrypt APIs
irb(main):004> require 'bcrypt'
=> true
irb(main):005> foo = BCrypt::Password.new(hashes[0])
=> "$2a$12$biaK7edYPkOMEKUFjt9rCucUrine6wP.La20blTv7.bvpxtPv/dYi"

# yes! the password test passes 
irb(main):006> foo == "Foo'sPassw0rd!"
=> true

# the second user's password test passes as well
irb(main):010> BCrypt::Password.new(hashes[1]) == "Foo'sPassw0rd!"
=> true

# get parameters from a generated hash value
# bcrypt version
irb(main):011> foo.version
=> "2a"
# cost 
irb(main):012> foo.cost
=> 12
# salt -- bcrypt gem's salt method returns "version + cost + salt"
irb(main):013> foo.salt
=> "$2a$12$biaK7edYPkOMEKUFjt9rCu"
# checksum or hash of 31 characters
irb(main):014> foo.checksum
=> "cUrine6wP.La20blTv7.bvpxtPv/dYi"
irb(main):015> foo.checksum.length
=> 31
```

As in above, we can manually test the password's validity.

### What can be prevented by password hashing?

At this point, we know what is bcrypt (bcrypt gem) and how to use it.
Bcrypt is there to secure a password storage.
The question is from what the password storage will be secured.

In this world, two major password storage attacks are there: brute force and rainbow table attack.
The brute force attack takes trial and error approach guessing every possible password string.
Nothing can prevent the brute force attack 100%.
However, because of the bcrypt's slow computing process, the attack can be detected in the early stage.
That way, a damage can be possibly minimized.

Considering the slow computing process, evil hackers invented rainbow table attack.
The table has already generated hashing values using really many combinations of salt and possible password string.
The rainbow attack can bypass the slow bcrypt computation time.
Bcrypt is strong enough to be cracked, but there's no guarantee to make it 100% secure.
A good news is, the rainbow table attack happens when the password storage is compromised.

As a Rails developer, what we can do would be to put an additional layer of password security.
Two factor authentication or CAPTCHA might be good options.

Other than that, Rails devs might just pray for administrators or DevOps people's relentless work
to save the password storage.



### References

- Argon2: [https://en.wikipedia.org/wiki/Argon2](https://en.wikipedia.org/wiki/Argon2)
- scrypt: [https://en.wikipedia.org/wiki/Scrypt](https://en.wikipedia.org/wiki/Scrypt)
- bcrypt: [https://en.wikipedia.org/wiki/Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)
- PBKDF2: [https://en.wikipedia.org/wiki/PBKDF2](https://en.wikipedia.org/wiki/PBKDF2)
- authlogic: [https://github.com/binarylogic/authlogic](https://github.com/binarylogic/authlogic)
- bcrypt-ruby: [https://github.com/bcrypt-ruby/bcrypt-ruby](https://github.com/bcrypt-ruby/bcrypt-ruby)
- OWASP Password Storage Cheat Sheet: [https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- What is bcrypt and how does it work?: [https://nordvpn.com/blog/what-is-bcrypt/](https://nordvpn.com/blog/what-is-bcrypt/)
- What is brute force attack?: [https://nordvpn.com/blog/brute-force-attack/](https://nordvpn.com/blog/brute-force-attack/)


