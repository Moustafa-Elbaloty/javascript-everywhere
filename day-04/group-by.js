function groupBy(students, key) {
    const groups = {};

    for (const student of students) {
        const value = student[key];

        if (!groups[value]) {
            groups[value] = [];
        }

        groups[value].push(student);
    }

    return groups;
}

const students = [
    { name: "Sara", grade: "A" },
    { name: "Ahmed", grade: "B" },
    { name: "Mona", grade: "A" },
    { name: "Omar", grade: "C" }
];

console.log(groupBy(students, "grade"));