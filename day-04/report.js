// 7.3 report.js

const fs = require("fs");

function isValidScore(score) {
    return (
        typeof score === "number" &&
        !Number.isNaN(score) &&
        score >= 0 &&
        score <= 100
    );
}

function letterGrade(score) {
    if (!isValidScore(score)) {
        return "F";
    }

    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";

    return "F";
}

function isPassing({ score, passMark = 60 }) {
    return isValidScore(score) && score >= passMark;
}

function isAtRisk({ score = 0, attendance = 0 }) {
    return score < 60 || attendance < 70;
}

function average(numbers) {
    if (numbers.length === 0) {
        return 0;
    }

    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total / numbers.length;
}

function minMaxStudent(students) {
    if (students.length === 0) {
        return [null, null];
    }

    let lowest = students[0];
    let highest = students[0];

    for (const student of students) {
        if (student.score < lowest.score) {
            lowest = student;
        }

        if (student.score > highest.score) {
            highest = student;
        }
    }

    return [lowest, highest];
}

function countByGrade(students) {
    const counts = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0
    };

    for (const { score } of students) {
        const grade = letterGrade(score);
        counts[grade]++;
    }

    return counts;
}

function formatRow({ name, score, attendance = 0 }) {
    const grade = letterGrade(score);

    return `${name} | ${score} | ${grade} | ${attendance}`;
}

function withBonus(student, bonus = 5) {
    return {
        ...student,
        score: Math.min(student.score + bonus, 100)
    };
}

function withoutField({ student, field }) {
    const copy = { ...student };
    delete copy[field];

    return copy;
}

console.log("Loading...");

fs.readFile("students.json", "utf8", (err, data) => {
    if (err) {
        console.log("Read error:", err.message);
        return;
    }

    let students;

    try {
        students = JSON.parse(data);
    } catch (err) {
        console.log("JSON error:", err.message);
        return;
    }
    let completed = 0;
    const attendanceResults = [];
    const startTime = Date.now();

    function getAttendance(id, callback) {
        const delays = {
            1: 500,
            2: 200,
            3: 800,
            4: 300,
            5: 100,
            6: 700,
            7: 400,
            8: 600,
            9: 150,
            10: 350
        };

        setTimeout(() => {
            const student = students.find(student => student.id === id);

            if (!student) {
                return callback(new Error("Student not found"), null);
            }

            callback(null, student.attendance ?? 0);
        }, delays[id] ?? 300);
    }

    students.forEach((student, index) => {
        getAttendance(student.id, (err, attendance) => {
            if (err) {
                console.log("Attendance error:", err.message);
                return;
            }

            attendanceResults[index] = attendance;
            completed++;

            console.log(
                `Attendance arrived: ${student.name} - ${attendance}%`
            );

            if (completed === students.length) {
                const totalTime = Date.now() - startTime;

                console.log(`All attendance loaded in ${totalTime}ms`);


                printReport();
            }
        });
    });

    function printReport() {
        const validStudents = [];

        console.log("\nName | Score | Grade | Attendance");
        console.log("--------------------------------");

        let invalidCount = 0;

        for (const { name, score, id } of students) {
            if (!isValidScore(score)) {
                invalidCount++;
                continue;
            }

            const index = students.findIndex(student => student.id === id);

            const student = {
                ...students[index],
                attendance: attendanceResults[index]
            };

            validStudents.push(student);

            console.log(formatRow(student));
        }

        const [lowest, highest] = minMaxStudent(validStudents);

        console.log("--------------------------------");
        console.log(`Lowest: ${lowest.name} - ${lowest.score}`);
        console.log(`Highest: ${highest.name} - ${highest.score}`);

        const gradeCounts = countByGrade(validStudents);

        for (const [grade, count] of Object.entries(gradeCounts)) {
            console.log(`${grade}: ${count}`);
        }

        const original = students[0];
        const boosted = withBonus(original);

        console.log(`Original score: ${original.score}`);
        console.log(`Boosted score: ${boosted.score}`);

        console.log(`Invalid records: ${invalidCount}`);
    }
});