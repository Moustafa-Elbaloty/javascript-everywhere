// 5.1 timers.js — setTimeout

// Prediction: 100ms, 200ms, 300ms

setTimeout(() => console.log("300ms"), 300);

setTimeout(() => console.log("100ms"), 100);

setTimeout(() => console.log("200ms"), 200);

function showMessage(message, name) {
    console.log(message, name);
}

setTimeout(showMessage, 400, "Hello", "Sara");

const timeoutId = setTimeout(() => {
    console.log("This should never print");
}, 500);

clearTimeout(timeoutId);

// setTimeout(sayHi(), 1000);

// sayHi() runs immediately and its return value is passed to setTimeout.
// If sayHi is not defined, it throws a ReferenceError before setTimeout runs.


// 5.2 timers.js — setInterval

let count = 5;

const intervalId = setInterval(() => {
    console.log(count);

    if (count === 0) {
        console.log("Lift off 🚀");
        clearInterval(intervalId);
    }

    count--;
}, 1000);

// Removing clearInterval would make the interval continue running forever.
// 5.3 timers.js — The delay is a minimum

function blockFor(ms) {
    const start = Date.now();

    while (Date.now() - start < ms) { }
}

const start = Date.now();

setTimeout(() => {
    console.log(`Timer actually took ${Date.now() - start}ms`);
}, 100);

blockFor(1000);

// 100ms is the minimum delay, but the busy wait blocks the event loop,
// so the timer runs only after the 1000ms block finishes.