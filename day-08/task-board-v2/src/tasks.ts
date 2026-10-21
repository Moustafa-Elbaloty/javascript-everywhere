import type { Filter, Sort, Task, TaskErrors, TaskFormValues } from "./types";

export const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Read the Day 08 README", done: true, priority: "high", dueDate: "", notes: "" },
  { id: 2, title: "Build the task form", done: false, priority: "high", dueDate: "2027-01-15", notes: "Validation on blur and on submit." },
  { id: 3, title: "Add the routes", done: false, priority: "medium", dueDate: "", notes: "" },
];

export function nextId(tasks: Task[]): number {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

export function validateTask(values: TaskFormValues, checkPast: boolean): TaskErrors {
  const errors: TaskErrors = {};
  const title = values.title.trim();

  if (!title) errors.title = "Title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 80) errors.title = "Title must be 80 characters or fewer.";

  if (checkPast && values.dueDate && values.dueDate < new Date().toLocaleDateString("en-CA")) {
    errors.dueDate = "Due date cannot be in the past.";
  }

  if (values.notes.length > 200) errors.notes = "Notes must be 200 characters or fewer.";
  return errors;
}

export function visibleTasks(tasks: Task[], filter: Filter, search: string): Task[] {
  const q = search.trim().toLowerCase();
  return tasks.filter(task =>
    (filter === "all" || (filter === "done" ? task.done : !task.done)) &&
    (!q || task.title.toLowerCase().includes(q))
  );
}

export function sortTasks(tasks: Task[], sort: Sort): Task[] {
  const rank = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort((a, b) => {
    if (sort === "due") {
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate) || a.id - b.id;
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return a.id - b.id;
    }
    if (sort === "priority") return rank[b.priority] - rank[a.priority] || a.id - b.id;
    return a.id - b.id;
  });
}
