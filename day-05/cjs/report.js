// 6.1 
const {
    letterGrade,
    average,
    formatRow
} = require("./lib/grade-lib");

const delay = require("./lib/day");

const students = require("./students.json");

function formatReport(name, score) {
    return `Report: ${formatRow(name, score)}`;
}

console.log(formatReport("Sara", 92));

console.log("Average:", average([90, 80, 70]));
console.log("Grade:", letterGrade(92));

students.forEach((student) => {
    const score = average(student.scores);
    console.log(formatRow(student.name, score));
});

delay(100).then((message) => {
    console.log(message);
});

console.log("Private helper:", formatReport("Mostafa", 95));
// ./ is required for a relative module path.