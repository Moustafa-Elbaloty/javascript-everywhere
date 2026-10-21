import { useState, type FormEvent } from "react";
import type { Priority } from "../types";

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle, priority);
    setTitle("");
    setPriority("medium");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">New task</label>

      <div className="add-task-controls">
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to get done?"
          maxLength={120}
        />

        <select
          aria-label="New task priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Priority)
          }
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <button type="submit" disabled={!title.trim()}>
          Add task
        </button>
      </div>
    </form>
  );
}
