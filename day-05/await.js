// 5.1 Rewrite

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

async function buildReport(studentId, courseId = 101, teacherId = 201) {
    const student = await getStudent(studentId);
    const course = await getCourse(courseId);
    const teacher = await getTeacher(teacherId);
    const city = await getCity(teacher.cityId);

    console.log(
        `${student.name} is taking ${course.name} with ${teacher.name} in ${city.name}.`
    );
}

console.log(buildReport(1));

async function main() {
    try {
        await buildReport(1);
        await buildReport(99);
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        console.log("Main finished");
    }
}

main().catch((error) => {
    console.log("Main catch:", error.message);
});

// 5.2 

async function loadSequential(ids) {
    const start = Date.now();
    const students = [];

    for (const id of ids) {
        const student = await getStudent(id);
        students.push(student);
    }

    console.log("Sequential:", students);
    console.log("Sequential time:", Date.now() - start, "ms");
}

async function loadParallel(ids) {
    const start = Date.now();

    const students = await Promise.all(
        ids.map((id) => getStudent(id))
    );

    console.log("Parallel:", students);
    console.log("Parallel time:", Date.now() - start, "ms");
}

async function compareLoading() {
    const ids = [1, 2, 3];

    await loadSequential(ids);
    await loadParallel(ids);
}

compareLoading();

// 5.3 The forEach trap

async function forEachTrap(ids) {
    ids.forEach(async (id) => {
        const student = await getStudent(id);
        console.log("forEach:", student.name);
    });

    console.log("forEach done");
}

async function loadWithForOf(ids) {
    for (const id of ids) {
        const student = await getStudent(id);
        console.log("for...of:", student.name);
    }

    console.log("for...of done");
}

async function loadWithPromiseAll(ids) {
    const students = await Promise.all(
        ids.map((id) => getStudent(id))
    );

    students.forEach((student) => {
        console.log("Promise.all:", student.name);
    });

    console.log("Promise.all done");
}

async function compareLoops() {
    const ids = [1, 2, 3];

    await forEachTrap(ids);

    await loadWithForOf(ids);

    await loadWithPromiseAll(ids);
}

compareLoops();
// 5.4 return await

function risky() {
    return Promise.reject(new Error("Something went wrong"));
}

async function withoutAwait() {
    try {
        return risky();
    } catch (error) {
        console.log("without await caught:", error.message);
    }
}

async function withAwait() {
    try {
        return await risky();
    } catch (error) {
        console.log("with await caught:", error.message);
    }
}

withoutAwait()
    .catch((error) => {
        console.log("without await outer catch:", error.message);
    });

withAwait();

console.log("Await commit");
// return risky() passes the rejected Promise to the caller; return await risky() lets the local try/catch catch the rejection.