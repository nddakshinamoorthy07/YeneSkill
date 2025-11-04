import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            FFF Application
          </h1>
          <p className="text-xl text-gray-600">
            Firebase + React + Vite
          </p>
        </header>

        <div className="flex flex-col items-center gap-6">
          <AuthForm user={user} />
          
          {user && (
            <>
              <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Firebase Integration Status
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Authentication:</span>
                    <span className="text-green-600 font-semibold">✓ Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Firestore Database:</span>
                    <span className="text-green-600 font-semibold">✓ Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="text-gray-800 font-mono text-xs">{user.uid}</span>
                  </div>
                </div>
              </div>
              
              <TodoList userId={user.uid} />
            </>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Built with React, TypeScript, Tailwind CSS, and Firebase</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
