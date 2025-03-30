import { db } from "../../config";
import {
  Course,
  CreateCourseDto,
  UpdateCourseDto,
  CourseSearchCriteria,
  COURSES_COLLECTION,
} from "../../schemas/course";
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

/**
 * Get all courses
 * @returns Promise with array of courses
 */
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const coursesSnapshot = await getDocs(coursesRef);
    
    return coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Course));
  } catch (error) {
    console.error('Error getting courses:', error);
    throw error;
  }
};

/**
 * Get course by ID
 * @param id Firestore document ID
 * @returns Promise with course data or null if not found
 */
export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const docRef = doc(db, COURSES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Course;
  } catch (error) {
    console.error('Error getting course by ID:', error);
    throw error;
  }
};

/**
 * Find course by course ID (not Firestore ID)
 * @param courseId Course code (e.g., INT1449)
 * @returns Promise with course data or null if not found
 */
export const findCourseByCourseId = async (courseId: string): Promise<Course | null> => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const q = query(coursesRef, where('courseId', '==', courseId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Course;
  } catch (error) {
    console.error('Error finding course by course ID:', error);
    throw error;
  }
};

/**
 * Create a new course
 * @param course Course data
 * @returns Promise with the new document ID
 */
export const createCourse = async (course: CreateCourseDto): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
      ...course,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

/**
 * Update a course
 * @param id Firestore document ID
 * @param data Data to update
 * @returns Promise that resolves when update is complete
 */
export const updateCourse = async (id: string, data: UpdateCourseDto): Promise<void> => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, id);
    await updateDoc(courseRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

/**
 * Delete a course
 * @param id Firestore document ID
 * @returns Promise that resolves when delete is complete
 */
export const deleteCourse = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COURSES_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

/**
 * Search courses with various criteria
 * @param criteria Search criteria
 * @returns Promise with array of matching courses
 */
export const searchCourses = async (criteria: CourseSearchCriteria): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, COURSES_COLLECTION);
    let q = query(coursesRef);
    
    // Add filters based on criteria
    if (criteria.courseId) {
      q = query(q, where('courseId', '==', criteria.courseId));
    }
    
    if (criteria.department) {
      q = query(q, where('department', '==', criteria.department));
    }
    
    if (criteria.semester) {
      q = query(q, where('semester', '==', criteria.semester));
    }
    
    if (criteria.credits) {
      q = query(q, where('credits', '==', criteria.credits));
    }
    
    const querySnapshot = await getDocs(q);
    
    let courses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Course));
    
    // Filter by name if provided (client-side filtering as Firestore doesn't support case-insensitive search directly)
    if (criteria.name) {
      const nameLowerCase = criteria.name.toLowerCase();
      courses = courses.filter(course => 
        course.name.toLowerCase().includes(nameLowerCase)
      );
    }
    
    return courses;
  } catch (error) {
    console.error('Error searching courses:', error);
    throw error;
  }
}; 