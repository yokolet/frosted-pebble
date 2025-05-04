---
layout: post
title: Bun + React on Rails
hero_height: is-small
date: 2024-03-01 15:31 +0900
---
In the frontend world, new technologies keep emerging rapidly these years.
Still, React is a well-established and very popular frontend framework,
Vue.js, Svelte, Astro and more frameworks are gaining popularity.
Not just the frameworks, tools for a transpiler/bundler or sort are also under a rapid development.
In JavaScript domain, esbuild, rollup, vite and some more are out.

Relatively new addition is Bun ([https://bun.sh/](https://bun.sh/)).

Bun has multiple features.
It can be used as a package manager, development server, bundler and test runner.
On the website, it says an all-in-one toolkit for JavaScript.
The best advantage of using Bun would be its speed.
Indeed, Bun runs very fast.

Rails supports Bun since version 7.1 as one of JavaScript approaches.
This blog post is about the attempt to create a React app using Bun.

#### Prerequisite

Prior to the Rails application creation, `bun` command should be installed.
The installation instruction is on the Bun website, [https://bun.sh/docs/installation](https://bun.sh/docs/installation).
The website shows 5 ways to install bun if you have macOS and Linux.
Among those, by curl command, Homebrew and npm would be popular.
Choose whatever you like.

- curl
```bash
$ curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL
```
- Homebrew
```bash
$ brew install oven-sh/bun/bun # for macOS and Linux
```
- npm
```bash
$ npm install -g bun # the last `npm` command you'll ever need
```

The Bun website also has an instruction for Windows.

#### Versions
- Ruby 3.2.3
- Rails 7.1.3.2

### Create a Rails App with bun Option

The command to create an app which uses bun is something like this:

```bash
% rails new [APP NAME] -j bun -T
```

Above command installs all including `bun install`.
After the installation finishes, change the directory to application and just type `bin/dev`.
The Rails should start up.
Verify that by visiting http://localhost:3000/ on a browser.

In early releases of Rail 7.1, some odds were reported to start the Rails.
However, on version 7.1.3.2, all those issues look fixed.
None of extra steps are required to start Rails now.

### Files Related to Bun

Let's look at files in the Rails application top directory.
#### bun.lockb
This file is a lock file equivalent to package-lock.json or yarn.lock.
Unlike a legacy lock file, bun.lockb is a binary file.

#### bun.config.js
This is a Bun configuration file which defines how Bun builds the application.
When the Rails generator created the file, a build configuration is defined like this:
```javascript
const config = {
  sourcemap: "external",
  entrypoints: ["app/javascript/application.js"],
  outdir: path.join(process.cwd(), "app/assets/builds"),
};
```

The details of the configuration parameters are explained at [https://bun.sh/docs/bundler#api](https://bun.sh/docs/bundler#api).

For example, to minify output JavaScript files, the configuration will be:
```javascript
const config = {
  sourcemap: "external",
  entrypoints: ["app/javascript/application.js"],
  outdir: path.join(process.cwd(), "app/assets/builds"),
  minify: true,
};
```
We see more than ten configuration APIs on the web page.
However, not many options work seamlessly with Rails.
Suppose the naming setting is changed to `naming: '[dir]/[name]-[hash].[ext]'`
(default for the entry is '[dir]/[name].[ext]'),
the generated JavaScript file will be something like `application-6da4a92fc66938e4.js`.
It looks good at a glance.
However, javascript_include_tag in app/views/layouts/application.html.erb should be changed like
`<%= javascript_include_tag "application-6da4a92fc66938e4", "data-turbo-track": "reload", type: "module" %>`.
When the JavaScript file is updated, the hash value will be updated as well.
As a result, the outdir will have multiple `application-[hash].js` files.
Also, javascript_include_tag's filename should be updated accordingly.
Moreover, Rails adds a hash value when the JavaScript file is provided.
It is something like, `application-921e7020b343a6ac4bfb2c1d2302254e1f5ea0fda39e8ee8c38aa17e00d8e0e2.js`.

Although Bun configuration API has many options, only few are useful on Rails.

#### Procfile.dev

The file is a server setting passed to Foreman.
When the Rails application is created with `-j bun` option, the file looks like below:
```bash
web: env RUBY_DEBUG_OPEN=true bin/rails server
js: bun run build --watch
```

Bun's `--watch` options is explained at Watch mode ([https://bun.sh/docs/runtime/hot](https://bun.sh/docs/runtime/hot)).
When the option is specified, Bun watches changes in JavaScript files listed in the entrypoints configuration.
If Bun detects a change, Bun restarts the process.

Another option is `--hot`. However, `--hot` option works when Bun is used on the server side.
Besides, as above web page explains, the option is not for a hot loading to the browser.
When the JavaScript code is updated, still we need to click browser's reload button.
The hot loading to the browser will be a job by [Vite](https://vitejs.dev/).

### Create a React App

The first step is to install packages.

```bash
$ bun add react react-dom
```

You might be surprised. Bun runs really fast.

Next step is to write React code.
For a simplicity, the React app used here is the one create-react-app package creates.
The app shows a rotating React logo and a couple other messages.
JavaScript code can be used as those are except image and stylesheet imports.
Since the server side is Rails, it's good and easy to put images and stylesheets in the directories meant to be.
For that reason, the sample app takes idiomatic Rails rather than idiomatic React.

- app/javascript/application.js

The entrypoint file is index.js on a generated React app, while it is application.js on Rails.
Replace the contents of `app/javascript/application.js` by index.js.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- app/javascript/App.js

This is an App component. Other than stylesheet and image imports, the code stays the same as React app.

```javascript
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

- index.css, App.css and logo.svg

Copy two css files under app/assets/stylesheets. No need to edit those.
Also, copy logo.svg under app/assets/images.

The directory structures become look like below.

```
app/javascript
├── App.js
├── application.js
└── controllers
    ├── application.js
    ├── hello_controller.js
    └── index.js

2 directories, 5 files
```

```
app/assets
├── builds
│   ├── application.js
│   └── application.js.map
├── config
│   └── manifest.js
├── images
│   └── logo.svg
└── stylesheets
    ├── App.css
    ├── application.css
    └── index.css

5 directories, 7 files
```

### Create a Mount Point

Since this is a Rails app, a controller is responsible to receive HTTP requests.
To show the React app on a browser, the controller for that should be created along with a view.

```bash
$ rails g controller pages index
```

Above command creates a controller and view, also adds a new route in config/routes.rb

- app/view/pages/index.html.erb

In the app/javascript/application.js, "root" is specified as a mount point.
Add a div tag in the index.html.erb file.

```html
<h1>Pages#index</h1>
<p>Find me in app/views/pages/index.html.erb</p>
<%= content_tag(:div, "", id:"root") %>
```

### Run the app

All are ready. Let's run the app.

```bash
$ bin/dev
```

Then go to http://localhost:3000/pages/index on the browser.
The React app shows up.

<img width="300px" src="/assets/img/rails-bun-react.jpeg" alt="img: bun + react on rails">

### References
- [https://bun.sh/docs](https://bun.sh/docs)
- [How to use Bun with Ruby on Rails](https://webcrunch.com/posts/bun-with-ruby-on-rails)
- Sample code: [https://github.com/yokolet/rails-bun-react](https://github.com/yokolet/rails-bun-react)
