import TaskCard from './TaskCard'
import type { Task } from '../types/task'

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
        <div className="empty-state">
          <span>✳</span>
          <h3>Nothing on your plate</h3>
          <p>Try another filter or add a new task.</p>

          <button
            type="button"
            className="primary-button"
            onClick={onAddTask}
          >
            Add a task
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskList
