"use strict";
// 3.1 any, unknown, void, never
const anyValue = null;
try {
    console.log(anyValue.name.toUpperCase());
}
catch (error) {
    console.log("any runtime error:", error);
}
const unknownValue = "TypeScript";
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());
}
function logMessage(message) {
    console.log(message);
}
logMessage("Hello TypeScript");
function fail(message) {
    throw new Error(message);
}
try {
    fail("Something went wrong");
}
catch (error) {
    console.log("never error:", error);
}
const direction = "up";
const score = 100;
// const invalidScore: Score = 75;
// Error: Type '75' is not assignable to type 'Score'.
function printValue(value) {
    console.log(value);
}
printValue(100);
printValue("100");
const employee = {
    name: "Mostafa",
    age: 30,
    company: "WE"
};
console.log(employee);
// const incompleteEmployee: EmployeePerson = {
//   name: "Mostafa",
//   age: 30
// };
// Error: Property 'company' is missing.
// 3.3 Enums and as const
// enum Status {
//   Active,
//   Inactive
// }
// Editor/Node error was recorded, then the enum was deleted.
const statusValues = {
    Active: "active",
    Inactive: "inactive"
};
// Derived type:
// "active" | "inactive"
function printStatus(status) {
    console.log(status);
}
printStatus("active");
const validJson = JSON.parse('{"id":1,"name":"Laptop"}');
console.log(validJson.name);
const invalidJson = JSON.parse('{"id":1}');
console.log(invalidJson.name);
// TypeScript accepts the assertion, but the actual property is undefined.
const settings = {
    theme: "dark",
    language: "en"
};
// settings.theme = "light";
// Error: Cannot assign to 'theme' because it is a read-only property.
function getElement() {
    return null;
}
const element = getElement();
try {
    console.log(element.textContent);
}
catch (error) {
    console.log("Non-null assertion runtime error:", error);
}
if (element) {
    console.log(element.textContent);
}
// 'as' is acceptable when the programmer knows more than TypeScript,
// but external data should be validated instead of blindly trusting an assertion.
