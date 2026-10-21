import { Link, useSearchParams } from "react-router";
import { useBoard } from "../board-context";
import { sortTasks, visibleTasks } from "../tasks";
import type { Filter, Sort } from "../types";

export default function TaskListPage() {
  const { tasks } = useBoard();
  const [params, setParams] = useSearchParams();
  const rawFilter = params.get("filter");
  const filter: Filter = rawFilter === "open" || rawFilter === "done" ? rawFilter : "all";
  const q = params.get("q") ?? "";
  const rawSort = params.get("sort");
  const sort: Sort = rawSort === "due" || rawSort === "priority" ? rawSort : "added";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || (key === "filter" && value === "all") || (key === "sort" && value === "added")) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const displayed = sortTasks(visibleTasks(tasks, filter, q), sort);

  return <>
    <h1>Tasks</h1>
    <div className="task-controls">
      <label>Search <input value={q} onChange={e => update("q", e.target.value)} /></label>
      <label>Filter <select value={filter} onChange={e => update("filter", e.target.value)}>
        <option value="all">All</option><option value="open">Open</option><option value="done">Done</option>
      </select></label>
      <label>Sort <select value={sort} onChange={e => update("sort", e.target.value)}>
        <option value="added">Added</option><option value="due">Due date</option><option value="priority">Priority</option>
      </select></label>
    </div>
    {displayed.length ? <ul className="task-list">{displayed.map(task =>
      <li key={task.id}>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        {" — "}{task.done ? "Done" : "Open"} · {task.priority}
        {task.dueDate && ` · Due ${task.dueDate}`}
      </li>
    )}</ul> : <p>No tasks found.</p>}
  </>;
}
