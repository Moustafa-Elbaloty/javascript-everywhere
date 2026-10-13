// 8.1 Generic functions

function first<T>(items: T[]): T | undefined {
  return items[0];
}

function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

const firstNumber = first([10, 20, 30]);
const firstString = first(["JavaScript", "TypeScript"]);

const firstStudent = first([
  { id: 1, name: "Sara" },
  { id: 2, name: "Ahmed" }
]);
// inferred type: { id: number; name: string } | undefined

console.log(firstNumber);
console.log(firstString);
console.log(firstStudent);

const lastNumber = last([10, 20, 30]);

const lastString = last(["JavaScript", "TypeScript"])

const lastStudent = last([
  { id: 1, name: "Sara" },
  { id: 2, name: "Ahmed" }
]);
// inferred type: { id: number; name: string } | undefined

console.log(lastNumber);
console.log(lastString);
console.log(lastStudent);


function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const students = [
  { id: 1, name: "Sara", score: 95 },
  { id: 2, name: "Ahmed", score: 85 }
];

const courses = [
  { id: 101, name: "JavaScript" },
  { id: 102, name: "Node.js" }
];

console.log(findById(students, 1));
console.log(findById(courses, 101));

// const invalidTable = [
//   { name: "Sara" }
// ];

// findById(invalidTable, 1);
// Error: Type '{ name: string; }' does not satisfy the constraint
// '{ id: number; }'.


function pluck<T, K extends keyof T>(
  items: T[],
  key: K
): T[K][] {
  return items.map((item) => item[key]);
}

console.log(pluck(students, "name"));
console.log(pluck(students, "score"));

// pluck(students, "email");
// Error: Argument of type '"email"' is not assignable to
// parameter of type '"id" | "name" | "score"'.


type GradedStudent = {
  id: number;
  name: string;
  grade: "A" | "B" | "C";
};

const gradedStudents: GradedStudent[] = [
  { id: 1, name: "Sara", grade: "A" },
  { id: 2, name: "Ahmed", grade: "B" },
  { id: 3, name: "Mona", grade: "A" },
  { id: 4, name: "Ali", grade: "C" }
];

function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Map<T[K], T[]> {
  const groups = new Map<T[K], T[]>();

  for (const item of items) {
    const group = item[key];

    if (!groups.has(group)) {
      groups.set(group, []);
    }

    groups.get(group)!.push(item);
  }

  return groups;
}

const studentsByGrade = groupBy(gradedStudents, "grade");

console.log(studentsByGrade);


function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

console.log(unique([1, 2, 2, 3, 3, 3]));
console.log(unique(["JS", "TS", "JS"]));


// 8.2 Generic types

type Result<T> =
  | {
      status: "success";
      value: T;
    }
  | {
      status: "error";
      error: string;
    };

function describeResult<T>(result: Result<T>): string {
  switch (result.status) {
    case "success":
      return `Success: ${String(result.value)}`;

    case "error":
      return `Error: ${result.error}`;

    default: {
      const unreachable: never = result;
      return unreachable;
    }
  }
}

console.log(
  describeResult<number>({
    status: "success",
    value: 100
  })
);

console.log(
  describeResult<number>({
    status: "error",
    error: "Something went wrong"
  })
);


function safeParse<T>(
  json: string,
  check: (value: unknown) => value is T
): Result<T> {
  try {
    const value: unknown = JSON.parse(json);

    if (check(value)) {
      return {
        status: "success",
        value
      };
    }

    return {
      status: "error",
      error: "Invalid shape"
    };
  } catch {
    return {
      status: "error",
      error: "Invalid JSON"
    };
  }
}

type Product = {
  id: number;
  name: string;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === "number" &&
    typeof product.name === "string"
  );
}

const validJson = safeParse<Product>(
  '{"id":1,"name":"Laptop"}',
  isProduct
);

const wrongShapeJson = safeParse<Product>(
  '{"id":1}',
  isProduct
);

const invalidJson = safeParse<Product>(
  '{"id":1,"name":"Laptop"',
  isProduct
);

console.log(describeResult(validJson));
console.log(describeResult(wrongShapeJson));
console.log(describeResult(invalidJson));

// const result = validJson;
// console.log(result.value);
// Error:
// Property 'value' does not exist on type 'Result<Product>'.
// result.status must be checked first.


interface Store<T extends { id: number }> {
  add(item: T): void;
  get(id: number): T | undefined;
  all(): T[];
  remove(id: number): boolean;
}

function createStore<T extends { id: number }>(): Store<T> {
  const items = new Map<number, T>();

  return {
    add(item: T): void {
      items.set(item.id, item);
    },

    get(id: number): T | undefined {
      return items.get(id);
    },

    all(): T[] {
      return [...items.values()];
    },

    remove(id: number): boolean {
      return items.delete(id);
    }
  };
}

type StoreStudent = {
  id: number;
  name: string;
  score: number;
};

type StoreCourse = {
  id: number;
  name: string;
  teacherId: number;
};

const studentStore = createStore<StoreStudent>();

studentStore.add({
  id: 1,
  name: "Sara",
  score: 95
});

studentStore.add({
  id: 2,
  name: "Ahmed",
  score: 85
});

console.log(studentStore.get(1));
console.log(studentStore.all());
console.log(studentStore.remove(2));
console.log(studentStore.all());

const courseStore = createStore<StoreCourse>();

courseStore.add({
  id: 101,
  name: "JavaScript",
  teacherId: 201
});

courseStore.add({
  id: 102,
  name: "Node.js",
  teacherId: 202
});

console.log(courseStore.get(101));
console.log(courseStore.all());

// studentStore.add({
//   id: 3,
//   name: "Mona"
// });
// Error: Property 'score' is missing.


/* 8.3 Generic async */

function withTimeout<T>(
  promise: Promise<T>,
  milliseconds: number
): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Operation timed out"));
    }, milliseconds);
  });

  return Promise.race([promise, timeout]);
}

async function delayedValue<T>(
  value: T,
  milliseconds: number
): Promise<T> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

  return value;
}

async function testTimeout(): Promise<void> {
  const result = await withTimeout(
    delayedValue("TypeScript", 100),
    500
  );

  console.log("Timeout result:", result);
}

testTimeout();


function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function retry<T>(
  operation: () => Promise<T>,
  attempts: number
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error: unknown) {
      lastError = error;
    }
  }

  throw new Error(
    `Operation failed after ${attempts} attempts: ${errorMessage(lastError)}`
  );
}

let retryCount = 0;

async function unstableOperation(): Promise<string> {
  retryCount++;

  if (retryCount < 3) {
    throw new Error(`Attempt ${retryCount} failed`);
  }

  return "Operation succeeded";
}

retry(unstableOperation, 3)
  .then((result) => {
    console.log("Retry:", result);
  })
  .catch((error: unknown) => {
    console.log("Retry error:", errorMessage(error));
  });


async function mapAsync<T, U>(
  items: T[],
  mapper: (item: T) => Promise<U>
): Promise<U[]> {
  return Promise.all(items.map(mapper));
}

async function doubleAsync(value: number): Promise<number> {
  return value * 2;
}

mapAsync([1, 2, 3], doubleAsync)
  .then((result) => {
    console.log("mapAsync:", result);
  });


async function getStudent(id: number): Promise<string> {
  if (id === 1) {
    return "Sara";
  }

  throw new Error(`Student ${id} not found`);
}

async function getCourse(id: number): Promise<string> {
  if (id === 101) {
    return "JavaScript";
  }

  throw new Error(`Course ${id} not found`);
}

async function getTeacher(id: number): Promise<string> {
  if (id === 201) {
    return "Mostafa";
  }

  throw new Error(`Teacher ${id} not found`);
}

async function runTask5Functions(): Promise<void> {
  try {
    const student = await getStudent(1);
    const course = await getCourse(101);
    const teacher = await getTeacher(201);

    console.log("Task 5 Student:", student);
    console.log("Task 5 Course:", course);
    console.log("Task 5 Teacher:", teacher);
  } catch (error: unknown) {
    console.log("Task 5 error:", errorMessage(error));
  }
}

runTask5Functions();