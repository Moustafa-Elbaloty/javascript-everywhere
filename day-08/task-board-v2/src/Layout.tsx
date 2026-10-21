import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { BoardContext } from "./board-context";
import { INITIAL_TASKS, nextId } from "./tasks";
import type { Task, TaskFormValues } from "./types";

export default function Layout() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const navigate = useNavigate();

  function addTask(values: TaskFormValues): Task {
    const task: Task = { ...values, id: nextId(tasks) };
    setTasks(current => [...current, task]);
    return task;
  }

  function updateTask(id: number, values: TaskFormValues) {
    setTasks(current => current.map(task => task.id === id ? { ...values, id } : task));
  }

  async function pretendToSave(title: string) {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (title.toLowerCase() === "fail") throw new Error("Save failed. Try another title.");
  }

  const context = {
    tasks,
    addTask: (values: TaskFormValues) => addTask(values),
    updateTask,
    findTask: (id: number) => tasks.find(task => task.id === id),
  };

  return (
    <BoardContext.Provider value={context}>
      <header className="app-header">
        <Link to="/">Task Board v2</Link>
        <nav><NavLink to="/">Tasks</NavLink> <NavLink to="/tasks/new">New task</NavLink></nav>
      </header>
      <main className="task-board">
        <Outlet context={{ ...context, navigate, pretendToSave }} />
      </main>
    </BoardContext.Provider>
  );
}
