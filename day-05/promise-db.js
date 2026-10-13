// 3.2 promise-db.js

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

getStudent(1)
    .then(student => {
        console.log("Student:", student);
    })
    .catch(error => {
        console.log("Student error:", error.message);
    });

getCourse(101)
    .then(course => {
        console.log("Course:", course);
    })
    .catch(error => {
        console.log("Course error:", error.message);
    });

getTeacher(201)
    .then(teacher => {
        console.log("Teacher:", teacher);
    })
    .catch(error => {
        console.log("Teacher error:", error.message);
    });

getCity(301)
    .then(city => {
        console.log("City:", city);
    })
    .catch(error => {
        console.log("City error:", error.message);
    });

getStudent(999)
    .then(student => {
        console.log("Bad student:", student);
    })
    .catch(error => {
        console.log("Bad student:", error.message);
    });

getCourse(999)
    .then(course => {
        console.log("Bad course:", course);
    })
    .catch(error => {
        console.log("Bad course:", error.message);
    });

getTeacher(999)
    .then(teacher => {
        console.log("Bad teacher:", teacher);
    })
    .catch(error => {
        console.log("Bad teacher:", error.message);
    });

getCity(999)
    .then(city => {
        console.log("Bad city:", city);
    })
    .catch(error => {
        console.log("Bad city:", error.message);
    });