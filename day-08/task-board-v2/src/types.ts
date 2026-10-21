export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "open" | "done";
export type Sort = "added" | "due" | "priority";

export interface TaskFormValues {
  title: string;
  priority: Priority;
  dueDate: string;
  notes: string;
  done: boolean;
}

export interface Task extends TaskFormValues {
  readonly id: number;
}

export type TaskErrors = Partial<Record<keyof TaskFormValues, string>>;
