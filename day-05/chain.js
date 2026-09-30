// 3.3 chain.js

const students = [
    { id: 1, name: "Sara", courseId: 101 },
    { id: 2, name: "Ahmed", courseId: 102 },
    { id: 3, name: "Mona", courseId: 103 }
];

const courses = [
    { id: 101, name: "JavaScript", teacherId: 201 },
    { id: 102, name: "Node.js", teacherId: 202 },
    { id: 103, name: "Angular", teacherId: 203 }
];

const teachers = [
    { id: 201, name: "Mostafa", cityId: 301 },
    { id: 202, name: "Ahmed", cityId: 302 },
    { id: 203, name: "Omar", cityId: 303 }
];

const cities = [
    { id: 301, name: "Cairo" },
    { id: 302, name: "Giza" },
    { id: 303, name: "Alexandria" }
];

function findById(table, id, delay, tableName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = table.find(item => item.id === id);

            if (!item) {
                return reject(new Error(`${tableName} id ${id} not found`));
            }

            resolve(item);
        }, delay);
    });
}

function getStudent(id) {
    const delay = id === 1 ? 100 : 200;

    return findById(students, id, delay, "Student");
}

function getCourse(id) {
    const delay = id === 101 ? 150 : 250;

    return findById(courses, id, delay, "Course");
}

function getTeacher(id) {
    const delay = id === 201 ? 100 : 300;

    return findById(teachers, id, delay, "Teacher");
}

function getCity(id) {
    return findById(cities, id, 200, "City");
}

function buildReport(studentId, courseId, teacherId) {
    const start = Date.now();

    let student;
    let course;
    let teacher;

    return getStudent(studentId)
        .then(result => {
            student = result;
            return getCourse(courseId);
        })
        .then(result => {
            course = result;
            return getTeacher(teacherId);
        })
        .then(result => {
            teacher = result;
            return getCity(teacher.cityId);
        })
        .then(city => {
            console.log(
                `${student.name} is taking ${course.name} with ${teacher.name} in ${city.name}.`
            );
        })
        .catch(error => {
            console.log("Error:", error.message);
        })
        .finally(() => {
            console.log(`Chain took ${Date.now() - start}ms`);
        });
}

// Day 04 hell.js had 4 if (err) checks; chain.js uses 1 catch.

buildReport(1, 101, 201);

buildReport(99, 101, 201);

buildReport(1, 999, 201);

buildReport(1, 101, 999);
console.log("Chain commit ");