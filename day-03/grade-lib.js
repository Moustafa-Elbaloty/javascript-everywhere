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


function isPassing(score, passMark = 60) {
    return isValidScore(score) && score >= passMark;
}


function isAtRisk(student) {
    return student.score < 60 || student.attendance < 70;
}


function average(numbers) {
    if (numbers.length === 0) {
        return 0;
    }

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}


function highest(students) {
    if (students.length === 0) {
        return null;
    }

    let highestStudent = students[0];

    for (let i = 1; i < students.length; i++) {
        if (students[i].score > highestStudent.score) {
            highestStudent = students[i];
        }
    }

    return highestStudent;
}


function lowest(students) {
    if (students.length === 0) {
        return null;
    }

    let lowestStudent = students[0];

    for (let i = 1; i < students.length; i++) {
        if (students[i].score < lowestStudent.score) {
            lowestStudent = students[i];
        }
    }

    return lowestStudent;
}


function countByGrade(students) {
    const counts = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0
    };

    for (let i = 0; i < students.length; i++) {
        const grade = letterGrade(students[i].score);
        counts[grade]++;
    }

    return counts;
}


function formatRow(student) {
    const name = student.name.padEnd(10);
    const score = String(student.score).padStart(3);
    const grade = letterGrade(student.score);

    return `${name} | ${score} | ${grade}`;



} export {
    isValidScore,
    letterGrade,
    isPassing,
    isAtRisk,
    average,
    highest,
    lowest,
    countByGrade,
    formatRow
};