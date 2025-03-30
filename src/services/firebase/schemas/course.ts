import { Timestamp } from 'firebase/firestore';

/**
 * Interface for Course entity
 */
export interface Course {
  id?: string;             // Firestore document ID (sẽ được tự động tạo)
  courseId: string;        // Course code (e.g., INT1449) - Dùng làm khóa chính
  name: string;            // Course name
  credits: number;         // Number of credits
  semester?: string;       // Semester when the course is offered
  createdAt?: Timestamp;   // When record was created
  updatedAt?: Timestamp;   // When record was last updated
}

/**
 * Interface for creating a new course
 */
export type CreateCourseDto = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Interface for updating a course
 */
export type UpdateCourseDto = Partial<Omit<Course, 'id' | 'courseId' | 'createdAt' | 'updatedAt'>>;

/**
 * Search criteria for course queries
 */
export interface CourseSearchCriteria {
  name?: string;
  courseId?: string;
  semester?: string;
  credits?: number;
}

/**
 * Collection name in Firestore
 */
export const COURSES_COLLECTION = 'courses'; 