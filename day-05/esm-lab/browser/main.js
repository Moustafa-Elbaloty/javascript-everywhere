import {
    average,
    formatRow
} from "../project/lib/grade-lib.js";

import getAttendance from "../project/lib/db.js";

import {
    delay,
    withTimeout
} from "../project/lib/async-utils.js";

const loadButton = document.querySelector("#load");
const compareButton = document.querySelector("#compare");
const averageButton = document.querySelector("#average");
const slowNetwork = document.querySelector("#slow-network");
const status = document.querySelector("#status");
const output = document.querySelector("#output");

async function loadStudents() {
    loadButton.disabled = true;
    status.textContent = "Loading...";

    try {
        const data = await withTimeout(
            (async () => {
                if (slowNetwork.checked) {
                    await delay(2500);
                }

                const response = await fetch("../project/students.json");

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })(),
            2000
        );

        const students = await data;

        const results = await Promise.allSettled(
            students.map(async student => {
                const attendance = await getAttendance(student.id);

                return {
                    ...student,
                    score: average(student.scores),
                    attendance
                };
            })
        );

        const failedCount = results.filter(
            result => result.status === "rejected"
        ).length;

        const report = results
            .map(result => {
                if (result.status === "fulfilled") {
                    return formatRow(result.value);
                }

                return `${result.reason.message} | —`;
            })
            .join("\n");

        output.textContent = report;

        if (failedCount > 0) {
            status.textContent =
                `${failedCount} attendance lookup failed`;
        } else {
            status.textContent =
                "All attendance lookups succeeded";
        }

    } catch (error) {
        status.textContent = error.message;
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener("click", loadStudents);

compareButton.addEventListener("click", async () => {
    const students = await fetch("../project/students.json")
        .then(response => response.json());

    const sequentialStart = performance.now();

    for (const student of students) {
        await getAttendance(student.id).catch(() => null);
    }

    const sequentialTime = performance.now() - sequentialStart;

    const parallelStart = performance.now();

    await Promise.allSettled(
        students.map(student => getAttendance(student.id))
    );

    const parallelTime = performance.now() - parallelStart;

    output.textContent =
        `Sequential: ${sequentialTime.toFixed(2)} ms\n` +
        `Parallel: ${parallelTime.toFixed(2)} ms`;
});

averageButton.addEventListener("click", async () => {
    const students = await fetch("../project/students.json")
        .then(response => response.json());

    const scores = students.map(student => average(student.scores));

    output.textContent = `Average: ${average(scores).toFixed(2)}`;
});