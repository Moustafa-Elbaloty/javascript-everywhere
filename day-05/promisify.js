// 3.1 promisify.js

const util = require("util");

// Day 04 fake-db.js

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

function getStudent(id, callback) {
    const delay = id === 1 ? 100 : 200;

    setTimeout(() => {
        const student = students.find(student => student.id === id);

        if (!student) {
            return callback(new Error("Student not found"), null);
        }

        callback(null, student);
    }, delay);
}

function getCourse(id, callback) {
    const delay = id === 101 ? 150 : 250;

    setTimeout(() => {
        const course = courses.find(course => course.id === id);

        if (!course) {
            return callback(new Error("Course not found"), null);
        }

        callback(null, course);
    }, delay);
}

function getTeacher(id, callback) {
    const delay = id === 201 ? 100 : 300;

    setTimeout(() => {
        const teacher = teachers.find(teacher => teacher.id === id);

        if (!teacher) {
            return callback(new Error("Teacher not found"), null);
        }

        callback(null, teacher);
    }, delay);
}

function getCity(id, callback) {
    setTimeout(() => {
        const city = cities.find(city => city.id === id);

        if (!city) {
            return callback(new Error("City not found"), null);
        }

        callback(null, city);
    }, 200);
}

// Manual wrapper

function getStudentPromise(id) {
    return new Promise((resolve, reject) => {
        getStudent(id, (err, student) => {
            if (err) {
                return reject(err);
            }

            resolve(student);
        });
    });
}

// Custom promisify

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, value) => {
                if (err) {
                    return reject(err);
                }

                resolve(value);
            });
        });
    };
}

const getCoursePromise = promisify(getCourse);
const getTeacherPromise = promisify(getTeacher);
const getCityPromise = promisify(getCity);

// util.promisify

const getStudentUtilPromise = util.promisify(getStudent);

// Good IDs

getStudentPromise(1)
    .then(student => {
        console.log("Manual getStudent:", student);
    })
    .catch(error => {
        console.log("Manual getStudent error:", error.message);
    });

getCoursePromise(101)
    .then(course => {
        console.log("getCourse:", course);
    })
    .catch(error => {
        console.log("getCourse error:", error.message);
    });

getTeacherPromise(201)
    .then(teacher => {
        console.log("getTeacher:", teacher);
    })
    .catch(error => {
        console.log("getTeacher error:", error.message);
    });

getCityPromise(301)
    .then(city => {
        console.log("getCity:", city);
    })
    .catch(error => {
        console.log("getCity error:", error.message);
    });

// Bad IDs

getStudentPromise(999)
    .then(student => {
        console.log("Bad student:", student);
    })
    .catch(error => {
        console.log("Bad student:", error.message);
    });

getCoursePromise(999)
    .then(course => {
        console.log("Bad course:", course);
    })
    .catch(error => {
        console.log("Bad course:", error.message);
    });

getTeacherPromise(999)
    .then(teacher => {
        console.log("Bad teacher:", teacher);
    })
    .catch(error => {
        console.log("Bad teacher:", error.message);
    });

getCityPromise(999)
    .then(city => {
        console.log("Bad city:", city);
    })
    .catch(error => {
        console.log("Bad city:", error.message);
    });

// Compare custom promisify with util.promisify

getStudentUtilPromise(1)
    .then(student => {
        console.log("util.promisify getStudent:", student);
    })
    .catch(error => {
        console.log("util.promisify error:", error.message);
    });