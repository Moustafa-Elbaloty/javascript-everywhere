import { validateBooking, type BookingValues } from "./validate.ts";

const today = "2026-10-10";

const valid: BookingValues = {
  name: "Sara",
  email: "sara@mail.com",
  phone: "010 1234 5678",
  seats: "2",
  date: "2026-10-17",
  terms: true,
};

function same(
  actual: Record<string, string>,
  expected: Record<string, string>,
): boolean {
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();

  return (
    JSON.stringify(actualKeys) === JSON.stringify(expectedKeys) &&
    expectedKeys.every((key) => actual[key] === expected[key])
  );
}

const tests: {
  name: string;
  values: BookingValues;
  expected: Record<string, string>;
}[] = [
  {
    name: "Example 1: valid booking",
    values: valid,
    expected: {},
  },
  {
    name: "Example 2: empty form",
    values: {
      name: "",
      email: "",
      phone: "",
      seats: "",
      date: "",
      terms: false,
    },
    expected: {
      name: "Name is required",
      email: "Email is required",
      phone: "Phone is required",
      seats: "Book 1 to 4 seats",
      date: "Pick a date",
      terms: "Accept the terms to continue",
    },
  },
  {
    name: "Example 3: invalid fields",
    values: {
      name: " A ",
      email: "sara@mail",
      phone: "01312345678",
      seats: "1e2",
      date: "2026-10-09",
      terms: true,
    },
    expected: {
      name: "Use at least 2 characters",
      email: "Enter an email like name@example.com",
      phone: "Enter a mobile number like 010 1234 5678",
      seats: "Book 1 to 4 seats",
      date: "That date has passed",
    },
  },
  {
    name: "Example 4: valid data except Friday",
    values: {
      name: "Omar",
      email: " omar@site.org ",
      phone: "0115 555 1234",
      seats: " 4 ",
      date: "2026-10-16",
      terms: true,
    },
    expected: {
      date: "We're closed on Fridays",
    },
  },
  {
    name: "Example 5: zero seats",
    values: {
      ...valid,
      name: "Mo",
      email: "mo@x.io",
      phone: "01098765432",
      seats: "0",
      date: today,
    },
    expected: {
      seats: "Book 1 to 4 seats",
    },
  },
  {
    name: "Extra 1: minimum seats accepted",
    values: { ...valid, seats: "1" },
    expected: {},
  },
  {
    name: "Extra 2: maximum seats accepted",
    values: { ...valid, seats: "4" },
    expected: {},
  },
  {
    name: "Extra 3: invalid mobile prefix",
    values: { ...valid, phone: "01412345678" },
    expected: {
      phone: "Enter a mobile number like 010 1234 5678",
    },
  },
];

let failed = 0;

for (const test of tests) {
  const actual = validateBooking(test.values, today);
  const passed = same(actual, test.expected);

  console.log(`${passed ? "PASS" : "FAIL"} — ${test.name}`);

  if (!passed) {
    failed++;
    console.log("Expected:", test.expected);
    console.log("Actual:  ", actual);
  }
}

console.log(`\n${tests.length - failed}/${tests.length} tests passed.`);

if (failed > 0) {
  throw new Error(`${failed} test(s) failed.`);
}
