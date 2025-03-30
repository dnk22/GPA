import { db } from '../../config';
import { Grade, CreateGradeDto, UpdateGradeDto, GradeSearchCriteria, GRADES_COLLECTION } from '../../schemas/grade';
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
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';

/**
 * Get all grades
 * @returns Promise with array of grades
 */
export const getAllGrades = async (): Promise<Grade[]> => {
  try {
    const gradesRef = collection(db, GRADES_COLLECTION);
    const gradesSnapshot = await getDocs(gradesRef);
    
    return gradesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Grade));
  } catch (error) {
    console.error('Error getting grades:', error);
    throw error;
  }
};

/**
 * Get grade by ID
 * @param id Firestore document ID
 * @returns Promise with grade data or null if not found
 */
export const getGradeById = async (id: string): Promise<Grade | null> => {
  try {
    const docRef = doc(db, GRADES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Grade;
  } catch (error) {
    console.error('Error getting grade by ID:', error);
    throw error;
  }
};

/**
 * Get grades by student ID
 * @param studentId The student's ID
 * @returns Promise with array of grades for the student
 */
export const getGradesByStudentId = async (studentId: string): Promise<Grade[]> => {
  try {
    const gradesRef = collection(db, GRADES_COLLECTION);
    const q = query(gradesRef, where('studentId', '==', studentId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Grade));
  } catch (error) {
    console.error('Error getting grades by student ID:', error);
    throw error;
  }
};

/**
 * Get grades by course ID
 * @param courseId The course ID
 * @returns Promise with array of grades for the course
 */
export const getGradesByCourseId = async (courseId: string): Promise<Grade[]> => {
  try {
    const gradesRef = collection(db, GRADES_COLLECTION);
    const q = query(gradesRef, where('courseId', '==', courseId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Grade));
  } catch (error) {
    console.error('Error getting grades by course ID:', error);
    throw error;
  }
};

/**
 * Create a new grade
 * @param grade Grade data
 * @returns Promise with the new document ID
 */
export const createGrade = async (grade: CreateGradeDto): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, GRADES_COLLECTION), {
      ...grade,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating grade:', error);
    throw error;
  }
};

/**
 * Update a grade
 * @param id Firestore document ID
 * @param data Data to update
 * @returns Promise that resolves when update is complete
 */
export const updateGrade = async (id: string, data: UpdateGradeDto): Promise<void> => {
  try {
    const gradeRef = doc(db, GRADES_COLLECTION, id);
    await updateDoc(gradeRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating grade:', error);
    throw error;
  }
};

/**
 * Delete a grade
 * @param id Firestore document ID
 * @returns Promise that resolves when delete is complete
 */
export const deleteGrade = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, GRADES_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting grade:', error);
    throw error;
  }
};

/**
 * Batch create multiple grades at once
 * @param grades Array of grade data
 * @returns Promise that resolves when batch create is complete
 */
export const batchCreateGrades = async (grades: CreateGradeDto[]): Promise<void> => {
  try {
    const batch = writeBatch(db);
    const gradesRef = collection(db, GRADES_COLLECTION);
    
    grades.forEach(grade => {
      const docRef = doc(gradesRef);
      batch.set(docRef, {
        ...grade,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error batch creating grades:', error);
    throw error;
  }
};

/**
 * Delete all grades for a student
 * @param studentId The student's ID
 * @returns Promise that resolves when delete is complete
 */
export const deleteGradesByStudentId = async (studentId: string): Promise<void> => {
  try {
    const gradesRef = collection(db, GRADES_COLLECTION);
    const q = query(gradesRef, where('studentId', '==', studentId));
    const querySnapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    querySnapshot.docs.forEach(document => {
      batch.delete(doc(db, GRADES_COLLECTION, document.id));
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error deleting grades by student ID:', error);
    throw error;
  }
};

/**
 * Search grades with various criteria
 * @param criteria Search criteria
 * @returns Promise with array of matching grades
 */
export const searchGrades = async (criteria: GradeSearchCriteria): Promise<Grade[]> => {
  try {
    const gradesRef = collection(db, GRADES_COLLECTION);
    let q = query(gradesRef);
    
    // Add filters based on criteria
    if (criteria.studentId) {
      q = query(q, where('studentId', '==', criteria.studentId));
    }
    
    if (criteria.courseId) {
      q = query(q, where('courseId', '==', criteria.courseId));
    }
    
    if (criteria.semester) {
      q = query(q, where('semester', '==', criteria.semester));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Grade));
  } catch (error) {
    console.error('Error searching grades:', error);
    throw error;
  }
}; 