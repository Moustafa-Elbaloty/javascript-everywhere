import { useState, type FormEvent } from "react";
import type { Priority, TaskErrors, TaskFormValues } from "../types";
import { validateTask } from "../tasks";

interface Props {
  initial: TaskFormValues;
  submitLabel: string;
  checkPast: boolean;
  onSubmit: (values: TaskFormValues) => void | Promise<void>;
}

export default function TaskForm({ initial, submitLabel, checkPast, onSubmit }: Props) {
  const [values, setValues] = useState<TaskFormValues>(initial);
  const [errors, setErrors] = useState<TaskErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  function change<K extends keyof TaskFormValues>(key: K, value: TaskFormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateTask(next, checkPast));
  }

  function blur(key: keyof TaskFormValues) {
    setTouched(prev => ({ ...prev, [key]: true }));
    setErrors(validateTask(values, checkPast));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setTouched({ title: true, dueDate: true, notes: true });
    const nextErrors = validateTask(values, checkPast);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    setServerError("");
    try {
      await onSubmit({ ...values, title: values.title.trim() });
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to save task.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="task-form" onSubmit={submit} noValidate>
      <label>Title
        <input value={values.title} maxLength={120}
          onChange={e => change("title", e.target.value)}
          onBlur={() => blur("title")} aria-invalid={Boolean(touched.title && errors.title)} />
      </label>
      {touched.title && errors.title && <p role="alert">{errors.title}</p>}

      <label>Priority
        <select value={values.priority}
          onChange={e => change("priority", e.target.value as Priority)}>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
      </label>

      <label>Due date
        <input type="date" value={values.dueDate}
          onChange={e => change("dueDate", e.target.value)}
          onBlur={() => blur("dueDate")} />
      </label>
      {touched.dueDate && errors.dueDate && <p role="alert">{errors.dueDate}</p>}

      <label>Notes
        <textarea value={values.notes}
          onChange={e => change("notes", e.target.value)}
          onBlur={() => blur("notes")} />
      </label>
      {touched.notes && errors.notes && <p role="alert">{errors.notes}</p>}

      <label className="checkbox-label">
        <input type="checkbox" checked={values.done}
          onChange={e => change("done", e.target.checked)} /> Completed
      </label>

      {serverError && <p role="alert">{serverError}</p>}
      <button disabled={saving}>{saving ? "Saving…" : submitLabel}</button>
    </form>
  );
}
