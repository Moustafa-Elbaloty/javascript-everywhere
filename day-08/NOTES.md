# Day 08 — Notes

1. Why are errors derived, not stored?

Errors are derived from the current form values using `validateBooking`. If errors were stored separately, they could become outdated when the user changes a field, causing the UI to show errors that no longer match the current values.

2. What problem does touched solve?

`touched` tracks which fields the user has visited and left. It prevents showing validation errors before the user has had a chance to interact with a field.

3. URL state vs useState

I kept search, region, sort, and page in the URL because they should survive refreshes and be shareable, and the Back button should restore previous choices. I kept the booking form values in `useState` because they are temporary input data for the current form.

4. One real bug I hit

During development, I had to verify the React Router setup and ensure `BrowserRouter` was not wrapped around the app twice. I checked the app entry point and router configuration, then kept a single `BrowserRouter` wrapper to avoid nested-router errors.
