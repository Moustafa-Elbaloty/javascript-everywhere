Day 03

Day 02 line count: 449
Day 03 total: 668

I can change the passing mark in one place instead of editing it in multiple places.

Day 03 Notes

1. Parameter vs Argument

A parameter is used in the function definition, while an argument is the value passed to it.

2. Function Types

Declaration is useful for named functions, expression stores a function in a variable, and arrow functions are shorter.

3. return vs console.log

return sends a value back, while console.log only displays it.

4. Guard Clause

It handles invalid cases early and keeps the main code simpler.

5. Scope

Global is available everywhere, function scope is inside a function, and block scope is inside a block.

6. Scope Chain

JavaScript searches for variables from the current scope outward.

7. Hoisting

Functions are available before their definition, var becomes undefined , while let and const stay unavailable until initialized.

8. TDZ

The TDZ is the time before let or const is initialized when accessing it causes an error.

9. Closure

A function can access variables from its outer scope.

10. fn vs fn()

fn passes the function, while fn() runs it immediately.

11. Task 5.3

Day 02: 449 lines
Day 03: 668 lines

One-place change: I can change the passing mark in one place.

12. Bug

Error: SyntaxError: Unexpected token 'export'

I had placed export inside formatRow() . I fixed it by moving it outside the function.
