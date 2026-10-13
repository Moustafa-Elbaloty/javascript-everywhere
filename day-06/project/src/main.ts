// 11.2

import {
  average,
  errorMessage,
  formatRow,
  getAttendance,
  withTimeout
} from "./lib/index.ts";

import type {
  GradeStudent,
  LetterGrade,
  ReportState
} from "./types.ts";

const loadButton =
  document.querySelector<HTMLButtonElement>("#load");

const compareButton =
  document.querySelector<HTMLButtonElement>("#compare");

const averageButton =
  document.querySelector<HTMLButtonElement>("#average");

const slowNetwork =
  document.querySelector<HTMLInputElement>("#slow-network");

const status =
  document.querySelector<HTMLParagraphElement>("#status");

const output =
  document.querySelector<HTMLPreElement>("#output");

function requireElement<T extends Element>(
  element: T | null
): T {
  if (element === null) {
    throw new Error(
      "Required DOM element was not found"
    );
  }

  return element;
}

const loadButtonElement =
  requireElement(loadButton);

const compareButtonElement =
  requireElement(compareButton);

const averageButtonElement =
  requireElement(averageButton);

const slowNetworkElement =
  requireElement(slowNetwork);

const statusElement =
  requireElement(status);

const outputElement =
  requireElement(output);

let students: GradeStudent[] = [];

let state: ReportState = {
  status: "idle"
};

function renderState(): void {
  switch (state.status) {
    case "idle":
      statusElement.textContent = "Ready";
      break;

    case "loading":
      statusElement.textContent = "Loading...";
      break;

    case "success":
      statusElement.textContent = state.message;
      break;

    case "error":
      statusElement.textContent = state.message;
      break;

    default: {
      const unreachable: never = state;
      return unreachable;
    }
  }
}

async function loadStudents(): Promise<void> {
  loadButtonElement.disabled = true;

  state = {
    status: "loading"
  };

  renderState();

  try {
    const data = await withTimeout(
      (async () => {
        if (slowNetworkElement.checked) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 2500);
          });
        }

        const response =
          await fetch("./students.json");

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }

        return response.json();
      })(),
      2000
    );

    const rawStudents =
      data as Array<{
        id: number;
        name: string;
        scores: readonly number[];
      }>;

    students = rawStudents.map(
      (student): GradeStudent => {
        const studentAverage =
          average(student.scores);

        const grade: LetterGrade =
          studentAverage >= 90
            ? "A"
            : studentAverage >= 80
              ? "B"
              : studentAverage >= 70
                ? "C"
                : studentAverage >= 60
                  ? "D"
                  : "F";

        return {
          ...student,
          average: studentAverage,
          grade
        };
      }
    );

    const results =
      await Promise.allSettled(
        students.map(
          async (student) => {
            const attendance =
              await getAttendance(
                student.id
              );

            return {
              ...student,
              attendance
            };
          }
        )
      );

    const failedCount =
      results.filter(
        (result) =>
          result.status === "rejected"
      ).length;

    const successfulStudents =
      results
        .filter(
          (
            result
          ): result is PromiseFulfilledResult<
            GradeStudent & {
              attendance: number;
            }
          > =>
            result.status === "fulfilled"
        )
        .map(
          (result) =>
            result.value
        );

    students =
      successfulStudents;

    outputElement.textContent =
      students
        .map(
          (student) =>
            formatRow(
              student.name,
              student.average
            ) +
            ` | attendance: ${
              student.attendance
            }%`
        )
        .join("\n");

    state = {
      status: "success",
      message:
        failedCount > 0
          ? `${failedCount} attendance lookup failed`
          : "All attendance lookups succeeded"
    };

    renderState();
  } catch (error: unknown) {
    state = {
      status: "error",
      message: errorMessage(error)
    };

    renderState();
  } finally {
    loadButtonElement.disabled = false;
  }
}

loadButtonElement.addEventListener(
  "click",
  async (): Promise<void> => {
    await loadStudents();
  }
);

compareButtonElement.addEventListener(
  "click",
  async (): Promise<void> => {
    if (students.length === 0) {
      outputElement.textContent =
        "Load students first";

      return;
    }

    const sequentialStart =
      performance.now();

    for (const student of students) {
      await getAttendance(
        student.id
      ).catch(() => null);
    }

    const sequentialTime =
      performance.now() -
      sequentialStart;

    const parallelStart =
      performance.now();

    await Promise.allSettled(
      students.map(
        (student) =>
          getAttendance(student.id)
      )
    );

    const parallelTime =
      performance.now() -
      parallelStart;

    outputElement.textContent =
      `Sequential: ${
        sequentialTime.toFixed(2)
      } ms\n` +
      `Parallel: ${
        parallelTime.toFixed(2)
      } ms`;
  }
);

averageButtonElement.addEventListener(
  "click",
  (): void => {
    if (students.length === 0) {
      outputElement.textContent =
        "Load students first";

      return;
    }

    const scores =
      students.map(
        (student) =>
          student.average
      );

    outputElement.textContent =
      `Average: ${
        average(scores).toFixed(2)
      }`;
  }
);