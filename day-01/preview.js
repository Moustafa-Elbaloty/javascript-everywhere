const students = [
    { name: "Sara", score: 92 },
    { name: "Omar", score: 68 },
    { name: "Lina", score: 79 },
];

let passed = 0;

for (const student of students) {
    const result = student.score >= 70 ? "PASS" : "FAIL";

    if (result === "PASS") {
        passed++;
    }

    console.log(`${student.name}: ${student.score} → ${result}`);
}

console.log(`\n${passed} of ${students.length} students passed.`);