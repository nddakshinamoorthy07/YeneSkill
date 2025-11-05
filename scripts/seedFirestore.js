import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { seedCourses, seedMentors } from '../src/data/seedCourses.ts';

// Your Firebase config - UPDATE WITH YOUR VALUES
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed Courses
    console.log('📚 Seeding courses...');
    let batch = writeBatch(db);
    let operationCount = 0;

    for (const course of seedCourses) {
      const courseRef = doc(db, 'courses', course.id);
      batch.set(courseRef, {
        ...course,
        publishedAt: new Date(),
        createdAt: new Date(),
      });
      
      operationCount++;
      
      // Firestore batch limit is 500 operations
      if (operationCount >= 400) {
        await batch.commit();
        batch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    if (operationCount > 0) {
      await batch.commit();
    }
    console.log(`✅ ${seedCourses.length} courses seeded!\n`);

    // Seed Mentors
    console.log('👨‍🏫 Seeding mentors...');
    batch = writeBatch(db);
    operationCount = 0;

    for (const mentor of seedMentors) {
      const mentorRef = doc(db, 'mentors', mentor.id);
      batch.set(mentorRef, {
        ...mentor,
        createdAt: new Date(),
        isActive: true,
      });
      
      operationCount++;
    }
    
    await batch.commit();
    console.log(`✅ ${seedMentors.length} mentors seeded!\n`);

    // Create sample career skills graph
    console.log('🎯 Seeding career skills...');
    const skills = [
      { id: 'html', name: 'HTML', category: 'Frontend', related: ['css', 'javascript'] },
      { id: 'css', name: 'CSS', category: 'Frontend', related: ['html', 'tailwind'] },
      { id: 'javascript', name: 'JavaScript', category: 'Programming', related: ['typescript', 'react', 'nodejs'] },
      { id: 'typescript', name: 'TypeScript', category: 'Programming', related: ['javascript', 'react'] },
      { id: 'react', name: 'React', category: 'Frontend', related: ['javascript', 'jsx'] },
      { id: 'nodejs', name: 'Node.js', category: 'Backend', related: ['javascript', 'express'] },
      { id: 'python', name: 'Python', category: 'Programming', related: ['numpy', 'pandas'] },
      { id: 'sql', name: 'SQL', category: 'Database', related: ['postgresql', 'mongodb'] },
      { id: 'git', name: 'Git', category: 'Tools', related: ['github'] },
      { id: 'docker', name: 'Docker', category: 'DevOps', related: ['kubernetes'] },
    ];

    batch = writeBatch(db);
    for (const skill of skills) {
      const skillRef = doc(db, 'career_graph', 'skills', skill.id);
      batch.set(skillRef, skill);
    }
    await batch.commit();
    console.log(`✅ ${skills.length} skills seeded!\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Courses: ${seedCourses.length}`);
    console.log(`   Mentors: ${seedMentors.length}`);
    console.log(`   Skills: ${skills.length}`);
    console.log('\n✅ Your YeneSkill platform is ready to use!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedDatabase();
