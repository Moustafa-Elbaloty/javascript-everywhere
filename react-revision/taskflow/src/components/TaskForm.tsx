import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { TaskFormValues } from '../types/task'

interface TaskFormProps {
  initialValues: TaskFormValues
  projects: string[]
  submitLabel: string
  onSubmit: (values: TaskFormValues) => void
  onCancel: () => void
}

interface FormErrors {
  title?: string
  description?: string
  dueDate?: string
}

function getTodayDate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function TaskForm({
  initialValues,
  projects,
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const today = getTodayDate()

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    const nextValues = {
      ...values,
      [name]: value,
    } as TaskFormValues

    setValues(nextValues)

    if (name === 'title') {
      setErrors((current) => ({
        ...current,
        title:
          value.trim().length < 3
            ? 'Title must be at least 3 characters.'
            : undefined,
      }))
    }

    if (name === 'description') {
      setErrors((current) => ({
        ...current,
        description:
          value.length > 200
            ? 'Description cannot exceed 200 characters.'
            : undefined,
      }))
    }

    if (name === 'dueDate') {
      setErrors((current) => ({
        ...current,
        dueDate:
          value && value < today
            ? 'Due date cannot be in the past.'
            : undefined,
      }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (values.title.trim().length < 3) {
      nextErrors.title = 'Title must be at least 3 characters.'
    }

    if (values.description.length > 200) {
      nextErrors.description =
        'Description cannot exceed 200 characters.'
    }

    if (values.dueDate && values.dueDate < today) {
      nextErrors.dueDate = 'Due date cannot be in the past.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="task-title">Task title</label>

        <input
          id="task-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter a task title"
        />

        {errors.title && (
          <p className="form-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="task-description">Description</label>

        <textarea
          id="task-description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Describe the task..."
          rows={3}
        />

        <p
          className={`character-counter ${
            values.description.length > 180 ? 'over-limit' : ''
          }`}
          aria-live="polite"
        >
          {values.description.length} / 200
        </p>

        {errors.description && (
          <p className="form-error" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="task-project">Project</label>

        <select
          id="task-project"
          name="project"
          value={values.project}
          onChange={handleChange}
        >
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="task-priority">Priority</label>

        <select
          id="task-priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="task-status">Status</label>

        <select
          id="task-status"
          name="status"
          value={values.status}
          onChange={handleChange}
        >
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="task-due-date">Due date</label>

        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          min={today}
          value={values.dueDate}
          onChange={handleChange}
        />

        {errors.dueDate && (
          <p className="form-error" role="alert">
            {errors.dueDate}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {submitLabel}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TaskForm