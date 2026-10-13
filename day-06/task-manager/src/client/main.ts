import {
  PRIORITIES,
  validateNewTask
} from "../shared/validate.ts";

import type {
  Priority,
  Task
} from "../shared/types.ts";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "./api.ts";

type Status =
  | "loading"
  | "failed"
  | "ready";

type Filter =
  | "all"
  | "active"
  | "done";

type AppState = {
  readonly status: Status;
  readonly tasks: Task[];
  readonly filter: Filter;
  readonly search: string;
  readonly message: string;
  readonly error: string;
  readonly pendingIds: readonly number[];
};

let state: AppState = {
  status: "loading",
  tasks: [],
  filter: "all",
  search: "",
  message: "",
  error: "",
  pendingIds: []
};

const root =
  document.querySelector<HTMLDivElement>(
    "#app"
  );

if (!root) {
  throw new Error(
    "App root was not found"
  );
}

function getRoot(): HTMLDivElement {
  if (!root) {
    throw new Error("App root was not found");
  }
  return root;
}

function setState(
  next: AppState
): void {
  state = next;
  render();
}

function isPending(
  id: number
): boolean {
  return state.pendingIds.includes(id);
}

function addPending(
  id: number
): void {
  if (isPending(id)) {
    return;
  }

  setState({
    ...state,
    pendingIds: [
      ...state.pendingIds,
      id
    ]
  });
}

function removePending(
  id: number
): void {
  setState({
    ...state,
    pendingIds:
      state.pendingIds.filter(
        (item) => item !== id
      )
  });
}

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string
): HTMLElementTagNameMap[K] {
  const element =
    document.createElement(tag);

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function getVisibleTasks(): Task[] {
  const query =
    state.search
      .trim()
      .toLowerCase();

  return state.tasks.filter(
    (task) => {
      const matchesFilter =
        state.filter === "all" ||
        (state.filter === "active" &&
          !task.done) ||
        (state.filter === "done" &&
          task.done);

      const matchesSearch =
        query.length === 0 ||
        task.title
          .toLowerCase()
          .includes(query);

      return (
        matchesFilter &&
        matchesSearch
      );
    }
  );
}

function renderStatus(): HTMLElement {
  const status =
    createElement("p");

  status.className =
    "status";

  if (state.status === "loading") {
    status.textContent =
      "Loading tasks...";
  }

  if (state.status === "failed") {
    status.textContent =
      state.error ||
      "Something went wrong.";
  }

  if (state.status === "ready") {
    status.textContent =
      state.message;
  }

  status.setAttribute(
    "role",
    "status"
  );

  return status;
}

function renderForm(): HTMLElement {
  const form =
    createElement("form");

  form.id = "task-form";

  const label =
    createElement(
      "label",
      "Task title"
    );

  label.htmlFor =
    "task-title";

  const input =
    createElement("input");

  input.id =
    "task-title";

  input.name =
    "title";

  input.type =
    "text";

  input.maxLength = 120;

  input.required = true;

  input.placeholder =
    "What needs to be done?";

  const priorityLabel =
    createElement(
      "label",
      "Priority"
    );

  priorityLabel.htmlFor =
    "task-priority";

  const priority =
    createElement("select");

  priority.id =
    "task-priority";

  priority.name =
    "priority";

  for (const value of PRIORITIES) {
    const option =
      createElement(
        "option",
        value
      );

    option.value =
      value;

    if (value === "medium") {
      option.selected =
        true;
    }

    priority.append(option);
  }

  const button =
    createElement(
      "button",
      "Add task"
    );

  button.type =
    "submit";

  button.className =
    "add-button";

  form.append(
    label,
    input,
    priorityLabel,
    priority,
    button
  );

  form.addEventListener(
    "submit",
    handleCreate
  );

  return form;
}

function renderToolbar(): HTMLElement {
  const toolbar =
    createElement("div");

  toolbar.className =
    "toolbar";

  const search =
    createElement("input");

  search.type =
    "search";

  search.placeholder =
    "Search tasks...";

  search.value =
    state.search;

  search.setAttribute(
    "aria-label",
    "Search tasks"
  );

  search.addEventListener(
    "input",
    () => {
      setState({
        ...state,
        search: search.value
      });
    }
  );

  const filters =
    createElement("div");

  filters.className =
    "filters";

  for (const filter of [
    "all",
    "active",
    "done"
  ] as const) {
    const button =
      createElement(
        "button",
        filter.charAt(0).toUpperCase() +
          filter.slice(1)
      );

    button.type =
      "button";

    button.setAttribute(
      "aria-pressed",
      String(
        state.filter === filter
      )
    );

    button.addEventListener(
      "click",
      () => {
        setState({
          ...state,
          filter
        });
      }
    );

    filters.append(button);
  }

  const clear =
    createElement(
      "button",
      "Clear completed"
    );

  clear.type =
    "button";

  clear.addEventListener(
    "click",
    handleClearCompleted
  );

  toolbar.append(
    search,
    filters,
    clear
  );

  return toolbar;
}

function renderTask(
  task: Task
): HTMLElement {
  const row =
    createElement("li");

  row.className =
    "task-row";

  row.dataset.id =
    String(task.id);

  row.dataset.activity =
    task.done
      ? "done"
      : "pending";

  row.dataset.priority =
    task.priority;

  if (isPending(task.id)) {
    row.classList.add(
      "is-pending"
    );
  }

  const title =
    createElement(
      "span",
      task.title
    );

  title.className =
    "task-title";

  const priority =
    createElement(
      "select"
    );

  priority.className =
    "task-priority";

  priority.setAttribute(
    "aria-label",
    `Priority for ${task.title}`
  );

  for (const value of PRIORITIES) {
    const option =
      createElement(
        "option",
        value
      );

    option.value =
      value;

    option.selected =
      value === task.priority;

    priority.append(option);
  }

  priority.disabled =
    isPending(task.id);

  const toggle =
    createElement(
      "button",
      task.done
        ? "Undo"
        : "Done"
    );

  toggle.type =
    "button";

  toggle.dataset.action =
    "toggle";

  toggle.disabled =
    isPending(task.id);

  const remove =
    createElement(
      "button",
      "Delete"
    );

  remove.type =
    "button";

  remove.dataset.action =
    "delete";

  remove.disabled =
    isPending(task.id);

  row.append(
    title,
    priority,
    toggle,
    remove
  );

  return row;
}

function renderList(): HTMLElement {
  const section =
    createElement("section");

  section.className =
    "tasks-section";

  const heading =
    createElement(
      "div"
    );

  heading.className =
    "list-header";

  const title =
    createElement(
      "h2",
      "Tasks"
    );

  const active =
    state.tasks.filter(
      (task) => !task.done
    ).length;

  const done =
    state.tasks.filter(
      (task) => task.done
    ).length;

  const counts =
    createElement(
      "p",
      `Active: ${active} · Done: ${done}`
    );

  heading.append(
    title,
    counts
  );

  const list =
    createElement("ul");

  list.className =
    "task-list";

  list.addEventListener(
    "click",
    handleTaskClick
  );

  list.addEventListener(
    "change",
    handleTaskChange
  );

  const visible =
    getVisibleTasks();

  for (const task of visible) {
    list.append(
      renderTask(task)
    );
  }

  if (visible.length === 0) {
    const empty =
      createElement(
        "li",
        state.tasks.length === 0
          ? "No tasks yet."
          : "No tasks match your filter."
      );

    empty.className =
      "empty";

    list.append(empty);
  }

  section.append(
    heading,
    list
  );

  return section;
}

function render(): void {
  getRoot().replaceChildren();

  const header =
    createElement("header");

  const title =
    createElement(
      "h1",
      "Task Manager"
    );

  const subtitle =
    createElement(
      "p",
      "Manage your tasks with a simple API."
    );

  header.append(
    title,
    subtitle
  );

  getRoot().append(
    header
  );

  if (state.status === "loading") {
    getRoot().append(
      renderStatus()
    );

    return;
  }

  if (state.status === "failed") {
    getRoot().append(
      renderStatus()
    );

    const retry =
      createElement(
        "button",
        "Retry"
      );

    retry.type =
      "button";

    retry.addEventListener(
      "click",
      loadTasks
    );

    getRoot().append(retry);

    return;
  }

  const main =
    createElement("main");

  const formSection =
    createElement("section");

  const formTitle =
    createElement(
      "h2",
      "Add task"
    );

  formSection.append(
    formTitle,
    renderForm()
  );

  main.append(
    formSection,
    renderToolbar(),
    renderList(),
    renderStatus()
  );

  getRoot().append(main);
}

async function loadTasks(): Promise<void> {
  setState({
    ...state,
    status: "loading",
    error: "",
    message: ""
  });

  try {
    const tasks =
      await getTasks();

    setState({
      ...state,
      status: "ready",
      tasks,
      error: "",
      message: ""
    });
  } catch (error) {
    setState({
      ...state,
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Failed to load tasks"
    });
  }
}

async function handleCreate(
  event: SubmitEvent
): Promise<void> {
  event.preventDefault();

  const form =
    event.currentTarget;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const button =
    form.querySelector<HTMLButtonElement>(
      ".add-button"
    );

  const formData =
    new FormData(form);

  const checked =
    validateNewTask({
      title:
        formData.get("title"),
      priority:
        formData.get("priority")
    });

  if (!checked.ok) {
    setState({
      ...state,
      message:
        checked.error
    });

    return;
  }

  if (button) {
    button.disabled = true;
  }

  try {
    const task =
      await createTask(
        checked.value
      );

    setState({
      ...state,
      tasks: [
        ...state.tasks,
        task
      ],
      message:
        "Task added successfully."
    });

    form.reset();
  } catch (error) {
    setState({
      ...state,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add task"
    });
  } finally {
    if (button) {
      button.disabled = false;
    }
  }
}

async function handleToggle(
  task: Task
): Promise<void> {
  const previous =
    state.tasks;

  const nextTasks =
    state.tasks.map(
      (item) =>
        item.id === task.id
          ? {
              ...item,
              done: !item.done
            }
          : item
    );

  setState({
    ...state,
    tasks: nextTasks,
    message: "Saving..."
  });

  addPending(task.id);

  try {
    const updated =
      await updateTask(
        task.id,
        {
          done: !task.done
        }
      );

    setState({
      ...state,
      tasks:
        state.tasks.map(
          (item) =>
            item.id === task.id
              ? updated
              : item
        ),
      message:
        "Task updated."
    });
  } catch (error) {
    setState({
      ...state,
      tasks: previous,
      message:
        error instanceof Error
          ? error.message
          : "Update failed"
    });
  } finally {
    removePending(task.id);
  }
}

async function handlePriority(
  task: Task,
  priority: Priority
): Promise<void> {
  const previous =
    state.tasks;

  const nextTasks =
    state.tasks.map(
      (item) =>
        item.id === task.id
          ? {
              ...item,
              priority
            }
          : item
    );

  setState({
    ...state,
    tasks: nextTasks,
    message: "Saving..."
  });

  addPending(task.id);

  try {
    const updated =
      await updateTask(
        task.id,
        {
          priority
        }
      );

    setState({
      ...state,
      tasks:
        state.tasks.map(
          (item) =>
            item.id === task.id
              ? updated
              : item
        ),
      message:
        "Priority updated."
    });
  } catch (error) {
    setState({
      ...state,
      tasks: previous,
      message:
        error instanceof Error
          ? error.message
          : "Priority update failed"
    });
  } finally {
    removePending(task.id);
  }
}

async function handleDelete(
  task: Task
): Promise<void> {
  const previous =
    state.tasks;

  setState({
    ...state,
    tasks:
      state.tasks.filter(
        (item) =>
          item.id !== task.id
      ),
    message: "Deleting..."
  });

  addPending(task.id);

  try {
    await deleteTask(
      task.id
    );

    setState({
      ...state,
      message:
        "Task deleted."
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      error.status === 404
    ) {
      setState({
        ...state,
        message:
          "Task was already deleted."
      });

      return;
    }

    setState({
      ...state,
      tasks: previous,
      message:
        error instanceof Error
          ? error.message
          : "Delete failed"
    });
  } finally {
    removePending(task.id);
  }
}

async function handleClearCompleted(): Promise<void> {
  const completed =
    state.tasks.filter(
      (task) => task.done
    );

  if (completed.length === 0) {
    setState({
      ...state,
      message:
        "No completed tasks."
    });

    return;
  }

  const previous =
    state.tasks;

  setState({
    ...state,
    tasks:
      state.tasks.filter(
        (task) => !task.done
      ),
    message:
      "Clearing completed tasks..."
  });

  try {
    const results =
      await Promise.allSettled(
        completed.map(
          (task) =>
            deleteTask(task.id)
        )
      );

    const failed =
      results.filter(
        (result) =>
          result.status === "rejected"
      );

    if (failed.length > 0) {
      const failedIds =
        completed
          .filter(
            (_, index) =>
              results[index]?.status ===
              "rejected"
          )
          .map(
            (task) => task.id
          );

      const restored =
        previous.filter(
          (task) =>
            failedIds.includes(
              task.id
            )
        );

      setState({
        ...state,
        tasks: [
          ...state.tasks,
          ...restored
        ],
        message:
          `${failed.length} task(s) failed to delete.`
      });

      return;
    }

    setState({
      ...state,
      message:
        "Completed tasks cleared."
    });
  } catch {
    setState({
      ...state,
      tasks: previous,
      message:
        "Clear completed failed."
    });
  }
}

function handleTaskClick(
  event: MouseEvent
): void {
  const target =
    event.target;

  if (
    !(target instanceof HTMLButtonElement)
  ) {
    return;
  }

  const row =
    target.closest<HTMLElement>(
      ".task-row"
    );

  if (!row) {
    return;
  }

  const id =
    Number(row.dataset.id);

  const task =
    state.tasks.find(
      (item) => item.id === id
    );

  if (!task) {
    return;
  }

  const action =
    target.dataset.action;

  if (action === "toggle") {
    void handleToggle(task);
  }

  if (action === "delete") {
    void handleDelete(task);
  }
}

function handleTaskChange(
  event: Event
): void {
  const target =
    event.target;

  if (
    !(target instanceof HTMLSelectElement)
  ) {
    return;
  }

  const row =
    target.closest<HTMLElement>(
      ".task-row"
    );

  if (!row) {
    return;
  }

  const id =
    Number(row.dataset.id);

  const task =
    state.tasks.find(
      (item) => item.id === id
    );

  if (!task) {
    return;
  }

  const priority =
    target.value;

  if (
    !PRIORITIES.includes(
      priority as Priority
    )
  ) {
    return;
  }

  void handlePriority(
    task,
    priority as Priority
  );
}

render();
void loadTasks();
