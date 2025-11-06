import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const useEnroll = () => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const enrollInCourse = async (courseId: string): Promise<boolean> => {
    try {
      setIsEnrolling(true);
      const user = auth.currentUser;
      
      if (!user || !courseId) {
        console.error('User not authenticated or course ID missing');
        return false;
      }

      // Check if already enrolled
      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(
        enrollmentsRef,
        where('userId', '==', user.uid),
        where('courseId', '==', courseId)
      );
      
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        console.log('Already enrolled in this course');
        return false;
      }

      // Create new enrollment
      await addDoc(enrollmentsRef, {
        userId: user.uid,
        courseId: courseId,
        progress: 0,
        enrolledAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
        completed: false
      });

      console.log('Successfully enrolled in course:', courseId);
      return true;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return false;
    } finally {
      setIsEnrolling(false);
    }
  };

  return { enrollInCourse, isEnrolling };
};
