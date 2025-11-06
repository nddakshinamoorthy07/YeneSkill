import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CourseCard from '../components/CourseCard';
import MentorCard from '../components/MentorCard';
import ProgressBar from '../components/ProgressBar';
import { sampleCourses, sampleMentors } from '../data/sampleData';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

const Dashboard = () => {
  const { user } = useAuth();
  const [, setSelectedMentor] = useState<any>(null);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [userStats, setUserStats] = useState({
    coursesEnrolled: 0,
    certificates: 0,
    hoursLearned: 0,
    streak: 0,
    weeklyHoursCompleted: 0,
    weeklyGoal: 10,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const cleanup = setupRealtimeListeners();
      return cleanup;
    } else {
      setLoading(false);
    }
  }, [user]);

  const setupRealtimeListeners = () => {
    if (!user) {
      setLoading(false);
      return () => {};
    }

    setLoading(true);

    // Real-time listener for enrollments
    const enrollmentsQuery = query(collection(db, 'enrollments'));
    const unsubscribeEnrollments = onSnapshot(
      enrollmentsQuery, 
      async (snapshot) => {
        // Filter enrollments for current user
        const userEnrollments = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((enrollment: any) => enrollment.userId === user.uid);

        setUserCourses(userEnrollments);

        // Fetch user document for additional stats
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();

          // Calculate stats from enrollments
          const enrolledCount = userEnrollments.length;
          const completedCount = userEnrollments.filter((e: any) => e.progress === 100).length;
          
          // Estimate hours learned (you might want to add actual duration to course data)
          const totalHours = userEnrollments.reduce((sum: number, e: any) => {
            const estimatedDuration = 10; // Default hours per course
            return sum + (estimatedDuration * ((e.progress || 0) / 100));
          }, 0);

          setUserStats({
            coursesEnrolled: enrolledCount,
            certificates: completedCount,
            hoursLearned: Math.round(totalHours),
            streak: userData?.streak || 0,
            weeklyHoursCompleted: userData?.weeklyHoursCompleted || 0,
            weeklyGoal: userData?.weeklyGoal || 10,
          });

          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      },
      (error) => {
        console.error('Error listening to enrollments:', error);
        setLoading(false);
      }
    );

    // Real-time listener for user document
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeUser = onSnapshot(
      userDocRef, 
      (docSnapshot) => {
        const userData = docSnapshot.data();
        if (userData) {
          setUserStats(prev => ({
            ...prev,
            streak: userData.streak || 0,
            weeklyHoursCompleted: userData.weeklyHoursCompleted || 0,
            weeklyGoal: userData.weeklyGoal || 10,
          }));
        }
      },
      (error) => {
        console.error('Error listening to user document:', error);
      }
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribeEnrollments();
      unsubscribeUser();
    };
  };

  const continueLearning = userCourses.filter(c => c.progress && c.progress > 0 && c.progress < 100);
  const recommendedCourses = sampleCourses.filter(c => !c.progress || c.progress === 0).slice(0, 3);
  const topMentors = sampleMentors.slice(0, 3);

  const weeklyProgress = userStats.weeklyGoal > 0 
    ? Math.round((userStats.weeklyHoursCompleted / userStats.weeklyGoal) * 100) 
    : 0;

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: userStats.coursesEnrolled.toString(), color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, label: 'Certificates', value: userStats.certificates.toString(), color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Hours Learned', value: userStats.hoursLearned.toString(), color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Streak Days', value: userStats.streak.toString(), color: 'from-green-500 to-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'Learner'}! 👋
              </h1>
              <p className="text-white/90 text-lg mb-6">
                You're making great progress. Keep up the momentum!
              </p>
              
              <div className="max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90 text-sm">Weekly Goal Progress</span>
                  <span className="text-white font-bold">{weeklyProgress}%</span>
                </div>
                <ProgressBar progress={weeklyProgress} showLabel={false} />
                <p className="text-white/80 text-sm mt-2">
                  {userStats.weeklyHoursCompleted} of {userStats.weeklyGoal} hours completed this week
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6"
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-lg mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
            <a href="/lessons" className="text-primary hover:underline font-medium">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueLearning.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
            <a href="/lessons" className="text-primary hover:underline font-medium">
              Explore More
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Mentors</h2>
            <a href="/mentors" className="text-primary hover:underline font-medium">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onViewProfile={() => setSelectedMentor(mentor)}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;
