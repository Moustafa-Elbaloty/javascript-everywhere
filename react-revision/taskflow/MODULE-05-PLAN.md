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

## Task 3 — Search shortcut

I will keep a ref to the search input and listen for the slash key
with useEffect. The handler will ignore typing fields, focus the search
input otherwise, and remove its listener during cleanup.

## Task 4 — Generic countBy

I will create a generic countBy helper that groups items by a key
returned from a callback and counts how many items belong to each key.

I will use it to calculate task counts by status and display
the results below the Tasks section title.
