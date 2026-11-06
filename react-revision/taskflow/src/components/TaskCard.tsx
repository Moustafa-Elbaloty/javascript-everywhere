import Badge from './Badge'
import { useNavigate } from 'react-router'
import { getProjectId } from '../data/projects'
import type { Task, TaskStatus } from '../types/task'

export type { Priority, TaskStatus, Task } from '../types/task'

export function nextStatus(status: TaskStatus): TaskStatus {
  switch (status) {
    case 'Todo':
      return 'In Progress'

    case 'In Progress':
      return 'Done'

    case 'Done':
      return 'Todo'
  }
}

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
  onDuplicate: (task: Task) => void
  isSelected: boolean
}

function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  onDuplicate,
  isSelected,
}: TaskCardProps) {
  const navigate = useNavigate()
  const next = nextStatus(task.status)
  const nextLabel = next === 'Todo' ? 'To Do' : next

  function formatDueDate(date: string) {
    if (!date) return 'No date'

    const parsedDate = new Date(`${date}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime())) return date

    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    })
  }

  return (
    <article className={`task-card ${isSelected ? 'selected' : ''}`}>
      <button
        type="button"
        className={`task-check status-cycle-button ${
          task.status === 'Done' ? 'checked' : ''
        }`}
        onClick={() => onToggle(task.id)}
        aria-label={`Move ${task.title} to ${nextLabel}`}
      >
        {nextLabel}
      </button>

      <div className="task-main">
        <div className="task-title-row">
          <h3
            className={`task-title ${
              task.status === 'Done' ? 'completed-title' : ''
            }`}
          >
            {task.title}
          </h3>

          <Badge
            tone={
              task.priority === 'high'
                ? 'danger'
                : task.priority === 'medium'
                  ? 'warning'
                  : 'neutral'
            }
          >
            {task.priority ?? 'medium'}
          </Badge>
        </div>

        <p>{task.description}</p>

        <div className="task-meta">
          <span className="project-tag">{task.project}</span>
          <span className="due-date">◷ {formatDueDate(task.dueDate)}</span>
        </div>
      </div>

      <span
        className={`status-pill status-${task.status
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        {task.status}
      </span>

      <div className="task-actions">
        <button
          type="button"
          className="secondary-button task-details"
          onClick={() =>
            navigate(`/projects/${getProjectId(task.project)}/tasks/${task.id}`)
          }
        >
          Details
        </button>

        <button
          type="button"
          className="secondary-button task-edit"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          className="secondary-button task-duplicate"
          onClick={() => onDuplicate(task)}
        >
          Duplicate
        </button>

        <button
          type="button"
          className="task-delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
