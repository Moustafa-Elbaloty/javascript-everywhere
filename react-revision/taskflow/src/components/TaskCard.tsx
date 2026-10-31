import Badge from './Badge'

export type Priority = 'low' | 'medium' | 'high'

type TaskStatus = 'Todo' | 'In Progress' | 'Done'

export interface Task {
  id: number
  title: string
  description: string
  project: string
  priority?: Priority
  status: TaskStatus
  dueDate: string
}

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <article className="task-card">
      <button
        className={`task-check ${
          task.status === 'Done' ? 'checked' : ''
        }`}
        onClick={() => onToggle(task.id)}
        aria-label={
          task.status === 'Done' ? 'Mark as todo' : 'Mark as done'
        }
      >
        {task.status === 'Done' ? '✓' : ''}
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
