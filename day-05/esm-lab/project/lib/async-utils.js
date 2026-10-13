// 7.2 

export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, ms);
    });

    return Promise.race([promise, timeout]);
}

export async function retry(fn, attempts) {
    let lastError;

    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
}