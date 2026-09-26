// 6.1 fake-db.js

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

module.exports = {
    getStudent,
    getCourse,
    getTeacher,
    getCity
};