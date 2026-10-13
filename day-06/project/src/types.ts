// 11.2

export type LetterGrade = "A" | "B" | "C" | "D" | "F";

export type ReportState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export interface Student {
  readonly id: number;
  readonly name: string;
  readonly scores: readonly number[];
  readonly attendance?: number;
}

export interface GradeStudent extends Student {
  readonly average: number;
  readonly grade: LetterGrade;
}