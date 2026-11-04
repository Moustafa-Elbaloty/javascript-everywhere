import type { Task, TaskFormValues } from '../types/task'

export function toFormValues(task: Task): TaskFormValues {
  return {
    title: task.title,
    description: task.description,
    project: task.project,
    priority: task.priority ?? 'medium',
    status: task.status,
    dueDate: task.dueDate,
  }
}

export function fromFormValues(
  values: TaskFormValues,
): Omit<Task, 'id'> {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    project: values.project,
    priority: values.priority,
    status: values.status,
    dueDate: values.dueDate,
  }
}
