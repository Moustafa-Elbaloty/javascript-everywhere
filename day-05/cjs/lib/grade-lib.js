// 6.1 
console.log("grade-lib loaded")
function letterGrade(score) {
    if (score >= 90) {
        return "A";
    }

    if (score >= 80) {
        return "B";
    }

    if (score >= 70) {
        return "C";
    }

    if (score >= 60) {
        return "D";
    }

    return "F";
}

function average(scores) {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
}

function formatRow(name, score) {
    return `${name}: ${score} (${letterGrade(score)})`;
}

module.exports = {
    letterGrade,
    average,
    formatRow
};