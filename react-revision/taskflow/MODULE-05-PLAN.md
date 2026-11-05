# Module 05 — Task 1 Approach

I will create a custom hook that receives a title and updates document.title
inside useEffect whenever the title changes.

TaskList will call the hook with a title based on the number of open tasks,
so the browser tab stays in sync with the task list.

## Task 2 — Remember filters

I will create a generic useLocalStorage hook that reads the saved value
once when the component initializes and returns a useState-style setter.

An effect will update localStorage whenever the value changes. App will
use two separate keys for the search text and the status filter.
