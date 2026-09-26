function withTimeout(fn, ms) {
    let finished = false;

    const timer = setTimeout(() => {
        if (!finished) {
            finished = true;
            console.log("Timeout");
        }
    }, ms);

    fn((error, result) => {
        if (finished) {
            return;
        }

        finished = true;
        clearTimeout(timer);

        if (error) {
            console.log("Error:", error.message);
            return;
        }

        console.log("Result:", result);
    });
}

withTimeout((done) => {
    setTimeout(() => {
        done(null, "Success");
    }, 500);
}, 1000);