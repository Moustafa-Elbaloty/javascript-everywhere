"use strict";
// 2.1 Primitive and basic
const isActive = true;
const age = 30;
const userName = "Mostafa";
const inferredBoolean = false;
const inferredNumber = 100;
const inferredString = "TypeScript";
const emptyValue = null;
const missingValue = undefined;
const bigNumber = 12345678901234567890n;
const uniqueId = Symbol("id");
// 2.2 The primitives
const message = "Hello TypeScript";
console.log(message.toUpperCase());
console.log(message.toLowerCase());
console.log(message.includes("Type"));
const decimal = 0.1 + 0.2;
console.log(decimal);
console.log(Number.isNaN(NaN));
const loggedIn = true;
console.log(loggedIn);
const huge = 100n;
console.log(huge + 50n);
const token = Symbol("token");
console.log(token);
const optionalName = null;
console.log(optionalName);
const rawValue = "TypeScript";
if (typeof rawValue === "string") {
    console.log(rawValue.toUpperCase());
}
// 2.3 Arrays, tuples, objects
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const filtered = numbers.filter((n) => n > 2);
const total = numbers.reduce((sum, n) => sum + n, 0);
console.log(doubled);
console.log(filtered);
console.log(total);
const emptyList = [];
emptyList.push("TypeScript");
console.log(emptyList);
const students = [
    { name: "Sara", score: 92 },
    { name: "Omar", score: 85 }
];
console.log(students);
const matrix = [
    [1, 2],
    [3, 4]
];
console.log(matrix);
const studentTuple = [
    "Sara",
    92
];
console.log(studentTuple);
const user = {
    name: "Sara"
};
console.log(user);
const profile = {
    name: "Mostafa",
    address: {
        city: "Qena",
        country: "Egypt"
    }
};
console.log(profile);
// 2.4 Conversions and typeof
const numericString = "42";
const convertedNumber = Number(numericString);
const parsedInteger = parseInt(numericString, 10);
const parsedFloat = parseFloat("42.5");
console.log(convertedNumber);
console.log(parsedInteger);
console.log(parsedFloat);
const numberValue = 123;
const stringValue = String(numberValue);
console.log(stringValue);
console.log(typeof stringValue);
const textValue = "123";
const numberFromText = Number(textValue);
console.log(numberFromText);
console.log(typeof numberFromText);
console.log(typeof "hello");
console.log(typeof 123);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof 10n);
console.log(typeof Symbol("x"));
// typeof null returns "object" because of a historical JavaScript language behavior.
