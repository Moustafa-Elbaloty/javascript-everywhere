// 1
console.log(a);
var a = 1;

// undefined

// 2
console.log(b);
let b = 2;

// ReferenceError

// 3
hello();
function hello() { console.log("hi"); }

// hi

// 4
bye();
const bye = () => console.log("bye");

// ReferenceError

// 5
function f() { return; 42; }
console.log(f());

// undefined

// 6
const g = (x) => { x \* 2 };
console.log(g(5));

// undefined ====> me 10

// 7
const h = (x) => { value: x };
console.log(h(5));

// undefined

// 8
function k(a, b) { return a + b; }
console.log(k(1));

// NaN ===> me undefined

// 9
function m(x = 10) { return x; }
console.log(m(null), m(undefined), m(0));

// null 10 0

// 10
let n = "outer";
function p() { let n = "inner"; return n; }
console.log(p(), n);

// inner outer

// 11
for (var i = 0; i < 3; i++) {}
console.log(i);

// 3

// 12
for (let j = 0; j < 3; j++) {}
console.log(j);

// ReferenceError

// 13
function counter() { let c = 0; return () => ++c; }
const q = counter();
console.log(q(), q(), counter()());

// 1 2 1 =>>> 1 1 1

// 14
const nums = [1, 2, 3];
console.log(nums.map((x) => x \* 2));

// [2, 4, 6]

// 15
function r() { console.log("ran"); }
console.log(r);

// [Function: r]
