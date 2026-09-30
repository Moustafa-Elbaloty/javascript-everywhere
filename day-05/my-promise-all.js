function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

const promises = [
    new Promise(resolve => setTimeout(() => resolve("First"), 300)),
    new Promise(resolve => setTimeout(() => resolve("Second"), 100)),
    new Promise(resolve => setTimeout(() => resolve("Third"), 200))
];



// const promises = [
//     new Promise(resolve => setTimeout(() => resolve("First"), 300)),
//     new Promise((resolve, reject) =>
//         setTimeout(() => reject(new Error("Failed")), 100)
//     ),
//     new Promise(resolve => setTimeout(() => resolve("Third"), 200))
// ];



myPromiseAll(promises)
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error.message);
    });