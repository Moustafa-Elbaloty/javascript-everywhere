// 12.2

type Student = {
  name: string;
  address?: {
    city?: string;
  };
  scores: number[];
  attendance: number;
  getName?: () => string;
};

const students: Student[] = [
  {
    name: "Sara",
    address: {
      city: "Cairo"
    },
    scores: [90, 85, 95],
    attendance: 95
  },
  {
    name: "Ahmed",
    scores: [80, 75, 85],
    attendance: 82
  },
  {
    name: "Mona",
    address: {},
    scores: [95, 90, 100],
    attendance: 90
  }
];

function getCity(
  student: Student
): string {
  return student.address?.city ?? "Unknown";
}

function safeFirstScore(
  student: Student
): number {
  return student.scores[0] ?? 0;
}

for (const student of students) {
  console.log(
    student.name,
    getCity(student),
    safeFirstScore(student),
    student.getName?.()
  );
}