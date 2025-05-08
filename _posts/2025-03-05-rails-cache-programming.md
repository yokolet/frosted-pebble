---
layout: post
title: Ruby on Rails Low Level Cache Programming
featured_image: spring-in-tsugaike.jpg
excerpt_separator: <!--more-->
date: 2025-03-05 22:57 +0900
---
Ruby on Rails is famous for offering really various features which are helpful to create a web application.
Among those, little known API might be the low level caching API.
<!--more-->
Basically, people don't code to manipulate cached values. When the caching is on, Rails caches
view fragments, database query result or some values automatically. As you know the caching is used to
improve performance in general.

However, we can use Rails cache like a key-value store.
The API allows us to read/write values tied to keys, which is called a low level caching.

This blog post focuses on such Rails low level cache programming.


### Configuration

Rails supports multiple types of cache stores. The type should be specified by `config_cache_store` in
`config/environments/[development|test|production].rb` files.

#### types of stores
- Memory Store
  - example: `config.cache_store = :memory_store, { size: 64.megabytes }`
  - In-memory data store which can be used within a single process.
  - Popular type for a development environment.
- File Store
  - example: `config.cache_store = :file_store, "/path/to/cache/directory"`
  - File system data store which can be shared among multiple processes.
- MemCache Store
  - example: `config.cache_store = :mem_cache_store, "cache-1.example.com", "cache-2.example.com"`
  - Data store by memcached server ([https://memcached.org/](https://memcached.org/)).
  - Popular type for a production environment.
- Redis Store
  - example: `config.cache_store = :redis_cache_store, { url: ENV["REDIS_URL"] }`
  - Data store by Redis ([https://redis.io/](https://redis.io/)).
- Solid Cache Store
  - example: see production section of `config/database.yml`
  - Data store by RDBMS which is the same as Rails database.
  - Introduced in Rails 8.
- Null Store
  - example: `config.cache_store = :null_store`
  - Data store whose scope is each web request.

#### Difference between Rails 7 and Rails 8

The production/test environment configurations stay the same on both Rails 7 and 8.
However, the development configuration has changed.
Let's look at the differences. The first one is Rails 7, and the second is Rail 8.

```ruby
# Rails 7 config/environments/development.rb

# Enable/disable caching. By default caching is disabled.
# Run rails dev:cache to toggle caching.
if Rails.root.join("tmp/caching-dev.txt").exist?
  config.cache_store = :memory_store
  config.public_file_server.headers = {
    "Cache-Control" => "public, max-age=#{2.days.to_i}"
  }
else
  config.action_controller.perform_caching = false

  config.cache_store = :null_store
end
```

```ruby
# Rails 8 config/environments/development.rb

# Enable/disable Action Controller caching. By default Action Controller caching is disabled.
# Run rails dev:cache to toggle Action Controller caching.
if Rails.root.join("tmp/caching-dev.txt").exist?
  config.action_controller.perform_caching = true
  config.action_controller.enable_fragment_cache_logging = true
  config.public_file_server.headers = { "cache-control" => "public, max-age=#{2.days.to_i}" }
else
  config.action_controller.perform_caching = false
end

# Change to :null_store to avoid any caching.
config.cache_store = :memory_store
```

On Rails 7, we should hit the command, `bin/rails dev:cache`, to use the cache.
The command creates an empty file, `tmp/caching-dev.txt`, so that `config.cache_store = :memory_store` works.
However, on Rails 8, `config.cache_store = :memory_store` is located on the outside of if-block.
We don't need to use the command, `bin/rails dev:cache` anymore, if we don't need anything in the block.

While using the low-level caching API, setting the cache store is enough.
That being said, the caching API is available out of the box on Rail 8.


### Cache API

#### Keys and Values

Rails cache is a key-value store. A key is, internally, a string always.
However, if a Ruby object can be converted to a string, such object can be a key, for example, a symbol or Array.
API document says, if the object reacts to `to_param` method and returns a value,
the object can be a key. Also, if the object implements `cache_key` method, the object can be a key.

The key-value store's values are any Ruby object if the object is serializable and deserializable.
For example, a string, Array, or Hash can be a value, but Proc object is not.
If it really needs, we can define own serializer and set to the Rails cache.

#### Basic Methods

Supported methods on all types of stores are `fetch`, `write`, `read`, `exist?` and `delete`.
The cache API has more methods such as `increment` or `cleanup`, but depending on the store types,
some methods may not be supported.

##### fetch
The `fetch` would be the most frequently used method. It covers both read and write.
The fetch method considers a cache miss, so it takes a block to return a value for the cache miss.
When the value from the block is returned, the value is saved as well.
However, the method doesn't simply update the value. To make the fetch method to update the value
even though it hits the cached value, the method takes `force` option.

```bash
$ bin/rails c
example(dev)> Rails.cache
=> #<ActiveSupport::Cache::MemoryStore entries=0, size=0, options={compress: false, compress_threshold: 1024}>
example(dev)> Rails.cache.fetch(:my_value)
=> nil
example(dev)> Rails.cache.fetch(:my_value) { "Ruby" }
=> "Ruby"
example(dev)> Rails.cache.fetch(:my_value)
=> "Ruby"
example(dev)> Rails.cache.fetch(:my_value) { "JavaScript" }
=> "Ruby"
example(dev)> Rails.cache.fetch(:my_value, force: true) { "JavaScript" }
=> "JavaScript"
example(dev)> Rails.cache.fetch(:my_value)
=> "JavaScript"
```

The fetch method takes an expiry option to remove a value from cache automatically.

```bash
example(dev)> Rails.cache.fetch(:my_value, force: true, expires_in: 5.seconds) { "Bash" }
=> "Bash"
example(dev)> Rails.cache.fetch(:my_value)
=> "Bash"
# after 5 seconds
example(dev)> Rails.cache.fetch(:my_value)
=> nil
```

Aside of `expires_in`, `expires_at` is also available.
This is a handy feature when we want to save the value just temporarily.

##### write

The `write` method works the same as `Rails.cache.fetch(:my_value, force: true) { "JavaScript" }`.

```bash
example(dev)> Rails.cache.write(:your_value, "YAML")
=> true
example(dev)> Rails.cache.fetch(:your_value)
=> "YAML"
```

The method takes `expires_in`, `expires_at` options.

##### read

The `read` method works the same as `fetch` without block. The method just looks up a value by key.

```bash
example(dev)> Rails.cache.write(:her_value, "SQL")
=> true
example(dev)> Rails.cache.read(:her_value)
=> "SQL"
```

##### exist?

The `exist?` method is useful to find that the value is nil or key doesn't exist.
Rails cache allows to save nil as a value.
When the fetch or read method returns nil, we don't know it is a value or not.

```bash
example(dev)> Rails.cache.fetch(:his_value, force: true, expires_in: 10.seconds) { nil }
=> nil
example(dev)> Rails.cache.read(:his_value)
=> nil
example(dev)> Rails.cache.exist?(:his_value)
=> true
# after 10 seconds
example(dev)> Rails.cache.exist?(:his_value)
=> false
```

##### delete

The `delete` method deletes a key-value pair from the cache.

```bash
example(dev)> Rails.cache.write(:their_value, "JSON")
=> true
example(dev)> Rails.cache.read(:their_value)
=> "JSON"
example(dev)> Rails.cache.delete(:their_value)
=> true
example(dev)> Rails.cache.read(:their_value)
=> nil
example(dev)> Rails.cache.exist?(:their_value)
=> false
```


### Low Level Cache Programming for What

So far, we have looked at the low level cache API. Well, the question would be, "what is it for?"
To save and read values, we can use database or ActiveRecord. The value saved in the database can be used
in almost everywhere. So, why or when we should use the low level cache programming?

I have used the low level cache API in a couple of applications.
It is good to save a short-lived small data.
The Rails cache is a simple key-value store. To save the value, we don't create a migration.
Without explicit deleting, the values expire and disappear.

The sessions might be another option for a key-value store.
However, the sessions are not a mighty store.
For example, WebSocket or ActionCable is unable to use the sessions.
Another example would be a controller method used as a callback function of OAuth, payment gateway or such.
The sessions are established between Rails server and a web browser.
When the controller method gets hit by somewhere else, the sessions don't work nicely.

Typical Rails applications can do without the low level cache programming.
However, it is very useful in some cases.


### References
- [Mastering Low Level Caching in Rails](https://www.honeybadger.io/blog/rails-low-level-caching/)
- [Ruby on Rails Guides: Caching: 2.4 Low-Level Caching using Rails.cache](https://guides.rubyonrails.org/caching_with_rails.html#low-level-caching-using-rails-cache)
- [Ruby on Rail API: Active Support Cache Store](https://api.rubyonrails.org/classes/ActiveSupport/Cache/Store.html)
