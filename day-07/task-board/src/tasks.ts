import type { Filter, Task } from "./types";
import type { Sort } from "./types";

export type { Sort } from "./types";
export function visibleTasks(
  tasks: Task[],
  filter: Filter,
  search: string
): Task[] {
  const q = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "done" ? task.done : !task.done);

    const matchesSearch =
      q === "" || task.title.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });
}

export function nextId(tasks: Task[]): number {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

const priorityRank = {
  high: 3,
  medium: 2,
  low: 1,
};

export function sortTasks(tasks: Task[], sort: Sort): Task[] {
  return [...tasks].sort((a, b) => {
    if (sort === "priority") {
      return (
        priorityRank[b.priority] - priorityRank[a.priority] ||
        a.id - b.id
      );
    }

    if (sort === "title") {
      return (
        a.title.localeCompare(b.title, undefined, {
          sensitivity: "base",
        }) || a.id - b.id
      );
    }

    return a.id - b.id;
  });
}
