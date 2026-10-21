# Day 08 — Warm-up Predictions

## 1. Controlled input
Prediction: The input remains empty after typing because `value={t}` is controlled by state and there is no `onChange` handler.
Actual result: Not yet verified in a running browser.
Why: React restores the input value from the unchanged state.

## 2. Empty number input
Prediction: `Number(age)` is `0`; `age === 0` is `false`.
Actual result: `Number("")` evaluates to `0`; strict equality with numeric zero is false because `age` is a string.
Why: `useState("")` stores a string, and strict equality does not coerce types.

## 3. Cancel button
Prediction: Clicking Cancel submits the form.
Actual result: Not yet verified in a running browser.
Why: A button inside a form defaults to `type="submit"` unless given another type.

## 4. Route matching
Prediction: `/tasks/new` renders `NewTask`; `/tasks/7` renders `Detail`.
Actual result: Not yet verified in the running app.
Why: React Router ranks the static route above the dynamic `:id` route.

## 5. useParams
Prediction: `typeof n` is `"string"` and `n === 3` is `false`.
Actual result: The route parameter is a string (`"3"`), so strict comparison with number `3` is false.
Why: URL path parameters are strings.

## 6. Search history
Prediction: Typing `react` with the default push behavior creates one history entry per keystroke. Five Back presses undo the five updates; one additional Back press leaves the page if the prior entry was another page.
Actual result: Not yet verified in the browser.
Why: `setSearchParams` pushes a history entry unless `{ replace: true }` is used.
