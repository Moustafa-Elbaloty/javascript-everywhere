// 5.2 typed-db.ts

import type {
  Student,
  Course,
  Teacher,
  City,
  StudentWithCourse
} from "./db-types";

const students: Record<number, Student> = {
  1: {
    id: 1,
    name: "Sara",
    courseId: 101,
    status: "active"
  },
  2: {
    id: 2,
    name: "Ahmed",
    courseId: 102,
    status: "active"
  },
  3: {
    id: 3,
    name: "Mona",
    courseId: 103,
    status: "inactive"
  }
};

const courses: Record<number, Course> = {
  101: {
    id: 101,
    name: "JavaScript",
    teacherId: 201,
    level: "beginner"
  },
  102: {
    id: 102,
    name: "Node.js",
    teacherId: 202,
    level: "advanced"
  },
  103: {
    id: 103,
    name: "Angular",
    teacherId: 203,
    level: "advanced"
  }
};

const teachers: Record<number, Teacher> = {
  201: {
    id: 201,
    name: "Mostafa",
    cityId: 301,
    subject: "JavaScript"
  },
  202: {
    id: 202,
    name: "Ahmed",
    cityId: 302,
    subject: "Node.js"
  },
  203: {
    id: 203,
    name: "Omar",
    cityId: 303,
    subject: "Angular"
  }
};

const cities: Record<number, City> = {
  301: {
    id: 301,
    name: "Cairo",
    country: "Egypt"
  },
  302: {
    id: 302,
    name: "Giza",
    country: "Egypt"
  },
  303: {
    id: 303,
    name: "Alexandria",
    country: "Egypt"
  }
};

function lookup<T>(
  table: Record<number, T>,
  id: number,
  tableName: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = table[id];

      if (!item) {
        reject(new Error(`${tableName} id ${id} not found`));
        return;
      }

      resolve(item);
    }, 200);
  });
}

function getStudent(id: number): Promise<Student> {
  return lookup(students, id, "Student");
}

function getCourse(id: number): Promise<Course> {
  return lookup(courses, id, "Course");
}

function getTeacher(id: number): Promise<Teacher> {
  return lookup(teachers, id, "Teacher");
}

function getCity(id: number): Promise<City> {
  return lookup(cities, id, "City");
}

async function buildReport(studentId: number): Promise<StudentWithCourse> {
  const student = await getStudent(studentId);
  const course = await getCourse(student.courseId);

  return {
    ...student,
    course
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function main(): Promise<void> {
  try {
    const student = await getStudent(1);
    const course = await getCourse(101);
    const teacher = await getTeacher(201);
    const city = await getCity(301);

    console.log("Student:", student);
    console.log("Course:", course);
    console.log("Teacher:", teacher);
    console.log("City:", city);

    const report = await buildReport(1);

    console.log("Report:", report);

    await getStudent(999);
  } catch (error: unknown) {
    console.log("Error:", errorMessage(error));
  }
}


// 5.3 Break it

// const typo = students[1].nmae;
// Error: Property 'nmae' does not exist on type 'Student'.

// const incompleteStudent: Student = {
//   id: 4,
//   name: "Ali",
//   courseId: 101
// };
// This is valid because the optional properties are not required.

// const missingId: Student = {
//   name: "Ali",
//   courseId: 101
// };
// Error: Property 'id' is missing.

// students[1].id = 10;
// Error: Cannot assign to 'id' because it is a read-only property.

// import { Student } from "./db-types";
// This was changed to:
// import type { Student } from "./db-types";
// because Student is a type and does not exist at runtime.

// Day 04/05 note:
// Passing a wrong argument type or using a missing record produces a runtime/TypeScript error.

main();