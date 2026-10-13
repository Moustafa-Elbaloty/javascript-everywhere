"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function longest(a, b) { return a.length >= b.length ? a : b; }
console.log(longest("abc", "de"), longest([1], [1, 2]));
console.log(longest(10, 20));
