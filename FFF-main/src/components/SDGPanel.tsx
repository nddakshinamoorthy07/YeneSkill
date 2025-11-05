import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Users, Briefcase, Cpu, TrendingUp } from 'lucide-react';

const sdgData = [
  {
    number: 4,
    icon: Target,
    color: 'bg-red-500',
    stat: '50,000+',
    label: 'Learners Reached',
  },
  {
    number: 5,
    icon: Users,
    color: 'bg-orange-500',
    stat: '55%',
    label: 'Women Learners',
  },
  {
    number: 8,
    icon: Briefcase,
    color: 'bg-purple-500',
    stat: '12,000+',
    label: 'Jobs Created',
  },
  {
    number: 9,
    icon: Cpu,
    color: 'bg-blue-500',
    stat: '300+',
    label: 'Tech Courses',
  },
  {
    number: 10,
    icon: TrendingUp,
    color: 'bg-pink-500',
    stat: '95%',
    label: 'Equal Access',
  },
];

export default function SDGPanel() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('sdg.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('sdg.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {sdgData.map((sdg, index) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${sdg.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <sdg.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                  SDG {sdg.number}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {sdg.stat}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {sdg.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {t(`sdg.sdg${sdg.number}`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">165+</div>
              <div className="text-gray-600 dark:text-gray-400">Countries Reached</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">92%</div>
              <div className="text-gray-600 dark:text-gray-400">Course Completion Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">4.8/5</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
