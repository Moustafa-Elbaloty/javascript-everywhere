import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
  action?: ReactNode
}

function Section({ title, children, action }: SectionProps) {
  return (
    <section className="tasks-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>

        {action && <div className="section-action">{action}</div>}
      </div>

      <div className="section-body">{children}</div>
    </section>
  )
}

export default Section
