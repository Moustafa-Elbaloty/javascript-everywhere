import { createContext, useContext } from "react";
import type { Task, TaskFormValues } from "./types";

export interface BoardContextValue {
  tasks: Task[];
  addTask: (values: TaskFormValues) => Task;
  updateTask: (id: number, values: TaskFormValues) => void;
  findTask: (id: number) => Task | undefined;
}

export const BoardContext = createContext<BoardContextValue | null>(null);

export function useBoard(): BoardContextValue {
  const value = useContext(BoardContext);
  if (!value) throw new Error("useBoard must be used inside Layout.");
  return value;
}
