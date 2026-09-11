// 1. for
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) {
        console.log("Fizz");
    } else {
        console.log(i);
    }
}


// for...of
const tracks = ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Angular"];

let position = 1;

for (const track of tracks) {
    console.log(position, track);
    position++;
}


//  for...in
const student = {
    name: "Ahmed",
    age: 25,
    course: "JavaScript",
    level: "Intermediate",
    city: "Qena"
};

for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}


//  while
let number = 100;

while (number >= 1) {
    console.log(number);
    number /= 2;
}


// do...while
let value = 0;

do {
    console.log("Runs once");
} while (value > 0);

// 4.6 break and continue

const scores = [45, 60, 30, 75, 90, 98, 100];

for (const score of scores) {
    if (score < 50) {
        continue;
    }

    if (score > 95) {
        break;
    }

    console.log(score);
}

// 60, 75, 90
// 45 and 30  are below 50.
// 98  score above 95.
// 4.7 Sum and max without built-ins

const numbers = [10, 20, 5, 30, 15, 25, 8, 40];

let sum = 0;
let highest = numbers[0];
let lowest = numbers[0];

for (const number of numbers) {
    sum += number;

    if (number > highest) {
        highest = number;
    }

    if (number < lowest) {
        lowest = number;
    }
}

const average = sum / numbers.length;

console.log("Sum:", sum);
console.log("Average:", average);
console.log("Highest:", highest);
console.log("Lowest:", lowest);