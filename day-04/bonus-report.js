const fs = require("fs");

const students = JSON.parse(
    fs.readFileSync("students.json", "utf8")
);

let total = 0;
let passing = 0;
let atRisk = 0;

for (const student of students) {
    if (typeof student.score === "number" && student.score >= 0 && student.score <= 100) {
        total += student.score;

        if (student.score >= 60) {
            passing++;
        }
    }

    if (student.score < 60 || student.attendance < 70) {
        atRisk++;
    }
}

const validStudents = students.filter(
    student =>
        typeof student.score === "number" &&
        student.score >= 0 &&
        student.score <= 100
);

const average = total / validStudents.length;

console.log("Bonus Student Report");
console.log("--------------------");
console.log(`Valid students: ${validStudents.length}`);
console.log(`Average score: ${average.toFixed(2)}`);
console.log(`Passing students: ${passing}`);
console.log(`At-risk students: ${atRisk}`);