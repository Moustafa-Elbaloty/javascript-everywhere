import Badge from './Badge'

export type Priority = 'low' | 'medium' | 'high'

export type TaskStatus = 'Todo' | 'In Progress' | 'Done'

export interface Task {
  id: number
  title: string
  description: string
  project: string
  priority?: Priority
  status: TaskStatus
  dueDate: string
}

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
  isSelected: boolean
}

function TaskCard({
  task,
  onToggle,
  onDelete,
  isSelected,
}: TaskCardProps) {
  const next = nextStatus(task.status)
  const nextLabel = next === 'Todo' ? 'To Do' : next

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
          <span className="due-date">◷ {task.dueDate}</span>
        </div>
      </div>

      <span
        className={`status-pill status-${task.status
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        {task.status}
      </span>

      <button
        type="button"
        className="task-delete"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </article>
  )
}

export default TaskCard