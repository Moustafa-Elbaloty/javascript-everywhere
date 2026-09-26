// 6.2 hell.js

const {
    getStudent,
    getCourse,
    getTeacher,
    getCity
} = require("./fake-db");

function runScenario(studentId, courseId, teacherId) {
    getStudent(studentId, (err, student) => {
        if (err) {
            return console.log("Student error:", err.message);
        }

        getCourse(courseId, (err, course) => {
            if (err) {
                return console.log("Course error:", err.message);
            }

            getTeacher(teacherId, (err, teacher) => {
                if (err) {
                    return console.log("Teacher error:", err.message);
                }

                getCity(teacher.cityId, (err, city) => {
                    if (err) {
                        return console.log("City error:", err.message);
                    }

                    console.log(
                        `${student.name} is taking ${course.name} with ${teacher.name} in ${city.name}.`
                    );
                });
            });
        });
    });
}

// Deepest indentation: 4 nested callbacks.

runScenario(1, 101, 201);

runScenario(99, 101, 201);

runScenario(1, 999, 201);

runScenario(1, 101, 999);