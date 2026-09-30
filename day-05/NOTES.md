Day 05 Notes

Parts 1–2

What a Promise is
A Promise represents a result that will be available later. It has three states: pending, fulfilled, and rejected. A Promise settles only once, so after it becomes fulfilled or rejected, its state cannot change again. This prevents the kind of repeated callback result that caused a bug in Day 04.

The missing-return bug
If a Promise is created inside a `.then()` callback but is not returned, the next `.then()` does not wait for it. This can make the chain continue too early and produce the wrong result.

One catch or one try
With Promise chains, one `.catch()` can handle errors from the chain instead of checking `if (err)` after every callback. With `async/await`, one `try/catch` can handle errors from several awaited operations.

all vs allSettled vs race vs any

- `Promise.all()` waits for all Promises and rejects if one rejects.
- `Promise.allSettled()` waits for all Promises and gives the result of each one.
- `Promise.race()` settles when the first Promise settles.
- `Promise.any()` fulfills when the first Promise fulfills and rejects only when all Promises reject.

  then and setTimeout
  Promise `.then()` callbacks run as microtasks. A `setTimeout(..., 0)` callback is a task, so the Promise callback runs before the timer callback.

  What await pauses
  `await` pauses the execution of the current async function until the Promise settles. It does not block the whole JavaScript program or stop other asynchronous operations.

  Sequential vs parallel
  Before every `await`, I should ask whether the next operation depends on the previous one. If it does, sequential execution is needed. If they are independent, they can usually be started together and awaited in parallel. My Task 5.2 timings showed the difference between the two approaches.

  forEach(async ...) and return await
  `forEach()` does not wait for async callbacks, so it cannot be used to wait for all asynchronous operations. Inside `try/catch`, `return await` makes the rejection happen inside that `try`, allowing the `catch` to handle it.

  Part 3

  What a module is
  A module is a separate JavaScript file that can expose selected values and use values from other modules. Three important rules are using the correct module system, exporting the values that need to be shared, and importing them correctly.

  module.exports vs exports
  In CommonJS, `module.exports` is the actual exported value. `exports` initially refers to `module.exports`, but assigning a new value directly to `exports` does not replace `module.exports`.

  Named vs default exports
  Named exports allow a module to export multiple specific values and require their names when importing. A default export represents the main exported value and can be imported with any local name. I prefer named exports when a module provides several related functions because the imported names make their purpose clear.

  CommonJS vs ESM

1. CommonJS uses `require()` while ESM uses `import`.
2. CommonJS uses `module.exports` while ESM uses `export`.
3. ESM supports named and default exports directly.
4. ESM uses static module syntax.
5. ESM works naturally with `async` module loading and modern browser modules.

Live bindings vs copies
ESM imports are live bindings, so the imported binding reflects changes to the exported value. This is different from treating an imported value as an independent copy. My 15 and 16 exercises demonstrated this difference.

Browser modules and Live Server
A browser module page needs to be served through HTTP during this exercise. `type="module"` tells the browser to treat the script as an ES module, which enables `import` and `export`.

Task 7.4
The Day 04 `report.js` had 222 lines. The Day 05 `report.js` had 112 lines, while `report.js` together with `lib/` had 297 lines. The number of `letterGrade` copies went from 4 in Day 03–04 to 1 after moving the reusable logic into the module.

Part 4

Working tree, staging area, and history
The working tree contains my current file changes. The staging area contains the changes prepared for the next commit. The history contains commits that have already been recorded.

```text
Working tree
     ↓
git add
     ↓
Staging area
     ↓
git commit
     ↓
History


Day 04 report.js: 222 lines

Today's report.js + lib/: 297 lines

Copies of letterGrade — Day 03–04: 4

Copies of letterGrade — now: 1

The report.js itself is shorter, going from 222 lines to 112 lines.

The grading and async logic are now separated into reusable modules, making report.js clearer.
```
