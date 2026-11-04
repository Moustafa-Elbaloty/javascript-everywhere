# Module 04 Reflection — Forms & Data

## 1. Why doesn't useState(initialValues) update when initialValues changes?

useState uses the initial value only when the component mounts.
When the initialValues prop changes, React does not automatically
reset the state. In our project, I used a key based on the task ID
and form mode so React remounts the form with the correct values.

## 2. Is using a StatusFilter type safer or riskier than using string?

It is safer because it limits the filter to the values that are
actually supported by the application. TypeScript can catch invalid
values before running the application. A normal string would allow
any value, including values that do not match a task status.

## 3. Why should an empty date become undefined?

An empty date means that the user did not set a due date.
Using undefined represents a missing value more clearly than
keeping an empty string. It also makes optional date checks easier.
