// 4.1 functions-lab.ts

function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

console.log(add(10, 20));
console.log(multiply(5, 4));

function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

console.log(greet("Mostafa"));
console.log(greet("Mostafa", "Welcome"));

function formatName(firstName: string, lastName?: string): string {
  return `${firstName} ${lastName ?? ""}`.trim();
}

console.log(formatName("Mostafa"));
console.log(formatName("Mostafa", "Ahmed"));

function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum());
console.log(sum(10));
console.log(sum(10, 20, 30));

type Student = {
  name: string;
  score: number;
};

function printStudent({ name, score }: Student): string {
  return `${name}: ${score}`;
}

console.log(
  printStudent({
    name: "Sara",
    score: 95
  })
);

type Operation = (a: number, b: number) => number;

const subtract: Operation = (a, b) => a - b;

const divide: Operation = (a, b) => a / b;

console.log(subtract(20, 5));
console.log(divide(20, 5));

function calculate(
  a: number,
  b: number,
  callback: (value: number) => number
): number {
  return callback(a + b);
}

console.log(calculate(10, 5, (value) => value * 2));

async function getScore(): Promise<number> {
  return 95;
}

getScore().then((score) => {
  console.log(score);
});

async function getError(): Promise<number> {
  throw new Error("Failed to get score");
}

getError().catch((error) => {
  console.log(error.message);
});

function format(value: number): string;
function format(value: string): number;

function format(value: number | string): string | number {
  if (typeof value === "number") {
    return value.toString();
  }

  return Number(value);
}

const formattedNumber = format(100);
const formattedString = format("100");

console.log(formattedNumber);
console.log(formattedString);

// format(100, 200);
//  1 argument, but got 2.

// format(true);
//  No overload matches this call.