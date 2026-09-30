const controller = new AbortController();

const timeout = setTimeout(() => {
    controller.abort();
}, 1000);

fetch("https://jsonplaceholder.typicode.com/todos/1", {
    signal: controller.signal
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error.name);
    })
    .finally(() => {
        clearTimeout(timeout);
    });