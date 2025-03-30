import { Grade } from '../schemas/grade';
import { Course } from '../schemas/course';

/**
 * Grade point conversion
 * Maps grade letter/number to GPA points
 */
export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
  // Numeric values (GPA calculation accepts both letter grades and numeric)
  '10': 4.0,
  '9': 4.0, 
  '8': 3.3,
  '7': 3.0,
  '6': 2.7,
  '5': 2.0,
  '4': 1.3,
  '3': 1.0,
  '2': 0.7,
  '1': 0.3,
  '0': 0.0
};

/**
 * Calculate GPA from grades and courses
 * @param grades Array of student grades
 * @param courses Map of courses indexed by courseId
 * @returns Calculated GPA (4.0 scale)
 */
export const calculateGPA = (
  grades: Grade[], 
  courses: Map<string, Course>
): number => {
  if (!grades.length) {
    return 0;
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (const grade of grades) {
    const course = courses.get(grade.courseId);
    
    // Skip if course not found
    if (!course) {
      console.warn(`Course not found for courseId: ${grade.courseId}`);
      continue;
    }
    
    // Get grade point value
    const gradeValue = String(grade.value);
    const gradePoints = GRADE_POINTS[gradeValue];
    
    // Skip if grade value not recognized
    if (gradePoints === undefined) {
      console.warn(`Unknown grade value: ${gradeValue}`);
      continue;
    }
    
    // Add weighted grade to total
    totalPoints += gradePoints * course.credits;
    totalCredits += course.credits;
  }

  // Avoid division by zero
  if (totalCredits === 0) {
    return 0;
  }

  // Calculate and round to 2 decimal places
  const gpa = totalPoints / totalCredits;
  return Math.round(gpa * 100) / 100;
};

/**
 * Calculate GPA for a specific semester
 * @param grades Array of student grades
 * @param courses Map of courses indexed by courseId
 * @param semester Semester to calculate GPA for
 * @returns Calculated GPA for the semester (4.0 scale)
 */
export const calculateSemesterGPA = (
  grades: Grade[], 
  courses: Map<string, Course>,
  semester: string
): number => {
  // Filter grades by semester
  const semesterGrades = grades.filter(grade => grade.semester === semester);
  return calculateGPA(semesterGrades, courses);
}; 