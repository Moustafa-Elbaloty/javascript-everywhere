import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import type { TaskFormValues } from "../types";
import { useBoard } from "../board-context";
import TaskForm from "../components/TaskForm";

interface Extra { pretendToSave: (title: string) => Promise<void> }

const empty: TaskFormValues = { title: "", priority: "medium", dueDate: "", notes: "", done: false };

export default function TaskFormPage() {
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useBoard();
  const { pretendToSave } = useOutletContext<Extra>();
  const navigate = useNavigate();
  const isEdit = location.pathname.endsWith("/edit");
  const isDuplicate = location.pathname.endsWith("/duplicate");
  const source = id ? tasks.find(task => task.id === Number(id)) : undefined;

  if ((isEdit || isDuplicate) && !source) return <><h1>Task not found</h1><Link to="/">Back to tasks</Link></>;

  const initial: TaskFormValues = source
    ? { title: isDuplicate ? `Copy of ${source.title}` : source.title,
        priority: source.priority, dueDate: isDuplicate && source.dueDate < new Date().toLocaleDateString("en-CA") ? "" : source.dueDate,
        notes: source.notes, done: isDuplicate ? false : source.done }
    : empty;

  async function submit(values: TaskFormValues) {
    await pretendToSave(values.title);
    if (isEdit && source) {
      updateTask(source.id, values);
      navigate(`/tasks/${source.id}`, { replace: true });
    } else {
      const created = addTask(values);
      navigate(isDuplicate ? `/tasks/${created.id}` : `/tasks/${created.id}`, { replace: true });
    }
  }

  return <>
    <h1>{isEdit ? "Edit task" : isDuplicate ? "Duplicate task" : "New task"}</h1>
    <TaskForm key={`${id ?? "new"}-${isDuplicate ? "duplicate" : isEdit ? "edit" : "new"}`}
      initial={initial} submitLabel={isEdit ? "Save changes" : "Create task"}
      checkPast={!isDuplicate} onSubmit={submit} />
  </>;
}
