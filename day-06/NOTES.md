# Day 06 Notes

Part 1 — TypeScript and JavaScript

- TypeScript types are removed when the code is compiled to JavaScript.
- Running `node file.ts` is not proof that TypeScript was compiled correctly. Node may execute syntax that happens to be valid JavaScript.
- An error has five useful parts: error name, message, file, line/column, and stack trace.
- The three error codes I met most were:
  - `TS2307` — module/file cannot be found.
  - `TS18047` — a value may be `null`.
  - `TS2322` — a value has an incompatible type.

Part 2 — Types

- Annotation means I explicitly write the type. Inference means TypeScript determines the type from the value.
- The seven primitive types are `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`.
- `number` represents both integers and floating-point numbers.
- `null` means an intentional empty value, while `undefined` usually means a value has not been assigned.
- Strict mode makes TypeScript deal with `null` and `undefined` more safely.
- Arrays contain values of one general collection type, tuples have fixed positions/types, and objects describe named properties.
- `any` removes most type checking. `unknown` forces me to check a value before using it. `as` only tells TypeScript how I want to treat a value; it does not validate the actual runtime data.
- For outside data such as API responses, `unknown` plus validation is safer than `any`.
- Enums do not work with today's setup because of `erasableSyntaxOnly`. `as const` can be used instead when I only need literal values.

Part 3 — Functions and Narrowing

- Optional parameters use `?`.
- Default parameters provide a value when an argument is missing.
- Rest parameters collect multiple arguments into an array.
- Narrowing means reducing a broad type to a more specific type after checking it.
- Discriminated unions use a shared literal property to determine which member of a union I have.
- Type guards are checks such as `typeof`, `in`, and custom functions that help TypeScript narrow a value.

Part 4 — Interfaces and Classes

- `interface` and `type` can both describe object shapes. My rule is to use interfaces for extendable object contracts and types when unions, tuples, or more complex compositions are useful.
- TypeScript uses structural typing. If an object has the required structure, it can usually be assigned to that type.
- A typo such as `scor` instead of `score` matters because the structure no longer matches what the type expects.
- `#private` is JavaScript runtime private state.
- `private` is TypeScript access control.
- `readonly` prevents reassignment through the type.
- `instanceof` works with classes at runtime. It cannot check an interface because interfaces disappear after compilation.

Part 5 — Generics and Build

- Generics allow me to write reusable code while keeping the type information.
- Example:
  `function first<T>(items: T[]): T | undefined { return items[0]; }`
- `<T extends { id: number }>` means that `T` must contain an `id` property whose type is `number`.
- `<K extends keyof T>` means `K` must be one of the keys of `T`.
- Utility types:
  - `Pick` selects specific properties.
  - `Partial` makes selected properties optional.
  - `Readonly` makes properties read-only.
- `rootDir` tells TypeScript where source files are.
- `outDir` tells TypeScript where compiled files go.
- `target` selects the JavaScript language target.
- `module` controls the module system.
- `lib` provides available JavaScript and browser APIs.
- `types` includes specific type packages such as Node.
- `strict` enables strict type checking.
- `noUncheckedIndexedAccess` makes indexed access safer.
- `verbatimModuleSyntax` keeps type/value import behavior explicit.
- `erasableSyntaxOnly` allows only syntax that can be erased safely.
- `rewriteRelativeImportExtensions` rewrites relative TypeScript imports for the compiled output.
- `skipLibCheck` skips checking declaration files from dependencies.
- `include` tells TypeScript which files belong to the project.
- `node` runs JavaScript.
- `tsc` checks or compiles TypeScript.
- `npm run build` compiles the project into `dist`.
- `import type` makes it clear that an import is used only as a type.
- With this setup, relative imports can use `.ts` extensions and TypeScript rewrites them for the output.
- The browser loads the compiled files from `dist`, not the TypeScript source directly.
- In Task 10.3, the first errors showed me that the important lesson is to read the first useful TypeScript error and fix the cause instead of guessing.

Part 6 — HTTP and REST

- The basic request/response flow is:

  Browser/client → HTTP request → Server → HTTP response → Browser/client

- A URL contains parts such as protocol, host, port, path, and query string.
- `URLSearchParams` makes it easier to read and create query parameters.
- CRUD maps to HTTP methods:
  - Create → `POST`
  - Read → `GET`
  - Update → `PATCH`
  - Delete → `DELETE`
- Common status codes:
  - `200` successful request
  - `201` resource created
  - `204` successful response with no body
  - `400` bad request
  - `404` resource not found
  - `500` server error
- `4xx` usually means the client/request is wrong.
- `5xx` usually means the server failed.
- Retrying a `5xx` may make sense in some situations; retrying every `4xx` usually does not.
- `fetch` resolves its promise even when the server returns `404` or another HTTP error. I have to check `response.ok`.

Part 7 — API Client

- I can separate the API client into layers:
  1. HTTP layer — performs the request.
  2. API layer — knows the application endpoints.
  3. UI layer — displays data and handles user interaction.
- A timeout stops waiting when a request takes too long.
- `AbortController` can cancel a fetch.
- Cancellation is useful when an old request is no longer relevant and I do not want a stale response to overwrite newer state.
- `request<T>` returning a `Result` gives the caller an explicit success/error result instead of hiding failures.
- CORS controls whether a browser allows a page from one origin to access another origin.
- Secrets such as API keys must not be placed in browser code because users can inspect the client.

Part 8 — HTML, CSS and Browser UI

- Semantic HTML elements I used include:
  - `header`
  - `nav`
  - `main`
  - `section`
  - `footer`
- A form normally submits when the user presses its submit control.
- `preventDefault()` stops the browser's default form submission.
- `FormData` makes it easy to collect form values.
- Flexbox is mainly useful for one-dimensional layouts.
- Grid is useful for two-dimensional layouts.
- `textContent` inserts text as text.
- `innerHTML` parses HTML and can create an XSS risk when untrusted input is inserted.
- Event delegation means putting one event listener on a parent and handling events from its children.
- The UI pattern is:
  `state → render → events → update state → render`

Part 9 — Architecture

- The main architectural lesson is to keep responsibilities separated between shared types/validation, server code, HTTP/API code, and UI code.
- Optimistic updates change the UI before the server confirms the operation. They are useful when the action is expected to succeed and fast feedback is important.
- Pessimistic updates wait for the server response before treating the change as complete. They are useful when server confirmation is important.
- `shared/` contains things that both client and server need, such as the Task types and validation logic.
- In Task 21, the shared code helps keep the client and server using the same data contract.

Bugs I Hit

# First half

I had missing shared files such as `src/shared/types.ts` and `src/shared/validate.ts`, which caused `TS2307` module-not-found errors. I fixed it by creating the required files and adding the shared types and validation code.

I also had a problem where `npm run check` printed the TypeScript help instead of checking the project. The lesson was to verify the npm script and project configuration.

# Second half

The smoke test first failed with:

`Can't reach the server (fetch failed). Is it running?`

The API server was not running, so I started it with `npm run api`.

I also got TypeScript errors saying:

`'root' is possibly 'null'`

The fix was to check that the DOM element exists before using it.

Another important issue was learning that `fetch` does not throw just because the server returns `404`; I need to check `response.ok`.
