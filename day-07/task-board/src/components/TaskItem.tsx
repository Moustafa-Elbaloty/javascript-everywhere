import type { KeyboardEvent } from "react";
import type { Priority, Task } from "../types";

interface TaskItemProps {
  task: Task;
  editing: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onStartEdit: (id: number) => void;
  onSaveEdit: (id: number, title: string) => void;
  onCancelEdit: () => void;
}

export default function TaskItem({
  task,
  editing,
  onToggle,
  onRemove,
  onPriorityChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: TaskItemProps) {
  function handleEditKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSaveEdit(task.id, event.currentTarget.value);
    }

    if (event.key === "Escape") {
      onCancelEdit();
    }
  }

  return (
    <li className={`task-item ${task.done ? "is-done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.done ? "open" : "done"}`}
      />

      <div className="task-main">
        {editing ? (
          <input
            className="edit-task-input"
            type="text"
            defaultValue={task.title}
            autoFocus
            maxLength={120}
            aria-label="Edit task title"
            onKeyDown={handleEditKeyDown}
            onBlur={(event) => onSaveEdit(task.id, event.currentTarget.value)}
          />
        ) : (
          <button
            className="task-title"
            type="button"
            onDoubleClick={() => onStartEdit(task.id)}
            title="Double-click to edit"
          >
            {task.title}
          </button>
        )}

        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <select
        value={task.priority}
        onChange={(event) =>
          onPriorityChange(task.id, event.target.value as Priority)
        }
        aria-label={`Priority for ${task.title}`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        className="remove-task"
        type="button"
        onClick={() => onRemove(task.id)}
        aria-label={`Remove ${task.title}`}
      >
        Remove
      </button>
    </li>
  );
}
