# Module 01 — Reflection

### 1. Why is a task card a good candidate for a component?

A task card is a good component because it has a clear structure that can be reused for multiple tasks. Each card receives different task data while keeping the same layout.

### 2. What happens if a component name starts with a lowercase letter?

React treats lowercase JSX tags as HTML elements instead of custom React components. Component names should start with an uppercase letter so React can recognize them correctly.

### 3. Why do we wrap two sibling elements in `<> </>`?

JSX requires a component to return one parent element. A Fragment (`<> </>`) groups sibling elements without adding an unnecessary DOM element.

# Module 02 - Reflection

### 1. When would you choose type over interface?

I choose `type` when I need to define union types or combine different types.
I use `interface` mainly to describe the shape of objects.

### 2. Why do we pass the whole task as one prop?

Passing the whole task keeps related data together and makes the component easier to use.
It also avoids passing many separate props to the same component.

### 3. What does ?? do differently from ||?

The `??` operator uses the fallback value only when the original value is `null` or `undefined`.
The `||` operator uses the fallback when the value is falsy, such as `0`, `false`, or an empty string.
