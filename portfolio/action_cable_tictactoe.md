Multi-player, multi-board, realtime Tic-Tac-Toe game application by Ruby on Rails and Vue.js
To provide a realtime feature, the application uses WebSocket by Rails' Action Cable.
Instead of database, Rails low-level caching is used considering a running cost when it is deployed.
The cache saves players names and all game statuses.

The front-end uses Vue.js, composition API with TypeScript, Pinia, Vue Router, VueUse, Vite and Bun.
Tailwind CSS is used also to provide a responsive design.

The application is deployed to Heroku through GitLab CI/CD pipeline.
