import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  thumbnail: string;
  skills: string[];
  enrolled?: boolean;
}

interface CoursesProps {
  userId: string;
}

export default function Courses({ userId }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCourses();
    loadEnrollments();
  }, [userId]);

  const loadCourses = async () => {
    try {
      const coursesRef = collection(db, 'courses');
      const snapshot = await getDocs(coursesRef);
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Course));
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrollments = async () => {
    try {
      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const enrolledIds = new Set(snapshot.docs.map(doc => doc.data().courseId));
      setEnrolledCourseIds(enrolledIds);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    }
  };

  const handleEnroll = async (course: Course) => {
    try {
      await addDoc(collection(db, 'enrollments'), {
        userId,
        courseId: course.id,
        courseTitle: course.title,
        progress: 0,
        completed: false,
        enrolledAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
      });
      setEnrolledCourseIds(prev => new Set([...prev, course.id]));
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'enrolled') return enrolledCourseIds.has(course.id);
    return course.category === filter;
  });

  if (loading) {
    return <div className="text-center py-12">Loading courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="mt-2 text-gray-600">Explore and enroll in courses to enhance your skills</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'enrolled', 'programming', 'design', 'business', 'data-science'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">{course.thumbnail}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-600">{course.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="mr-4">⏱️ {course.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                {enrolledCourseIds.has(course.id) ? (
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <button
                    onClick={() => handleEnroll(course)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
