
function validateStudent(student) {
    const errors = [];

    if (!student.name || student.name.trim() === "") {
        errors.push("Name is required");
    }

    if (typeof student.score !== "number") {
        errors.push("Score must be a number");
    } else if (student.score < 0 || student.score > 100) {
        errors.push("Score must be between 0 and 100");
    }

    if (typeof student.attendance !== "number") {
        errors.push("Attendance must be a number");
    } else if (student.attendance < 0 || student.attendance > 100) {
        errors.push("Attendance must be between 0 and 100");
    }

    return errors;
}

const student = {
    name: "Mona",
    score: 105,
    attendance: "88"
};

console.log(validateStudent(student));
function makeIdGenerator(prefix) {
    let count = 0;

    return () => {
        count++;
        return `${prefix}-${count}`;
    };
}

const generateId = makeIdGenerator("USER");

console.log(generateId());
console.log(generateId());
console.log(generateId());


//
function compo(f, g) {
    return (value) => f(g(value));
}

function square(x) {
    return x * x;
}

function addFive(x) {
    return x + 5;
}

const calculate = compo(square, addFive);

console.log(calculate(3));