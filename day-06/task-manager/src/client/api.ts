import {
  isTask,
  isTaskList
} from "../shared/validate.ts";

import type {
  NewTask,
  Task,
  TaskUpdate
} from "../shared/types.ts";

import { request } from "./http.ts";

export async function getTasks(): Promise<Task[]> {
  const data = await request<unknown>(
    "/api/tasks"
  );

  if (!isTaskList(data)) {
    throw new Error(
      "Invalid task list received from API"
    );
  }

  return data;
}

export async function createTask(
  input: NewTask
): Promise<Task> {
  const data = await request<unknown>(
    "/api/tasks",
    {
      method: "POST",
      body: JSON.stringify(input)
    }
  );

  if (!isTask(data)) {
    throw new Error(
      "Invalid task received from API"
    );
  }

  return data;
}

export async function updateTask(
  id: number,
  update: TaskUpdate
): Promise<Task> {
  const data = await request<unknown>(
    `/api/tasks/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(update)
    }
  );

  if (!isTask(data)) {
    throw new Error(
      "Invalid task received from API"
    );
  }

  return data;
}

export async function deleteTask(
  id: number
): Promise<void> {
  await request<void>(
    `/api/tasks/${id}`,
    {
      method: "DELETE"
    }
  );
}
