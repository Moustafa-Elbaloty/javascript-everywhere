"use strict";
// 4.2 narrowing-lab.ts - literal unions
function letterGrade(score) {
    if (score >= 90) {
        return "A";
    }
    if (score >= 80) {
        return "B";
    }
    if (score >= 70) {
        return "C";
    }
    if (score >= 60) {
        return "D";
    }
    return "F";
}
console.log(letterGrade(95));
function describeGrade(grade) {
    switch (grade) {
        case "A":
            return "Excellent";
        case "B":
            return "Very good";
        case "C":
            return "Good";
        case "D":
            return "Pass";
        case "F":
            return "Fail";
    }
}
console.log(describeGrade("A"));
// switch (grade) {
//   case "A":
//   case "B":
// }
// Error: grade was not defined in this scope.
// The invalid switch was recorded and removed.
// 4.3 narrowing-lab.ts - narrowing
function parseScore(input) {
    if (typeof input === "number") {
        // input is number
        return input;
    }
    if (typeof input === "string") {
        // input is string
        const parsed = Number(input);
        return Number.isNaN(parsed) ? null : parsed;
    }
    if (input === null) {
        // input is null
        return null;
    }
    // input is undefined
    return null;
}
console.log(parseScore(95));
console.log(parseScore("90"));
console.log(parseScore(null));
console.log(parseScore(undefined));
function toStringArray(value) {
    if (Array.isArray(value)) {
        // value is string[]
        return value;
    }
    // value is string
    return [value];
}
console.log(toStringArray("TypeScript"));
console.log(toStringArray(["TypeScript", "JavaScript"]));
function getErrorMessage(value) {
    if (value instanceof Error) {
        // value is Error
        return value.message;
    }
    // value is string
    return value;
}
console.log(getErrorMessage(new Error("Something went wrong")));
console.log(getErrorMessage("Something went wrong"));
function getTitle(value) {
    if ("name" in value) {
        // value is { name: string }
        return value.name;
    }
    // value is { title: string }
    return value.title;
}
console.log(getTitle({ name: "Mostafa" }));
console.log(getTitle({ title: "TypeScript" }));
// 4.4 narrowing-lab.ts - null and undefined
const students = [
    { name: "Sara", score: 95 },
    { name: "Omar", score: 85 },
    { name: "Ali", score: 75 }
];
const foundStudent = students.find((student) => student.name === "Sara");
if (foundStudent) {
    console.log(foundStudent.name);
}
console.log(foundStudent?.name);
console.log(foundStudent?.name ?? "Student not found");
const firstStudent = students[0];
if (firstStudent) {
    console.log(firstStudent.name);
}
// With noUncheckedIndexedAccess,
// students[10] has the type:
// { name: string; score: number } | undefined
const maybeStudent = students[10];
if (maybeStudent) {
    console.log(maybeStudent.name);
}
