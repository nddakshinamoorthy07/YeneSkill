import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Skills from './pages/Skills';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-md mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              YeneSkill
            </h1>
            <p className="text-xl text-gray-600">
              Learn, Grow, and Track Your Skills
            </p>
          </header>
          <AuthForm user={user} />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userId={user.uid} />} />
          <Route path="/courses" element={<Courses userId={user.uid} />} />
          <Route path="/courses/:courseId" element={<CourseDetail userId={user.uid} />} />
          <Route path="/skills" element={<Skills userId={user.uid} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
