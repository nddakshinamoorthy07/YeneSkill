import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export function useEnrollment(courseId: string) {
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      checkEnrollment();
    }
  }, [user, courseId]);

  const checkEnrollment = async () => {
    if (!user) return;

    try {
      const enrollmentDoc = await getDoc(doc(db, 'users', user.uid, 'courses', courseId));
      setIsEnrolled(enrollmentDoc.exists());
    } catch (error) {
      console.error('Error checking enrollment:', error);
    } finally {
      setLoading(false);
    }
  };

  const enroll = async (courseData: any) => {
    if (!user || enrolling) return;

    setEnrolling(true);
    try {
      // Add course to user's enrolled courses
      await setDoc(doc(db, 'users', user.uid, 'courses', courseId), {
        id: courseId,
        title: courseData.title,
        thumbnailUrl: courseData.thumbnailUrl || '',
        progress: 0,
        durationHours: courseData.durationHours || 10,
        status: 'in-progress',
        enrolledAt: serverTimestamp(),
        lastAccessedAt: serverTimestamp(),
        category: courseData.category || '',
        level: courseData.level || '',
      });

      // Update user stats
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const currentTotal = userDoc.data()?.totalCourses || 0;
        await updateDoc(doc(db, 'users', user.uid), {
          totalCourses: currentTotal + 1,
        });
      }

      setIsEnrolled(true);
      return { success: true };
    } catch (error) {
      console.error('Error enrolling:', error);
      return { success: false, error };
    } finally {
      setEnrolling(false);
    }
  };

  const updateProgress = async (progress: number) => {
    if (!user) return;

    try {
      const newStatus = progress >= 100 ? 'completed' : 'in-progress';
      
      await updateDoc(doc(db, 'users', user.uid, 'courses', courseId), {
        progress: Math.min(100, Math.max(0, progress)),
        status: newStatus,
        lastAccessedAt: serverTimestamp(),
        ...(progress >= 100 && { completedAt: serverTimestamp() }),
      });

      // If course completed, update user stats
      if (progress >= 100) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const currentCompleted = userDoc.data()?.completedCourses || 0;
          await updateDoc(doc(db, 'users', user.uid), {
            completedCourses: currentCompleted + 1,
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, error };
    }
  };

  return {
    isEnrolled,
    loading,
    enrolling,
    enroll,
    updateProgress,
  };
}
