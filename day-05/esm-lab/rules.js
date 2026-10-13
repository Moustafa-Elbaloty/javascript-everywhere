// 6.5 ESM rules

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const content = await readFile("./package.json", "utf8");

console.log("Package:", content);

console.log("File URL:", import.meta.url);

console.log("Directory:", import.meta.dirname);

console.log("Filename:", import.meta.filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

// 
// Before Node v16, ESM did not provide these CommonJS globals directly.