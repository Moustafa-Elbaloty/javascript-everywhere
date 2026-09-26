// 6.3 flat.js

const {
    getStudent,
    getCourse,
    getTeacher,
    getCity
} = require("./fake-db");

function loadStudent(id, done) {
    getStudent(id, function onStudent(err, student) {
        if (err) {
            return done(err);
        }

        done(null, {
            student
        });
    });
}

function loadCourse(report, done) {
    getCourse(report.student.courseId, function onCourse(err, course) {
        if (err) {
            return done(err);
        }

        done(null, {
            ...report,
            course
        });
    });
}

function loadTeacher(report, done) {
    getTeacher(report.course.teacherId, function onTeacher(err, teacher) {
        if (err) {
            return done(err);
        }

        done(null, {
            ...report,
            teacher
        });
    });
}

function loadCity(report, done) {
    getCity(report.teacher.cityId, function onCity(err, city) {
        if (err) {
            return done(err);
        }

        done(null, {
            ...report,
            city
        });
    });
}

function finishReport(report, done) {
    done(null, {
        ...report,
        message: `${report.student.name} is taking ${report.course.name} with ${report.teacher.name} in ${report.city.name}.`
    });
}

function buildReport(id, done) {
    loadStudent(id, function onStudentLoaded(err, report) {
        if (err) {
            return done(err);
        }

        loadCourse(report, function onCourseLoaded(err, report) {
            if (err) {
                return done(err);
            }

            loadTeacher(report, function onTeacherLoaded(err, report) {
                if (err) {
                    return done(err);
                }

                loadCity(report, function onCityLoaded(err, report) {
                    if (err) {
                        return done(err);
                    }

                    finishReport(report, done);
                });
            });
        });
    });
}

buildReport(1, function done(err, report) {
    if (err) {
        return console.log("Error:", err.message);
    }

    console.log(report.message);
});

buildReport(99, function done(err, report) {
    if (err) {
        return console.log("Error:", err.message);
    }

    console.log(report.message);
});

// 6.4 Defend yourself

function once(fn) {
    let called = false;

    return function (...args) {
        if (called) {
            return;
        }

        called = true;
        return fn(...args);
    };
}

function badOperation(callback) {
    callback("First call");
    callback("Second call");
}

const safeCallback = once((message) => {
    console.log(message);
});

badOperation(safeCallback);