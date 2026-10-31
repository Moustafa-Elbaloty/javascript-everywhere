import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import TaskStats from './components/TaskStats'

export type Priority = 'low' | 'medium' | 'high'

type TaskStatus = 'Todo' | 'In Progress' | 'Done'

interface Task {
  id: number
  title: string
  description: string
  project: string
  priority?: Priority
  status: TaskStatus
  dueDate: string
}

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
  { name: 'All Tasks', icon: '◫' },
  { name: 'Website Redesign', icon: '◈' },
  { name: 'Mobile App', icon: '▣' },
  { name: 'Marketing', icon: '◉' },
  { name: 'Design System', icon: '✳' },
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
              status: task.status === 'Done' ? 'Todo' : 'Done',
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
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="TaskFlow home">
          <span className="brand-mark">T</span>
          <span>
            task<span className="brand-light">flow</span>
          </span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <button className="workspace-switch">
          <span className="workspace-avatar">M</span>
          <span className="workspace-name">Mustafa's space</span>
          <span className="muted">⌄</span>
        </button>

        <div className="nav-label">MENU</div>

        <nav className="project-nav" aria-label="Projects">
          {projects.map((project) => (
            <button
              key={project.name}
              className={`nav-item ${
                activeProject === project.name ? 'active' : ''
              }`}
              onClick={() => setActiveProject(project.name)}
            >
              <span className="nav-icon">{project.icon}</span>
              <span>{project.name}</span>

              {project.name === 'All Tasks' && (
                <span className="nav-count">{tasks.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <span className="upgrade-icon">✦</span>
            <strong>Make room for focus.</strong>
            <p>Your next big thing starts with one small task.</p>
            <button onClick={() => setShowForm(true)}>＋ New task</button>
          </div>

          <div className="profile">
            <div className="profile-avatar">M</div>
            <div>
              <strong>Mostafa Ahmed</strong>
              <span>Free workspace</span>
            </div>
            <span className="muted">•••</span>
          </div>
        </div>
      </aside>

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

        <section className="tasks-section">
          <div className="tasks-heading">
            <div>
              <h2>Tasks</h2>
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

          <div className="task-list">
            {visibleTasks.map((task) => (
              <article className="task-card" key={task.id}>
                <button
                  className={`task-check ${
                    task.status === 'Done' ? 'checked' : ''
                  }`}
                  onClick={() => toggleTask(task.id)}
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

                    {task.priority && (
                      <span
                        className={`priority-dot priority-${task.priority}`}
                        title={`${task.priority} priority`}
                      />
                    )}
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
              </article>
            ))}

            {visibleTasks.length === 0 && (
              <div className="empty-state">
                <span>✳</span>
                <h3>Nothing on your plate</h3>
                <p>Try another filter or add a new task.</p>
                <button
                  className="primary-button"
                  onClick={() => setShowForm(true)}
                >
                  Add a task
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}

export default App
