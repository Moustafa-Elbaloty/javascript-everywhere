// 6.4

import { add, subtract, multiply } from "./math.js";
import divide from "./math.js";
import { add as sum } from "./math.js";
import * as math from "./math.js";
console.log(add(10, 5));
console.log(subtract(10, 5));
console.log(multiply(10, 5));
console.log(divide(10, 5));
console.log(sum(10, 5));

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
console.log(math.multiply(10, 5));
console.log(math.default(10, 5));

if (true) {
    const module = await import("./math.js");
    console.log(module.default(20, 4));
}