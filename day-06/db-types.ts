// 5.1 db-types.ts

export interface BaseRecord {
  readonly id: number;
}

export interface Student extends BaseRecord {
  readonly name: string;
  readonly courseId: number;
  readonly status?: "active" | "inactive";
  readonly email?: string;
}

export interface Course extends BaseRecord {
  readonly name: string;
  readonly teacherId: number;
  readonly level: "beginner" | "advanced";
}

export interface Teacher extends BaseRecord {
  readonly name: string;
  readonly cityId: number;
  readonly subject?: string;
}

export interface City extends BaseRecord {
  readonly name: string;
  readonly country?: string;
}

export type StudentWithCourse = Student & {
  readonly course: Course;
};