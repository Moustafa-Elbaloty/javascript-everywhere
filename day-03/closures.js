function makeCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

// Two independent counters
const counterA = makeCounter();
const counterB = makeCounter();

console.log(counterA());
console.log(counterA());
console.log(counterB());
console.log(counterB());

// count still exists because the returned function closes over it.

function makeMultiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const half = makeMultiplier(0.5);

console.log(double(10));
console.log(triple(10));
console.log(half(10));

function makeGrader(passMark) {
    return function (score) {
        return score >= passMark ? "Pass" : "Fail";
    };
}

const strict = makeGrader(85);
const lenient = makeGrader(60);

const score = 75;

console.log(strict(score));
console.log(lenient(score));



// 
function myForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i);
    }
}

const apps = ["Web", "Mobile", "Desktop"];

myForEach(apps, (item, index) => {
    console.log(`${index + 1}. ${item}`);
});

// 
function myMap(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }

    return result;
}

function myFilter(array, test) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            result.push(array[i]);
        }
    }

    return result;
}


// myMap
const numbers = [1, 2, 3];

const doubled = myMap(numbers, (num) => num * 2);

console.log(doubled);
console.log(numbers);


// myFilter
const scores = [45, 72, 90, 55, 88];

const passed = myFilter(scores, (score) => score >= 60);

console.log(passed);
console.log(scores);

//
function sayHi() {
    console.log("Hi");
}

function runTwice(fn) {
    fn();
    fn();
}

// Correct: passing the function
runTwice(sayHi);


// Deliberately wrong
// runTwice(sayHi());

// sayHi() runs immediately and its return value is passed instead of the function.