async function retryWithBackoff(fn, attempts) {
    let lastError;

    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (i < attempts - 1) {
                const delay = 100 * 2 ** i;

                await new Promise(resolve => {
                    setTimeout(resolve, delay);
                });
            }
        }
    }

    throw lastError;
}

let count = 0;

retryWithBackoff(() => {
    count++;

    if (count < 4) {
        throw new Error("Failed");
    }

    return "Success";
}, 4)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error.message);
    });