import TaskCard, { type Task } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onAddTask: () => void
  onDeleteTask: (id: number) => void
  selectedId: number | null
}

function TaskList({
  tasks,
  onToggle,
  onAddTask,
  onDeleteTask,
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
          isSelected={selectedId === task.id}
        />
      ))}

      {tasks.length === 0 && (
        <div className="empty-state">
          <span>✳</span>
          <h3>Nothing on your plate</h3>
          <p>Try another filter or add a new task.</p>

          <button className="primary-button" onClick={onAddTask}>
            Add a task
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskList

