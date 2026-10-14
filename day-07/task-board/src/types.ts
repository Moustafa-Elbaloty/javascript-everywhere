export type Priority = "low" | "medium" | "high";

export type Filter = "all" | "open" | "done";

export type Sort = "added" | "priority" | "title";

export interface Task {
  readonly id: number;
  title: string;
  done: boolean;
  priority: Priority;
}
