interface SidebarProps {
  title: string
  projects: string[]
  activeProject: string
  taskCount: number
  onProjectSelect: (project: string) => void
  onAddTask: () => void
}

function Sidebar({
  title,
  projects,
  activeProject,
  taskCount,
  onProjectSelect,
  onAddTask,
}: SidebarProps) {
  const projectIcons = ['◫', '◈', '▣', '◉', '✳']

  return (
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
        <span className="workspace-name">{title}</span>
        <span className="muted">⌄</span>
      </button>

      <div className="nav-label">MENU</div>

      <nav className="project-nav" aria-label="Projects">
        {projects.map((project, index) => (
          <button
            key={project}
            className={`nav-item ${
              activeProject === project ? 'active' : ''
            }`}
            onClick={() => onProjectSelect(project)}
          >
            <span className="nav-icon">{projectIcons[index] ?? '◈'}</span>
            <span>{project}</span>

            {project === 'All Tasks' && (
              <span className="nav-count">{taskCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <span className="upgrade-icon">✦</span>
          <strong>Make room for focus.</strong>
          <p>Your next big thing starts with one small task.</p>
          <button onClick={onAddTask}>＋ New task</button>
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
  )
}

export default Sidebar
