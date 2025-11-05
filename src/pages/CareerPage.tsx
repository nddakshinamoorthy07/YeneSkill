import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  related: string[];
  source?: string; // Which course taught this skill
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  requiredSkills: string[];
}

// Course to Skills mapping
const courseSkillsMap: Record<string, Array<{ name: string; category: string; level: number }>> = {
  'web-development': [
    { name: 'HTML', category: 'Frontend', level: 3 },
    { name: 'CSS', category: 'Frontend', level: 3 },
    { name: 'JavaScript', category: 'Programming', level: 2 },
  ],
  'react': [
    { name: 'React', category: 'Frontend', level: 3 },
    { name: 'JSX', category: 'Frontend', level: 3 },
    { name: 'Hooks', category: 'Frontend', level: 2 },
  ],
  'node': [
    { name: 'Node.js', category: 'Backend', level: 3 },
    { name: 'Express', category: 'Backend', level: 2 },
    { name: 'REST API', category: 'Backend', level: 2 },
  ],
  'python': [
    { name: 'Python', category: 'Programming', level: 3 },
    { name: 'NumPy', category: 'Data Science', level: 2 },
    { name: 'Pandas', category: 'Data Science', level: 2 },
  ],
  'ai': [
    { name: 'Machine Learning', category: 'AI/ML', level: 2 },
    { name: 'TensorFlow', category: 'AI/ML', level: 1 },
    { name: 'Neural Networks', category: 'AI/ML', level: 1 },
  ],
  'database': [
    { name: 'MongoDB', category: 'Database', level: 3 },
    { name: 'SQL', category: 'Database', level: 2 },
    { name: 'PostgreSQL', category: 'Database', level: 2 },
  ],
  'git': [
    { name: 'Git', category: 'Tools', level: 3 },
    { name: 'GitHub', category: 'Tools', level: 3 },
    { name: 'Version Control', category: 'Tools', level: 3 },
  ],
};

// Skill relationships for graph
const skillRelationships: Record<string, string[]> = {
  'HTML': ['CSS', 'JavaScript'],
  'CSS': ['HTML', 'Tailwind'],
  'JavaScript': ['TypeScript', 'React', 'Node.js'],
  'TypeScript': ['JavaScript', 'React'],
  'React': ['JavaScript', 'JSX', 'Hooks'],
  'Node.js': ['JavaScript', 'Express'],
  'Express': ['Node.js', 'REST API'],
  'Python': ['NumPy', 'Pandas', 'Django'],
  'Git': ['GitHub', 'Version Control'],
  'MongoDB': ['NoSQL', 'Database Design'],
  'SQL': ['PostgreSQL', 'MySQL'],
};

export default function CareerPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserSkills();
    }
  }, [user]);

  useEffect(() => {
    if (userSkills.length > 0) {
      renderSkillsGraph();
      generateRecommendations();
    }
  }, [userSkills]);

  const fetchUserSkills = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch user's completed and in-progress courses
      const coursesSnapshot = await getDocs(collection(db, 'users', user.uid, 'courses'));
      const courses = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Extract skills from completed courses
      const extractedSkills: Skill[] = [];
      const skillsSet = new Set<string>();

      courses.forEach((course: any) => {
        const progress = course.progress || 0;
        
        // Only include skills from courses with >30% progress
        if (progress > 30) {
          // Match course title to skill categories
          const courseTitle = course.title?.toLowerCase() || '';
          
          // Try to find matching skills
          Object.entries(courseSkillsMap).forEach(([key, skills]) => {
            if (courseTitle.includes(key) || course.id.includes(key)) {
              skills.forEach(skill => {
                if (!skillsSet.has(skill.name)) {
                  skillsSet.add(skill.name);
                  
                  // Adjust skill level based on course completion
                  const adjustedLevel = Math.ceil(skill.level * (progress / 100));
                  
                  extractedSkills.push({
                    id: skill.name.toLowerCase().replace(/\s+/g, '-'),
                    name: skill.name,
                    category: skill.category,
                    level: Math.max(1, adjustedLevel),
                    related: skillRelationships[skill.name] || [],
                    source: course.title,
                  });
                }
              });
            }
          });
        }
      });

      // If no courses, add some default beginner skills
      if (extractedSkills.length === 0) {
        const defaultSkills: Skill[] = [
          { id: 'learning', name: 'Learning', category: 'Soft Skills', level: 1, related: [] },
          { id: 'problem-solving', name: 'Problem Solving', category: 'Soft Skills', level: 1, related: [] },
        ];
        setUserSkills(defaultSkills);
      } else {
        setUserSkills(extractedSkills);
      }

    } catch (error) {
      console.error('Error fetching user skills:', error);
      // Fallback to sample skills
      setUserSkills([
        { id: 'javascript', name: 'JavaScript', category: 'Programming', level: 2, related: ['react', 'node'] },
        { id: 'react', name: 'React', category: 'Frontend', level: 2, related: ['javascript'] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = () => {
    // Get all related skills that user doesn't have yet
    const currentSkillNames = new Set(userSkills.map(s => s.name));
    const recommended = new Set<string>();

    userSkills.forEach(skill => {
      skill.related.forEach(relatedSkill => {
        if (!currentSkillNames.has(relatedSkill)) {
          recommended.add(relatedSkill);
        }
      });
    });

    setRecommendedSkills(Array.from(recommended).slice(0, 5));

    // Generate learning paths based on current skills
    const paths: LearningPath[] = [];
    
    const hasSkill = (skillName: string) => currentSkillNames.has(skillName);

    if (hasSkill('JavaScript') && hasSkill('React')) {
      paths.push({
        id: 'fullstack',
        title: 'Full Stack Developer',
        description: 'Master both frontend and backend development',
        estimatedHours: 120,
        requiredSkills: ['Node.js', 'Express', 'MongoDB'],
      });
    }

    if (hasSkill('JavaScript') || hasSkill('Python')) {
      paths.push({
        id: 'cloud',
        title: 'Cloud Engineer',
        description: 'Learn cloud platforms and DevOps',
        estimatedHours: 80,
        requiredSkills: ['AWS', 'Docker', 'Kubernetes'],
      });
    }

    if (hasSkill('Python')) {
      paths.push({
        id: 'data-science',
        title: 'Data Scientist',
        description: 'Dive into data analysis and machine learning',
        estimatedHours: 150,
        requiredSkills: ['Pandas', 'NumPy', 'Machine Learning'],
      });
    }

    // Default path if no specific skills
    if (paths.length === 0) {
      paths.push({
        id: 'web-dev',
        title: 'Web Developer',
        description: 'Start your journey in web development',
        estimatedHours: 100,
        requiredSkills: ['HTML', 'CSS', 'JavaScript'],
      });
    }

    setLearningPaths(paths.slice(0, 2));
  };

  const renderSkillsGraph = () => {
    if (!svgRef.current || userSkills.length === 0) return;

    const width = 800;
    const height = 600;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Create nodes with initial random positions
    const nodes = userSkills.map((skill) => ({
      ...skill,
      x: width / 2 + (Math.random() - 0.5) * 400,
      y: height / 2 + (Math.random() - 0.5) * 400,
    }));

    // Create links between related skills
    const links = userSkills.flatMap((skill) =>
      skill.related
        .filter(relatedId => userSkills.some(s => s.id === relatedId))
        .map(relatedId => ({
          source: skill.id,
          target: relatedId,
        }))
    );

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6);

    const node = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(
        d3.drag<any, any>()
          .on('start', (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event: any, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event: any, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      );

    const categoryColors: Record<string, string> = {
      'Programming': '#3b82f6',
      'Frontend': '#06b6d4',
      'Backend': '#8b5cf6',
      'Database': '#10b981',
      'Tools': '#f59e0b',
      'AI/ML': '#ec4899',
      'Data Science': '#14b8a6',
      'Soft Skills': '#6366f1',
    };

    node
      .append('circle')
      .attr('r', (d: any) => 20 + d.level * 10)
      .attr('fill', (d: any) => categoryColors[d.category] || '#6b7280')
      .attr('opacity', 0.8)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('click', (_: any, d: any) => setSelectedSkill(d));

    node
      .append('text')
      .text((d: any) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your career roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('career.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('career.subtitle')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {userSkills.length > 0 
              ? `${userSkills.length} skills unlocked from your courses`
              : 'Complete courses to unlock skills and build your roadmap'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('career.skills')}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                {t('career.export')}
              </button>
            </div>

            {userSkills.length > 0 ? (
              <>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
                  <svg ref={svgRef} className="w-full" style={{ minHeight: '600px' }} />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {Object.entries({
                    'Programming': '#3b82f6',
                    'Frontend': '#06b6d4',
                    'Backend': '#8b5cf6',
                    'Database': '#10b981',
                    'Tools': '#f59e0b',
                    'AI/ML': '#ec4899',
                  }).map(([category, color]) => (
                    <div key={category} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-12 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No skills yet! Complete courses to build your skill graph.
                </p>
                <a
                  href="/lessons"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Browse Courses
                </a>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {selectedSkill && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedSkill.name}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedSkill.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Proficiency</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 w-full rounded ${
                            level <= selectedSkill.level
                              ? 'bg-blue-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {selectedSkill.source && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Learned from</p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {selectedSkill.source}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {recommendedSkills.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('career.recommended')}
                  </h3>
                </div>
                <div className="space-y-2">
                  {recommendedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {learningPaths.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{t('career.paths')}</h3>
                </div>
                <div className="space-y-3">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <p className="font-semibold">{path.title}</p>
                      <p className="text-sm opacity-90 mb-2">{path.description}</p>
                      <p className="text-xs opacity-80">
                        {t('career.estimate')}: {path.estimatedHours} hours
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
