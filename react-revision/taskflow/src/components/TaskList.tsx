import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import type { Task } from '../types/task'
import useDocumentTitle from '../hooks/useDocumentTitle'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onAddTask: () => void
  onDeleteTask: (id: number) => void
  onEditTask: (task: Task) => void
  onDuplicateTask: (task: Task) => void
  selectedId: number | null
}

function TaskList({
  tasks,
  onToggle,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onDuplicateTask,
  selectedId,
}: TaskListProps) {
  const openTaskCount = tasks.filter(
    (task) => task.status !== 'Done',
  ).length

  useDocumentTitle(`${openTaskCount} open tasks | TaskFlow`)

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onDuplicate={onDuplicateTask}
          isSelected={selectedId === task.id}
        />
      ))}

      {tasks.length === 0 && (
        <EmptyState
          title="Nothing on your plate"
          message="Try another filter or add a new task."
          action={
            <button
              type="button"
              className="primary-button"
              onClick={onAddTask}
            >
              Add a task
            </button>
          }
        />
      )}
    </div>
  )
}

export default TaskList
