const name = "Moustafa Ahmed";
const city = "Qena";
const reason = "to improve my JavaScript skills";

function createProfile(name, city, reason) {
    return `My name is ${name}, I live in ${city}, and I joined to ${reason}.`;
}

console.log(createProfile(name, city, reason));
console.log(process.version);