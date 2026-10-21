import { Link, useNavigate, useParams } from "react-router";
import { useBoard } from "../board-context";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useBoard();
  const navigate = useNavigate();
  const task = tasks.find(item => item.id === Number(id));

  if (!task) return <><h1>Task not found</h1><Link to="/">Back to tasks</Link></>;

  return <>
    <h1>{task.title}</h1>
    <p>Status: {task.done ? "Done" : "Open"}</p>
    <p>Priority: {task.priority}</p>
    <p>Due date: {task.dueDate || "No due date"}</p>
    <p>Notes: {task.notes || "No notes"}</p>
    <p><Link to={`/tasks/${task.id}/edit`}>Edit</Link>{" · "}
      <Link to={`/tasks/${task.id}/duplicate`}>Duplicate</Link>{" · "}
      <button onClick={() => { updateTask(task.id, { ...task, done: !task.done }); }}>Toggle completed</button>{" · "}
      <button onClick={() => navigate(-1)}>Back</button>
    </p>
  </>;
}
