// 11.2

import type {
  GradeStudent,
  LetterGrade
} from "../types.ts";

export function letterGrade(
  score: number
): LetterGrade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";

  return "F";
}

export function average(
  scores: readonly number[]
): number {
  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce(
    (sum, score) => sum + score,
    0
  );

  return total / scores.length;
}

export function formatRow(
  name: string,
  score: number
): string {
  return `${name}: ${score} (${letterGrade(score)})`;
}

export function buildGradeStudent(
  student: GradeStudent
): GradeStudent {
  return {
    ...student,
    average: average(student.scores),
    grade: letterGrade(
      average(student.scores)
    )
  };
}