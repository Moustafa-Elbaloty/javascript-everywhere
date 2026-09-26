Day 04 Notes

1 Destructuring
Destructuring takes values from objects by property names and from arrays by position.

2 const { a: b } = obj
It creates a variable named b from the property a. It does not create a variable named a.

3 Default values
A destructuring default is used when the value is undefined. It does not replace null, false, 0, or an empty string.

4 const { x = undefined }
This does not throw by itself. The problem happens when the object being destructured is undefined or null. Use a safe default object when needed.

5 Rest vs spread
Rest collects multiple values into one variable. Spread expands values from an array or object into another array, object, or function call.

6 Shallow copy
A shallow copy copies the top level but keeps references to nested objects. Changing a nested object in the copy can therefore change the original.

7 Spread order
When merging objects, later properties overwrite earlier properties with the same key.

8 || vs ??
|| uses the right side when the left side is falsy. ?? uses the right side only when the left side is null or undefined. For example, 0 || 10 gives 10, while 0 ?? 10 gives 0.

9 Task 7.5
Day 03 grade-lib.js: 120 lines
Day 04 grade-lib.js: 113 lines

10 Single-threaded
JavaScript runs application code on one main thread. Blocking that thread stops the browser from handling other work such as typing and clicks.

11.Event loop
The call stack runs synchronous code. Browser APIs handle asynchronous work, and completed callbacks wait in queues until the event loop can move them to the stack.

12 setTimeout(fn, 0)
setTimeout does not run the function immediately. It schedules the callback, so current synchronous code finishes first.

13 Return from async callback
A return inside an asynchronous callback returns to that callback, not to the outer function. A callback, Promise, or another async mechanism is needed to receive the future result.

14 Error-first callbacks
The first callback argument is the error. The return prevents the success code from running after an error callback.

15.try/catch and setTimeout
try/catch only catches errors thrown while the try block is running. An error thrown later inside setTimeout happens after the try/catch has already finished.

16 Callback hell
Nested callbacks make code harder to read and maintain because each new asynchronous step increases indentation and error handling.

17.Parallel vs sequential
Parallel loading finishes around the longest delay, while sequential loading adds all delays together. Results were stored by index so they could be printed in the original order.

18 Bug
One bug was using ES module import syntax in report.js while the project was running it as CommonJS.

The error was:
Cannot use import statement outside a module

I fixed it by removing the import and using require for fs, while keeping the grade library functions in the file as required by the task.
