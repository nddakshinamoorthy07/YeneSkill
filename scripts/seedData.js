import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDVtEF5I2DeoU1L9Aw91jj6yg5H5DjcsA",
  authDomain: "yeneskill.firebaseapp.com",
  projectId: "yeneskill",
  storageBucket: "yeneskill.firebasestorage.app",
  messagingSenderId: "992851396296",
  appId: "1:992851396296:web:22976117fceaa1326a87fd",
  measurementId: "G-78K0ZL5QHT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const courses = [
  {
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites',
    category: 'programming',
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: '🌐',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
  },
  {
    title: 'React Masterclass',
    description: 'Master React.js and build powerful single-page applications',
    category: 'programming',
    duration: '10 weeks',
    level: 'Intermediate',
    thumbnail: '⚛️',
    skills: ['React', 'Hooks', 'State Management', 'Component Design']
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python programming and data analysis with real-world projects',
    category: 'data-science',
    duration: '12 weeks',
    level: 'Beginner',
    thumbnail: '🐍',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization']
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and user-friendly interfaces',
    category: 'design',
    duration: '6 weeks',
    level: 'Beginner',
    thumbnail: '🎨',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping']
  },
  {
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning algorithms and applications',
    category: 'data-science',
    duration: '14 weeks',
    level: 'Advanced',
    thumbnail: '🤖',
    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Model Training']
  },
  {
    title: 'Business Strategy & Management',
    description: 'Learn essential business and project management skills',
    category: 'business',
    duration: '8 weeks',
    level: 'Intermediate',
    thumbnail: '📊',
    skills: ['Strategic Planning', 'Team Leadership', 'Financial Analysis', 'Communication']
  },
  {
    title: 'Full Stack JavaScript',
    description: 'Build complete web applications with Node.js, Express, and MongoDB',
    category: 'programming',
    duration: '16 weeks',
    level: 'Advanced',
    thumbnail: '💻',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication']
  },
  {
    title: 'Digital Marketing Essentials',
    description: 'Master SEO, social media, and content marketing strategies',
    category: 'business',
    duration: '6 weeks',
    level: 'Beginner',
    thumbnail: '📱',
    skills: ['SEO', 'Social Media', 'Content Strategy', 'Analytics']
  },
  {
    title: 'Cloud Computing with AWS',
    description: 'Learn Amazon Web Services and cloud infrastructure',
    category: 'programming',
    duration: '10 weeks',
    level: 'Intermediate',
    thumbnail: '☁️',
    skills: ['AWS', 'EC2', 'S3', 'Lambda', 'DevOps']
  },
  {
    title: 'Graphic Design Fundamentals',
    description: 'Create stunning visuals with Adobe Creative Suite',
    category: 'design',
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: '🖌️',
    skills: ['Photoshop', 'Illustrator', 'Color Theory', 'Typography']
  }
];

async function seedCourses() {
  console.log('Seeding courses...');
  
  for (const course of courses) {
    try {
      const docRef = await addDoc(collection(db, 'courses'), course);
      console.log(`Added course: ${course.title} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`Error adding course ${course.title}:`, error);
    }
  }
  
  console.log('Seeding complete!');
}

seedCourses().catch(console.error);
