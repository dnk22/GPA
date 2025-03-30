import { Timestamp } from 'firebase/firestore';

/**
 * Interface for Grade entity
 */
export interface Grade {
  id?: string;              // Firestore document ID
  studentId: string;        // Reference to student ID 
  courseId: string;         // Reference to course ID
  value: number;            // Grade value (e.g., 8.5)
  semester: string;         // Semester when grade was received (e.g., 20221)
  createdAt?: Timestamp;    // When record was created
  updatedAt?: Timestamp;    // When record was last updated
}

/**
 * Interface for a simplified grade object
 * Used when grades are embedded in student records
 */
export interface GradeRecord {
  subjectCode: string;      // Course code
  subjectName: string;      // Course name
  credits: number;          // Number of credits
  grade: number;            // Grade value
  semester?: string;        // Optional semester info
}

/**
 * Interface for creating a new grade
 */
export type CreateGradeDto = Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Interface for updating a grade
 */
export type UpdateGradeDto = Partial<Omit<Grade, 'id' | 'studentId' | 'courseId' | 'createdAt' | 'updatedAt'>>;

/**
 * Search criteria for grade queries
 */
export interface GradeSearchCriteria {
  studentId?: string;
  courseId?: string;
  semester?: string;
  minGrade?: number;
  maxGrade?: number;
}

/**
 * Collection name in Firestore
 */
export const GRADES_COLLECTION = 'grades'; 