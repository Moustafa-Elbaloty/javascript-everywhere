// 3.1 Copy vs alias

const a = [1, 2, 3];

const b = a;

b.push(4);

console.log(a);

const c = [...a];

c.push(5);

console.log(a);

// An alias points to the same array, while spread creates a new array.


// 3.2 Arrays without mutation

const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, ...second];
console.log(combined);
const addedEnd = [...first, 4];
const addedFront = [0, ...first];
console.log(addedEnd);
console.log(addedFront);
console.log(first.length);
const removed = [...first.slice(0, 1), ...first.slice(2)];
console.log(removed);
console.log(first);


// 3.3 Objects without mutation

const student = {
    name: "Sara",
    score: 92,
    attendance: 85
};

const updated = {
    ...student,
    score: 95
};
console.log(student);
console.log(updated);

const withId = {
    ...student,
    id: 1
};

console.log(withId);

const { attendance, ...without } = student;

console.log(without);


// 3.4 Merge order

const defaults = {
    theme: "light",
    language: "en"
};

const custom = {
    theme: "dark",
    fontSize: 16
};

const merged = {
    ...defaults,
    ...custom
};

console.log(merged);

const wrongOrder = {
    ...custom,
    ...defaults
};

console.log(wrongOrder);

// Custom should come last so its values override the defaults.
// Reversing the order can overwrite custom values with defaults.


// 3.5 The shallow copy trap

const user = {
    name: "Sara",
    profile: {
        city: "Cairo"
    }
};

const copy = {
    ...user
};

copy.profile.city = "Giza";

console.log(user);

const safeUser = {
    name: "Sara",
    profile: {
        city: "Cairo"
    }
};

const safeCopy = {
    ...safeUser,
    profile: {
        ...safeUser.profile,
        city: "Alexandria"
    }
};

console.log(safeUser);

console.log(safeCopy);


// Bonus 1: structuredClone

const clonedUser = structuredClone(user);

clonedUser.profile.city = "Alexandria";

console.log(user);
console.log(clonedUser);

// 3.6 Rest in functions

function total(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}

console.log(total(10, 20, 30));

function logAll(label, ...items) {
    console.log(label, ...items);
}

logAll("Items:", "A", "B", "C");

function moveFirstToEnd(first, ...others) {
    return [...others, first];
}

console.log(moveFirstToEnd("A", "B", "C", "D"));

// function test(...rest, another) {}
// SyntaxError: Rest parameter must be last formal parameter


// 3.7 Spread into arguments

const numbers = [10, 25, 7, 42, 18];
console.log(Math.max(numbers));
console.log(Math.max(...numbers));

// Math.max expects individual arguments, so spread converts the array into separate arguments.