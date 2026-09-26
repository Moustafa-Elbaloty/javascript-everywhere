function pick(obj, keys) {
    const result = {};

    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key];
        }
    }

    return result;
}

function omit(obj, keys) {
    const result = { ...obj };

    for (const key of keys) {
        delete result[key];
    }

    return result;
}

const student = {
    name: "Sara",
    score: 92,
    attendance: 85,
    city: "Cairo"
};

console.log(pick(student, ["name", "score"]));
console.log(omit(student, ["attendance", "city"]));