import { db } from '../../config';
import { Student, CreateStudentDto, UpdateStudentDto, StudentSearchCriteria, STUDENTS_COLLECTION } from '../../schemas/student';
import { Course } from '../../schemas/course';
import { calculateGPA } from '../../utils/gpaCalculator';
import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  query, 
  where,
  serverTimestamp
} from 'firebase/firestore';
import { getGradesByStudentId } from '../grade';
import { getCourseById } from '../course';

/**
 * Get all students
 * @returns Promise with array of students
 */
export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const studentsRef = collection(db, STUDENTS_COLLECTION);
    const studentsSnapshot = await getDocs(studentsRef);
    
    return studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Student));
  } catch (error) {
    console.error('Error getting students:', error);
    throw error;
  }
};

/**
 * Get student by ID
 * @param id Firestore document ID
 * @returns Promise with student data or null if not found
 */
export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const docRef = doc(db, STUDENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Student;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    throw error;
  }
};

/**
 * Find student by their student ID (not Firestore ID)
 * @param studentId School's student ID
 * @returns Promise with student data or null if not found
 */
export const findStudentByStudentId = async (studentId: string): Promise<Student | null> => {
  try {
    const studentsRef = collection(db, STUDENTS_COLLECTION);
    const q = query(studentsRef, where('studentId', '==', studentId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Student;
  } catch (error) {
    console.error('Error finding student by student ID:', error);
    throw error;
  }
};

/**
 * Create a new student
 * @param student Student data
 * @returns Promise with the new document ID
 */
export const createStudent = async (student: CreateStudentDto): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, STUDENTS_COLLECTION), {
      ...student,
      gpa: 0, // Initialize with 0 GPA
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

/**
 * Update a student
 * @param id Firestore document ID
 * @param data Data to update
 * @returns Promise that resolves when update is complete
 */
export const updateStudent = async (id: string, data: UpdateStudentDto): Promise<void> => {
  try {
    const studentRef = doc(db, STUDENTS_COLLECTION, id);
    await updateDoc(studentRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

/**
 * Update student grades and recalculate GPA
 * @param id Firestore document ID of the student
 * @returns Promise that resolves when update is complete
 */
export const updateStudentGrades = async (id: string): Promise<void> => {
  try {
    // 1. Get the student
    const student = await getStudentById(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    
    // 2. Get all grades for the student
    const grades = await getGradesByStudentId(student.studentId);
    
    // 3. Get all relevant courses
    const coursesMap = new Map<string, Course>();
    for (const grade of grades) {
      if (!coursesMap.has(grade.courseId)) {
        const course = await getCourseById(grade.courseId);
        if (course) {
          coursesMap.set(grade.courseId, course);
        }
      }
    }
    
    // 4. Calculate the GPA
    const gpa = calculateGPA(grades, coursesMap);
    
    // 5. Update the student with the new GPA
    await updateDoc(doc(db, STUDENTS_COLLECTION, id), {
      grades: grades.map(grade => ({
        id: grade.id,
        courseId: grade.courseId,
        value: grade.value,
        semester: grade.semester
      })),
      gpa,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating student grades:', error);
    throw error;
  }
};

/**
 * Delete a student
 * @param id Firestore document ID
 * @returns Promise that resolves when delete is complete
 */
export const deleteStudent = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, STUDENTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

/**
 * Search students with various criteria
 * @param criteria Search criteria
 * @returns Promise with array of matching students
 */
export const searchStudents = async (criteria: StudentSearchCriteria): Promise<Student[]> => {
  try {
    const studentsRef = collection(db, STUDENTS_COLLECTION);
    let q = query(studentsRef);
    
    // Add filters based on criteria
    if (criteria.studentId) {
      q = query(q, where('studentId', '==', criteria.studentId));
    }
    
    if (criteria.className) {
      q = query(q, where('class', '==', criteria.className));
    }
    
    if (criteria.major) {
      q = query(q, where('major', '==', criteria.major));
    }
    
    const querySnapshot = await getDocs(q);
    
    let students = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Student));
    
    // Filter by name if provided (client-side filtering as Firestore doesn't support case-insensitive search directly)
    if (criteria.name) {
      const nameLowerCase = criteria.name.toLowerCase();
      students = students.filter(student => 
        student.name.toLowerCase().includes(nameLowerCase)
      );
    }
    
    return students;
  } catch (error) {
    console.error('Error searching students:', error);
    throw error;
  }
}; 