# Task Board — Day 07

A task management application built with React, TypeScript, and Vite.

## Features

- Add tasks with a title and priority.
- Mark tasks as completed or open.
- Edit task titles by double-clicking them.
- Delete individual tasks.
- Filter tasks by All, Open, and Done.
- Search tasks by title.
- Sort tasks by added order, priority, or title.
- View remaining and completed task counts.
- Clear all completed tasks.
- Responsive layout for desktop and mobile screens.

## Tech Stack

- React
- TypeScript
- Vite
- CSS

## Requirements

- Node.js with support for `--experimental-strip-types`
- npm

## Getting Started

Install dependencies if needed:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test` | Run task utility tests |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |

## Tests

Run:

```bash
npm test
```

The tests cover task filtering, case-insensitive search, ID generation, sorting, and ensuring sorting does not mutate the original task array.

## Production Build

```bash
npm run build
```

The generated production files are placed in the `dist` directory.
