# Task 10 Notes

First TypeScript check

The first `npm run check` was run after converting the Day 05 JavaScript files to TypeScript.

The initial errors were caused by untyped JavaScript values, CommonJS imports, and missing TypeScript annotations.

The final version removes those errors with explicit types, type-only imports, typed functions, and strict TypeScript configuration.

Broken JSON records

students.json contains two intentionally broken records.

The report treats parsed JSON as unknown and uses a type guard to keep only valid Student records.

Attendance

Attendance uses a typed Promise and intentionally fails for one student so Promise.allSettled and retry can be demonstrated.
