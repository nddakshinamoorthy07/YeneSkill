import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CourseCard from '../components/CourseCard';
import MentorCard from '../components/MentorCard';
import ProgressBar from '../components/ProgressBar';
import { sampleCourses, sampleMentors } from '../data/sampleData';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, getDocs, setDoc } from 'firebase/firestore';

interface UserStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  hoursLearned: number;
  streakDays: number;
  weeklyProgress: number;
  weeklyHoursCompleted: number;
  weeklyHoursGoal: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [, setSelectedMentor] = useState<any>(null);
  const [stats, setStats] = useState<UserStats>({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    hoursLearned: 0,
    streakDays: 0,
    weeklyProgress: 0,
    weeklyHoursCompleted: 0,
    weeklyHoursGoal: 10,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Fetch user profile for streak and basic stats
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create default user document if doesn't exist
        const defaultStats = {
          streak: 0,
          totalCourses: 0,
          completedCourses: 0,
          hoursLearned: 0,
          weeklyHoursCompleted: 0,
          weeklyHoursGoal: 10,
          lastActiveDate: new Date(),
        };
        await setDoc(doc(db, 'users', user.uid), defaultStats);
        calculateStats(defaultStats, []);
      } else {
        const userData = userDoc.data();
        
        // Fetch enrolled courses
        const coursesSnapshot = await getDocs(collection(db, 'users', user.uid, 'courses'));
        const enrolledCourses = coursesSnapshot.docs.map(doc => doc.data());
        
        calculateStats(userData, enrolledCourses);
        
        // Update streak if needed
        await updateStreak(userData);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Set default stats if error
      setStats({
        coursesEnrolled: sampleCourses.length,
        coursesCompleted: sampleCourses.filter(c => c.progress === 100).length,
        hoursLearned: 47,
        streakDays: 0,
        weeklyProgress: 65,
        weeklyHoursCompleted: 7,
        weeklyHoursGoal: 10,
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (userData: any, enrolledCourses: any[]) => {
    // Calculate total hours from enrolled courses
    const totalHours = enrolledCourses.reduce((sum, course) => {
      const courseHours = course.durationHours || 10; // Default 10 hours per course
      const completionPercent = course.progress || 0;
      return sum + (courseHours * completionPercent / 100);
    }, 0);

    // Calculate completed courses
    const completedCount = enrolledCourses.filter(c => c.progress === 100).length;

    // Weekly progress calculation
    const weeklyHoursCompleted = userData.weeklyHoursCompleted || 0;
    const weeklyHoursGoal = userData.weeklyHoursGoal || 10;
    const weeklyProgress = Math.min(100, (weeklyHoursCompleted / weeklyHoursGoal) * 100);

    setStats({
      coursesEnrolled: enrolledCourses.length || 0,
      coursesCompleted: completedCount,
      hoursLearned: Math.floor(totalHours),
      streakDays: userData.streak || 0,
      weeklyProgress: Math.floor(weeklyProgress),
      weeklyHoursCompleted,
      weeklyHoursGoal,
    });
  };

  const updateStreak = async (userData: any) => {
    if (!user) return;

    const lastActiveDate = userData.lastActiveDate?.toDate() || new Date(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastActiveDate.setHours(0, 0, 0, 0);

    const daysDifference = Math.floor((today.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDifference === 1) {
      // Continue streak
      await updateDoc(doc(db, 'users', user.uid), {
        streak: (userData.streak || 0) + 1,
        lastActiveDate: new Date(),
      });
      setStats(prev => ({ ...prev, streakDays: prev.streakDays + 1 }));
    } else if (daysDifference > 1) {
      // Streak broken, reset to 1
      await updateDoc(doc(db, 'users', user.uid), {
        streak: 1,
        lastActiveDate: new Date(),
      });
      setStats(prev => ({ ...prev, streakDays: 1 }));
    } else if (daysDifference === 0) {
      // Same day, update last active
      await updateDoc(doc(db, 'users', user.uid), {
        lastActiveDate: new Date(),
      });
    }
  };

  const continueLearning = sampleCourses.filter(c => c.progress && c.progress > 0);
  const recommendedCourses = sampleCourses.filter(c => !c.progress || c.progress === 0).slice(0, 3);
  const topMentors = sampleMentors.slice(0, 3);

  const displayStats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: loading ? '...' : stats.coursesEnrolled.toString(), color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, label: 'Certificates', value: loading ? '...' : stats.coursesCompleted.toString(), color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Hours Learned', value: loading ? '...' : stats.hoursLearned.toString(), color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Streak Days', value: loading ? '...' : stats.streakDays.toString(), color: 'from-green-500 to-emerald-500' },
  ];

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
                {stats.streakDays > 0 
                  ? `Amazing! You're on a ${stats.streakDays}-day streak! Keep it up! 🔥`
                  : "You're making great progress. Keep up the momentum!"}
              </p>
              
              <div className="max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90 text-sm">Weekly Goal Progress</span>
                  <span className="text-white font-bold">
                    {loading ? '...' : `${stats.weeklyProgress}%`}
                  </span>
                </div>
                <ProgressBar progress={stats.weeklyProgress} showLabel={false} />
                <p className="text-white/80 text-sm mt-2">
                  {loading 
                    ? 'Loading your progress...'
                    : `${stats.weeklyHoursCompleted} of ${stats.weeklyHoursGoal} hours completed this week`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow"
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
          
          {continueLearning.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueLearning.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No courses in progress yet. Start learning today!
              </p>
              <a
                href="/lessons"
                className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-card-hover transition-shadow"
              >
                Browse Courses
              </a>
            </div>
          )}
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
