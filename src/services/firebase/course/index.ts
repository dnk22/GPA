import { db } from '../config';
import { Course, CreateCourseDto, UpdateCourseDto, CourseSearchCriteria, COURSES_COLLECTION } from '../schemas/course';
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
  setDoc
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
 * Find course by course ID (primary key)
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
 * Create a new course or update if courseId already exists
 * @param course Course data
 * @returns Promise with the document ID
 */
export const createOrUpdateCourse = async (course: CreateCourseDto): Promise<string> => {
  try {
    // First check if the course already exists by courseId
    const existingCourse = await findCourseByCourseId(course.courseId);
    
    if (existingCourse) {
      // Update the existing course
      const courseRef = doc(db, COURSES_COLLECTION, existingCourse.id!);
      await updateDoc(courseRef, {
        ...course,
        updatedAt: serverTimestamp()
      });
      return existingCourse.id!;
    } else {
      // Create a new course
      const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
        ...course,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating or updating course:', error);
    throw error;
  }
};

/**
 * Create a new course with custom ID (courseId as document ID)
 * @param course Course data
 * @returns Promise that resolves when operation is complete
 */
export const createCourseWithCustomId = async (course: CreateCourseDto): Promise<void> => {
  try {
    // Use the courseId as the document ID
    const docRef = doc(db, COURSES_COLLECTION, course.courseId);
    await setDoc(docRef, {
      ...course,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating course with custom ID:', error);
    throw error;
  }
};

/**
 * Update a course
 * @param courseId The course ID (primary key)
 * @param data Data to update
 * @returns Promise that resolves when update is complete
 */
export const updateCourse = async (courseId: string, data: UpdateCourseDto): Promise<void> => {
  try {
    const existingCourse = await findCourseByCourseId(courseId);
    
    if (!existingCourse) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    
    const courseRef = doc(db, COURSES_COLLECTION, existingCourse.id!);
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
 * Delete a course by courseId
 * @param courseId The course ID (primary key)
 * @returns Promise that resolves when delete is complete
 */
export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    const existingCourse = await findCourseByCourseId(courseId);
    
    if (!existingCourse) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    
    await deleteDoc(doc(db, COURSES_COLLECTION, existingCourse.id!));
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