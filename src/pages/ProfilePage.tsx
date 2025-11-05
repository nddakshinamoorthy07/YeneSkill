import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Edit2,
  Upload,
  Save,
  X,
  TrendingUp,
  Lock,
  Globe,
  Palette,
  Download,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  photoURL: string;
  createdAt: Date;
  language: string;
  theme: 'light' | 'dark';
  streak: number;
  totalCourses: number;
  completedCourses: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  progress: number;
  status: 'in-progress' | 'completed';
  enrolledAt: Date;
  lastAccessedAt: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  certificateUrl?: string;
  earnedAt: Date;
  icon: string;
}

type TabType = 'overview' | 'courses' | 'achievements' | 'settings';

export default function ProfilePage() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBio, setEditingBio] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [bioText, setBioText] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchEnrolledCourses();
      fetchAchievements();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      // If user document doesn't exist, create it
      if (!userDoc.exists()) {
        const newProfile: UserProfile = {
          displayName: user.displayName || 'Anonymous User',
          email: user.email || '',
          bio: 'Welcome to YeneSkill! Click edit to add your bio.',
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=3B82F6&color=fff&size=300`,
          createdAt: new Date(),
          language: 'en',
          theme: 'light' as const,
          streak: 0,
          totalCourses: 0,
          completedCourses: 0,
        };
        
        await setDoc(doc(db, 'users', user.uid), newProfile);
        
        setProfile(newProfile);
        setBioText(newProfile.bio);
        setDisplayName(newProfile.displayName);
      } else {
        const data = userDoc.data();
        const profileData = {
          displayName: data.displayName || user.displayName || 'Anonymous',
          email: user.email || '',
          bio: data.bio || 'No bio yet. Click edit to add one!',
          photoURL: data.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=3B82F6&color=fff&size=300`,
          createdAt: data.createdAt?.toDate() || new Date(),
          language: data.language || 'en',
          theme: data.theme || 'light',
          streak: data.streak || 0,
          totalCourses: data.totalCourses || 0,
          completedCourses: data.completedCourses || 0,
        };
        
        setProfile(profileData);
        setBioText(profileData.bio);
        setDisplayName(profileData.displayName);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    if (!user) return;

    try {
      // Mock data - replace with actual Firestore query
      const mockCourses: EnrolledCourse[] = [
        {
          id: '1',
          title: 'Web Development Fundamentals',
          thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
          progress: 75,
          status: 'in-progress',
          enrolledAt: new Date(2024, 0, 15),
          lastAccessedAt: new Date(),
        },
        {
          id: '2',
          title: 'Advanced React Patterns',
          thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
          progress: 100,
          status: 'completed',
          enrolledAt: new Date(2024, 1, 1),
          lastAccessedAt: new Date(2024, 10, 20),
        },
        {
          id: '3',
          title: 'AI Basics for Everyone',
          thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
          progress: 30,
          status: 'in-progress',
          enrolledAt: new Date(2024, 10, 1),
          lastAccessedAt: new Date(),
        },
      ];
      setEnrolledCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAchievements = async () => {
    if (!user) return;

    try {
      // Mock data - replace with actual Firestore query
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Course Completed',
          description: 'Completed your first course',
          icon: '🎓',
          earnedAt: new Date(2024, 9, 15),
        },
        {
          id: '2',
          title: 'React Master',
          description: 'Completed Advanced React Patterns',
          certificateUrl: '#',
          icon: '⚛️',
          earnedAt: new Date(2024, 10, 20),
        },
        {
          id: '3',
          title: '7 Day Streak',
          description: 'Maintained a 7-day learning streak',
          icon: '🔥',
          earnedAt: new Date(2024, 10, 25),
        },
      ];
      setAchievements(mockAchievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleUpdateBio = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), { bio: bioText });
      setProfile((prev) => (prev ? { ...prev, bio: bioText } : null));
      setEditingBio(false);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  const handleUpdateName = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), { displayName });
      setProfile((prev) => (prev ? { ...prev, displayName } : null));
      setEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `profile-pictures/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, 'users', user.uid), { photoURL });
      setProfile((prev) => (prev ? { ...prev, photoURL } : null));
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleLanguageChange = async (lang: string) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), { language: lang });
      i18n.changeLanguage(lang);
      setProfile((prev) => (prev ? { ...prev, language: lang } : null));
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const handleThemeChange = async (theme: 'light' | 'dark') => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), { theme });
      setProfile((prev) => (prev ? { ...prev, theme } : null));
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Profile not found</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Cover Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={profile.photoURL}
                alt={profile.displayName}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </label>
            </div>

            {/* Name & Email */}
            <div className="flex-1 text-white pb-2">
              <div className="flex items-center gap-3">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60"
                      placeholder="Your name"
                    />
                    <button
                      onClick={handleUpdateName}
                      className="p-2 bg-green-500 hover:bg-green-600 rounded-lg"
                      aria-label="Save name"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingName(false)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-lg"
                      aria-label="Cancel editing"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                    <button
                      onClick={() => setEditingName(true)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Edit name"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <p className="flex items-center gap-2 text-white/90 mt-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
              <p className="flex items-center gap-2 text-white/80 mt-1 text-sm">
                <Calendar className="w-4 h-4" />
                Joined {profile.createdAt.toLocaleDateString()}
              </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex gap-6 pb-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.streak}</div>
                <div className="text-sm text-white/80">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.completedCourses}</div>
                <div className="text-sm text-white/80">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{achievements.length}</div>
                <div className="text-sm text-white/80">Achievements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
          {(['overview', 'courses', 'achievements', 'settings'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Mobile Stats */}
              <div className="grid grid-cols-3 gap-4 lg:hidden">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-blue-600">{profile.streak}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-green-600">{profile.completedCourses}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md">
                  <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Achievements</div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    About Me
                  </h2>
                  {!editingBio && (
                    <button
                      onClick={() => setEditingBio(true)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Edit bio"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {editingBio ? (
                  <div className="space-y-3">
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateBio}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingBio(false);
                          setBioText(profile.bio);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last accessed: {course.lastAccessedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      {course.status === 'completed' ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                          <Clock className="w-4 h-4" />
                          In Progress
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enrolled: {course.enrolledAt.toLocaleDateString()}
                    </p>

                    <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{achievement.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>

                  <div className="text-center text-xs text-gray-500 dark:text-gray-500 mb-3">
                    Earned: {achievement.earnedAt.toLocaleDateString()}
                  </div>

                  {achievement.certificateUrl && (
                    <a
                      href={achievement.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 max-w-2xl"
            >
              {/* Language Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5" />
                  Language Preference
                </h2>
                <select
                  value={profile.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="am">አማርኛ (Amharic)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="fr">Français (French)</option>
                </select>
              </div>

              {/* Theme Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5" />
                  Theme
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-colors ${
                      profile.theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-colors ${
                      profile.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5" />
                  Security
                </h2>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <PasswordChangeModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}

// Password Change Modal Component
function PasswordChangeModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!user?.email) {
      setError('User email not found');
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.code === 'auth/wrong-password') {
        setError('Current password is incorrect');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              Password changed successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
