import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import OfflineBadge from './components/OfflineBadge';
import InstallPWA from './components/InstallPWA';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import MentorsPage from './pages/MentorsPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CareerPage from './pages/CareerPage';
import MessagesPage from './pages/MessagesPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import AIAssistantPage from './pages/AIAssistantPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
        <Navbar />
        <OfflineBadge />
        <InstallPWA />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lessons" element={<CoursesPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/career"
            element={
              <ProtectedRoute>
                <CareerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
