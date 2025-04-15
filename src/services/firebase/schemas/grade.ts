import { Timestamp } from 'firebase/firestore';

/**
 * Interface for Grade entity
 */
export interface Grade {
  id?: string;              // Firestore document ID
  studentId: string;        // Mã SV
  courseId: string;         // BAS1203
  finalScore: number;       // THI KTHP
  semester: string;         // học kỳ
  notes: string;            // Ghi chú
  createdAt?: Timestamp;    // ''
  updatedAt?: Timestamp;    // ''
  componentScores?: {
    attendance: number,     // Điểm TN-CC
    midterm: number,        // Điểm TBKT
    assignment: number,     // Điểm BTTL
    finalExam: number | string   // Điểm Thi 
  }
}

/**
 * Interface for a simplified grade object
 * Used when grades are embedded in student records
 */
export interface GradeRecord {
  subjectCode: string;      // Course code
  subjectName: string;      // Course name
  credits: number;          // Number of credits
  finalScore: number;       // Grade value
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