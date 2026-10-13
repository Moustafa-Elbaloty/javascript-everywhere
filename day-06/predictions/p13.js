"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function label(x) {
    if (typeof x === "string")
        return x.toUpperCase();
    return x.toFixed(1);
}
console.log(label("a"), label(2));
