// 11.2

import {
  average,
  errorMessage,
  getAttendance,
  letterGrade,
  partition,
  retry,
  withTimeout
} from "./lib/index.ts";

import type {
  GradeStudent,
  Student
} from "./types.ts";

function isStudent(
  value: unknown
): value is Student {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const student =
    value as Record<string, unknown>;

  if (
    typeof student.id !== "number" ||
    typeof student.name !== "string"
  ) {
    return false;
  }

  if (!Array.isArray(student.scores)) {
    return false;
  }

  return student.scores.every(
    (score) =>
      typeof score === "number"
  );
}

export async function loadStudents(): Promise<{
  valid: Student[];
  dropped: unknown[];
}> {
  const response = await withTimeout(
    fetch("./students.json"),
    2000
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  const rawData: unknown =
    await response.json();

  if (!Array.isArray(rawData)) {
    throw new Error(
      "students.json must contain an array"
    );
  }

  const [
    valid,
    dropped
  ] = partition(
    rawData,
    isStudent
  );

  return {
    valid,
    dropped
  };
}

export async function buildReport(
  students: Student[]
): Promise<GradeStudent[]> {
  const results =
    await Promise.allSettled(
      students.map(
        async (
          student
        ): Promise<GradeStudent> => {
          const attendance =
            await retry(
              () =>
                getAttendance(
                  student.id
                ),
              2
            );

          const studentAverage =
            average(
              student.scores
            );

          return {
            ...student,
            attendance,
            average:
              studentAverage,
            grade:
              letterGrade(
                studentAverage
              )
          };
        }
      )
    );

  return results
    .filter(
      (
        result
      ): result is PromiseFulfilledResult<GradeStudent> =>
        result.status ===
        "fulfilled"
    )
    .map(
      (result) =>
        result.value
    );
}

export function formatReport(
  students: GradeStudent[]
): string {
  return students
    .map(
      (student) =>
        `${student.name}: ` +
        `attendance=${student.attendance}% | ` +
        `average=${student.average.toFixed(2)} | ` +
        `grade=${student.grade}`
    )
    .join("\n");
}

export function formatError(
  error: unknown
): string {
  return errorMessage(error);
}