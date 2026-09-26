// 5.4 callbacks.js — sync vs async

function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
        callback(i);
        console.log("done");
    }
}

function repeatLater(times, callback) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => callback(i), 0);
        console.log("done");
    }
}

repeat(3, (i) => console.log("callback", i));
repeatLater(3, (i) => console.log("callback", i));

// repeat runs the callback synchronously, while repeatLater schedules it asynchronously.


// 5.5 callbacks.js — you can't return from the future

function getScoreLater() {
    setTimeout(() => {
        return 95;
    }, 100);
}

console.log(getScoreLater());

function getScoreLaterCallback(callback) {
    setTimeout(() => {
        const score = 95;
        const grade = score >= 50 ? "PASS" : "FAIL";

        callback(grade);
    }, 100);
}

getScoreLaterCallback((grade) => {
    console.log(grade);
});


// 5.6 callbacks.js — error-first

function findStudent(id, callback) {
    const students = [
        { id: 1, name: "Sara", score: 92 },
        { id: 2, name: "Ahmed", score: 78 }
    ];

    const student = students.find((student) => student.id === id);

    if (!student) {
        return callback(new Error("Student not found"), null);
    }

    return callback(null, student);
}

findStudent(1, (err, student) => {
    if (err) {
        return console.log(err.message);
    }

    console.log(student);
});

findStudent(99, (err, student) => {
    if (err) {
        return console.log(err.message);
    }

    console.log(student);
});


// 5.7 callbacks.js — try/catch can't save you

try {
    setTimeout(() => {
        throw new Error("Something went wrong");
    }, 100);
} catch (err) {
    console.log("Caught:", err.message);
}

// catch cannot catch errors thrown later inside a setTimeout callback.

function safeOperation(callback) {
    setTimeout(() => {
        const error = new Error("Something went wrong");

        callback(error, null);
    }, 100);
}

safeOperation((err, result) => {
    if (err) {
        console.log("Handled:", err.message);
        return;
    }

    console.log(result);
});