import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Star, Award, CheckCircle, Lock, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';
import Tag from '../components/Tag';
import ProgressBar from '../components/ProgressBar';
import VideoModal from '../components/VideoModal';
import { sampleCourses, sampleMentors } from '../data/sampleData';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const course = sampleCourses.find(c => c.id === id);
  const mentor = course ? sampleMentors.find(m => m.id === course.mentorId) : null;

  if (!course || !mentor) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;
  }

  const lessons = [
    { id: 1, title: 'Introduction and Setup', duration: '12:34', completed: true, locked: false },
    { id: 2, title: 'Core Concepts', duration: '18:45', completed: true, locked: false },
    { id: 3, title: 'Hands-on Practice', duration: '25:12', completed: false, locked: false },
    { id: 4, title: 'Advanced Techniques', duration: '22:08', completed: false, locked: false },
    { id: 5, title: 'Real-world Project', duration: '35:20', completed: false, locked: true },
    { id: 6, title: 'Best Practices', duration: '15:40', completed: false, locked: true },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-16">
      <div className="relative h-96 bg-gradient-hero">
        <div className="absolute inset-0 bg-black/40"></div>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center space-x-3"
            >
              <Tag text={course.category} variant="primary" />
              <Tag text={course.level} variant="accent" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {course.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-6"
            >
              {course.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-white/90"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{course.enrolled.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{course.totalHours} hours</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card mb-6 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 border-b-2 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        What you'll learn
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Master fundamental concepts and best practices',
                          'Build real-world projects from scratch',
                          'Understand advanced techniques and patterns',
                          'Deploy production-ready applications',
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Course Description
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {course.description}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        This comprehensive course is designed to take you from beginner to advanced level. 
                        You'll learn through hands-on projects, real-world examples, and expert guidance.
                        By the end of this course, you'll have the skills and confidence to build 
                        professional-grade applications.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Requirements
                      </h2>
                      <ul className="space-y-2">
                        {[
                          'Basic computer skills',
                          'Willingness to learn and practice',
                          'No prior experience required',
                        ].map((req, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'lessons' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Course Content
                    </h2>
                    <div className="space-y-2">
                      {lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          disabled={lesson.locked}
                          className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                            lesson.locked
                              ? 'bg-gray-50 dark:bg-gray-700/50 cursor-not-allowed'
                              : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Play className="w-5 h-5 text-primary" />
                            )}
                            <span className={`font-medium ${
                              lesson.locked ? 'text-gray-400' : 'text-gray-900 dark:text-white'
                            }`}>
                              {lesson.id}. {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'discussions' && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                      Join the discussion with fellow students and instructors.
                    </p>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Downloadable Resources
                    </h2>
                    <div className="space-y-3">
                      {['Course Slides.pdf', 'Source Code.zip', 'Cheat Sheet.pdf'].map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{resource}</span>
                          <button className="text-primary hover:underline font-medium">
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Instructor
              </h2>
              <div className="flex items-start space-x-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{mentor.title}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{mentor.bio}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mentor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span>{mentor.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span>{mentor.courses} courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 group cursor-pointer" onClick={() => setVideoModalOpen(true)}>
                  <img
                    src={course.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>

                {course.progress !== undefined && course.progress > 0 ? (
                  <div className="mb-4">
                    <ProgressBar progress={course.progress} />
                  </div>
                ) : null}

                <button className="w-full mb-3 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-card-hover transform hover:scale-105 transition-all">
                  {course.progress ? 'Continue Learning' : 'Enroll Now'}
                </button>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">This course includes:</h3>
                  {[
                    { icon: Clock, text: `${course.totalHours} hours of content` },
                    { icon: Play, text: `${course.lessons} video lessons` },
                    { icon: Award, text: 'Certificate of completion' },
                    { icon: Users, text: 'Lifetime access' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={course.videoUrl}
        title={course.title}
      />
    </div>
  );
};

export default CourseDetailPage;
