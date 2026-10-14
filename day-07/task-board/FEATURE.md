# Task Board — Feature Notes

- The sort value lives in `App.tsx` state because the selected sort option determines the order of the displayed tasks.
- The editing row ID lives in `App.tsx` state as `editingId: number | null` because the parent coordinates editing across all task rows.
- The editing state belongs in the parent so double-clicking another row moves edit mode to that row and ensures only one row is edited at a time.
