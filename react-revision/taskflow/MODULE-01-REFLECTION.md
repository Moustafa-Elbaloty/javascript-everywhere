# Module 01 — Reflection

### 1. Why is a task card a good candidate for a component?

A task card is a good component because it has a clear structure that can be reused for multiple tasks. Each card receives different task data while keeping the same layout.

### 2. What happens if a component name starts with a lowercase letter?

React treats lowercase JSX tags as HTML elements instead of custom React components. Component names should start with an uppercase letter so React can recognize them correctly.

### 3. Why do we wrap two sibling elements in `<> </>`?

JSX requires a component to return one parent element. A Fragment (`<> </>`) groups sibling elements without adding an unnecessary DOM element.
