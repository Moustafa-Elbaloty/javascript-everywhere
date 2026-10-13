// 9.1 utilities-lab.ts

interface Student {
  id: number;
  name: string;
  score: number;
  grade: LetterGrade;
  email: string;
}

type LetterGrade = "A" | "B" | "C" | "D" | "F";

type StudentInput = Omit<Student, "id">;

function addStudent(input: StudentInput): Student {
  return {
    id: 1,
    ...input
  };
}

const newStudent = addStudent({
  name: "Sara",
  score: 95,
  grade: "A",
  email: "sara@example.com"
});

console.log(newStudent);


type StudentUpdate = Partial<Omit<Student, "id">>;

function updateStudent(
  student: Student,
  update: StudentUpdate
): Student {
  return {
    ...student,
    ...update
  };
}

const updatedStudent = updateStudent(newStudent, {
  score: 98,
  grade: "A"
});

console.log(updatedStudent);

// updateStudent(newStudent, {
//   id: 10
// });
// Error: 'id' does not exist in StudentUpdate.

// updateStudent(newStudent, {
//   score: "98"
// });
// Error: Type 'string' is not assignable to type 'number'.


type PublicStudent = Pick<Student, "name" | "grade">;

function toPublicStudent(student: Student): PublicStudent {
  return {
    name: student.name,
    grade: student.grade
  };
}

const publicStudent = toPublicStudent(updatedStudent);

console.log(publicStudent);


const readonlyStudent: Readonly<Student> = updatedStudent;

console.log(readonlyStudent);

// readonlyStudent.name = "Ahmed";
// Error: Cannot assign to 'name' because it is a read-only property.


const gradeCounts: Record<LetterGrade, number> = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  F: 0
};

gradeCounts.A++;
gradeCounts.B += 2;

console.log(gradeCounts);


async function getStudent(): Promise<Student> {
  return updatedStudent;
}

type StudentPromise = ReturnType<typeof getStudent>;
// StudentPromise = Promise<Student>

type StudentResult = Awaited<StudentPromise>;
// StudentResult = Student

async function loadStudent(): Promise<StudentResult> {
  return getStudent();
}

loadStudent().then((student) => {
  console.log("Loaded:", student);
});


const allowedGrades = [
  "A",
  "B",
  "C",
  "D",
  "F"
] as const;

type AllowedGrade = typeof allowedGrades[number];

const selectedGrade: AllowedGrade = "A";

console.log(selectedGrade);

// const invalidGrade: AllowedGrade = "X";
// Error: Type '"X"' is not assignable to type AllowedGrade.


interface BaseEntity {
  id: number;
  createdAt: Date;
}

interface BaseStudent extends BaseEntity {
  name: string;
  score: number;
}

interface BaseCourse extends BaseEntity {
  name: string;
  teacherId: number;
}

const baseStudent: BaseStudent = {
  id: 1,
  createdAt: new Date(),
  name: "Sara",
  score: 95
};

const baseCourse: BaseCourse = {
  id: 101,
  createdAt: new Date(),
  name: "JavaScript",
  teacherId: 201
};

console.log(baseStudent);
console.log(baseCourse);

// Adding createdAt to BaseEntity also affects every derived type.
// This is useful when the property is truly common to every entity,
// because TypeScript prevents derived objects from forgetting it.