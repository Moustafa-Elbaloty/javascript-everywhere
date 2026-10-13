// 12.2

type Student = {
  id: number;
  name: string;
  courseId: number;
};

type Course = {
  id: number;
  name: string;
  teacherId: number;
};

type Teacher = {
  id: number;
  name: string;
  cityId: number;
};

type City = {
  id: number;
  name: string;
};

type DatabaseItem =
  | Student
  | Course
  | Teacher
  | City;

const students: Student[] = [
  {
    id: 1,
    name: "Sara",
    courseId: 101
  },
  {
    id: 2,
    name: "Ahmed",
    courseId: 102
  },
  {
    id: 3,
    name: "Mona",
    courseId: 103
  }
];

const courses: Course[] = [
  {
    id: 101,
    name: "JavaScript",
    teacherId: 201
  },
  {
    id: 102,
    name: "Node.js",
    teacherId: 202
  },
  {
    id: 103,
    name: "Angular",
    teacherId: 203
  }
];

const teachers: Teacher[] = [
  {
    id: 201,
    name: "Mostafa",
    cityId: 301
  },
  {
    id: 202,
    name: "Ahmed",
    cityId: 302
  },
  {
    id: 203,
    name: "Omar",
    cityId: 303
  }
];

const cities: City[] = [
  {
    id: 301,
    name: "Cairo"
  },
  {
    id: 302,
    name: "Giza"
  },
  {
    id: 303,
    name: "Alexandria"
  }
];

function findById<T extends DatabaseItem>(
  table: readonly T[],
  id: number,
  delay: number,
  tableName: string
): Promise<T> {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const item =
          table.find(
            (item) => item.id === id
          );

        if (item === undefined) {
          reject(
            new Error(
              `${tableName} id ${id} not found`
            )
          );

          return;
        }

        resolve(item);
      }, delay);
    }
  );
}

function getStudent(
  id: number
): Promise<Student> {
  return findById(
    students,
    id,
    100,
    "Student"
  );
}

function getCourse(
  id: number
): Promise<Course> {
  return findById(
    courses,
    id,
    100,
    "Course"
  );
}

function getTeacher(
  id: number
): Promise<Teacher> {
  return findById(
    teachers,
    id,
    100,
    "Teacher"
  );
}

function getCity(
  id: number
): Promise<City> {
  return findById(
    cities,
    id,
    100,
    "City"
  );
}

async function getStudentReport(
  id: number
): Promise<{
  student: Student;
  course: Course;
  teacher: Teacher;
  city: City;
}> {
  const student =
    await getStudent(id);

  const course =
    await getCourse(
      student.courseId
    );

  const teacher =
    await getTeacher(
      course.teacherId
    );

  const city =
    await getCity(
      teacher.cityId
    );

  return {
    student,
    course,
    teacher,
    city
  };
}

async function main(): Promise<void> {
  try {
    const report =
      await getStudentReport(1);

    console.log(
      "Student:",
      report.student
    );

    console.log(
      "Course:",
      report.course
    );

    console.log(
      "Teacher:",
      report.teacher
    );

    console.log(
      "City:",
      report.city
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error:",
        error.message
      );
    } else {
      console.error(
        "Error:",
        String(error)
      );
    }
  }
}

await main();