import { createServer } from "node:http";

let tasks = [
  {
    id: 1,
    title: "Learn TypeScript",
    priority: "high",
    done: false
  },
  {
    id: 2,
    title: "Practice Fetch",
    priority: "medium",
    done: false
  },
  {
    id: 3,
    title: "Build API",
    priority: "low",
    done: false
  }
];

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify(data));
}

function sendText(res, status, text) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end(text);
}

async function readBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  // GET /
  if (req.method === "GET" && url.pathname === "/") {
    sendJson(res, 200, {
      name: "Task API",
      version: "1.0.0",
      status: "ok"
    });

    return;
  }

  // GET /api/tasks
  if (
    req.method === "GET" &&
    url.pathname === "/api/tasks"
  ) {
    sendJson(res, 200, tasks);
    return;
  }

  // GET /api/tasks/:id
  const match = url.pathname.match(
    /^\/api\/tasks\/(\d+)$/
  );

  if (match) {
    const id = Number(match[1]);

    // GET
    if (req.method === "GET") {
      const task = tasks.find(
        (item) => item.id === id
      );

      if (!task) {
        sendJson(res, 404, {
          error: "Task not found"
        });

        return;
      }

      sendJson(res, 200, task);
      return;
    }

    // DELETE
    if (req.method === "DELETE") {
      const index = tasks.findIndex(
        (item) => item.id === id
      );

      if (index === -1) {
        sendJson(res, 404, {
          error: "Task not found"
        });

        return;
      }

      tasks.splice(index, 1);

      res.writeHead(204);
      res.end();
      return;
    }

    // PATCH
    if (req.method === "PATCH") {
      const task = tasks.find(
        (item) => item.id === id
      );

      if (!task) {
        sendJson(res, 404, {
          error: "Task not found"
        });

        return;
      }

      const body = await readBody(req);

      if (
        body === null ||
        (
          body.done !== undefined &&
          typeof body.done !== "boolean"
        )
      ) {
        sendJson(res, 400, {
          error: "done must be a boolean"
        });

        return;
      }

      if (body.title !== undefined) {
        if (typeof body.title !== "string") {
          sendJson(res, 400, {
            error: "title must be a string"
          });

          return;
        }

        task.title = body.title;
      }

      if (body.priority !== undefined) {
        if (typeof body.priority !== "string") {
          sendJson(res, 400, {
            error: "priority must be a string"
          });

          return;
        }

        task.priority = body.priority;
      }

      if (body.done !== undefined) {
        task.done = body.done;
      }

      sendJson(res, 200, task);
      return;
    }

    // PUT is intentionally unsupported
    if (req.method === "PUT") {
      sendJson(res, 405, {
        error: "Method Not Allowed"
      });

      return;
    }
  }

  // POST /api/tasks
  if (
    req.method === "POST" &&
    url.pathname === "/api/tasks"
  ) {
    const body = await readBody(req);

    if (
      body === null ||
      typeof body.title !== "string" ||
      body.title.trim() === ""
    ) {
      sendJson(res, 400, {
        error: "title is required"
      });

      return;
    }

    if (
      body.priority !== undefined &&
      !["low", "medium", "high"].includes(body.priority)
    ) {
      sendJson(res, 400, {
        error: "priority must be low, medium, or high"
      });

      return;
    }

    const task = {
      id:
        tasks.length === 0
          ? 1
          : Math.max(...tasks.map((item) => item.id)) + 1,
      title: body.title.trim(),
      priority: body.priority ?? "medium",
      done: body.done ?? false
    };

    tasks.push(task);

    sendJson(res, 201, task);
    return;
  }

  sendJson(res, 404, {
    error: "Route not found"
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Task API running on http://localhost:3000");
});
