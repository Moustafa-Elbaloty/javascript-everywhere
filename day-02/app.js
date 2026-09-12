const scoreInput = document.getElementById("scoreInput");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");
const historyList = document.getElementById("historyList");

const history = [];

checkBtn.addEventListener("click", function () {
    const score = Number(scoreInput.value);

    if (scoreInput.value.trim() === "" || Number.isNaN(score) || score < 0 || score > 100) {
        message.textContent = "Please enter a number between 0 and 100";
        return;
    }

    let grade;

    if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else if (score >= 70) {
        grade = "C";
    } else if (score >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    history.push({
        score: score,
        grade: grade
    });

    message.textContent = `Score: ${score} → Grade: ${grade}`;

    historyList.innerHTML = "";
    for (const item of history) {
        const li = document.createElement("li");

        li.textContent = `Score: ${item.score} → Grade: ${item.grade}`;

        if (item.grade === "A" || item.grade === "B") {
            li.style.color = "green";
        } else if (item.grade === "C" || item.grade === "D") {
            li.style.color = "orange";
        } else {
            li.style.color = "red";
        }

        historyList.appendChild(li);
    }
    console.log(history);
});

clearBtn.addEventListener("click", function () {
    history.length = 0;
    historyList.innerHTML = "";
    message.textContent = "";
    scoreInput.value = "";

    console.log(history);
});