import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sampleCourses } from '../data/sampleData';
import CourseCard from '../components/CourseCard';

const LibraryPage = () => {
  const navigate = useNavigate();
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCourses');
    if (saved) {
      setSavedCourseIds(JSON.parse(saved));
    }
  }, []);

  const savedCourses = sampleCourses.filter(course => 
    savedCourseIds.includes(course.id)
  );

  const handleRemoveCourse = (courseId: string) => {
    const updatedList = savedCourseIds.filter(id => id !== courseId);
    setSavedCourseIds(updatedList);
    localStorage.setItem('savedCourses', JSON.stringify(updatedList));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BookMarked className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Library
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {savedCourses.length} saved course{savedCourses.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {savedCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookMarked className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your library is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start saving courses to build your learning collection
            </p>
            <button
              onClick={() => navigate('/lessons')}
              className="px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-card-hover transform hover:scale-105 transition-all"
            >
              Browse Courses
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <CourseCard course={course} />
                <button
                  onClick={() => handleRemoveCourse(course.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove from library"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
