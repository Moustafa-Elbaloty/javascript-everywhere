import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span aria-hidden="true">✳</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  )
}

export default EmptyState
