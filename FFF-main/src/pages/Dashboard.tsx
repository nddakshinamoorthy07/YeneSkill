import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

interface DashboardProps {
  userId: string;
}

export default function Dashboard({ userId }: DashboardProps) {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    skillsAcquired: 0,
    totalProgress: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [userId]);

  const loadDashboardData = async () => {
    try {
      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      
      let completed = 0;
      let totalProgress = 0;
      const activities: any[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.completed) completed++;
        totalProgress += data.progress || 0;
        activities.push({
          courseTitle: data.courseTitle,
          progress: data.progress,
          lastAccessed: data.lastAccessed,
        });
      });

      const skillsRef = collection(db, 'userSkills');
      const skillsQuery = query(skillsRef, where('userId', '==', userId));
      const skillsSnapshot = await getDocs(skillsQuery);

      setStats({
        enrolledCourses: snapshot.size,
        completedCourses: completed,
        skillsAcquired: skillsSnapshot.size,
        totalProgress: snapshot.size > 0 ? Math.round(totalProgress / snapshot.size) : 0,
      });

      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to YeneSkill</h1>
        <p className="mt-2 text-gray-600">Track your learning journey and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.enrolledCourses}</p>
            </div>
            <span className="text-4xl">📚</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Skills Acquired</p>
              <p className="text-3xl font-bold text-purple-600">{stats.skillsAcquired}</p>
            </div>
            <span className="text-4xl">🎯</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalProgress}%</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-gray-900">{activity.courseTitle}</h3>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No courses enrolled yet</p>
              <Link
                to="/courses"
                className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/courses"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Explore Courses</h3>
                  <p className="text-sm text-gray-600">Find new courses to learn</p>
                </div>
              </div>
            </Link>
            <Link
              to="/skills"
              className="block p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Skills Assessment</h3>
                  <p className="text-sm text-gray-600">Track and assess your skills</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
