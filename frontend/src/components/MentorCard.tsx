import { motion } from 'framer-motion';
import { Star, BookOpen, Users } from 'lucide-react';
import Tag from './Tag';

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    expertise: string[];
    rating: number;
    students: number;
    courses: number;
  };
  onViewProfile: () => void;
}

const MentorCard = ({ mentor, onViewProfile }: MentorCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden"
    >
      <div className="relative h-32 bg-gradient-primary"></div>
      
      <div className="px-6 pb-6">
        <div className="relative -mt-16 mb-4">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{mentor.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mentor.title}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.expertise.slice(0, 2).map((skill, index) => (
            <Tag key={index} text={skill} variant="primary" size="sm" />
          ))}
          {mentor.expertise.length > 2 && (
            <Tag text={`+${mentor.expertise.length - 2}`} variant="secondary" size="sm" />
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">{mentor.rating}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">{(mentor.students / 1000).toFixed(1)}k</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Students</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">{mentor.courses}</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Courses</span>
          </div>
        </div>

        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-card-hover transform hover:scale-105 transition-all"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
};

export default MentorCard;
