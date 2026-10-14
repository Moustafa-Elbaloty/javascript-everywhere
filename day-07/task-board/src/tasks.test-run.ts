
import assert from "node:assert/strict";
import { nextId, visibleTasks, sortTasks } from "./tasks.ts";
import type { Task } from "./types.ts";

const tasks: Task[] = [
  { id: 1, title: "Read the README", done: true, priority: "high" },
  { id: 2, title: "Set up Vite", done: false, priority: "low" },
  { id: 3, title: "Build the Task Board", done: false, priority: "medium" },
  { id: 4, title: "apply to 3 jobs", done: false, priority: "low" },
  { id: 5, title: "Apply to 3 Jobs", done: false, priority: "medium" },
];

// Filtering
assert.equal(visibleTasks(tasks, "all", "").length, 5);
assert.equal(visibleTasks(tasks, "open", "").length, 4);
assert.equal(visibleTasks(tasks, "done", "").length, 1);
assert.equal(visibleTasks(tasks, "all", "READ").length, 1);
assert.equal(visibleTasks(tasks, "all", "missing").length, 0);

// IDs
assert.equal(nextId([]), 1);
assert.equal(nextId(tasks), 6);

// Sorting by priority: high, medium, low; ties by ID
assert.deepEqual(
  sortTasks(tasks, "priority").map((t) => t.id),
  [1, 3, 5, 2, 4]
);

// Sorting A-Z, case-insensitive; ties by ID
assert.deepEqual(
  sortTasks(tasks, "title").map((t) => t.id),
  [4, 5, 3, 1, 2]
);

// Sorting by Added: ascending ID
assert.deepEqual(
  sortTasks(tasks, "added").map((t) => t.id),
  [1, 2, 3, 4, 5]
);

// Sorting must not mutate the original array
assert.deepEqual(
  tasks.map((t) => t.id),
  [1, 2, 3, 4, 5]
);

console.log("All Task Board tests passed!");
