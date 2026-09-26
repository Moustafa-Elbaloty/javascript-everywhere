// 4.1 Build the messy array

const students = [
    {
        name: "Sara",
        address: {
            city: "Cairo"
        },
        scores: [92, 88],
        attendance: 90
    },
    {
        name: "Ahmed",
        scores: [75, 80],
        attendance: 85
    },
    {
        name: "Mona",
        address: {
            city: "Giza"
        },
        scores: [],
        attendance: 95
    },
    {
        name: "Omar",
        address: {},
        scores: [60, 70],
        attendance: 0
    },
    {
        name: "Dina",
        scores: [88, 91],
        attendance: 90
    }
];

// 4.2 Read it without crashing
for (const student of students) {
    console.log(student.address?.city ?? "Unknown");
}
for (const student of students) {
    console.log(student.scores?.[0] ?? "No scores yet");
}
for (const student of students) {
    console.log(student.attendance ?? 0);
}
for (const student of students) {
    console.log(student.attendance || 0);
}

// || treats 0 as falsy, so it replaces the real attendance value 0 with the fallback 0.
// 4.3 Wrap it in functions

function getCity(student) {
    return student.address?.city ?? "Unknown";
}

function safeFirstScore(student) {
    return student.scores?.[0] ?? null;
}

for (const student of students) {
    console.log(getCity(student));
}

for (const student of students) {
    console.log(safeFirstScore(student));
}

const student = students[0];

console.log(student.getName?.());