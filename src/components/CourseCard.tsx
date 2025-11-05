import { motion } from 'framer-motion';
import { Clock, Users, Star, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Tag from './Tag';
import ProgressBar from './ProgressBar';
import { useEnrollment } from '../hooks/useEnrollment';
import { useAuth } from '../hooks/useAuth';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    thumbnailUrl?: string;
    level: string;
    duration?: string;
    durationHours?: number;
    enrolled?: number;
    students?: number;
    rating: number;
    tags: string[];
    progress?: number;
    category?: string;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isEnrolled, enrolling, enroll } = useEnrollment(course.id);

  const handleEnroll = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const result = await enroll(course);
    if (result?.success) {
      window.location.reload();
    }
  };

  const thumbnail = course.thumbnailUrl || course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800';
  const duration = course.duration || `${course.durationHours || 10} hours`;
  const enrolledCount = course.enrolled || course.students || 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-3 right-3">
          <Tag text={course.level} variant="primary" />
        </div>
        
        <Link
          to={`/course/${course.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
        </Link>
      </div>

      <div className="p-5">
        <Link to={`/course/${course.id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index} text={tag} variant="secondary" size="sm" />
          ))}
        </div>

        {course.progress !== undefined && course.progress > 0 && (
          <div className="mb-4">
            <ProgressBar progress={course.progress} />
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{enrolledCount > 1000 ? `${(enrolledCount / 1000).toFixed(1)}k` : enrolledCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>

        {user && isEnrolled ? (
          <Link
            to={`/course/${course.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
          </Link>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-card-hover transition-all disabled:opacity-50"
          >
            {enrolling ? 'Enrolling...' : t('courses.enroll')}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
