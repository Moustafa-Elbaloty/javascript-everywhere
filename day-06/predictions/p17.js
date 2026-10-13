"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getScore() { return 92; }
const score = await getScore();
console.log(score.toFixed(1));
