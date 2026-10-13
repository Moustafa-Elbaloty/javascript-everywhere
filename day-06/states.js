"use strict";
// 6.1 states.ts
function describe(state) {
    switch (state.status) {
        case "loading":
            return "Loading...";
        case "success":
            return `Loaded ${state.data.length} items`;
        case "error":
            return `Error: ${state.message}`;
        case "empty":
            return "No data";
        default: {
            const unreachable = state;
            return unreachable;
        }
    }
}
console.log(describe({ status: "loading" }));
console.log(describe({
    status: "success",
    data: ["JavaScript", "TypeScript"]
}));
console.log(describe({
    status: "error",
    message: "Failed to load data"
}));
console.log(describe({ status: "empty" }));
function describePaused(state) {
    switch (state.status) {
        case "loading":
            return "Loading...";
        case "success":
            return `Loaded ${state.data.length} items`;
        case "error":
            return `Error: ${state.message}`;
        case "empty":
            return "No data";
        default: {
            const unreachable = state;
            return unreachable;
        }
    }
}
// Error:
// Type '{ status: "paused"; reason: string; }'
// is not assignable to type 'never'.
// Wrong property inside a case
function describeWrong(state) {
    switch (state.status) {
        case "success":
            return `Loaded ${state.data.length} items`;
        // return state.message;
        // Error:
        // Property 'message' does not exist on type
        // '{ status: "success"; data: string[]; }'.
        case "error":
            return state.message;
        case "loading":
            return "Loading...";
        case "empty":
            return "No data";
        default: {
            const unreachable = state;
            return unreachable;
        }
    }
}
function describePayment(payment) {
    switch (payment.status) {
        case "pending":
            return `Pending: ${payment.amount}`;
        case "paid":
            return `Paid: ${payment.transactionId}`;
        case "failed":
            return `Failed: ${payment.reason}`;
        default: {
            const unreachable = payment;
            return unreachable;
        }
    }
}
console.log(describePayment({
    status: "pending",
    amount: 500
}));
console.log(describePayment({
    status: "paid",
    transactionId: "TX-1001"
}));
console.log(describePayment({
    status: "failed",
    reason: "Insufficient balance"
}));
// Day 05 Promise.allSettled
async function getStudent(id) {
    if (id === 1) {
        return "Sara";
    }
    throw new Error(`Student ${id} not found`);
}
async function loadStudents() {
    const results = await Promise.allSettled([
        getStudent(1),
        getStudent(999)
    ]);
    for (const result of results) {
        if (result.status === "fulfilled") {
            console.log("Student:", result.value);
        }
        else {
            console.log("Error:", result.reason.message);
        }
    }
}
loadStudents();
