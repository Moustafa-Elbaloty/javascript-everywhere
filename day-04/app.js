// 8.1 Logic

let students = [];

function describe({ name, score, city = "Unknown" }) {
    return `${name} scored ${score} in ${city}`;
}

function addStudent(name, score, city) {
    if (!name.trim()) {
        return "Name is required";
    }

    if (score.trim() === "") {
        return "Score is required";
    }

    const numericScore = Number(score);

    if (Number.isNaN(numericScore)) {
        return "Score must be a number";
    }

    if (numericScore < 0 || numericScore > 100) {
        return "Score must be between 0 and 100";
    }

    const newStudent = {
        name: name.trim(),
        score: numericScore
    };

    if (city.trim()) {
        newStudent.city = city.trim();
    }

    students = [...students, newStudent];

    return null;
}

function clearStudents() {
    students = [];
}
// 8.2 Server

function fetchStudents(callback) {
    setTimeout(() => {
        if (Math.random() < 0.25) {
            return callback(new Error("Server request failed"), null);
        }

        const newStudents = [
            { name: "Omar", score: 75, city: "Giza" },
            { name: "Mona", score: 88, city: "Cairo" },
            { name: "Youssef", score: 64 }
        ];

        callback(null, newStudents);
    }, 1500);
}

// 8.1 DOM

const nameInput = document.querySelector("#name");
const scoreInput = document.querySelector("#score");
const cityInput = document.querySelector("#city");
const addButton = document.querySelector("#add");
const clearButton = document.querySelector("#clear");
const list = document.querySelector("#studentList");
const summary = document.querySelector("#summary");
const message = document.querySelector("#message");
const loadButton = document.querySelector("#load");
function render() {
    list.innerHTML = "";

    for (const student of students) {
        const item = document.createElement("li");
        item.textContent = describe(student);
        list.appendChild(item);
    }

    const total = students.reduce((sum, student) => sum + student.score, 0);
    const average = students.length
        ? (total / students.length).toFixed(1)
        : "0.0";

    summary.textContent =
        `Students: ${students.length} | Average: ${average}`;
}

addButton.addEventListener("click", () => {
    const error = addStudent(
        nameInput.value,
        scoreInput.value,
        cityInput.value
    );

    if (error) {
        message.textContent = error;
        return;
    }

    message.textContent = "";

    nameInput.value = "";
    scoreInput.value = "";
    cityInput.value = "";

    render();
});

clearButton.addEventListener("click", () => {
    clearStudents();

    message.textContent = "";

    render();
});

render();
loadButton.addEventListener("click", () => {
    loadButton.disabled = true;
    message.textContent = "Loading...";

    fetchStudents((err, newStudents) => {
        if (err) {
            message.textContent = err.message;
            loadButton.disabled = false;
            return;
        }

        students = [...students, ...newStudents];

        message.textContent = "Students loaded successfully";

        loadButton.disabled = false;

        render();
    });

    console.log("Request sent, page is still responsive.");
});
// 8.3 Freeze vs don't

function blockFor(ms) {
    const start = Date.now();

    while (Date.now() - start < ms) { }
}

function freezePage() {
    message.textContent = "Freezing for 3 seconds...";

    blockFor(3000);

    message.textContent = "Freeze finished";
}

function chunkWork() {
    const total = 3000;
    const stepSize = 100;
    let completed = 0;

    function step() {
        const start = Date.now();

        while (Date.now() - start < stepSize) { }

        completed += stepSize;

        progress.textContent =
            `Progress: ${Math.min(completed, total)} / ${total}ms`;

        if (completed < total) {
            setTimeout(step, 0);
        } else {
            message.textContent = "Chunked finished";
        }
    }

    step();
}

const freezeButton = document.querySelector("#freeze");
const chunkedButton = document.querySelector("#chunked");
const progress = document.querySelector("#progress");

freezeButton.addEventListener("click", freezePage);

chunkedButton.addEventListener("click", chunkWork);