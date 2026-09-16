// ====================
// Pure Logic
// ====================

function isValidScore(score) {
    return (
        typeof score === "number" &&
        !Number.isNaN(score) &&
        score >= 0 &&
        score <= 100
    );
}

function letterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

function average(numbers) {
    if (numbers.length === 0) return 0;

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}


// ====================
// DOM Handling
// ====================

const nameInput = document.querySelector("#name");
const scoreInput = document.querySelector("#score");
const addButton = document.querySelector("#add");
const clearButton = document.querySelector("#clear");
const studentsList = document.querySelector("#students");
const summary = document.querySelector("#summary");

const students = [];

function handleAdd() {
    const name = nameInput.value.trim();
    const score = Number(scoreInput.value);

    if (name === "") {
        alert("Name is required.");
        return;
    }

    if (scoreInput.value.trim() === "") {
        alert("Score is required.");
        return;
    }

    if (!isValidScore(score)) {
        alert("Score must be a number between 0 and 100.");
        return;
    }

    students.push({
        name,
        score
    });

    console.log(students);

    render();

    nameInput.value = "";
    scoreInput.value = "";
}

function render() {
    studentsList.innerHTML = "";

    for (const student of students) {
        const li = document.createElement("li");

        li.textContent =
            `${student.name} - ${student.score} - ${letterGrade(student.score)}`;

        studentsList.appendChild(li);
    }

    const scores = students.map((student) => student.score);

    summary.textContent =
        `Students: ${students.length} | Average: ${average(scores).toFixed(1)}`;
}

function handleClear() {
    students.length = 0;
    render();
}

addButton.addEventListener("click", handleAdd);
clearButton.addEventListener("click", handleClear);

render();