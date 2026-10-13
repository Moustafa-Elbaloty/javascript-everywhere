// 2.1 Create

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function delayValue(ms, value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
}

function failAfter(ms, message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(message)), ms);
    });
}
const pendingPromise = delayValue(1000, "Done");

console.log("Before:", pendingPromise);

pendingPromise.then((value) => {
    console.log("After:", value);
});
// 2.2 Settles once

const resolveTwice = new Promise((resolve) => {
    resolve("First resolve");
    resolve("Second resolve");
});

resolveTwice.then((value) => {
    console.log("Resolve twice:", value);
});

const resolveThenReject = new Promise((resolve, reject) => {
    resolve("Resolved");
    reject(new Error("Rejected"));
});

resolveThenReject
    .then((value) => {
        console.log("Resolve then reject:", value);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });

// 2.3 Chain

Promise.resolve(2)
    .then((value) => value + 3)
    .then((value) => value * 2)
    .then((value) => value - 1)
    .then((value) => value * 4)
    .then((value) => {
        console.log("Four then result:", value);
    });

delayValue(500, 10)
    .then((value) => delayValue(500, value + 5))
    .then((value) => delayValue(500, value * 2))
    .then((value) => {
        console.log("Three delayValue result:", value);
    });

delayValue(500, 10)
    .then((value) => {
        return delayValue(500, value + 5);
    })
    .then((value) => {
        console.log("After return:", value);
    });

Promise.resolve({
    name: "Mostafa",
    score: 95
})
    .then(({ name, score }) => {
        console.log("Student:", name);
        console.log("Score:", score);
    });// 2.4 Errors

Promise.resolve("Start")
    .then((value) => {
        console.log("Step 1:", value);
        return "Step 2";
    })
    .then((value) => {
        console.log("Step 2:", value);
        throw new Error("Something went wrong");
    })
    .then((value) => {
        console.log("Step 3:", value);
        return "Step 4";
    })
    .then((value) => {
        console.log("Step 4:", value);
        return value;
    })
    .catch((error) => {
        console.log("Caught:", error.message);
    });

Promise.resolve("Start")
    .then((value) => {
        console.log("Fallback Step 1:", value);
        throw new Error("Failed");
    })
    .catch((error) => {
        console.log("Fallback:", error.message);
        return "Fallback value";
    })
    .then((value) => {
        console.log("After catch:", value);
    });

Promise.resolve("Success")
    .then((value) => {
        console.log("Fulfilled:", value);
    })
    .finally(() => {
        console.log("cleanup");
    });

Promise.reject(new Error("Failure"))
    .catch((error) => {
        console.log("Rejected:", error.message);
    })
    .finally(() => {
        console.log("cleanup");
    });

Promise.reject("String error")
    .catch((error) => {
        console.log("String rejection:", error);
        console.log("err.message:", error.message);
    });

Promise.reject(new Error(" Error"))
    .catch((error) => {
        console.log(" Error:", error);
        console.log(" err.message:", error.message);
    });

Promise.reject(new Error("Unhandled rejection"));

// Promise.reject(new Error("Handled rejection"))
//     .catch((error) => {
//         console.log("Handled:", error.message);
//     });