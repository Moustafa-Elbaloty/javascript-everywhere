function mapLimit(items, limit, asyncFn) {
    return new Promise((resolve, reject) => {
        const results = [];
        let nextIndex = 0;
        let completed = 0;
        let active = 0;

        if (items.length === 0) {
            resolve([]);
            return;
        }

        function runNext() {
            if (completed === items.length) {
                resolve(results);
                return;
            }

            while (active < limit && nextIndex < items.length) {
                const index = nextIndex++;
                active++;

                Promise.resolve(asyncFn(items[index], index))
                    .then(result => {
                        results[index] = result;
                        active--;
                        completed++;
                        runNext();
                    })
                    .catch(reject);
            }
        }

        runNext();
    });
}

const items = [1, 2, 3, 4, 5];

mapLimit(items, 2, async item => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return item * 2;
})
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error.message);
    });
