import { motion } from 'framer-motion';
import { 
  Award, Users, Laptop, ChevronRight, Sparkles 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { industrialCourses } from '../data/sampleData';
import CourseCard from '../components/CourseCard';

const IndustrialSupportPage = () => {
  const navigate = useNavigate();

  const certificationBenefits = [
    {
      icon: Award,
      title: 'Micro-Certifications',
      description: 'Industry-recognized credentials from leading partner organizations.',
    },
    {
      icon: Users,
      title: 'Mentorship Programs',
      description: 'Connect with industry experts for personalized career guidance.',
    },
    {
      icon: Laptop,
      title: 'Real-World Projects',
      description: 'Hands-on experience with actual industry challenges and solutions.',
    },
  ];

  const partners = [
    { name: 'Google', logo: '🌐' },
    { name: 'AWS', logo: '☁️' },
    { name: 'Siemens', logo: '⚙️' },
    { name: 'Bosch', logo: '🔧' },
    { name: 'Microsoft', logo: '💻' },
    { name: 'IBM', logo: '🤖' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-12">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C4CC0] via-[#5533CC] to-[#7A00FF] opacity-90"></div>
        
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00E5FF] rounded-full blur-3xl animate-pulse delay-150"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-[#00E5FF]" />
              <span className="text-white font-medium">Industrial Support & Workforce Training</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bridging Education and Employability
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Partner with industry leaders to build skills that matter, earn recognized certifications, and accelerate your career.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industry-Aligned Courses Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry-Aligned Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Cutting-edge programs designed with industry partners to prepare you for tomorrow's challenges. All courses are completely free!
            </p>
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full mt-4 shadow-lg">
              <Sparkles className="w-5 h-5" />
              <span>100% Free Training</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrialCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Career & Certification Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Career & Certification Support
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Your success is our mission. Access comprehensive support to accelerate your career growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificationBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-6 bg-gradient-to-br from-[#00E5FF] to-[#0C4CC0] rounded-2xl mb-4 shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Partner Network Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Partner Network
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Collaborating with global industry leaders to deliver world-class training.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C4CC0] via-[#5533CC] to-[#7A00FF] p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00E5FF] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Upgrade Your Skills?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals advancing their careers through our workforce training programs.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#0C4CC0] font-bold rounded-xl hover:bg-[#00E5FF] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <span>Join the Workforce Program</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default IndustrialSupportPage;
