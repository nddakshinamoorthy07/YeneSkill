import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface CourseDetailProps {
  userId: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  category?: string;
  thumbnail?: string;
  [key: string]: unknown;
}

interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  progress: number;
  enrolledAt: Date;
  completed?: boolean;
  [key: string]: unknown;
}

export default function CourseDetail({ userId }: CourseDetailProps) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', title: 'Introduction', duration: '10 min', completed: false },
    { id: '2', title: 'Core Concepts', duration: '25 min', completed: false },
    { id: '3', title: 'Practical Examples', duration: '30 min', completed: false },
    { id: '4', title: 'Advanced Topics', duration: '40 min', completed: false },
    { id: '5', title: 'Final Project', duration: '60 min', completed: false },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, userId]);

  const loadCourseData = async () => {
    try {
      if (!courseId) return;

      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        setCourse({ id: courseDoc.id, ...courseDoc.data() } as Course);
      }

      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', userId), where('courseId', '==', courseId));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        setEnrollment({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Enrollment);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId: string) => {
    const updatedLessons = lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
    );
    setLessons(updatedLessons);

    const completedCount = updatedLessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / lessons.length) * 100);

    if (enrollment) {
      try {
        await updateDoc(doc(db, 'enrollments', enrollment.id), {
          progress,
          completed: progress === 100,
          lastAccessed: new Date().toISOString(),
        });
        setEnrollment({ ...enrollment, progress, completed: progress === 100 });
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading course...</div>;
  }

  if (!course || !enrollment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Course not found or not enrolled</p>
        <button
          onClick={() => navigate('/courses')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/courses')}
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        ← Back to Courses
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <span className="text-6xl">{course.thumbnail}</span>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-indigo-600">{enrollment.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${enrollment.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-lg font-semibold text-gray-900">{course.duration}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Level</p>
            <p className="text-lg font-semibold text-gray-900">{course.level}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Category</p>
            <p className="text-lg font-semibold text-gray-900">{course.category}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                lesson.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-indigo-500'
              }`}
              onClick={() => handleLessonComplete(lesson.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`text-2xl ${lesson.completed ? '✅' : '⭕'}`}>
                    {lesson.completed ? '✅' : `${index + 1}`}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">⏱️ {lesson.duration}</p>
                  </div>
                </div>
                {lesson.completed && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
