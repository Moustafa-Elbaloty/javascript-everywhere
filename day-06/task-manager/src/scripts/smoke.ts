const base =
  "http://localhost:3000";

async function request(
  path: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(
    `${base}${path}`,
    options
  );
}

const list =
  await request("/api/tasks");

if (!list.ok) {
  throw new Error(
    `GET /api/tasks failed: ${list.status}`
  );
}

const created =
  await request(
    "/api/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        title:
          "Smoke test task",
        priority:
          "low"
      })
    }
  );

if (created.status !== 201) {
  throw new Error(
    `POST /api/tasks failed: ${created.status}`
  );
}

const task =
  (await created.json()) as {
    id: number;
  };

const patched =
  await request(
    `/api/tasks/${task.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        done: true
      })
    }
  );

if (!patched.ok) {
  throw new Error(
    `PATCH failed: ${patched.status}`
  );
}

const deleted =
  await request(
    `/api/tasks/${task.id}`,
    {
      method: "DELETE"
    }
  );

if (deleted.status !== 204) {
  throw new Error(
    `DELETE failed: ${deleted.status}`
  );
}

console.log(
  "Smoke test passed."
);
