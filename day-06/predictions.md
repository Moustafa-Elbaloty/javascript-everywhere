== Prediction A — tsc

❌ Error

`score` is inferred as `number`, so assigning a `string` is not allowed.

== Prediction B — node

```text
92
```

== Task 1 — Predict, then check — TypeScript

P01

== Prediction A — tsc
Error

== Prediction B — node
92

== Actual

- tsc: Error
- node: 92

== Why
TypeScript detects that `score` is a number and cannot be assigned a string. Node runs the JavaScript without TypeScript type checking.

---

P02

== Prediction A — tsc
Error at `g2`

== Prediction B — node
A A

== Actual

- tsc: Error
- node: A A

== Why
`const grade = "A"` keeps the literal type `"A"`, while `let other = "A"` is widened to `string`.

== Mechanism
Literal type widening.

---

P03

== Prediction A — tsc
Accepted

== Prediction B — node
23

== Actual

- tsc: Accepted
- node: 23

== Why
`"3" as any` bypasses TypeScript's type checking. At runtime, `2 + "3"` performs string concatenation.

---

P04

== Prediction A — tsc
Error

== Prediction B — node
Runtime TypeError

== Actual

- tsc: Error
- node: Runtime TypeError

== Why
`scores[5]` can be `undefined`, so calling `toFixed()` is unsafe.

== Mechanism
`noUncheckedIndexedAccess` and possible `undefined`.

---

P05

== Prediction A — tsc
Error

== Prediction B — node
Runtime TypeError

== Actual

- tsc: Error
- node: Runtime TypeError

== Why
`find()` returns `undefined` because no element is greater than 95. Calling `toFixed()` on `undefined` fails.

---

P06

== Prediction A — tsc
Error

== Prediction B — node
Runtime TypeError

== Actual

- tsc: Error
- node: Runtime TypeError

== Why
The optional parameter `name` can be `undefined`, so `name.toUpperCase()` is unsafe.

---

P07

== Prediction A — tsc
Error

== Prediction B — node
[ 'Sara', 92, true ]

== Actual

- tsc: Error
- node: [ 'Sara', 92, true ]

== Why
The tuple is declared as `[string, number]`, but three elements were supplied. Node sees an ordinary JavaScript array.

---

P08

== Prediction A — tsc
Error

== Prediction B — node
{ name: 'Sara', score: 92, age: 20 }

== Actual

- tsc: Error
- node: { name: 'Sara', score: 92, age: 20 }

== Why
The object literal contains the extra `age` property, which fails excess property checking.

---

P09

== Prediction A — tsc
Accepted

== Prediction B — node
{ name: 'Sara', score: 92, age: 20 }

== Actual

- tsc: Accepted
- node: { name: 'Sara', score: 92, age: 20 }

== Why
`data` contains all required properties of `Student`. Extra properties are allowed when assigning an existing variable.

== Mechanism
Structural typing.

---

P10

== Prediction A — tsc
Accepted

== Prediction B — node
{ id: 1, tags: [ 'ts' ] }

== Actual

- tsc: Accepted
- node: { id: 1, tags: [ 'ts' ] }

== Why
`readonly` prevents changing `id`, but it does not make the nested `tags` array immutable.

== Mechanism
Shallow `readonly`.

---

P11

== Prediction A — tsc
Error

== Prediction B — node
Sara

== Actual

- tsc: Error
- node: Sara

== Why
`raw` is `unknown`, so TypeScript does not allow property access until the value is narrowed.

---

P12

== Prediction A — tsc
Accepted

== Prediction B — node
Runtime TypeError

== Actual

- tsc: Accepted
- node: Runtime TypeError

== Why
`raw` is `any`, so TypeScript does not check whether `nmae` exists. At runtime `nmae` is `undefined`.

== Mechanism
`any` removes static type safety.

---

P13

== Prediction A — tsc
Accepted

== Prediction B — node
A 2.0

== Actual

- tsc: Accepted
- node: A 2.0

== Why
The `typeof` check narrows `x` from `string | number` to the correct type in each branch.

---

P14

== Prediction A — tsc
Accepted

== Prediction B — node
4 a1

== Actual

- tsc: Accepted
- node: 4 a1

== Why
TypeScript infers `n` as `number` and `s` as `string`.

== Mechanism
Generic type inference.

---

P15

== Prediction A — tsc
Error at `longest(10, 20)`

== Prediction B — node
abc [ 1, 2 ]
20

== Actual

- tsc: Error
- node: abc [ 1, 2 ] then 20

== Why
`number` does not satisfy `{ length: number }`. The generic constraint exists only during TypeScript checking.

---

P16

== Prediction A — tsc
Error

== Prediction B — node
Promise { 92 }

== Actual

- tsc: Error
- node: Promise { 92 }

== Why
An `async` function always returns a `Promise`, not the raw number.

---

P17

== Prediction A — tsc
Accepted

== Prediction B — node
92.0

== Actual

- tsc: Accepted
- node: 92.0

== Why
`await` unwraps the Promise and produces the number `92`.

---

P18

== Prediction A — tsc
Error

== Prediction B — node
boom

== Actual

- tsc: Error
- node: boom

== Why
With `useUnknownInCatchVariables`, `err` is `unknown`, so `err.message` cannot be accessed directly.

---

P19

== Prediction A — tsc
Accepted

== Prediction B — node
92 undefined

== Actual

- tsc: Accepted
- node: 92 undefined

== Why
The type assertion `as Student` only changes TypeScript's view of the object. It does not create the missing `score` property.

== Mechanism
Type assertion is compile-time only.

---

P20

== Prediction A — tsc
Accepted

== Prediction B — node
0

== Actual

- tsc: Accepted
- node: 0

== Why
Numeric enums start at `0` by default.

== Mechanism
Numeric enum runtime behavior.

---

P21

== Prediction A — tsc
Error at `full`

== Prediction B — node
{ score: 80 } { score: 80 }

== Actual

- tsc: Error
- node: { score: 80 } { score: 80 }

== Why
`Required<Partial<Student>>` makes both `name` and `score` required, but `name` is missing.

---

P22

== Prediction A — tsc
Error at `b`

== Prediction B — node
M L

== Actual

- tsc: Error
- node: M L

== Why
`keyof typeof sizes` produces `"S" | "M"`, so `"L"` is invalid.

---

P23

== Prediction A — tsc
Accepted

== Prediction B — node
object object number bigint

== Actual

- tsc: Accepted
- node: object object number bigint

== Why
JavaScript's `typeof` returns `object` for `null` and arrays, `number` for `NaN`, and `bigint` for BigInt values.

== Mechanism
JavaScript `typeof` behavior.

---

P24

== Prediction A — tsc
Accepted

== Prediction B — node
[ 1, 'two' ]

== Actual

- tsc: Accepted
- node: [ 1, 'two' ]

== Why
The empty array can evolve as values are added, allowing both numbers and strings here.

---

P25

== Prediction A — tsc
Error

== Prediction B — node
Runtime TypeError

== Actual

- tsc: Error
- node: Runtime TypeError

== Why
JavaScript and TypeScript do not allow arithmetic between `bigint` and `number`.

---

P26

== Prediction A — tsc
Accepted

== Prediction B — node
3 [ 'Sara', 92, 100 ]

== Actual

- tsc: Accepted
- node: 3 [ 'Sara', 92, 100 ]

== Why
A tuple is still a JavaScript array at runtime. `push()` can mutate it with a value compatible with one of the tuple's element types.

== Mechanism
Tuple mutation through array methods.

---

P27

== Prediction A — tsc
Error

== Prediction B — node
light

== Actual

- tsc: Error
- node: light

== Why
`as const` makes the property readonly at the TypeScript level, but it does not freeze the JavaScript object at runtime.

== Mechanism
`as const` creates compile-time readonly/literal types.

---

P28

== Prediction A — tsc
Accepted

== Prediction B — node
NaN number true

== Actual

- tsc: Accepted
- node: NaN number true

== Why
`Number("12px")` cannot convert the complete string to a number, so it returns `NaN`.

---

== Required Mechanisms

| Snippet | Mechanism                                       |
| ------- | ----------------------------------------------- |
| P02     | Literal type widening                           |
| P04     | `noUncheckedIndexedAccess`                      |
| P09     | Structural typing                               |
| P10     | Shallow `readonly`                              |
| P14     | Generic type inference                          |
| P19     | Type assertion                                  |
| P20     | Numeric enum runtime behavior                   |
| P23     | JavaScript `typeof` behavior                    |
| P26     | Tuple mutation through array methods            |
| P27     | `as const` compile-time readonly/literal typing |

== tsc Rejects but Node Runs

P01, P02, P04, P05, P06, P07, P08, P11, P15, P18, P21, P22, P27.

These examples show that TypeScript performs static type checking while Node executes JavaScript at runtime.

== tsc Accepts but Node Fails

P12 — `any` allows an invalid property access.

P25 — JavaScript rejects mixing `bigint` and `number`.

== Most Surprising Result

P26 surprised me most because I expected the tuple to prevent `push(100)`. TypeScript checks the tuple's known element types and positions, but tuple values are still JavaScript arrays at runtime, and array methods such as `push()` can mutate them.

== Predictions Wrong

Number of wrong predictions: \_\_\_ / 56
