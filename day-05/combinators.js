
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

Promise.all([
    delayValue(300, "A"),
    delayValue(100, "B"),
    delayValue(200, "C")
])
    .then((values) => {
        console.log("Input order:", values);
    });

const start = Date.now();

Promise.all([
    delayValue(100, "First"),
    delayValue(200, "Second"),
    delayValue(500, "Slowest")
])
    .then((values) => {
        console.log("Timed result:", values);
        console.log("Total time:", Date.now() - start, "ms");
    });

Promise.all([
    delayValue(300, "Success"),
    failAfter(100, "One Promise failed"),
    delayValue(500, "Another success")
])
    .then((values) => {
        console.log("Should not run:", values);
    })
    .catch((error) => {
        console.log("Promise.all rejected:", error.message);
    });

function loadAll(ids, getValue) {
    return Promise.all(
        ids.map((id) => getValue(id))
    );
}

loadAll([1, 2, 3], (id) => {
    return delayValue(100, `Item ${id}`);
})
    .then((values) => {
        console.log("loadAll:", values);
    });

// Day 04 loadAll used repeated callback handling; Promise.all + map reduces the code to one Promise.all and one map.
// 4 Promise.allSettled

Promise.allSettled([
    delayValue(300, "Success 1"),
    failAfter(100, "Failure 1"),
    delayValue(200, "Success 2"),
    failAfter(150, "Failure 2")
])
    .then((results) => {
        results.forEach((result, index) => {
            console.log(`Promise ${index + 1}:`);
            console.log("status:", result.status);
            console.log("value:", result.value);
            console.log("reason:", result.reason);
        });

        const failures = results.filter(
            (result) => result.status === "rejected"
        );

        console.log("Failures:", failures.length);
    });

// 4.3 

Promise.race([
    delayValue(500, "Slow success"),
    failAfter(100, "Fast failure")
])
    .then((value) => {
        console.log("Race result:", value);
    })
    .catch((error) => {
        console.log("Race rejected:", error.message);
    });

Promise.any([
    delayValue(500, "Slow success"),
    failAfter(100, "Fast failure")
])
    .then((value) => {
        console.log("Any result:", value);
    })
    .catch((error) => {
        console.log("Any rejected:", error.message);
    });

Promise.any([
    failAfter(100, "Failure 1"),
    failAfter(200, "Failure 2"),
    failAfter(300, "Failure 3")
])
    .then((value) => {
        console.log("Should not run:", value);
    })
    .catch((error) => {
        console.log("Any error:", error.name);
        console.log("Errors count:", error.errors.length);
    });

// Promise.all: use when all independent operations must succeed.
// Promise.allSettled: use when every result matters, including failures.
// Promise.race: use when the first settled result should decide the outcome.
// Promise.any: use when the first successful result is enough.