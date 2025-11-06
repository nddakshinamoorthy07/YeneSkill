import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
  enrolledAt: string;
  lastAccessed: string;
  completed: boolean;
}

export const useUserEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        setEnrollments([]);
        setLoading(false);
        return;
      }

      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', user.uid));
      
      const snapshot = await getDocs(q);
      
      const userEnrollments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Enrollment));

      setEnrollments(userEnrollments);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [refreshKey]);

  const refetch = () => {
    setRefreshKey(prev => prev + 1);
  };

  return { enrollments, loading, refetch };
};
