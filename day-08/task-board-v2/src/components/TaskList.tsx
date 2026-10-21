import type { Priority, Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  totalTasks: number;
  editingId: number | null;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onStartEdit: (id: number) => void;
  onSaveEdit: (id: number, title: string) => void;
  onCancelEdit: () => void;
}

export default function TaskList({
  tasks,
  totalTasks,
  editingId,
  onToggle,
  onRemove,
  onPriorityChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: TaskListProps) {
  if (totalTasks === 0) {
    return (
      <div className="empty-state">
        <h2>Your board is empty</h2>
        <p>Add your first task to get started.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>No matching tasks</h2>
        <p>Try another filter or search term.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editing={editingId === task.id}
          onToggle={onToggle}
          onRemove={onRemove}
          onPriorityChange={onPriorityChange}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}
