// 1. Function Declaration
function c2f(c) {
    return (c * 9) / 5 + 32;
}

// 2. Function Expression
const f = function (c) {
    return (c * 9) / 5 + 32;
};

// 3. Arrow Function
const a = (c) => (c * 9) / 5 + 32;

// Test
console.log(c2f(30));
console.log(f(30));
console.log(a(30));


function addLog(a, b) {
    console.log(a + b);
}

function addReturn(a, b) {
    return a + b;
}

const doubledLog = addLog(10, 5) * 2;
console.log(doubledLog);

const doubledReturn = addReturn(10, 5) * 2;
console.log(doubledReturn);

// addLog only logs the sum and does not return it, so undefined * 2 gives NaN.



function greet(name = "user", greeting = "Hi") {
    return `${greeting}, ${name}!`;
}

// 1. No arguments
console.log(greet());

// 2. One argument
console.log(greet("Ali"));

// 3. Both arguments
console.log(greet("Sara", "Welcome"));

// 4. undefined as first argument
console.log(greet(undefined, "Hello"));

// 5. null as first argument
console.log(greet(null, "Hello"));
// 
// The default parameter only works with undefined, not null.

function sumAll(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// 0 arguments
console.log(sumAll());

// 1 argument
console.log(sumAll(5));

// 5 arguments
console.log(sumAll(1, 2, 3, 4, 5));


function describe(label, ...values) {
    return `${label}: ${values.join(", ")}`;
}

console.log(describe(10, 20, 30));


// 
function safeDivide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        return "Invalid numbers";
    }

    if (b === 0) {
        return "Cannot divide by zero";
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return "Numbers must be finite";
    }

    return a / b;
}

// Valid
console.log(safeDivide(20, 4));

// Divide by zero
console.log(safeDivide(20, 0));

// Non-number
console.log(safeDivide("20", 4));