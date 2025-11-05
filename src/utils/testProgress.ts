import { db } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

/**
 * Test function to simulate course progress
 * Call this from browser console to test live updates
 */
export async function addTestCourse(userId: string, courseData?: any) {
  const defaultCourse = {
    id: `course-${Date.now()}`,
    title: 'Test Course',
    progress: 50,
    durationHours: 10,
    enrolledAt: new Date(),
    lastAccessedAt: new Date(),
    status: 'in-progress',
    ...courseData,
  };

  await setDoc(
    doc(db, 'users', userId, 'courses', defaultCourse.id),
    defaultCourse
  );

  console.log('✅ Test course added:', defaultCourse);
  return defaultCourse;
}

/**
 * Complete a course (set progress to 100%)
 */
export async function completeCourse(userId: string, courseId: string) {
  await updateDoc(doc(db, 'users', userId, 'courses', courseId), {
    progress: 100,
    status: 'completed',
    completedAt: new Date(),
  });

  // Update user stats
  await updateUserStats(userId);

  console.log('✅ Course completed!');
}

/**
 * Update course progress
 */
export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number
) {
  await updateDoc(doc(db, 'users', userId, 'courses', courseId), {
    progress: Math.min(100, Math.max(0, progress)),
    lastAccessedAt: new Date(),
    status: progress === 100 ? 'completed' : 'in-progress',
  });

  await updateUserStats(userId);

  console.log(`✅ Progress updated to ${progress}%`);
}

/**
 * Update weekly hours
 */
export async function updateWeeklyHours(userId: string, hours: number) {
  await updateDoc(doc(db, 'users', userId), {
    weeklyHoursCompleted: hours,
    lastActiveDate: new Date(),
  });

  console.log(`✅ Weekly hours updated to ${hours}`);
}

/**
 * Increase streak
 */
export async function increaseStreak(userId: string) {
  const userDoc = await db.collection('users').doc(userId).get();
  const currentStreak = userDoc.data()?.streak || 0;

  await updateDoc(doc(db, 'users', userId), {
    streak: currentStreak + 1,
    lastActiveDate: new Date(),
  });

  console.log(`✅ Streak increased to ${currentStreak + 1} days!`);
}

/**
 * Recalculate and update user stats
 */
async function updateUserStats(userId: string) {
  // This would typically query all courses and recalculate
  // For now, we'll just trigger a refresh
  console.log('📊 Stats will refresh on next dashboard load');
}

/**
 * Reset all progress (for testing)
 */
export async function resetProgress(userId: string) {
  await updateDoc(doc(db, 'users', userId), {
    streak: 0,
    weeklyHoursCompleted: 0,
    completedCourses: 0,
    hoursLearned: 0,
  });

  console.log('🔄 Progress reset!');
}

// Make functions available globally in browser console
if (typeof window !== 'undefined') {
  (window as any).testProgress = {
    addTestCourse,
    completeCourse,
    updateCourseProgress,
    updateWeeklyHours,
    increaseStreak,
    resetProgress,
  };
}
