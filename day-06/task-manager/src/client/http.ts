import type { ApiErrorBody } from "../shared/types.ts";

export class HttpError extends Error {
  readonly status: number;

  constructor(
    status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    url,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }
  );

  if (response.status === 204) {
    return undefined as T;
  }

  const body: unknown =
    await response.json();

  if (!response.ok) {
    const errorBody =
      body as Partial<ApiErrorBody>;

    throw new HttpError(
      response.status,
      errorBody.error ??
        `Request failed with ${response.status}`
    );
  }

  return body as T;
}
