// 6.1 

module.exports = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Finished after ${ms}ms`);
        }, ms);
    });
};