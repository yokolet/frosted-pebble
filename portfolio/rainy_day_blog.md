Multi-user, microblogging application by Ruby on Rails and Vue.js.
A user authentication is done by OAuth2 PKCE (Authorization Code Flow with Proof Key for Code Exchange) for Twitter.
The authentication feature was create from scratch to work with Vue.js app.
The back-end provides GraphQL API to read/write blog posts and comments.
The GraphQL implementation is done by GraphQL Ruby for the back-end and Vue Apollo for the front-end.

The application uses PostgreSQL as database, Redis as session storage, RSpec as unit testing,
and Vite Ruby to integrate the front-end.

Along with Vue.js 3, composition API, the front-end uses Vue Router, Pinia, Tailwind CSS and Daisy UI.
