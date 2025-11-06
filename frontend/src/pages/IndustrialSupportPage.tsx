import { useMemo } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import CareerRecommendationWidget from '../components/CareerRecommendationWidget';
import { useFirestore } from '../hooks/useFirestore';

type IndustrialCourse = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: string;
  duration: string;
  enrolled: number;
  rating: number;
  tags: string[];
};

type Partner = {
  id: string;
  name: string;
  logoUrl: string;
};

const defaultCourses: IndustrialCourse[] = [
  {
    id: 'ai-data',
    title: 'Artificial Intelligence & Data Analytics',
    description: 'Learn ML fundamentals, data pipelines, and applied analytics for industry.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
    level: 'Intermediate',
    duration: '6-8 weeks',
    enrolled: 3200,
    rating: 4.8,
    tags: ['AI', 'Data', 'ML'],
  },
  {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'Build connected solutions with sensors, edge compute, and cloud IoT.',
    thumbnail: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200',
    level: 'Beginner',
    duration: '5-6 weeks',
    enrolled: 2100,
    rating: 4.7,
    tags: ['IoT', 'Embedded', 'Cloud'],
  },
  {
    id: 'green-tech',
    title: 'Renewable Energy & Green Tech',
    description: 'Solar, battery systems, and sustainability practices for modern infrastructure.',
    thumbnail: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200',
    level: 'Beginner',
    duration: '4-6 weeks',
    enrolled: 1800,
    rating: 4.6,
    tags: ['Renewables', 'Energy', 'Sustainability'],
  },
  {
    id: 'cloud-cyber',
    title: 'Cloud Computing & Cybersecurity',
    description: 'Deploy secure cloud workloads and implement defense-in-depth strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
    level: 'Intermediate',
    duration: '6-8 weeks',
    enrolled: 2900,
    rating: 4.8,
    tags: ['Cloud', 'Security', 'DevSecOps'],
  },
  {
    id: 'automation',
    title: 'Digital Manufacturing & Automation',
    description: 'PLC basics, robotics, and digital twins for Industry 4.0 workflows.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    level: 'Intermediate',
    duration: '6 weeks',
    enrolled: 1500,
    rating: 4.7,
    tags: ['Automation', 'Robotics', 'Industry 4.0'],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Business Skills',
    description: 'From idea validation to pitch decks and go-to-market strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200',
    level: 'All levels',
    duration: '4 weeks',
    enrolled: 3400,
    rating: 4.6,
    tags: ['Startup', 'Marketing', 'Finance'],
  },
];

const defaultPartners: Partner[] = [
  { id: 'google', name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { id: 'siemens', name: 'Siemens', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Siemens_AG_logo.svg' },
  { id: 'bosch', name: 'Bosch', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Bosch-logo.svg' },
  { id: 'aws', name: 'AWS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
];

const IconCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-card hover:shadow-card-hover transition-all">
    <div className="w-12 h-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const LogoCarousel = ({ partners }: { partners: Partner[] }) => {
  const items = useMemo(() => partners.concat(partners), [partners]);
  return (
    <div className="overflow-hidden">
      <div className="flex gap-10 animate-[scroll_30s_linear_infinite]" style={{ width: 'max-content' }}>
        {items.map((p, idx) => (
          <div key={`${p.id}-${idx}`} className="h-12 flex items-center grayscale hover:grayscale-0 transition">
            <img src={p.logoUrl} alt={p.name} className="h-8 object-contain" />
          </div>
        ))}
      </div>
      <style>
        {`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}
      </style>
    </div>
  );
};

const IndustrialSupportPage = () => {
  const { data: coursesFS, loading: loadingCourses } = useFirestore<IndustrialCourse>('industrialCourses');
  const { data: partnersFS } = useFirestore<Partner>('partners');

  const courses = (coursesFS && coursesFS.length > 0 ? coursesFS : defaultCourses).slice(0, 6);
  const partners = partnersFS && partnersFS.length > 0 ? partnersFS : defaultPartners;

  return (
    <div className="pt-16">
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuits" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 H40 M20 0 V40" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                <circle cx="20" cy="20" r="2" fill="white" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuits)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Industrial Support & Workforce Training
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/90 text-lg max-w-3xl">
            Bridging Education and Employability with Industry Partnerships.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Industry-Aligned Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course as any} />
            ))}
          </div>
          {loadingCourses && (
            <div className="mt-6 text-sm text-gray-500">Loading courses...</div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Micro-Certifications & Internship Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <IconCard
              icon={<span className="text-xl">✅</span>}
              title="Verified Industry Certifications"
              description="Earn micro-credentials recognized by leading companies to validate your skills."
            />
            <IconCard
              icon={<span className="text-xl">🤝</span>}
              title="Internship Matching & Mentorship"
              description="Get matched with internship roles and mentorship from industry experts."
            />
            <IconCard
              icon={<span className="text-xl">🧩</span>}
              title="Live Projects with Partner Companies"
              description="Work on real-world challenges and build a job-ready portfolio."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Get Personalized Course Suggestions</h2>
          <CareerRecommendationWidget courses={courses.map(c => ({ id: c.id, title: c.title, tags: c.tags }))} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Our Industry Partners</h2>
          <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-card">
            <LogoCarousel partners={partners} />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Upgrade Your Skills?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Join now and start your industry-aligned learning journey.</p>
          <a href="/login" className="inline-block px-8 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-card-hover transform hover:scale-105 transition-all">Join Now</a>
        </section>
      </main>
    </div>
  );
};

export default IndustrialSupportPage;


