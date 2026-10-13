// 6.2 guards.ts

type Student = {
  id: number;
  name: string;
  courseId: number;
  score: number;
};

function isStudent(value: unknown): value is Student {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const student = value as Record<string, unknown>;

  return (
    typeof student.id === "number" &&
    typeof student.name === "string" &&
    typeof student.courseId === "number" &&
    typeof student.score === "number" &&
    student.score >= 0 &&
    student.score <= 100
  );
}
}console.log(
  isStudent({
    id: 1,
    name: "Sara",
    courseId: 101,
    score: 95
  })
);

console.log(
  isStudent({
    id: 2,
    name: "Ahmed",
    courseId: 102,
    score: 150
  })
);const rawData: unknown = JSON.parse(`
[
  {
    "id": 1,
    "name": "Sara",
    "courseId": 101,
    "score": 95
  },
  {
    "id": "2",
    "name": "Ahmed",
    "courseId": 102,
    "score": 85
  },
  {
    "id": 3,
    "name": "Mona",
    "courseId": 103,
    "score": 150
  },
  {
    "id": 4,
    "name": "Ali",
    "courseId": 104,
    "score": 90
  }
]
`);

if (!Array.isArray(rawData)) {
  throw new Error("Expected an array");
}

const validStudents = rawData.filter(isStudent);

console.log("Valid students:", validStudents);
console.log("Valid count:", validStudents.length);
console.log("Rejected count:", rawData.length - validStudents.length);