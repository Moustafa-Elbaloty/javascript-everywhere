// Global scope
let city = "Qena";

function showData() {
    // Function scope
    let name = "Mostafa";

    if (true) {
        // Block scope
        let age = 30;

        console.log(city);
        console.log(name);
        console.log(age);
    }
}

showData();

// ReferenceError: age is not defined
// console.log(age);
if (true) {
    let secret = "hidden";
    var leaked = "escaped";
}

console.log(leaked);
// console.log(secret);
// var is not block-scoped, so it escapes the if block.

// 3.3
let status = "offline";

function checkStatus() {
    let status = "online";

    console.log(status);
}

checkStatus();

console.log(status);

//  local status wins inside the function because it shadows the global status.

// 3.4

// 1. Function declaration before definition
sayHi();

function sayHi() {
    console.log("Hello");
}


// 2. var before its line
console.log(score);

var score = 90;


// 3. let before its line
// console.log(points);

let points = 50;


// 4. Arrow function before its line
// showMessage();

const showMessage = () => {
    console.log("Welcome");
};


// Function declarations are safe before their definition.
// var is hoisted with undefined.
// let and const are in the TDZ before initialization.

// var version
const fsVar = [];

for (var i = 0; i < 3; i++) {
    fsVar.push(() => i);
}

fsVar.forEach((f) => console.log(f()));


// let version
const fsLet = [];

for (let i = 0; i < 3; i++) {
    fsLet.push(() => i);
}

fsLet.forEach((f) => console.log(f()));

// var uses one shared i, while let creates a new i for each loop iteration.