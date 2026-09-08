const students = [
    { name: "Ahmed", score: 95 },
    { name: "Mona", score: 88 },
    { name: "moustafa", score: 72 },
    { name: "aya", score: 65 },
    { name: "eman", score: 45 },
];
let excellent = 0;
let good = 0;
let needsWork = 0;

for (const student of students) {
    let band;

    if (student.score >= 90) {
        band = "Excellent";
        excellent++;
    } else if (student.score >= 70) {
        band = "Good";
        good++;
    } else {
        band = "Needs work";
        needsWork++;
    }

    console.log(`${student.name}: ${student.score} → ${band}`);
}

console.log(
    `${excellent} Excellent, ${good} Good, ${needsWork} Needs work.`
);