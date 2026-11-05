# Module 05 — Reflection

## 1. What happens to an effect without cleanup in StrictMode?

In development, React StrictMode runs an extra setup-and-cleanup cycle for Effects to help find bugs. If an effect adds an event listener or starts a timer without cleanup, it can stay active and cause duplicate work.

## 2. Why does useState(readJson(...)) read storage on every render?

JavaScript evaluates `readJson(...)` before calling `useState`, so it runs every time the component renders. React only uses that value for the initial state, so the extra reads are wasted. Using `useState(() => readJson(...))` makes it run only during initialization.

## 3. When is useMemo not worth it?

I don't need useMemo for simple calculations that are already fast. It adds some complexity, so I should use it when a calculation is expensive or when keeping the same value reference helps avoid unnecessary work.
