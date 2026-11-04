# TaskFlow

TaskFlow is a simple task management dashboard built with React and TypeScript. I created this project as part of Module 01 to practice working with React components and responsive layouts.

## Features

- View tasks and their current status.
- Filter tasks by project.
- Add and manage tasks.
- View task statistics.
- Navigate between different projects.
- Responsive layout for mobile, tablet, and desktop.

## Technologies

- React
- TypeScript
- Vite
- CSS

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Moustafa-Elbaloty/javascript-everywhere.git
```

Go to the project folder:

```bash
cd javascript-everywhere/react-revision/taskflow
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build

To create a production build:

```bash
npm run build
```

## Screenshots

### Mobile — 375px

![Mobile Screenshot](./screenshots/375.jpg)

### Tablet — 768px

![Tablet Screenshot](./screenshots/768.jpg)

### Desktop — 1280px

![Desktop Screenshot](./screenshots/1280.jpg)

## Module 02 — Components & TypeScript

This module extends TaskFlow with TypeScript types and reusable React components.

### What I learned

- Added an optional Priority type for tasks.
- Created a reusable Badge component with typed props.
- Added a Sidebar component with a SidebarProps interface.
- Added an optional action prop to the Section component.
- Used ReactNode for children and optional component content.
- Practiced typed event handlers with the TaskCard delete challenge.

### Components

- Badge
- Sidebar
- Section
- TaskCard
- TaskList


## Module 03 — State & Events

This module makes the TaskFlow task list more interactive using React state and immutable updates.

### What I learned

- Added a three-step task status cycle: To Do, In Progress, and Done.
- Calculated task progress and completion percentage from existing state.
- Added the ability to undo the last deleted task.
- Added sorting by title without mutating the original tasks array.
- Used conditional rendering for the Undo message.
- Practised state updates with map, filter, and spread syntax.

### Challenge

- Added a Select next button to move the selection between tasks.
- The selection returns to the first task after reaching the last one.

### Module 03 Screenshots

![Module 03 Desktop](./screenshots/module-03-desktop.jpg)

![Module 03 Mobile](./screenshots/module-03-mobile.jpg)
