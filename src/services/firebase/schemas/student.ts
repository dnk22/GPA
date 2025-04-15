import { Timestamp } from "firebase/firestore";
import { GradeRecord } from "./grade";

/**
 * Student entity schema
 */
export interface Student {
  id: string; // Firestore document ID
  studentId: string; // Mã SV
  name: string; // Họ và tên
  class: string; // Lớp
}

/**
 * Data required to create a new student
 */
export type CreateStudentDto = Omit<
  Student,
  "id" | "grades" | "createdAt" | "updatedAt"
>;

/**
 * Data allowed for updating a student
 */
export type UpdateStudentDto = Partial<
  Omit<Student, "id" | "createdAt" | "updatedAt">
>;

/**
 * Search criteria for students
 */
export interface StudentSearchCriteria {
  studentId?: string; // Filter by student ID
  name?: string; // Filter by name (case-insensitive search)
  className?: string; // Filter by class
}

// Collection name in Firestore
export const STUDENTS_COLLECTION = "students";
