import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface EnrollmentStatus {
  isEnrolled: boolean;
  progress: number;
  loading: boolean;
}

export const useEnrollmentStatus = (courseId: string): EnrollmentStatus => {
  const [status, setStatus] = useState<EnrollmentStatus>({
    isEnrolled: false,
    progress: 0,
    loading: true
  });

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const user = auth.currentUser;
        
        if (!user || !courseId) {
          setStatus({ isEnrolled: false, progress: 0, loading: false });
          return;
        }

        const enrollmentsRef = collection(db, 'enrollments');
        const q = query(
          enrollmentsRef,
          where('userId', '==', user.uid),
          where('courseId', '==', courseId)
        );
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const enrollmentData = snapshot.docs[0].data();
          setStatus({
            isEnrolled: true,
            progress: enrollmentData.progress || 0,
            loading: false
          });
        } else {
          setStatus({ isEnrolled: false, progress: 0, loading: false });
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
        setStatus({ isEnrolled: false, progress: 0, loading: false });
      }
    };

    checkEnrollment();
  }, [courseId]);

  return status;
};
