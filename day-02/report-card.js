const students = [
    { name: "Mostafa", score: 95, attendance: 90 },
    { name: "Ahmed", score: 85, attendance: 88 },
    { name: "Dina", score: 75, attendance: 80 },
    { name: "Hadeer", score: 65, attendance: 75 },
    { name: "Mona", score: 55, attendance: 85 },
    { name: "Nada", score: 92, attendance: 60 },
    { name: "Youssef", score: 78, attendance: 68 },
    { name: "Omar", attendance: 90 }
];

const gradeCounts = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0
};

let totalScore = 0;
let validStudents = 0;
let atRiskCount = 0;
let skippedCount = 0;

let highestStudent;
let lowestStudent;

console.log("--- Student Report ---");

console.log(
    `${"Name".padEnd(10)} ${"Score".padEnd(7)} ${"Attendance".padEnd(12)} ${"Grade".padEnd(7)} Status`
);

console.log("-".repeat(55));

for (const student of students) {

    if (student.score === undefined || student.attendance === undefined) {
        skippedCount++;
        continue;
    }

    let grade;

    if (student.score >= 90) {
        grade = "A";
    } else if (student.score >= 80) {
        grade = "B";
    } else if (student.score >= 70) {
        grade = "C";
    } else if (student.score >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    const status =
        student.score < 60 || student.attendance < 70
            ? "At risk"
            : "OK";

    console.log(
        `${student.name.padEnd(10)} ${String(student.score).padEnd(7)} ${String(student.attendance).padEnd(12)} ${grade.padEnd(7)} ${status}`
    );

    gradeCounts[grade]++;
    totalScore += student.score;
    validStudents++;

    if (status === "At risk") {
        atRiskCount++;
    }

    if (highestStudent === undefined || student.score > highestStudent.score) {
        highestStudent = student;
    }

    if (lowestStudent === undefined || student.score < lowestStudent.score) {
        lowestStudent = student;
    }
}

const average = totalScore / validStudents;

console.log("\n--- Summary ---");
console.log("A:", gradeCounts.A);
console.log("B:", gradeCounts.B);
console.log("C:", gradeCounts.C);
console.log("D:", gradeCounts.D);
console.log("F:", gradeCounts.F);
console.log("Class average:", average.toFixed(1));
console.log("Highest:", highestStudent.name, highestStudent.score);
console.log("Lowest:", lowestStudent.name, lowestStudent.score);
console.log("At risk:", atRiskCount);
console.log("Skipped invalid records:", skippedCount);