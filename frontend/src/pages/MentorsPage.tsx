import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Award, Clock, Mail } from 'lucide-react';
import MentorCard from '../components/MentorCard';
import Tag from '../components/Tag';
import { sampleMentors, sampleCourses } from '../data/sampleData';

const MentorsPage = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);

  const mentorCourses = selectedMentor
    ? sampleCourses.filter(c => c.mentorId === selectedMentor.id)
    : [];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Your <span className="text-primary">Mentors</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Connect with expert instructors who are passionate about your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MentorCard mentor={mentor} onViewProfile={() => setSelectedMentor(mentor)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMentor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMentor(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="min-h-screen px-4 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="relative h-48 bg-gradient-primary">
                    <button
                      onClick={() => setSelectedMentor(null)}
                      className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  <div className="px-8 pb-8">
                    <div className="relative -mt-20 mb-6">
                      <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                        <img
                          src={selectedMentor.avatar}
                          alt={selectedMentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMentor.name}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {selectedMentor.title}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedMentor.expertise.map((skill: string, index: number) => (
                        <Tag key={index} text={skill} variant="primary" />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Award className="w-6 h-6 text-primary" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedMentor.rating}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedMentor.availability}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedMentor.bio}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Courses ({mentorCourses.length})
                      </h3>
                      <div className="space-y-3">
                        {mentorCourses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                          >
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {course.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {course.duration} • {course.lessons} lessons
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-card-hover transform hover:scale-105 transition-all">
                        <Calendar className="w-5 h-5" />
                        <span>Book a Session</span>
                      </button>
                      <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorsPage;
