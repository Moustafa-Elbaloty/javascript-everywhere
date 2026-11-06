# Module 06 — Reflection

## 1. Why can't TaskList call useTasks() directly on every page?

TaskList is a reusable component, so it should not decide where its task data comes from. The project page should select the tasks for the current project and pass them as props, so TaskList only displays the data it receives.

## 2. What does the end prop on NavLink fix?

Without the end prop, a NavLink can stay active on nested routes that start with the same URL. Setting end makes the project link active only on the exact project page, not on a task details page inside that project.

## 3. Why does ProjectPage give TaskList a key?

When the project changes, React may reuse the TaskList component because it is in the same position in the component tree. A key based on the project ID tells React that this is a different list, so its local state is reset instead of carrying over from the previous project.
