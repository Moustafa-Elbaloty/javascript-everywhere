const student = {
    name: "Sara",
    score: 92,
    city: "Cairo"
};

const { name, score } = student;
console.log(name, score);

const { city: hometown } = student;
console.log(hometown);

const { attendance = 0 } = student;
console.log(attendance);

const { level: tier = "beginner" } = student;
console.log(tier);


const user = {
    profile: {
        email: "sara@example.com",
        github: "sara-dev"
    }
};

const {
    profile: { email }
} = user;

console.log(email);

// console.log(profile);
// profile was used as a destructuring path, so no profile variable was created.

const {
    profile,
    profile: { email: userEmail }
} = user;

console.log(profile);
console.log(userEmail);

2.4
const numbers = [10, 20, 30, 40, 50];

const [first, second] = numbers;
console.log(first, second);

const [, , , fourth] = numbers;
console.log(fourth);

const [, , , , , sixth = 60] = numbers;
console.log(sixth);


let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a, b);

const [head, ...tail] = numbers;

console.log(head);
console.log(tail);
// 2.4 Parameters

function describe({ name, score, city = "Unknown" } = {}) {
    return `${name} from ${city} scored ${score}: ${score >= 50 ? "PASS" : "FAIL"}`;
}

console.log(describe({ name: "Sara", score: 92, city: "Cairo" }));
console.log(describe({ name: "Ali", score: 45 }));
console.log(describe());


// 2.5 In a loop

const students = [
    { name: "Sara", score: 92 },
    { name: "Ali", score: 45 },
    { name: "Omar", score: 75 },
    { name: "Dina", score: 50 }
];

for (const { name, score } of students) {
    console.log(`${name}: ${score}`);
}

const grades = students.map(({ score }) =>
    score >= 50 ? "PASS" : "FAIL"
);

const tally = {};

for (const grade of grades) {
    tally[grade] = (tally[grade] || 0) + 1;
}

for (const [grade, count] of Object.entries(tally)) {
    console.log(grade, count);
}