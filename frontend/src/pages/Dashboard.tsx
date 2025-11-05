import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CourseCard from '../components/CourseCard';
import MentorCard from '../components/MentorCard';
import ProgressBar from '../components/ProgressBar';
import { sampleCourses, sampleMentors } from '../data/sampleData';
import { useState } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const [, setSelectedMentor] = useState<typeof sampleMentors[0] | null>(null);

  const continueLearning = sampleCourses.filter(c => c.progress && c.progress > 0);
  const recommendedCourses = sampleCourses.filter(c => !c.progress || c.progress === 0).slice(0, 3);
  const topMentors = sampleMentors.slice(0, 3);

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: '8', color: 'from-blue-500 to-cyan-500' },
    { icon: Trophy, label: 'Certificates', value: '3', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Hours Learned', value: '47', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Streak Days', value: '12', color: 'from-green-500 to-emerald-500' },
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
                  <span className="text-white/90 text-sm">Weekly Goal Progress</span>
                  <span className="text-white font-bold">65%</span>
                </div>
                <ProgressBar progress={65} showLabel={false} />
                <p className="text-white/80 text-sm mt-2">7 of 10 hours completed this week</p>
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
