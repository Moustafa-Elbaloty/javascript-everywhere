# Day 02 Notes

1.difference between const and let, and why can const still let you push into an array?

const cannot be reassigned, while let can. A const array can still be changed because push() changes the array contents, not the variable itself.

2.What are the 7 primitive types in JavaScript?

String, Number, BigInt, Boolean, Undefined, Null, Symbol.

3.Why does typeof null return "object", and how do you properly check for null?

typeof null returns "object" because of an old JavaScript behavior.

To properly check for null:
value === null

4. What are the 8 falsy values?

false, 0, -0, 0n, "", null, undefined, NaN.

5. What is the difference between === and ==?

=== checks the value and type without type conversion. == can convert types before comparing.

5 == "5" // true
5 === "5" // false

6.  When should you use ?? instead of ||?

Use ?? when 0, false, or "" are valid values, and you only want a default for null or undefined.

const age = 0;

age || 18; // 18
age ?? 18; // 0

7.When should you use each of the five loops?

for → when you need control over the loop.
while → when the loop depends on a condition.
do...while → when the code must run at least once.
for...of → to loop over values.
for...in → to loop over keys or indexes.

8.  difference between break and continue

break stops the loop completely.
continue skips the current iteration and continues with the next one.

9What bug did you hit today? What was the exact error message, and how did you fix it?

The error message was:

grade-engine.js: command not found

I fixed it by running the JavaScript file with Node:

node grade-engine.js
