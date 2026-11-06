import { useEffect, useRef, useState } from 'react'
import { useMatch, useNavigate } from 'react-router'
import './App.css'

import Footer from './components/Footer'
import TaskStats from './components/TaskStats'
import Section from './components/Section'
import TaskList from './components/TaskList'
import { nextStatus } from './components/TaskCard'
import Sidebar from './components/Sidebar'
import Badge from './components/Badge'
import EmptyState from './components/EmptyState'
import TaskForm from './components/TaskForm'
import TaskFilters, {
  type SortOption,
  type StatusFilter,
} from './components/TaskFilters'

import useLocalStorage from './hooks/useLocalStorage'
import useDebouncedValue from './hooks/useDebouncedValue'
import projects from './data/projects'
import TaskDetailsPage from './components/TaskDetailsPage'
import countBy from './utils/countBy'
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
    project: 'Marketing',
    status: 'In Progress',
    dueDate: '2026-11-12',
  },
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

  const navigate = useNavigate()
  const projectRoute = useMatch('/projects/:projectId')
  const taskDetailsRoute = useMatch('/projects/:projectId/tasks/:taskId')

  const currentProjectId =
    taskDetailsRoute?.params.projectId ?? projectRoute?.params.projectId

  const routeProject = projects.find(
    (project) => project.id === currentProjectId,
  )

  const selectedProject = routeProject?.name ?? activeProject

  const projectTasks =
    selectedProject === 'All Tasks'
      ? []
      : tasks.filter((task) => task.project === selectedProject)

  const completedProjectTasks = projectTasks.filter(
    (task) => task.status === 'Done',
  ).length

  const projectProgress =
    projectTasks.length === 0
      ? 0
      : Math.round((completedProjectTasks / projectTasks.length) * 100)

  const [activeFilter, setActiveFilter] =
    useLocalStorage<StatusFilter>('taskflow-status-filter', 'All')

  const [search, setSearch] =
    useLocalStorage<string>('taskflow-search', '')

  const debouncedSearch = useDebouncedValue(search, 300)

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletedTask, setDeletedTask] = useState<Task | null>(null)
  const [sortMode, setSortMode] = useState<SortOption>('default')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const statusCounts = countBy(tasks, (task) => task.status)

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      if (event.key !== '/') {
        return
      }

      const target = event.target

      if (target instanceof HTMLElement) {
        const isTyping =
          target.matches('input, textarea, select') ||
          target.isContentEditable

        if (isTyping) {
          return
        }
      }

      event.preventDefault()
      searchInputRef.current?.focus()
    }

    window.addEventListener('keydown', handleSearchShortcut)

    return () => {
      window.removeEventListener('keydown', handleSearchShortcut)
    }
  }, [])

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
      selectedProject === 'All Tasks' || task.project === selectedProject

    const matchesFilter =
      activeFilter === 'All' || task.status === activeFilter

    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase())

    return matchesProject && matchesFilter && matchesSearch
  })

  const hasActiveFilters =
    search.trim() !== '' ||
    activeFilter !== 'All' ||
    sortMode !== 'default' ||
    selectedProject !== 'All Tasks'

  function selectProject(projectName: string) {
    setActiveProject(projectName)

    const project = projects.find((item) => item.name === projectName)

    navigate(project ? `/projects/${project.id}` : '/')
  }

  function clearFilters() {
    setSearch('')
    setActiveFilter('All')
    setSortMode('default')
    setActiveProject('All Tasks')
    navigate('/')
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
          selectedProject === 'All Tasks' ? 'Website Redesign' : selectedProject,
      }

  return (
    <div className="app-shell">
      <Sidebar
        title="Mustafa's space"
        projects={['All Tasks', ...projects.map((project) => project.name)]}
        activeProject={selectedProject}
        taskCount={tasks.length}
        onProjectSelect={selectProject}
        onAddTask={openAddForm}
      />

      <main className="main-content">
        {taskDetailsRoute ? (
          <TaskDetailsPage tasks={tasks} />
        ) : (
          <>
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

        {selectedProject !== 'All Tasks' && (
          <Section
            title="Project overview"
            action={
              <Badge tone="neutral">
                {projectTasks.length} tasks
              </Badge>
            }
          >
            <div className="project-progress-card">
              <div className="project-progress-heading">
                <strong>
                  {completedProjectTasks} of {projectTasks.length} done
                </strong>
                <span>{projectProgress}%</span>
              </div>

              <div
                className="project-progress-track"
                role="progressbar"
                aria-label="Project completion"
                aria-valuenow={projectProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${projectProgress}%` }} />
              </div>
            </div>

            {projectTasks.length === 0 && (
              <EmptyState
                title="No tasks in this project yet"
                message={`There are no tasks in ${selectedProject}. Add one to get started.`}
              />
            )}
          </Section>
        )}

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
          <div className="status-counts" aria-label="Task counts by status">
            <Badge tone="neutral">Todo: {statusCounts['Todo'] ?? 0}</Badge>
            <Badge tone="neutral">
              In Progress: {statusCounts['In Progress'] ?? 0}
            </Badge>
            <Badge tone="neutral">Done: {statusCounts['Done'] ?? 0}</Badge>
          </div>

          <div className="tasks-heading">
            <div>
              <p>Manage and track your work.</p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>

              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search tasks... (Press /)"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search tasks"
                aria-keyshortcuts="/"
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
              projects={projects.map((project) => project.name)}
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
          </>
        )}
      </main>
    </div>
  )
}

export default App
