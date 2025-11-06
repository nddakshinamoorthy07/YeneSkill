import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUserEnrollments } from '../hooks/useUserEnrollments';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';
import { sampleCourses } from '../data/sampleData';
import { useMemo } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const { enrollments, loading } = useUserEnrollments();

  // Merge real enrollments with course data
  const enrolledCourses = useMemo(() => {
    return sampleCourses
      .map(course => {
        const enrollment = enrollments.find(e => e.courseId === course.id);
        if (enrollment) {
          return {
            ...course,
            progress: enrollment.progress,
            isEnrolled: true
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [enrollments]);

  // Recommended courses (not enrolled)
  const recommendedCourses = useMemo(() => {
    const enrolledIds = enrollments.map(e => e.courseId);
    return sampleCourses
      .filter(course => !enrolledIds.includes(course.id))
      .slice(0, 3);
  }, [enrollments]);

  // Calculate real stats from enrollments
  const totalEnrolled = enrollments.length;
  const completedCourses = enrollments.filter(e => e.completed).length;
  const totalHours = useMemo(() => {
    return enrollments.reduce((sum, enrollment) => {
      const course = sampleCourses.find(c => c.id === enrollment.courseId);
      if (course && enrollment.progress > 0) {
        return sum + Math.round((course.totalHours || 0) * (enrollment.progress / 100));
      }
      return sum;
    }, 0);
  }, [enrollments]);

  // Calculate average progress for weekly goal
  const averageProgress = useMemo(() => {
    if (enrollments.length === 0) return 0;
    const totalProgress = enrollments.reduce((sum, e) => sum + e.progress, 0);
    return Math.round(totalProgress / enrollments.length);
  }, [enrollments]);

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: totalEnrolled.toString(), color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, label: 'Certificates', value: completedCourses.toString(), color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Hours Learned', value: totalHours.toString(), color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Active Courses', value: (totalEnrolled - completedCourses).toString(), color: 'from-green-500 to-emerald-500' },
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
                You're making great progress. Keep up the momentum!
              </p>
              
              <div className="max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90 text-sm">Overall Progress</span>
                  <span className="text-white font-bold">{averageProgress}%</span>
                </div>
                <ProgressBar progress={averageProgress} showLabel={false} />
                <p className="text-white/80 text-sm mt-2">
                  {enrollments.length > 0 
                    ? `Average across ${enrollments.length} enrolled ${enrollments.length === 1 ? 'course' : 'courses'}`
                    : 'Enroll in courses to start learning'}
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
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your courses...</p>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course: any) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Enrolled Courses Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start learning by enrolling in courses below
              </p>
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
      </div>
    </div>
  );
};

export default Dashboard;
