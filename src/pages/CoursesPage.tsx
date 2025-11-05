import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';
import Tag from '../components/Tag';
import { categories } from '../data/sampleData';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CoursesPage = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesSnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesCategory = !selectedCategory || selectedCategory === 'All Courses' || course.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
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
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover expert-led courses to master new skills and advance your career.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('courses.search')}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-card hover:shadow-card-hover transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {(showFilters || window.innerWidth >= 768) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level:</span>
                {levels.map((level) => (
                  <Tag
                    key={level}
                    text={level}
                    variant={selectedLevel === level ? 'primary' : 'secondary'}
                    onClick={() => setSelectedLevel(selectedLevel === level ? '' : level)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('courses.categories')}:</span>
                <Tag
                  text="All Courses"
                  variant={!selectedCategory ? 'primary' : 'secondary'}
                  onClick={() => setSelectedCategory('')}
                />
                {categories.map((category) => (
                  <Tag
                    key={typeof category === 'string' ? category : category.id}
                    text={typeof category === 'string' ? category : category.name}
                    variant={selectedCategory === category ? 'primary' : 'secondary'}
                    onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                  />
                ))}
              </div>

              {(selectedLevel || selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedLevel('');
                    setSelectedCategory('');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> courses
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No courses found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedLevel('');
                setSelectedCategory('');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-card-hover transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
