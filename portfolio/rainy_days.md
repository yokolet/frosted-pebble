Multi-user, microblogging application by Ruby on Rails and Vue.js, revised version of Rainy Day Blog.
A user authentication is done by OAuth2 Authorization Code Flow or PKCE(Proof Key for Code Exchange) for Google and
GitLab, OAuth2 for GitHub. The authentication feature was created from scratch to work smoothly with the front-end by Vue.js.
The back-end provides GraphQL API to read/write posts and comments. For this feature, the back-end uses GraphQL Ruby,
while the front-end uses Vue Apollo. The application allows nested comments.

The back-end is Rails 8 with PostgreSQL database, RSpec for unit testing, and Vite Ruby for Vue.js integration.
The front-end uses Tailwind CSS, and is designed to be responsive. Also, it provides a feature to toggle light/dark mode.
The front-end framework is Vue.js 3, Composition API. Its logic is written by TypeScript.
With Vue.js, the application uses Vue Router, Pinia, Vite and Bun.

The repository has GitLab CI/CD configuration which creates a Docker image after successful testing.
When the updates code is pushed or merged to the main branch, the application is deployed to Render.
