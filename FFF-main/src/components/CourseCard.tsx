import { motion } from 'framer-motion';
import { Clock, Users, Star, Play, LogOut, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useWithdraw } from '../hooks/useWithdraw';
import { useEnroll } from '../hooks/useEnroll';
import { useEnrollmentStatus } from '../hooks/useEnrollmentStatus';
import Tag from './Tag';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    level: string;
    duration: string;
    enrolled: number;
    rating: number;
    tags: string[];
    progress?: number;
  };
  onWithdrawSuccess?: () => void;
}

const CourseCard = ({ course, onWithdrawSuccess }: CourseCardProps) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { withdrawFromCourse, isWithdrawing } = useWithdraw();
  const { enrollInCourse, isEnrolling } = useEnroll();
  const { isEnrolled, progress, loading } = useEnrollmentStatus(course.id);

  const handleEnroll = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await enrollInCourse(course.id);
    if (success) {
      alert('Successfully enrolled in course!');
      window.location.reload(); // Refresh to show updated state
    } else {
      alert('Failed to enroll. You may already be enrolled.');
    }
  };

  const handleWithdraw = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowWithdrawModal(true);
  };

  const confirmWithdraw = async () => {
    const success = await withdrawFromCourse(course.id);
    if (success) {
      alert('You have been withdrawn from this course.');
      setShowWithdrawModal(false);
      window.location.reload(); // Refresh to show updated state
      if (onWithdrawSuccess) {
        onWithdrawSuccess();
      }
    } else {
      alert('Failed to withdraw. Please try again.');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden"
      >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
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

        {isEnrolled && progress > 0 && (
          <div className="mb-4">
            <ProgressBar progress={progress} />
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{(course.enrolled / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>

        {!loading && (
          <>
            {isEnrolled ? (
              <button
                onClick={handleWithdraw}
                disabled={isWithdrawing}
                className="w-full py-2 border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-4 h-4" />
                <span>{isWithdrawing ? 'Withdrawing...' : 'Withdraw'}</span>
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="w-full py-2 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{isEnrolling ? 'Enrolling...' : 'Enroll Now'}</span>
              </button>
            )}
          </>
        )}
      </div>
      </motion.div>

      {/* Withdraw Confirmation Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowWithdrawModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Withdraw from Course?
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to withdraw from "{course.title}"? Your progress will be lost and you'll need to re-enroll to access the course again.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                disabled={isWithdrawing}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
