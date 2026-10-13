"use strict";
// 12.2
Object.defineProperty(exports, "__esModule", { value: true });
const students = [
    {
        name: "Sara",
        address: {
            city: "Cairo"
        },
        scores: [90, 85, 95],
        attendance: 95
    },
    {
        name: "Ahmed",
        scores: [80, 75, 85],
        attendance: 82
    },
    {
        name: "Mona",
        address: {},
        scores: [95, 90, 100],
        attendance: 90
    }
];
function getCity(student) {
    return student.address?.city ?? "Unknown";
}
function safeFirstScore(student) {
    return student.scores[0] ?? 0;
}
for (const student of students) {
    console.log(student.name, getCity(student), safeFirstScore(student), student.getName?.());
}
