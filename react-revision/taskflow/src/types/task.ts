export type Priority = 'low' | 'medium' | 'high'

export type TaskStatus = 'Todo' | 'In Progress' | 'Done'

export interface Task {
  id: number
  title: string
  description: string
  project: string
  priority?: Priority
  status: TaskStatus
  dueDate: string
}

export interface TaskFormValues {
  title: string
  description: string
  project: string
  priority: Priority
  status: TaskStatus
  dueDate: string
}
