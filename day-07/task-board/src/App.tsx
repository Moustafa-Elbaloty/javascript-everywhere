import { useMemo, useState } from "react";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import type { Filter, Priority, Sort, Task } from "./types";
import { nextId, sortTasks, visibleTasks } from "./tasks";

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Read the Day 07 README",
    done: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Set up Vite",
    done: true,
    priority: "low",
  },
  {
    id: 3,
    title: "Build the Task Board",
    done: false,
    priority: "high",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("added");
  const [editingId, setEditingId] = useState<number | null>(null);

  const completed = tasks.filter((task) => task.done).length;
  const remaining = tasks.length - completed;

  const displayedTasks = useMemo(
    () => sortTasks(visibleTasks(tasks, filter, search), sort),
    [tasks, filter, search, sort]
  );

  function addTask(title: string, priority: Priority) {
    setTasks((current) => [
      ...current,
      {
        id: nextId(current),
        title,
        done: false,
        priority,
      },
    ]);
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setEditingId((current) => (current === id ? null : current));
  }

  function changePriority(id: number, priority: Priority) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  }

  function startEdit(id: number) {
    setEditingId(id);
  }

  function saveEdit(id: number, title: string) {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, title: trimmedTitle } : task
        )
      );
    }

    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.done));
    setEditingId((current) =>
      tasks.some((task) => task.id === current && task.done)
        ? null
        : current
    );
  }

  return (
    <main className="task-board">
      <Header remaining={remaining} />

      <AddTaskForm onAdd={addTask} />

      <FilterBar
        filter={filter}
        search={search}
        sort={sort}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />

      <TaskList
        tasks={displayedTasks}
        totalTasks={tasks.length}
        editingId={editingId}
        onToggle={toggleTask}
        onRemove={removeTask}
        onPriorityChange={changePriority}
        onStartEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
      />

      <Footer
        total={tasks.length}
        completed={completed}
        onClearCompleted={clearCompleted}
      />
    </main>
  );
}

export default App;
