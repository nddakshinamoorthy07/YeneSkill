import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Search, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  students: number;
  status: 'published' | 'draft';
}

interface Mentor {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  sessions: number;
}

const sampleCourses: Course[] = [
  { id: '1', title: 'Web Development Fundamentals', category: 'Programming', level: 'Beginner', students: 1234, status: 'published' },
  { id: '2', title: 'Advanced React Patterns', category: 'Frontend', level: 'Advanced', students: 567, status: 'published' },
  { id: '3', title: 'AI Basics', category: 'AI/ML', level: 'Beginner', students: 890, status: 'draft' },
];

const sampleMentors: Mentor[] = [
  { id: '1', name: 'Dr. Sarah Johnson', expertise: 'Web Development', rating: 4.8, sessions: 145 },
  { id: '2', name: 'Prof. Ahmed Ali', expertise: 'Data Science', rating: 4.9, sessions: 203 },
];

export default function AdminPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'courses' | 'mentors'>('courses');
  const [courses] = useState<Course[]>(sampleCourses);
  const [mentors] = useState<Mentor[]>(sampleMentors);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage courses, mentors, and platform content
          </p>
        </motion.div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'courses'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            {t('courses.title')}
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'mentors'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Users className="w-5 h-5" />
            {t('mentors.title')}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              Add {activeTab === 'courses' ? 'Course' : 'Mentor'}
            </button>
          </div>

          {activeTab === 'courses' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Students
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        {course.title}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.category}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm">
                          {course.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.students.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            course.status === 'published'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Expertise
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Sessions
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                        {mentor.name}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {mentor.expertise}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-yellow-500">⭐ {mentor.rating}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {mentor.sessions}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
