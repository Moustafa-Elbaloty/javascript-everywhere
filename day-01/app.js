const name = document.getElementById("name");
const changeBtn = document.getElementById("chgBtn");
const consoleBtn = document.getElementById("consoleBtn");

changeBtn.addEventListener("click", function () {
    name.textContent = "Moustafa Ahmed - JavaScript Developer";
});

consoleBtn.addEventListener("click", function () {
    console.log("Hello from the browser console!");
});