// 2.1 
const isActive: boolean = true;
const age: number = 30;
const userName: string = "Mostafa";

const inferredBoolean = false;
const inferredNumber = 100;
const inferredString = "TypeScript";

const emptyValue: null = null;
const missingValue: undefined = undefined;

const bigNumber: bigint = 12345678901234567890n;

const uniqueId: symbol = Symbol("id");


// 2.2

const message: string = "Hello TypeScript";
console.log(message.toUpperCase());
console.log(message.toLowerCase());
console.log(message.includes("Type"));

const decimal: number = 0.1 + 0.2;
console.log(decimal);
console.log(Number.isNaN(NaN));

const loggedIn: boolean = true;
console.log(loggedIn);

const huge: bigint = 100n;
console.log(huge + 50n);

const token: symbol = Symbol("token");
console.log(token);

const optionalName: string | null = null;
console.log(optionalName);

const rawValue: unknown = "TypeScript";

if (typeof rawValue === "string") {
  console.log(rawValue.toUpperCase());
}


// 
const numbers: number[] = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
const filtered = numbers.filter((n) => n > 2);
const total = numbers.reduce((sum, n) => sum + n, 0);

console.log(doubled);
console.log(filtered);
console.log(total);

const emptyList: string[] = [];
emptyList.push("TypeScript");

console.log(emptyList);

const students: { name: string; score: number }[] = [
  { name: "Sara", score: 92 },
  { name: "Omar", score: 85 }
];

console.log(students);

const matrix: number[][] = [
  [1, 2],
  [3, 4]
];

console.log(matrix);

const studentTuple: [string, number, boolean?] = [
  "Sara",
  92
];

console.log(studentTuple);

type User = {
  name: string;
  age?: number;
};

const user: User = {
  name: "Sara"
};

console.log(user);

const profile: {
  name: string;
  address: {
    city: string;
    country: string;
  };
} = {
  name: "Mostafa",
  address: {
    city: "Qena",
    country: "Egypt"
  }
};

console.log(profile);


// ))=

const numericString = "42";

const convertedNumber = Number(numericString);
const parsedInteger = parseInt(numericString, 10);
const parsedFloat = parseFloat("42.5");

console.log(convertedNumber);
console.log(parsedInteger);
console.log(parsedFloat);

const numberValue: number = 123;
const stringValue: string = String(numberValue);

console.log(stringValue);
console.log(typeof stringValue);

const textValue: string = "123";
const numberFromText: number = Number(textValue);

console.log(numberFromText);
console.log(typeof numberFromText);

console.log(typeof "hello");
console.log(typeof 123);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof 10n);
console.log(typeof Symbol("x"));

