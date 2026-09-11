// String
const name = "Sara";
console.log(`name → "${name}" → ${typeof name}`);

// Number
const age = 25;
console.log(`age → ${age} → ${typeof age}`);

// Null
const emptyValue = null;
console.log(`emptyValue → ${emptyValue} → ${typeof emptyValue}`);

// Undefined
let notDefined;
console.log(`notDefined → ${notDefined} → ${typeof notDefined}`);

// Object
const person = { name: "Sara", age: 25 };
console.log(`person → ${JSON.stringify(person)} → ${typeof person}`);

// Array
const colors = ["red", "blue", "green"];
console.log(`colors → ${JSON.stringify(colors)} → ${typeof colors}`);

// Boolean
const isStudent = true;
console.log(`isStudent → ${isStudent} → ${typeof isStudent}`);


// ==========

console.log(typeof null); //"It's weird in js".
console.log(typeof []);// Arrays are objects in JavaScript.
console.log(Array.isArray([]))

console.log(Number("42"));  // 42
console.log(typeof Number("42")); // "number"

console.log(String(42));  // "42"
console.log(typeof String(42));  // "string"

console.log(parseInt("42px"))// 42
console.log(Number("42px")); // NaN
// parseInt("42px") → gets the number from the beginning.
// Number("42px") → the whole string must be a valid number.

const values = [
    false,
    0,
    -0,
    0n,
    "",
    null,
    undefined,
    NaN,
    [],
    {},
    "0",
    "hello"
];

// for (const value of values) {
//     if (Boolean(value)) {
//         console.log(value, true);
//     } else {
//         console.log(value, false);
//     }
// }
values.forEach((value) => {
    if (Boolean(value)) {
        console.log(value, true);
    } else {
        console.log(value, false);
    }
}
)

// || treats 0 as falsy
const value = 0;

console.log(value || "default"); // "default"
console.log(value ?? "default"); // 0

// Use ?? when 0 is a valid value.