Day 4 — Predictions

Part 1: Unpacking

1

const { a } = { a: 1, b: 2 };
console.log(a, typeof b);

Prediction:
1 "undefined"

Actual:
1 undefined

Result: Correct

2

const { x: y } = { x: 10 };
console.log(x);

Prediction:
10

Actual:
ReferenceError

Why:
x was renamed to y during destructuring, so x was never declared.

3

const { p = 5 } = { p: undefined };
console.log(p);

Prediction:
5

Actual:
5

Result: Correct

4

const { q = 5 } = { q: null };
console.log(q);

Prediction:
5

Actual:
null

Why:
The default value is used only when the value is undefined, not when it is null.

Mechanism:
Destructuring default values apply only to undefined.

5

const [, , third] = ["a", "b", "c", "d"];
console.log(third);

Prediction:
c

Actual:
c

Result: Correct

6

const arr = [1, 2];
const copy = arr;
copy.push(3);
console.log(arr.length);

Prediction:
2

Actual:
3

Why:
copy does not create a new array. Both variables reference the same array.

7

const obj = { nested: { v: 1 } };
const shallow = { ...obj };
shallow.nested.v = 99;
console.log(obj.nested.v);

Prediction:
99

Actual:
99

Result: Correct

Mechanism:
Object spread creates a shallow copy. The nested object is still the same reference.

8

console.log({ ...{ b: 3 }, ...{ a: 1, b: 2 } });

Prediction:
{ b: 3, a: 1, b: 2 }

Actual:
{ b: 2, a: 1 }

Why:
The later b: 2 overwrites the earlier b: 3.

Mechanism:
Object spread is processed from left to right. Later properties overwrite earlier properties with the same key.

9

function f({ a } = {}) { return a; }
console.log(f(), f({ a: 7 }));

Prediction:
undefined 7

Actual:
undefined 7

Result: Correct

10

function g({ a }) { return a; }
console.log(g());

Prediction:
undefined

Actual:
TypeError

Why:
g() passes undefined, and JavaScript cannot destructure { a } from undefined.

Mechanism:
Destructuring undefined or null throws a TypeError.

11

const s = { name: "Sara" };
console.log(s.address.city);

Prediction:
undefined

Actual:
TypeError

Why:
s.address is undefined, so JavaScript cannot access .city from undefined.

12

console.log(0 || "fallback", 0 ?? "fallback");

Prediction:
0 "fallback"

Actual:
fallback 0

Why:
|| uses the right side when the left side is falsy. ?? only uses the right side when the left side is null or undefined.

Part 2: Order

13

console.log("a");
setTimeout(() => console.log("b"), 0);
console.log("c");

Prediction:
a
b
c

Actual:
a
c
b

Why:
Synchronous code runs first. The setTimeout callback runs later as a task.

14

setTimeout(() => console.log("timeout"), 0);
queueMicrotask(() => console.log("micro"));
console.log("sync");

Prediction:
sync
timeout
micro

Actual:
sync
micro
timeout

Why:
Synchronous code runs first, then microtasks, then timer callbacks.

15

for (var i = 0; i < 3; i++) {
setTimeout(() => console.log(i), 0);
}

Prediction:
0
1
2

Actual:
3
3
3

Why:
var creates one shared binding for i. The loop finishes before the callbacks execute.

Mechanism:
var is function-scoped and all callbacks close over the same i. When the timers execute, the final value is 3.

16

function later() {
setTimeout(() => { return 42; }, 0);
}
console.log(later());

Prediction:
42

Actual:
undefined

Why:
The return 42 belongs to the timer callback, not to the later() function.

17

setTimeout(() => console.log("timer"), 0);
const start = Date.now();
while (Date.now() - start < 500) {}
console.log("loop finished");

Prediction:
timer
loop finished

Actual:
loop finished
timer

Why:
The while loop blocks the main thread, so the timer cannot execute until the loop finishes.

18

setTimeout(() => console.log("outer"), 0);
setTimeout(() => {
console.log("first");
setTimeout(() => console.log("nested"), 0);
}, 0);
setTimeout(() => console.log("second"), 0);

Prediction:
outer
first
nested
second

Actual:
outer
first
second
nested

Why:
outer, first, and second are already queued. nested is added later while first is executing.

Mechanism:
A timer created inside another timer callback is queued after the callbacks already waiting in the task queue.

19

setTimeout(() => {
console.log("timer");
queueMicrotask(() => console.log("micro inside timer"));
}, 0);
setTimeout(() => console.log("timer 2"), 0);

Prediction:
timer
timer 2
micro inside timer

Actual:
timer
micro inside timer
timer 2

Why:
After the first timer callback finishes, the microtask queue is processed before the next timer task.

Mechanism:
Microtasks are drained after the current task and before the event loop moves to the next task.

20

try {
setTimeout(() => { throw new Error("late"); }, 0);
} catch (e) {
console.log("caught", e.message);
}
console.log("after try");

Prediction:
caught late
after try

Actual:
after try
Error: late

Why:
The timer callback runs after the try block has already finished, so the outer catch cannot catch the asynchronous error.

21

function load(cb) {
cb("sync call");
setTimeout(() => cb("async call"), 0);
}
load((msg) => console.log(msg));
console.log("after load");

Prediction:
sync call
async call
after load

Actual:
sync call
after load
async call

Why:
The first callback is called synchronously. The second callback is inside setTimeout.

Mechanism:
A callback is not automatically asynchronous. cb("sync call") executes immediately, while the callback inside setTimeout is deferred.

22
setTimeout(() => console.log("A"), 20);
setTimeout(() => console.log("B"), 10);
queueMicrotask(() => console.log("C"));
console.log("D");

Prediction:
D
B
C
A

Actual:
D
C
B
A

Why:
D is synchronous, C is a microtask, B runs after 10ms, and A runs after 20ms.

Summary

- Total snippets: 22
- Wrong predictions: 7

Mechanisms explained

- 4 — Destructuring default values
- 7 — Shallow copy
- 8 — Object spread overwrite
- 10 — Destructuring undefined
- 15 — var closure / shared binding
- 18 — Timer queue ordering
- 19 — Microtasks inside timers
- 21 — Synchronous vs asynchronous callbacks
