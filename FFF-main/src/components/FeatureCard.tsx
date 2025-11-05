import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient = 'from-blue-500 to-cyan-500' }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-card hover:shadow-card-hover transition-all cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
      
      <div className={`inline-flex p-3 bg-gradient-to-br ${gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
      ></motion.div>
    </motion.div>
  );
};

export default FeatureCard;
