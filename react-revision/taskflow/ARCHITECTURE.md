# TaskFlow — Project Architecture

The `src` folder contains the application code, organized by responsibility.

## Source Folders

- `assets/` — Static files such as images, icons, and other visual assets.
- `components/` — Reusable UI components and page components, including TaskCard, TaskList, and TaskDetailsPage.
- `data/` — Static application data, such as the projects list in projects.ts.
- `hooks/` — Reusable custom React hooks, such as useLocalStorage and useDocumentTitle.
- `types/` — Shared TypeScript types and interfaces used across the application.
- `utils/` — Reusable helper functions and data transformations.

## Main Source Files

- `App.tsx` — Main application component, state management, and application layout.
- `main.tsx` — Application entry point; mounts React and configures BrowserRouter.
- `App.css` — Styles for TaskFlow components and pages.
- `index.css` — Global styles and base document styles.

## Where to Add New Features

- **A new page:** Add its page component in `src/components/` and connect it to the application routing.
- **A new custom hook:** Add a file in `src/hooks/`, using the `use` prefix in its name.

This structure keeps UI, data, shared types, hooks, and helper logic organized by responsibility.
