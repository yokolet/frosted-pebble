---
layout: post
title: Vite + Vue + Bun on Rails
hero_height: is-small
date: 2024-03-05 21:18 +0900
---
[Vue.js](https://vuejs.org/) is one of frontend frameworks gaining popularity among rapidly emerging JavaScript technologies.
The combination of Vue.js and Rails is becoming more popular as well,
however, Vue.js development on Rails is not so straightforward.
The reason would be that Vue.js relies on [Vite](https://vitejs.dev/) for a development environment
such as HMR (Hot Module Replacement) and bundling.

Since Rails 7, some JavaScript approaches have been supported.
As of version 7.1.3.2, importmap (default), bun, webpack, esbuild and rollup are the choices.
Vite is a replacement of such JavaScript approaches, but is not listed yet.

Here comes the [vite_rails gem](https://rubygems.org/gems/vite_rails).
The gem sets up the environment for Vite on Rails.
Vite itself is independent from frontend frameworks.
By adding a plugin, Vite + Vue development environment will be created.

One more addition in this blog post is [Bun](https://bun.sh/).
Bun runs really fast.
Here, Bun is used just a replacement of npm or yarn.
However, Bun is a all-in-one toolkit and covers some features of Vite such as bundling.
For the topic of Bun vs. Vite, the blog post,
[Why use Vite when Bun is also a bundler? - Vite vs. Bun](https://dev.to/this-is-learning/why-use-vite-when-bun-is-also-a-bundler-vite-vs-bun-2723),
explains well.
At this moment, Vite on Bun is an effective combination.

This blog post explains how Vue, Vite and Bun on Rails can be created.
The source code is on the GitHub, [rails-vite-vue](https://github.com/yokolet/rails-vite-vue).

### Prerequisite

This blog is not about a big application,
even though we need tools to be installed before getting started.
Below is a list of what should be installed.

1. Ruby: [Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/)
2. Rails: [Installing Rails](https://guides.rubyonrails.org/v5.0/getting_started.html#installing-rails)
3. Node.js: [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)\
or Download from [https://nodejs.org/en](https://nodejs.org/en)
4. Bun: [https://bun.sh/docs/installation](https://bun.sh/docs/installation)


### Versions

- Ruby 3.2.3
- Rails 7.1.3.2
- Node.js v21.5.0
- Bun 1.0.29

### Create a Rails App Skipping JavaScript

Rails supports importmap (default), bun, webpack, esbuild and rollup as JavaScript approaches.
None of those will be used to transpile, bundle, or etc. to create a frontend by Vue.
Bun will be used, but its role is a replacement of npm or yarn here.
The best option is `--skip-javascript`.
Also, `--minimal` option works if the app can be a simple one.

The command blow creates a Rails app without a JavaScript support.

```bash
$ rails new [APP NAME] --skip-javascript -T
```

### Install Vite

The next step is to install Vite.
Change a directory to the application, then type the command below.

```bash
$ bundle add vite_rails
```

The command above installs vite_rails gem along with a Ruby version of vite command.
The Ruby version of vite command is used to install Vite and JavaScript version of vite command.

Now, it's time to use the Ruby version of vite command. Type below.

```bash
$ bundle exec vite install
```

Above command does a lot.
It installs the vite JavaScript package which includes JavaScript version of vite command.
Also, it installs the vite-plugin-ruby JavaScript package.
During the package installation, npm runs. It looks no option to switch to yarn or bun.

Additionally, it creates files listed below.

- Procfile.dev
- app/frontend/entrypoints/application.js
- bin/vite
- config/initializers/content_security_policy.rb
- config/vite.json
- vite.config.ts


### Switching from npm to bun

Bun runs really fast, so this blog uses bun instead of npm.
Since package-lock.json is no longer needed, delete the npm lock file.

```bash
$ rm package-lock.json
$ bun install
```

Once bun install is completed,  Bun's lock file, `bun.lockb`, will be created.
After this, use bun command to install JavaScript packages.

### Install Vue and Vue Plugin

We need Vue JavaScript package to develop Vue app.
We also need the Vue plugin for Vite.
Vite is a framework independent development tool.
To use Vite for Vue development, Vue plugin should be installed and set up.

```bash
$ bun add vue @vitejs/plugin-vue
```

After the vue and plugin installation, edit `vite.config.ts` to set up Vue plugin.

```typescript
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue' // added

export default defineConfig({
  plugins: [
    RubyPlugin(),
    vue(),  // added
  ],
})
```

### Set up Starter Command

When the app was created, we skipped the JavaScript approaches.
Because of that, the app doesn't have a handy command such as `bin/dev`.
The vite_rails gem created `Profile,dev` configuration for a foreman.
This works, but, still, we need to type `foreman start -f Procfile.dev` to start the development server.
It's better to have the command, `bin/dev`.

##### package.json

Add the scripts section in package.json.

```json
{
  "scripts": {
    "dev": "bunx --bun vite",
    "build": "bunx --bun vite build"
  },
  "devDependencies": {
    "vite": "^5.1.4",
    "vite-plugin-ruby": "^5.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vue": "^3.4.21"
  }
}
```

The [bunx command](https://bun.sh/docs/cli/bunx) should be installed when Bun was installed.
The bunx is a counterpart of npx.

##### Procfile.dev

Update the file as in below.

```bash
web: env RUBY_DEBUG_OPEN=true bin/rails server
js: bun run dev
```

This setting is to start two servers -- one for Rails and another for a frontend.

##### bin/dev

Create a new file `bin/dev` with the contents below.

```bash
#!/usr/bin/env sh

if gem list --no-installed --exact --silent foreman; then
  echo "Installing foreman..."
  gem install foreman
fi

# Default to port 3000 if not specified
export PORT="${PORT:-3000}"

exec foreman start -f Procfile.dev "$@"
```

Then, change the file permission to executable.
For example, `chmod 755 bin/dev`.

For now, we can start the two development servers by just typing `bin/dev`.


### Create a Vue App Mount Point

Since it is a Rails app, a controller is responsible to receive HTTP requests.

```bash
$ rails g controller pages index
```

Edit `app/views/pages/index.html.erb` to add the mount point.

```erbruby
<%= content_tag(:div, "", id:"app") %>
```

Edit `config/routes.rb` so that the Vue app can be seen at a root path.

```ruby
Rails.application.routes.draw do
  root 'pages#index'  # updated for a Vue app
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
```

### Create a Vue App

To make an app creation simple, the Vue app used here is the one create by `bun create vite` command.
During the app creation, Vue and JavaScript was selected as a framework and language.

When vite_rails gem is used, an entrypoint file is `app/frontend/entrypoints/application.js`.
The file is equivalent to `main.js` of the Vue sample app.
Replace whole content of application.js (Rails) by main.js (Vite + Vue)
or add entire main.js (Vite + Vue) to application.js (Rails).

Six files of Vite + Vue app below:

```bash
$ tree src public
src
├── App.vue
├── assets
│   └── vue.svg
├── components
│   └── HelloWorld.vue
├── main.js
└── style.css
public
└── vite.svg

4 directories, 6 files
```

should be mapped to below on Rails:

```bash
$ tree app/frontend
app/frontend
├── App.vue
├── assets
│   └── vue.svg
├── components
│   └── HelloWorld.vue
├── entrypoints
│   ├── application.js
│   └── style.css
└── vite.svg

4 directories, 6 files
```

How to organize directories/files under app/frontend looks not standardized yet.
The vite_rails gem watches all files under app/frontend and reload if necessary.
Above directory structure is just an example.

### Start the App and Verify HMR

Start the servers by:

```bash
$ bin/dev
```

Open http://localhost:3000/ on a browser.
The webpage below should show up.

<img width="500px" src="/assets/img/vite_vue_rails.jpeg" alt="img: vite + vue on rails">

Try editing `app/frontend/App.vue` and `app/frontend/components/HelloWorld.vue` and
verify HMR (Hot Module Replacement) is working.


### References
- Vite Ruby: [https://vite-ruby.netlify.app/](https://vite-ruby.netlify.app/)
- Vue.js Guide: [https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)
- Build a frontend using Vite and Bun: [https://bun.sh/guides/ecosystem/vite](https://bun.sh/guides/ecosystem/vite)
- [Why use Vite when Bun is also a bundler? - Vite vs. Bun](https://dev.to/this-is-learning/why-use-vite-when-bun-is-also-a-bundler-vite-vs-bun-2723)
- [Ruby-on-Rails and VueJS tutorial](https://bootrails.com/blog/ruby-on-rails-and-vuejs-tutorial/)
- [Create Rails-7 app with Vite](https://dev.to/chmich/setup-vite-on-rails-7-f1i)
- [Integrating Bun with Vite Ruby for Lightning-Fast Frontend Builds](https://dev.to/jetthoughts/integrating-bun-with-vite-ruby-for-lightning-fast-frontend-builds-1fh2)
- [Building a Rails App with a Vue.js Frontend](https://clouddevs.com/ruby-on-rails/building-app-with-vuejs-frontend/)
- [Vue on Rails](https://medium.com/@oscarreciogonzalez/vue-on-rails-15686b85b1d3)
- [Rails 7 + Vite + Vue 3 + Pinia starter pack](https://guillaume.barillot.me/2022/05/05/rails-vite-vue-3-pina-starter-pack/)
- Source code: [https://github.com/yokolet/rails-vite-vue](https://github.com/yokolet/rails-vite-vue)
