import { useState } from 'react'
import './App.css'

import Footer from './components/Footer'
import TaskStats from './components/TaskStats'
import Section from './components/Section'
import TaskList from './components/TaskList'
import { nextStatus } from './components/TaskCard'
import Sidebar from './components/Sidebar'
import Badge from './components/Badge'
import TaskForm from './components/TaskForm'
import TaskFilters, {
  type SortOption,
  type StatusFilter,
} from './components/TaskFilters'

import type { Task, TaskFormValues } from './types/task'
import { fromFormValues, toFormValues } from './utils/taskForm'

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create a modern landing page with responsive sections.',
    project: 'Website Redesign',
    priority: 'high',
    status: 'In Progress',
    dueDate: '2026-11-05',
  },
  {
    id: 2,
    title: 'Build reusable components',
    description: 'Prepare reusable React components for the application.',
    project: 'Mobile App',
    priority: 'medium',
    status: 'Todo',
    dueDate: '2026-11-08',
  },
  {
    id: 3,
    title: 'Review mobile layouts',
    description: 'Check spacing and usability on smaller screens.',
    project: 'Mobile App',
    status: 'Done',
    dueDate: '2026-11-02',
  },
  {
    id: 4,
    title: 'Update brand guidelines',
    description: 'Finalize typography, colors, and interface guidelines.',
    project: 'Design System',
    status: 'In Progress',
    dueDate: '2026-11-12',
  },
]

const projects = [
  'All Tasks',
  'Website Redesign',
  'Mobile App',
  'Marketing',
  'Design System',
]

const emptyTaskValues: TaskFormValues = {
  title: '',
  description: '',
  project: 'Website Redesign',
  priority: 'medium',
  status: 'Todo',
  dueDate: '',
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeProject, setActiveProject] = useState('All Tasks')
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletedTask, setDeletedTask] = useState<Task | null>(null)
  const [sortMode, setSortMode] = useState<SortOption>('default')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const completedTasks = tasks.filter(
    (task) => task.status === 'Done',
  ).length

  const progressPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100)

  const sortedTasks =
    sortMode === 'default'
      ? [...tasks]
      : [...tasks].sort((a, b) => {
          if (sortMode === 'title') {
            return a.title.localeCompare(b.title)
          }

          if (sortMode === 'dueDate') {
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1

            return a.dueDate.localeCompare(b.dueDate)
          }

          return 0
        })

  const visibleTasks = sortedTasks.filter((task) => {
    const matchesProject =
      activeProject === 'All Tasks' || task.project === activeProject

    const matchesFilter =
      activeFilter === 'All' || task.status === activeFilter

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesProject && matchesFilter && matchesSearch
  })

  const hasActiveFilters =
    search.trim() !== '' ||
    activeFilter !== 'All' ||
    sortMode !== 'default' ||
    activeProject !== 'All Tasks'

  function clearFilters() {
    setSearch('')
    setActiveFilter('All')
    setSortMode('default')
    setActiveProject('All Tasks')
  }

  function openAddForm() {
    setEditingTask(null)
    setShowForm(true)
  }

  function openEditForm(task: Task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingTask(null)
  }

  function addTask(values: TaskFormValues) {
    const taskValues = fromFormValues(values)

    setTasks((current) => {
      const nextId =
        current.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1

      const newTask: Task = {
        id: nextId,
        ...taskValues,
      }

      return [newTask, ...current]
    })
  }

  function saveTask(values: TaskFormValues) {
    const taskValues = fromFormValues(values)

    if (editingTask) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskValues }
            : task,
        ),
      )
    } else {
      addTask(values)
    }

    closeForm()
  }

  function duplicateTask(task: Task) {
    addTask({
      title: `Copy of ${task.title}`,
      description: task.description,
      project: task.project,
      priority: task.priority ?? 'medium',
      status: 'Todo',
      dueDate: task.dueDate,
    })
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: nextStatus(task.status),
            }
          : task,
      ),
    )
  }

  function deleteTask(id: number) {
    const taskToDelete = tasks.find((task) => task.id === id)

    if (!taskToDelete) return

    setDeletedTask(taskToDelete)
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function undoDelete() {
    if (!deletedTask) return

    setTasks((current) => [deletedTask, ...current])
    setDeletedTask(null)
  }

  function selectNextTask() {
    if (visibleTasks.length === 0) {
      setSelectedId(null)
      return
    }

    const currentIndex = visibleTasks.findIndex(
      (task) => task.id === selectedId,
    )

    const nextIndex =
      currentIndex === -1 || currentIndex === visibleTasks.length - 1
        ? 0
        : currentIndex + 1

    setSelectedId(visibleTasks[nextIndex].id)
  }

  const formInitialValues = editingTask
    ? toFormValues(editingTask)
    : {
        ...emptyTaskValues,
        project:
          activeProject === 'All Tasks' ? 'Website Redesign' : activeProject,
      }

  return (
    <div className="app-shell">
      <Sidebar
        title="Mustafa's space"
        projects={projects}
        activeProject={activeProject}
        taskCount={tasks.length}
        onProjectSelect={setActiveProject}
        onAddTask={openAddForm}
      />

      <main className="main-content">
        <header className="app-header">
          <div>
            <span className="breadcrumb">Workspace / Tasks</span>
            <h1>My Tasks</h1>

            <p className="task-progress">
              {completedTasks} of {tasks.length} done ({progressPercentage}%)
            </p>
          </div>

          <div className="header-actions">
            <button
              className="primary-button"
              onClick={openAddForm}
            >
              + New task
            </button>

            <div className="header-avatar" aria-label="Mustafa">
              M
            </div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <h2>Good day, Mustafa 👋</h2>
            <p>Here is what is happening with your projects today.</p>
          </div>
        </section>

        <section className="overview-grid" aria-label="Task overview">
          <article className="overview-card">
            <div className="stat-top">
              <span>Total tasks</span>
              <span className="stat-icon">◫</span>
            </div>

            <strong>{tasks.length}</strong>
            <span className="stat-note">Tasks in your workspace</span>
          </article>

          <article className="overview-card">
            <div className="stat-top">
              <span>Completed</span>
              <span className="stat-icon">✓</span>
            </div>

            <strong>
              {tasks.filter((task) => task.status === 'Done').length}
            </strong>

            <span className="stat-note">Tasks marked as done</span>
          </article>

          <article className="overview-card">
            <div className="stat-top">
              <span>In progress</span>
              <span className="stat-icon">◷</span>
            </div>

            <strong>
              {tasks.filter((task) => task.status === 'In Progress').length}
            </strong>

            <span className="stat-note">Tasks currently in progress</span>
          </article>
        </section>

        <Section
          title="Tasks"
          action={<Badge tone="neutral">{tasks.length} tasks</Badge>}
        >
          <div className="tasks-heading">
            <div>
              <p>Manage and track your work.</p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search tasks"
              />
            </label>

            <button
              type="button"
              className="secondary-button select-next-button"
              onClick={selectNextTask}
              disabled={visibleTasks.length === 0}
            >
              Select next
            </button>
          </div>

          <TaskFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortOption={sortMode}
            onSortChange={setSortMode}
          />

          <div className="results-summary">
            <p>
              Showing <strong>{visibleTasks.length}</strong> of{' '}
              <strong>{tasks.length}</strong>
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                className="clear-filters-button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          {showForm && (
            <TaskForm
              key={editingTask ? `edit-${editingTask.id}` : 'new'}
              initialValues={formInitialValues}
              projects={projects.filter((project) => project !== 'All Tasks')}
              submitLabel={editingTask ? 'Save changes' : 'Add task'}
              onSubmit={saveTask}
              onCancel={closeForm}
            />
          )}

          <TaskStats />

          {deletedTask && (
            <div className="undo-banner" role="status">
              <span>Task deleted · </span>

              <button
                type="button"
                className="undo-button"
                onClick={undoDelete}
              >
                Undo
              </button>
            </div>
          )}

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onAddTask={openAddForm}
            onDeleteTask={deleteTask}
            onEditTask={openEditForm}
            onDuplicateTask={duplicateTask}
            selectedId={selectedId}
          />
        </Section>

        <Footer />
      </main>
    </div>
  )
}

export default App
