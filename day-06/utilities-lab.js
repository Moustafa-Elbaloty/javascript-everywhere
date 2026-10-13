"use strict";
// 9.1 utilities-lab.ts
function addStudent(input) {
    return {
        id: 1,
        ...input
    };
}
const newStudent = addStudent({
    name: "Sara",
    score: 95,
    grade: "A",
    email: "sara@example.com"
});
console.log(newStudent);
function updateStudent(student, update) {
    return {
        ...student,
        ...update
    };
}
const updatedStudent = updateStudent(newStudent, {
    score: 98,
    grade: "A"
});
console.log(updatedStudent);
function toPublicStudent(student) {
    return {
        name: student.name,
        grade: student.grade
    };
}
const publicStudent = toPublicStudent(updatedStudent);
console.log(publicStudent);
const readonlyStudent = updatedStudent;
console.log(readonlyStudent);
// readonlyStudent.name = "Ahmed";
// Error: Cannot assign to 'name' because it is a read-only property.
const gradeCounts = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0
};
gradeCounts.A++;
gradeCounts.B += 2;
console.log(gradeCounts);
async function getStudent() {
    return updatedStudent;
}
// StudentResult = Student
async function loadStudent() {
    return getStudent();
}
loadStudent().then((student) => {
    console.log("Loaded:", student);
});
const allowedGrades = [
    "A",
    "B",
    "C",
    "D",
    "F"
];
const selectedGrade = "A";
console.log(selectedGrade);
const baseStudent = {
    id: 1,
    createdAt: new Date(),
    name: "Sara",
    score: 95
};
const baseCourse = {
    id: 101,
    createdAt: new Date(),
    name: "JavaScript",
    teacherId: 201
};
console.log(baseStudent);
console.log(baseCourse);
// Adding createdAt to BaseEntity also affects every derived type.
// This is useful when the property is truly common to every entity,
// because TypeScript prevents derived objects from forgetting it.
