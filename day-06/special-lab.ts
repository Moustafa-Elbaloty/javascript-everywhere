// 3.1 any, unknown, void, never

const anyValue: any = null;

try {
  console.log(anyValue.name.toUpperCase());
} catch (error) {
  console.log("any runtime error:", error);
}

const unknownValue: unknown = "TypeScript";

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello TypeScript");

function fail(message: string): never {
  throw new Error(message);
}

try {
  fail("Something went wrong");
} catch (error) {
  console.log("never error:", error);
}

// function implicitAny(value) {
//   return value;
// }
// Error: Parameter 'value' implicitly has an 'any' type.


// 3.2 Literals, unions, intersections, aliases

type Direction = "up" | "down" | "left" | "right";

const direction: Direction = "up";

// const invalidDirection: Direction = "forward";
// Error: Type '"forward"' is not assignable to type 'Direction'.

type Score = 0 | 50 | 100;

const score: Score = 100;

// const invalidScore: Score = 75;
// Error: Type '75' is not assignable to type 'Score'.

function printValue(value: number | string): void {
  console.log(value);
}

printValue(100);
printValue("100");

type Person = {
  name: string;
  age: number;
};

type Employee = {
  company: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "Mostafa",
  age: 30,
  company: "WE"
};

console.log(employee);

// const incompleteEmployee: EmployeePerson = {
//   name: "Mostafa",
//   age: 30
// };
// Error: Property 'company' is missing.


// 3.3 Enums and as const

// enum Status {
//   Active,
//   Inactive
// }
// Editor/Node error was recorded, then the enum was deleted.

const statusValues = {
  Active: "active",
  Inactive: "inactive"
} as const;

type Status = typeof statusValues[keyof typeof statusValues];

// Derived type:
// "active" | "inactive"

function printStatus(status: Status): void {
  console.log(status);
}

printStatus("active");

// printStatus("pending");
// Error: Argument of type '"pending"' is not assignable to parameter of type 'Status'.


// 3.4 Assertions

type Product = {
  id: number;
  name: string;
};

const validJson = JSON.parse(
  '{"id":1,"name":"Laptop"}'
) as Product;

console.log(validJson.name);

const invalidJson = JSON.parse(
  '{"id":1}'
) as Product;

console.log(invalidJson.name);
// TypeScript accepts the assertion, but the actual property is undefined.

const settings = {
  theme: "dark",
  language: "en"
} as const;

// settings.theme = "light";
// Error: Cannot assign to 'theme' because it is a read-only property.

function getElement(): { textContent: string } | null {
  return null;
}

const element = getElement();

try {
  console.log(element!.textContent);
} catch (error) {
  console.log("Non-null assertion runtime error:", error);
}

if (element) {
  console.log(element.textContent);
}

// 'as' is acceptable when the programmer knows more than TypeScript,
// but external data should be validated instead of blindly trusting an assertion.