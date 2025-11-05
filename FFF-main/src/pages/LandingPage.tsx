import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Video, Target, TrendingUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import TestimonialSlider from '../components/TestimonialSlider';
import Footer from '../components/Footer';
import { testimonials } from '../data/sampleData';

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of real-world experience.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: '1-on-1 Mentorship',
      description: 'Get personalized guidance from mentors who care about your success.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certificates to showcase your skills to employers.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Video,
      title: 'Interactive Content',
      description: 'Engage with hands-on projects, quizzes, and real-world applications.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Target,
      title: 'Career-Focused',
      description: 'Build job-ready skills aligned with industry demands and trends.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and insights.',
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <HeroSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-primary">YeneSkill</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to accelerate your learning and achieve your career goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Student <span className="text-primary">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from learners who transformed their careers with YeneSkill.
            </p>
          </motion.div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-primary rounded-3xl p-12 shadow-card-hover"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of learners already transforming their futures.
            </p>
            <a
              href="/login"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-card-hover transform hover:scale-105 transition-all"
            >
              Get Started for Free
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
