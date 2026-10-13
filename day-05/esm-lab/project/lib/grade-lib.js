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

export {
    isValidScore,
    letterGrade,
    isPassing,
    isAtRisk,
    average,
    minMaxStudent,
    countByGrade,
    formatRow,
    withBonus,
    withoutField
};