import { useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const useWithdraw = () => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdrawFromCourse = async (courseId: string): Promise<boolean> => {
    try {
      setIsWithdrawing(true);
      const user = auth.currentUser;
      
      if (!user || !courseId) {
        console.error('User not authenticated or course ID missing');
        return false;
      }

      // Find the enrollment document
      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(
        enrollmentsRef,
        where('userId', '==', user.uid),
        where('courseId', '==', courseId)
      );
      
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Delete the enrollment
        await deleteDoc(doc(db, 'enrollments', snapshot.docs[0].id));
        console.log('Successfully withdrawn from course:', courseId);
        return true;
      } else {
        console.log('No enrollment found for this course');
        return false;
      }
    } catch (error) {
      console.error('Error withdrawing from course:', error);
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  };

  return { withdrawFromCourse, isWithdrawing };
};
