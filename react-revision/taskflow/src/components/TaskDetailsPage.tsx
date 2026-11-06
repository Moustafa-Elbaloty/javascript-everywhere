import { Link, useMatch } from 'react-router'

import Badge from './Badge'
import EmptyState from './EmptyState'
import Section from './Section'

import projects, { getProjectId } from '../data/projects'
import type { Task } from '../types/task'

interface TaskDetailsPageProps {
  tasks: Task[]
}

function formatDueDate(date: string): string {
  if (!date) return 'No due date'

  const parsedDate = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function TaskDetailsPage({ tasks }: TaskDetailsPageProps) {
  const detailsMatch = useMatch('/projects/:projectId/tasks/:taskId')

  const projectId = detailsMatch?.params.projectId
  const taskId = detailsMatch?.params.taskId

  const project = projects.find((item) => item.id === projectId)

  const task = tasks.find(
    (item) =>
      String(item.id) === taskId &&
      getProjectId(item.project) === projectId,
  )

  const backPath = project ? `/projects/${project.id}` : '/'

  if (!task) {
    return (
      <Section title="Task details">
        <EmptyState
          title="Task not found"
          message="This task does not exist in this project. It may have been deleted or the link may be incorrect."
          action={
            <Link className="task-detail-back-link" to={backPath}>
              ← Back to project
            </Link>
          }
        />
      </Section>
    )
  }

  return (
    <div className="task-details-page">
      <Link className="task-detail-back-link" to={backPath}>
        ← Back to project
      </Link>

      <Section
        title="Task details"
        action={<Badge tone="neutral">{task.status}</Badge>}
      >
        <div className="task-detail-content">
          <h2 className="task-detail-title">{task.title}</h2>

          <p className="task-detail-description">
            {task.description || 'No description provided.'}
          </p>

          <dl className="task-detail-grid">
            <div>
              <dt>Project</dt>
              <dd>{task.project}</dd>
            </div>

            <div>
              <dt>Status</dt>
              <dd>{task.status}</dd>
            </div>

            <div>
              <dt>Due date</dt>
              <dd>{formatDueDate(task.dueDate)}</dd>
            </div>

            <div>
              <dt>Priority</dt>
              <dd>{task.priority ?? 'medium'}</dd>
            </div>
          </dl>
        </div>
      </Section>
    </div>
  )
}

export default TaskDetailsPage
