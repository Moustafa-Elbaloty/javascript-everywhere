const PASS_MARK = 60;
import dayjs from "dayjs";
import {
    isValidScore,
    letterGrade,
    average,
    formatRow,
    withBonus,
    getAttendance,
    withTimeout,
    retry
} from "./lib/index.js";

import { readFile } from "node:fs/promises";

console.log("Loading...");

const start = Date.now();

try {
    const data = await withTimeout(
        readFile(new URL("./students.json", import.meta.url), "utf8"),
        2000
    );

    const students = JSON.parse(data);

    const validStudents = students
        .map(student => ({
            ...student,
            score: average(student.scores)
        }))
        .filter(student => isValidScore(student.score));

    const attendanceResults = await Promise.allSettled(
        validStudents.map(student =>
            retry(
                () => getAttendance(student.id),
                3
            )
        )
    );

    const studentsWithAttendance = validStudents.map((student, index) => {
        const result = attendanceResults[index];

        return {
            ...student,
            attendance:
                result.status === "fulfilled"
                    ? result.value
                    : "—"
        };
    });

    let total = 0;
    let passing = 0;
    let atRisk = 0;

    for (const student of studentsWithAttendance) {
        total += student.score;

        if (student.score >= 60) {
            passing++;
        }

        if (
            student.score < 60 ||
            (student.attendance !== "—" && student.attendance < 70)
        ) {
            atRisk++;
        }
    }

    const avg = average(
        validStudents.map(student => student.score)
    );

    console.log("Student Report");
    console.log("--------------------");

    for (const student of studentsWithAttendance) {
        console.log(formatRow(student));
    }

    console.log("--------------------");
    console.log(`Valid students: ${validStudents.length}`);
    console.log(`Average score: ${avg.toFixed(2)}`);
    console.log(`Passing students: ${passing}`);
    console.log(`At-risk students: ${atRisk}`);

    const tally = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0
    };

    for (const student of validStudents) {
        tally[letterGrade(student.score)]++;
    }

    console.log(tally);

    const original = validStudents[0];
    const bonus = withBonus(original);

    console.log("Original:", original.score);
    console.log("Bonus:", bonus.score);
} catch (error) {
    console.log(error.message);
} finally {
    console.log(`Total time: ${Date.now() - start}ms`);
}
console.log(dayjs().format("YYYY-MM-DD"));