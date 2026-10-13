"use strict";
// 8.1 Generic functions
function first(items) {
    return items[0];
}
function last(items) {
    return items[items.length - 1];
}
const firstNumber = first([10, 20, 30]);
const firstString = first(["JavaScript", "TypeScript"]);
const firstStudent = first([
    { id: 1, name: "Sara" },
    { id: 2, name: "Ahmed" }
]);
// inferred type: { id: number; name: string } | undefined
console.log(firstNumber);
console.log(firstString);
console.log(firstStudent);
const lastNumber = last([10, 20, 30]);
const lastString = last(["JavaScript", "TypeScript"]);
const lastStudent = last([
    { id: 1, name: "Sara" },
    { id: 2, name: "Ahmed" }
]);
// inferred type: { id: number; name: string } | undefined
console.log(lastNumber);
console.log(lastString);
console.log(lastStudent);
function findById(items, id) {
    return items.find((item) => item.id === id);
}
const students = [
    { id: 1, name: "Sara", score: 95 },
    { id: 2, name: "Ahmed", score: 85 }
];
const courses = [
    { id: 101, name: "JavaScript" },
    { id: 102, name: "Node.js" }
];
console.log(findById(students, 1));
console.log(findById(courses, 101));
// const invalidTable = [
//   { name: "Sara" }
// ];
// findById(invalidTable, 1);
// Error: Type '{ name: string; }' does not satisfy the constraint
// '{ id: number; }'.
function pluck(items, key) {
    return items.map((item) => item[key]);
}
console.log(pluck(students, "name"));
console.log(pluck(students, "score"));
const gradedStudents = [
    { id: 1, name: "Sara", grade: "A" },
    { id: 2, name: "Ahmed", grade: "B" },
    { id: 3, name: "Mona", grade: "A" },
    { id: 4, name: "Ali", grade: "C" }
];
function groupBy(items, key) {
    const groups = new Map();
    for (const item of items) {
        const group = item[key];
        if (!groups.has(group)) {
            groups.set(group, []);
        }
        groups.get(group).push(item);
    }
    return groups;
}
const studentsByGrade = groupBy(gradedStudents, "grade");
console.log(studentsByGrade);
function unique(items) {
    return [...new Set(items)];
}
console.log(unique([1, 2, 2, 3, 3, 3]));
console.log(unique(["JS", "TS", "JS"]));
function describeResult(result) {
    switch (result.status) {
        case "success":
            return `Success: ${String(result.value)}`;
        case "error":
            return `Error: ${result.error}`;
        default: {
            const unreachable = result;
            return unreachable;
        }
    }
}
console.log(describeResult({
    status: "success",
    value: 100
}));
console.log(describeResult({
    status: "error",
    error: "Something went wrong"
}));
function safeParse(json, check) {
    try {
        const value = JSON.parse(json);
        if (check(value)) {
            return {
                status: "success",
                value
            };
        }
        return {
            status: "error",
            error: "Invalid shape"
        };
    }
    catch {
        return {
            status: "error",
            error: "Invalid JSON"
        };
    }
}
function isProduct(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const product = value;
    return (typeof product.id === "number" &&
        typeof product.name === "string");
}
const validJson = safeParse('{"id":1,"name":"Laptop"}', isProduct);
const wrongShapeJson = safeParse('{"id":1}', isProduct);
const invalidJson = safeParse('{"id":1,"name":"Laptop"', isProduct);
console.log(describeResult(validJson));
console.log(describeResult(wrongShapeJson));
console.log(describeResult(invalidJson));
function createStore() {
    const items = new Map();
    return {
        add(item) {
            items.set(item.id, item);
        },
        get(id) {
            return items.get(id);
        },
        all() {
            return [...items.values()];
        },
        remove(id) {
            return items.delete(id);
        }
    };
}
const studentStore = createStore();
studentStore.add({
    id: 1,
    name: "Sara",
    score: 95
});
studentStore.add({
    id: 2,
    name: "Ahmed",
    score: 85
});
console.log(studentStore.get(1));
console.log(studentStore.all());
console.log(studentStore.remove(2));
console.log(studentStore.all());
const courseStore = createStore();
courseStore.add({
    id: 101,
    name: "JavaScript",
    teacherId: 201
});
courseStore.add({
    id: 102,
    name: "Node.js",
    teacherId: 202
});
console.log(courseStore.get(101));
console.log(courseStore.all());
// studentStore.add({
//   id: 3,
//   name: "Mona"
// });
// Error: Property 'score' is missing.
/* 8.3 Generic async */
function withTimeout(promise, milliseconds) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, milliseconds);
    });
    return Promise.race([promise, timeout]);
}
async function delayedValue(value, milliseconds) {
    await new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
    return value;
}
async function testTimeout() {
    const result = await withTimeout(delayedValue("TypeScript", 100), 500);
    console.log("Timeout result:", result);
}
testTimeout();
function errorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}
async function retry(operation, attempts) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
        }
    }
    throw new Error(`Operation failed after ${attempts} attempts: ${errorMessage(lastError)}`);
}
let retryCount = 0;
async function unstableOperation() {
    retryCount++;
    if (retryCount < 3) {
        throw new Error(`Attempt ${retryCount} failed`);
    }
    return "Operation succeeded";
}
retry(unstableOperation, 3)
    .then((result) => {
    console.log("Retry:", result);
})
    .catch((error) => {
    console.log("Retry error:", errorMessage(error));
});
async function mapAsync(items, mapper) {
    return Promise.all(items.map(mapper));
}
async function doubleAsync(value) {
    return value * 2;
}
mapAsync([1, 2, 3], doubleAsync)
    .then((result) => {
    console.log("mapAsync:", result);
});
async function getStudent(id) {
    if (id === 1) {
        return "Sara";
    }
    throw new Error(`Student ${id} not found`);
}
async function getCourse(id) {
    if (id === 101) {
        return "JavaScript";
    }
    throw new Error(`Course ${id} not found`);
}
async function getTeacher(id) {
    if (id === 201) {
        return "Mostafa";
    }
    throw new Error(`Teacher ${id} not found`);
}
async function runTask5Functions() {
    try {
        const student = await getStudent(1);
        const course = await getCourse(101);
        const teacher = await getTeacher(201);
        console.log("Task 5 Student:", student);
        console.log("Task 5 Course:", course);
        console.log("Task 5 Teacher:", teacher);
    }
    catch (error) {
        console.log("Task 5 error:", errorMessage(error));
    }
}
runTask5Functions();
