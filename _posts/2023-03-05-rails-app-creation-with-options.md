---
layout: post
title: Rails App Creation with Options
hero_height: is-small
date: 2023-03-05 15:50 +0900
---
The easiest way to create a Ruby on Rails app is absolutely to hit the command:

```bash
rails new [APP_NAME]
```

Above generates files to develop an entry level app to high end complicated app.
It's pretty handy.

However, that one-size-fits-all like command does too much often.
Basically, Ruby on Rails is a gorgeous web framework which provides every feature these days' web application needs.
In reality, people might want to create a few pages with a database backend.
Other people might want to create just an API server.
To answer such various needs, Ruby on Rails has a lot of options to create an app --- really a lot!

We can see all options by hitting the command below outside of a rails app directory.

```bash
rails -h
# or 
rails --help
```

You'll see a bunch of options showing up with descriptions.
The problem is, those descriptions are not always clear enough.
Besides, options change as Ruby on Rails version goes up.

To start using Rails 7, I did some googling to figure out what all those options are about.
This is a memo what I learned from my research.


### List of options

Here's an excerpt of `rails new` options of Ruby on Rails 7.
The list doesn't have all.
I focused on something not clear enough.
The description column is what `rails --help` command prints out.
The additional info columns is what I added with my understanding.


| option                           | short | description                                                                                                                       | additional info                                                                                                              |
|----------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| --skip-namespace                 |       | Skip namespace (affects only isolated engines)                                                                                    | When a rails engine is created by rails new plugin command, the option has a meaning.                                        |
| --skip-collision-check           |       | Skip collision check                                                                                                              | When rails generate command modifies existing controller/model/view, the option has a meaning.                               |
| --skip-git                       | -G    | Skip .gitignore file                                                                                                              | The option skips creating .git, .gitignore and .gitattributes files.                                                         |
| --skip-keeps                     |       | Skip source control .keep files                                                                                                   | The .keep file is for git to track empty directories. The option skips creating .keep file.                                  |
| --skip-action-mailer             | -M    | Skip Action Mailer files                                                                                                          | The Action Mailer is used to send email from Rails app. The option skips the feature.                                        |
| --skip-action-mailbox            |       | Skip Action Mailbox gem                                                                                                           | The Action Mailbox routes incoming email to a controller. The option skips the feature.                                      |
| --skip-action-text               |       | Skip Action Text gem                                                                                                              | The Action Text handles a rich text content. The option skips the feature.                                                   |
| --skip-active-record             | -O    | Skip Active Record files                                                                                                          | The Active Record provides models to interact with applications' database                                                    |
| --skip-active-job                |       | Skip Active Job                                                                                                                   | The Active Job is a framework for a background job. The option skips the feature.                                            |
| --skip-active-storage            |       | Skip Active Storage files                                                                                                         | The Active Storage provides a feature to upload files to cloud storages such as AWS S3.                                      |
| --skip-action-cable              | -C    | Skip Action Cable files                                                                                                           | The Action Cable integrates the websockets. The option skips the feature.                                                    |
| --skip-asset-pipeline            | -A    | Indicates when to generate skip asset pipeline                                                                                    | The asset pipeline concatenates and minifies Javascript and CSS and is provided by sprockets. The option skips the feature.  |
| --skip-javascript                | -J    | Skip JavaScript files                                                                                                             | The option skips creating app/javascript directory. It's useful when front-end app is separated from Rails.                  |
| --skip-hotwire                   |       | Skip Hotwire integration                                                                                                          | Hotwire is a default front-end framework for Rails and is a combination of Stimulus and Turbo. The option skips the feature. |
| --skip-jbuilder                  |       | Skip jbuilder gem                                                                                                                 | Jbuilder is a JSON builder and provides a DSL to declare JSON structures.                                                    |
| --skip-test                      | -T    | Skip test files                                                                                                                   | The option skips to generate unit test files. When RSpec will be used, specify this option.                                  |
| --skip-system-test               |       | Skip system test files                                                                                                            | The option skips to generate system test files which allow to test JavaScript functionalities.                               |
| --skip-bootsnap                  |       | Skip bootsnap gem                                                                                                                 | The option skips bootsnap which optimizes and caches expensive computations for Ruby and Active Support.                     |
| --skip-bundle                    | -B    | Don't run bundle install                                                                                                          | The option skips to run bundle install when the Rails app is created.                                                        |
| --template=TEMPLATE              | -m    | Path to some application template (can be a filesystem path or URL)                                                               | The TEMPLATE file configures gems to integrate in Rails' Gemfile.                                                            |
| --rc=RC                          |       | Path to file containing extra configuration options for rails command                                                             | The RC file is ~/.railsrc which has a list of options to run rails new command.                                              |
| --javascript=JAVASCRIPT          | -j    | Choose JavaScript approach [options: importmap (default), webpack, esbuild, rollup]                                               | The option specifies how to handle and bundle JavaScript files.                                                              |
| --css=CSS                        | -c    | Choose CSS processor [options: tailwind, bootstrap, bulma, postcss, sass. check https://github.com/rails/cssbundling-rails        | The option specifies a CSS framework.                                                                                        |
| --asset-pipeline=ASSET_PIPELINE  | -a    | Choose your asset pipeline [options: sprockets (default), propshaft]                                                              | The option specifies an asset pipeline library, legacy Sprockets or newer Propshaft.                                         |
| --database=DATABASE              | -d    | Preconfigure for selected database (options: mysql/postgresql/sqlite3/oracle/sqlserver/jdbcmysql/jdbcsqlite3/jdbcpostgresql/jdbc) | The option specifies a database. Options start from jdbc are for JRuby.                                                      |
| --api                            |       | Preconfigure smaller stack for API only apps                                                                                      | The option skips to create app/assets and etc directories which won't be used in API only app.                               |
| --minimal                        |       | Preconfigure a minimal rails app                                                                                                  | The option creates a minimal Rails app with active record and a few more features.                                           |


### Front-end Options

Among `rails new` options, front-end related might draw your eyes.
Those are:
- --skip-asset-pipeline
- --skip-javascript
- --skip-hotwire
- --javascript=JAVASCRIPT
- --css=CSS
- --asset-pipeline=ASSET_PIPELINE

One thing I should mention is that the `--webpack` option is not there.
That's because Webpacker has been retired as described in the GitHub repo [https://github.com/rails/webpacker](https://github.com/rails/webpacker).
The feasible replacement of Webpacker would be importmap or esbuild, which can be specified by the `--javascript=JAVASCRIPT` option.
Both importmap and esbuild are for a rick client such as React.
The importmap is specifically for Rails freed from npm or yarn, while esbuild is a tool of JavaScript world.

Another option I should mention is `--skip-hotwire`. To specify this option or not, we should understand what is Hotwire.
Hotwire was introduced in Ruby on Rails 7, and is a default front-end framework.
Not like React, Hotwire is a server-rendered type framework.
Hotwire avoids odds related to a rich client such as bundling, the first loading time, JavaScript framework chaos or other.
Whether you will stick to the JavaScript world to develop front-end code or not, it's your choice.

One more options to look at is `--asset-pipeline=ASSET_PIPELINE`. The asset pipeline got a choice of Propshaft.
Propshaft is a kind of simplified Sprockets and workd with jsbundling-rails ans cssbundling-rails gems.
Its GitHub repo, [https://github.com/rails/propshaft](https://github.com/rails/propshaft), explains details.


### Options for Simplicity

You might think Ruby on Rails is too gorgeous to do just this, so better look at other frameworks.
In such a case, two options might help:
- --api
- --minimal

To develop an API server which doesn't need any front-end stuff, `--api` option works.
When the option is given, `rails new` command strips out many features and creates a much smaller stack with necessities for an API server.

The `--minimal` option is interesting.
When the option is specified, `rails new` command creates a bare minimal web app stack.
It has features of database access, assets access, and just a couple more.


### DRY Options

OKey, we learned `rails new` options, so now, it's time to create a Rails app.
Well, let's specify this option, that option, those options and ...
You might end up with typing long, long line to create the app.
When you hit return key, you might find a typo in one of options.
It might be a case that you repeat creating Rails apps for multiple projects with the same set of options.

Yes, Rails provides DRY, don't repeat yourself, way:
- --rc=RC
- --template=TEMPLATE

The rc file is, like a .bashrc or .zshrc, ~/.railsrc by default.
If the location is not under the home directory and/or has a different file name, use `--rc=RC` option to point it.
The format of rc file is a list of options one in each line. For example,

```
--api
-d postgresql
```

Adding extra gem might repeat in multiple projects, for example, rspec-rails gem.
For a DRY way, `--template=TEMPLATE` option is there.
Create a template file, `template.rb`, in general. The file name can be any, though.
Then, specify the template file using --template option.
The format is similar to Gemfile. For example:

```ruby
gem_group :development, :test do
  gem 'rspec-rails', '~> 6.0', '>= 6.0.1'
end
```

So, now, `.railsrc` file looks like below:

```
--api
-d postgresql
-T
-m /path/to/template.rb
```

Once, all are ready, hit `rails new app_name` command.
The Rails app with the desired configurations will be created.
