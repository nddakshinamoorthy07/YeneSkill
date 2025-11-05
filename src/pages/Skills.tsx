import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
}

interface SkillsProps {
  userId: string;
}

const availableSkills = [
  { name: 'JavaScript', category: 'Programming', icon: '💻' },
  { name: 'Python', category: 'Programming', icon: '🐍' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', icon: '🟢' },
  { name: 'UI/UX Design', category: 'Design', icon: '🎨' },
  { name: 'Data Analysis', category: 'Data Science', icon: '📊' },
  { name: 'Machine Learning', category: 'AI/ML', icon: '🤖' },
  { name: 'Project Management', category: 'Business', icon: '📋' },
  { name: 'Communication', category: 'Soft Skills', icon: '💬' },
  { name: 'Leadership', category: 'Soft Skills', icon: '👔' },
];

export default function Skills({ userId }: SkillsProps) {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadSkills();
  }, [userId]);

  const loadSkills = async () => {
    try {
      const skillsRef = collection(db, 'userSkills');
      const q = query(skillsRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const skills = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Skill));
      setUserSkills(skills);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleAddSkill = async (skill: typeof availableSkills[0]) => {
    try {
      await addDoc(collection(db, 'userSkills'), {
        userId,
        name: skill.name,
        category: skill.category,
        level: 1,
        maxLevel: 5,
        addedAt: new Date().toISOString(),
      });
      await loadSkills();
      setShowAddSkill(false);
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleUpdateLevel = async (skillId: string, newLevel: number) => {
    try {
      await updateDoc(doc(db, 'userSkills', skillId), { level: newLevel });
      setUserSkills(prev =>
        prev.map(s => (s.id === skillId ? { ...s, level: newLevel } : s))
      );
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const filteredSkills = userSkills.filter(
    skill => selectedCategory === 'all' || skill.category === selectedCategory
  );

  const categories = ['all', ...new Set(userSkills.map(s => s.category))];

  const getSkillIcon = (skillName: string) => {
    return availableSkills.find(s => s.name === skillName)?.icon || '🎯';
  };

  const getLevelColor = (level: number) => {
    if (level <= 1) return 'bg-red-500';
    if (level <= 2) return 'bg-orange-500';
    if (level <= 3) return 'bg-yellow-500';
    if (level <= 4) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills Assessment</h1>
          <p className="mt-2 text-gray-600">Track and improve your skills</p>
        </div>
        <button
          onClick={() => setShowAddSkill(!showAddSkill)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Skill
        </button>
      </div>

      {showAddSkill && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Skill</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {availableSkills
              .filter(skill => !userSkills.some(us => us.name === skill.name))
              .map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => handleAddSkill(skill)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="text-sm font-semibold text-gray-900">{skill.name}</div>
                  <div className="text-xs text-gray-600">{skill.category}</div>
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredSkills.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">No skills added yet</p>
          <button
            onClick={() => setShowAddSkill(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{getSkillIcon(skill.name)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.category}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Proficiency Level</span>
                  <span className="text-sm font-medium text-indigo-600">
                    {skill.level}/{skill.maxLevel}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(skill.maxLevel)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-3 rounded ${
                        i < skill.level ? getLevelColor(skill.level) : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateLevel(skill.id, Math.max(1, skill.level - 1))}
                  disabled={skill.level === 1}
                  className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdateLevel(skill.id, Math.min(skill.maxLevel, skill.level + 1))}
                  disabled={skill.level === skill.maxLevel}
                  className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Skill Level Guide</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-700">Level 1: Beginner - Basic understanding</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Level 2: Elementary - Can work with guidance</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-700">Level 3: Intermediate - Can work independently</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Level 4: Advanced - Can guide others</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Level 5: Expert - Master level proficiency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
