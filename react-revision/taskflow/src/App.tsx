import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import TaskStats from './components/TaskStats'
import Section from './components/Section'
import TaskList from './components/TaskList'
import { nextStatus, type Task } from './components/TaskCard'
import Sidebar from './components/Sidebar'
import Badge from './components/Badge'

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create a modern landing page with responsive sections.',
    project: 'Website Redesign',
    priority: 'high',
    status: 'In Progress',
    dueDate: 'Nov 05',
  },
  {
    id: 2,
    title: 'Build reusable components',
    description: 'Prepare reusable React components for the application.',
    project: 'Mobile App',
    priority: 'medium',
    status: 'Todo',
    dueDate: 'Nov 08',
  },
  {
    id: 3,
    title: 'Review mobile layouts',
    description: 'Check spacing and usability on smaller screens.',
    project: 'Mobile App',
    status: 'Done',
    dueDate: 'Nov 02',
  },
  {
    id: 4,
    title: 'Update brand guidelines',
    description: 'Finalize typography, colors, and interface guidelines.',
    project: 'Design System',
    status: 'In Progress',
    dueDate: 'Nov 12',
  },
]

const projects = [
  'All Tasks',
  'Website Redesign',
  'Mobile App',
  'Marketing',
  'Design System',
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeProject, setActiveProject] = useState('All Tasks')
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const visibleTasks = tasks.filter((task) => {
    const matchesProject =
      activeProject === 'All Tasks' || task.project === activeProject

    const matchesFilter =
      activeFilter === 'All' || task.status === activeFilter

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesProject && matchesFilter && matchesSearch
  })

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

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newTitle.trim()) {
      return
    }

    setTasks((current) => [
      {
        id: Date.now(),
        title: newTitle.trim(),
        description: 'A new task ready for your attention.',
        project:
          activeProject === 'All Tasks' ? 'Website Redesign' : activeProject,
        priority: 'medium',
        status: 'Todo',
        dueDate: 'No date',
      },
      ...current,
    ])

    setNewTitle('')
    setShowForm(false)
  }

  return (
    <div className="app-shell">
      <Sidebar
        title="Mustafa's space"
        projects={projects}
        activeProject={activeProject}
        taskCount={tasks.length}
        onProjectSelect={setActiveProject}
        onAddTask={() => setShowForm(true)}
      />

      <main className="main-content">
        <header className="app-header">
          <div>
            <span className="breadcrumb">Workspace / Tasks</span>
            <h1>My Tasks</h1>
          </div>

          <div className="header-actions">
            <button
              className="primary-button"
              onClick={() => setShowForm(!showForm)}
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
          </div>

          <div className="task-filters" aria-label="Filter tasks">
            {['All', 'Todo', 'In Progress', 'Done'].map((filter) => (
              <button
                key={filter}
                className={`filter-button ${
                  activeFilter === filter ? 'active' : ''
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {showForm && (
            <form className="task-form" onSubmit={addTask}>
              <label htmlFor="new-task-title">Task title</label>
              <input
                id="new-task-title"
                type="text"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Enter a task title"
              />

              <div className="form-actions">
                <button type="submit" className="primary-button">
                  Add task
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <TaskStats />

          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onAddTask={() => setShowForm(true)}
          />

        </Section>

        <Footer />
      </main>
    </div>
  )
}

export default App
