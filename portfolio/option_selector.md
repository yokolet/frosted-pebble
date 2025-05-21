Front-end only application.
A complicated nested state update example. A single option change affects other options' state.
The options have levels and priorities.
When a higher level option turns on, all lower level options turn on as disabled status.
When a lower level option turns on, higher level options becomes disabled.
Each level of options has a priority setting.
When a higher priority option turns on, the same level of lower priority options turn on as disabled.

The application is written by Vue.js 3, Composition API, with TypeScript, Vite, and Bun.
The option switch behaviors are tested by Vitest.
Styles are defined by Tailwind CSS. The UI is responsive and has a switch of Light/Dark mode.

The working application is deployed to GitLab pages through GitLab CI/CD pipeline.
