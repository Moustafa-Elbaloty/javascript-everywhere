import {
    isValidScore,
    letterGrade,
    isAtRisk,
    average,
    highest,
    lowest,
    countByGrade,
    formatRow
} from "./grade-lib.js";

const students = [
    { name: "Ali", score: 95, attendance: 90 },
    { name: "Sara", score: 82, attendance: 85 },
    { name: "Omar", score: 74, attendance: 80 },
    { name: "Mona", score: 68, attendance: 75 },
    { name: "Hana", score: 91, attendance: 95 },
    { name: "Youssef", score: 57, attendance: 88 },
    { name: "Nour", score: 63, attendance: 65 },
    { name: "Adam", score: 88, attendance: 92 },
    { name: "Lina", score: 45, attendance: 60 },
    { name: "Ziad", score: 79, attendance: 78 },

    // Broken records
    { name: "BrokenScore", score: "90", attendance: 80 },
    { name: "BrokenNull", score: null, attendance: 70 }
];

console.log("Name       | Score | Grade");
console.log("--------------------------");

let validStudents = [];
let skipped = 0;
let atRiskCount = 0;

for (const student of students) {
    if (
        !student ||
        !isValidScore(student.score) ||
        typeof student.attendance !== "number"
    ) {
        skipped++;
        continue;
    }

    validStudents.push(student);

    if (isAtRisk(student)) {
        atRiskCount++;
    }

    console.log(formatRow(student));
}

const scores = validStudents.map((student) => student.score);

const counts = countByGrade(validStudents);
const avg = average(scores);
const top = highest(validStudents);
const bottom = lowest(validStudents);

console.log("\nSummary:");
console.log("A:", counts.A);
console.log("B:", counts.B);
console.log("C:", counts.C);
console.log("D:", counts.D);
console.log("F:", counts.F);
console.log("Average:", avg.toFixed(1));
console.log("Highest:", top.name);
console.log("Lowest:", bottom.name);
console.log("At risk:", atRiskCount);
console.log("Skipped:", skipped);