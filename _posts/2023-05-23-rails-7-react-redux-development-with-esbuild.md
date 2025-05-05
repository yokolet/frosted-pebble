---
layout: post
title: Rails 7 React/Redux Development with esbuild
hero_height: is-small
date: 2023-05-23 21:47 +0900
---
Rails 7 provides a couple of approaches to bundle a rich JavaScript application such as SPA.
To create the JavaScript application, we should specify `j|--javascript` option with
importmap (default), webpack, esbuild or rollup when `rails new` command gets run.
Although webpack is still among the choices, it has been retired as describe in the
[https://github.com/rails/webpacker/blob/master/README.md](https://github.com/rails/webpacker/blob/master/README.md).
The choice here is [esbuild](https://esbuild.github.io/) since it is friendly to JavaScript development,
for example, starting from `yarn create react-app ...`.
The esbuild is gaining popularity and known to run very fast with its Go-lang implementation.

This blog post creates React/Redux application on top of Rails 7.
The application is a sample counter app which comes from what `yarn create react-app [app name] --template redux-typescript`
command creates.

### Create a Rails App with esbuild Option

The command to create an app is something like:

```bash
% rails new [APP NAME] -j esbuild -T
```

The `-j esbuild` option installs frontend development packages/tools.
Additionally, the command, `./bin/rails javascript:install:esbuild`, gets run during the app creation.
The package.json, Procfile.dev and couple other files for JavaScript development are also created.


### Create an Entry Point for ReactJS App

The next step is to create and entry point for ReactJS app.
All incoming HTTP requests are received by controllers on Rails.
Following such Rails style, the entry point to ReactJS app is also a controller.
However, instead of `rails g controller ...`, stimulus generator is used for this.
The generated controller is a JavaScript class, which is a subclass of stimulus Controller.

```bash
% rails g stimulus react
```

Above generates `app/javascript/controllers/react_controller.js` and updates `app/javascript/controllers/index.js`.
The generated controller class is equivalent to ReactJS app's index.tsx(jsx).
What we write in index.tsx should go to a connect method in the generated controller class.

### Create a View to Mount ReactJS App

If the ReactJS app is created by `yarn create react-app ...` or npm, npx command,
the app has a mount point in `public/index.html`, something like: `<div id="root"></div>`.
It is Rails, so we should create a controller.

```bash
% rails g controller pages home
```

Above creates a couple of files as we know.
Edit `app/views/pages/home.html.erb` and add the mount point.

```erbruby
<%# app/views/pages/home.html.erb %>

<h1>Pages#home</h1>
<p>Find me in app/views/pages/home.html.erb</p>
<%= content_tag(:div, "", id:"root", data:{ controller: "react" }) %>
```

Also, edit `config/routes.rb` to add a path to pages#home.

```ruby
# config/routes.rb

Rails.application.routes.draw do
  root 'pages#home'
end
```

### Setup Basic React TypeScript App

At this moment, the Rails side is ready.
However, the JavaScript side has a package.json file only, which is like right after `yarn --init` ran.
Since it is a React TypeScript app, install basic packages.

```bash
% yarn add react react-dom @types/react @types/react-dom typescript
```

Also, TypeScript initialization should be done.

```bash
% tsc --init --project tsconfig.json --noEmit --jsx react-jsx
```

### Redux Toolkit Counter Example

When the redux-typescript template is used to create a ReactJS App, the counter example comes with it.
For examples, `yarn create react-app my-app --template redux-typescript` command creates files below
(excludes node_modules directory):
```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── app
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── features
│   │   └── counter
│   │       ├── Counter.module.css
│   │       ├── Counter.tsx
│   │       ├── counterAPI.ts
│   │       ├── counterSlice.spec.ts
│   │       └── counterSlice.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tsconfig.json
└── yarn.lock
```

We want files under src directory.
How to map those files under `app/javascript` might be controversy.
Some might create a components directory.
However, as for Redux Toolkit, features and/or app directories are more common.

The app here is created by copying files under `src` to `app/javascript` almost as those are.

```bash
app/javascript
├── App.tsx
├── app
│   ├── hooks.ts
│   └── store.ts
├── application.js
├── controllers
│   ├── application.js
│   ├── hello_controller.js
│   ├── index.js
│   └── react_controller.js
├── features
│   └── counter
│       ├── Counter.module.css
│       ├── Counter.tsx
│       ├── counterAPI.ts
│       ├── counterSlice.spec.ts
│       └── counterSlice.ts
└── logo.svg
```

Handling of .css files will be mentioned later since that needs a bit of fix.

To run the counter app, Redux Toolkit and react binding packages should be installed.
```bash
% yarn add @reduxjs/toolkit react-redux
```

### Update react_controller.js

Previously mentioned, `app/javascript/controllers/react_controller.js` is equivalent to ReactJS app's index.tsx.

The file looks like below to run the counter app.

```tsx
// app/javascript/controllers/react_controller.js

import { Controller } from "@hotwired/stimulus"
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import App from '../App';
import { store } from '../app/store';

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }
}
```

### Update package.json scripts section

When the Rails app is created, package.json's scripts section looks like below.

```
"scripts": {
  "build": "esbuild app/javascript/*.* --bundle --sourcemap --outdir=app/assets/builds --public-path=assets"
}
```

As in the above directory tree, the counter app has .tsx and .svg files under app/javascript.
So that esbuild can load those, two loaders should be added to the esbuild option.

Additionally, the script section should have TypeScript check.

After the update, the script section looks like below:
```
"scripts": {
  "build": "esbuild app/javascript/*.* --bundle --sourcemap --outdir=app/assets/builds --public-path=assets --loader:.js=jsx --loader:.svg=file",
  "check-types": "tsc --project tsconfig.json --noEmit --watch --preserveWatchOutput"
}
```

### Avoid Sprockets::DoubleLinkError application.css Error

If esbuild is used in a Rails app, .css files need extra caution.
We might end up in having two application.css files generated by esbuild and originally created by `rails new` command.
If that happens, the conflict raises the Sprockets::DoubleLinkError application.css error.

When a .tsx(.jsx) file imports CSS, esbuild generates app/assets/builds/application.css.
Whereas we have app/assets/stylesheets/application.css generated by rails new command.
These two application.css files have the same name but different contents.

A couple to few ways would be there to avoid the error.
Probably, below two are easy ones.

1. Never ever import css files in .tsx(.jsx).
   Instead, write all styles in `app/assets/stylesheets/application.css` or take a traditional Rails way.
2. Rename `app/assets/stylesheets/application.css`.

The app here mainly took the second approach, but partially the first approach.
The `app/assets/stylesheets/application.css` was renamed to `app/assets/stylesheets/application-rails.css`.
The `app/views/layouts/application.html.erb` file got one more stylesheet_link_tag shown below:

```erbruby
<!DOCTYPE html>
<html>
  <head>
    <title>React/Redux App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= favicon_link_tag 'favicon.ico' %>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= stylesheet_link_tag "application-rails", "data-turbo-track": "reload" %>
    <%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

All styles in `index.css` and `App.css` are moved to `app/assets/stylesheets/application-rails.css`.
The css import was removed from `App.tsx` and `app/javascript/controllers/react_controller.js`.
However, `app/javascript/features/counter/Counter.module.css` is there, which is imported in
`app/javascript/features/counter/Counter.tsx`.


### Use bin/dev, not rails s

To run the Rails app, use `bin/dev`.
As defined in `Procfile.dev`, we need Rails server and esbuild with watch option.
The `bin/dev` command does that.
If everything goes well, the counter app below shows up at http://localhost:3000/ .

<img src="/assets/img/react-redux-counter-app.jpeg" alt="img: react redux counter app">


### Code

The example Rails app code is on the GitHub repo.
Please see [https://github.com/yokolet/rails7-typescript-redux-counter-example](https://github.com/yokolet/rails7-typescript-redux-counter-example)
