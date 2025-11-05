import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  related: string[];
}

const sampleSkills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Programming', level: 3, related: ['2', '3', '4'] },
  { id: '2', name: 'React', category: 'Frontend', level: 2, related: ['1', '5'] },
  { id: '3', name: 'Node.js', category: 'Backend', level: 2, related: ['1', '6'] },
  { id: '4', name: 'TypeScript', category: 'Programming', level: 2, related: ['1', '2'] },
  { id: '5', name: 'CSS', category: 'Frontend', level: 3, related: ['2', '7'] },
  { id: '6', name: 'MongoDB', category: 'Database', level: 1, related: ['3'] },
  { id: '7', name: 'Tailwind', category: 'Frontend', level: 2, related: ['5'] },
  { id: '8', name: 'Git', category: 'Tools', level: 3, related: ['1'] },
];

export default function CareerPage() {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const nodes = sampleSkills.map((skill) => ({
      ...skill,
      x: width / 2 + (Math.random() - 0.5) * 400,
      y: height / 2 + (Math.random() - 0.5) * 400,
    }));

    const links = sampleSkills.flatMap((skill) =>
      skill.related.map((relatedId) => ({
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

    node
      .append('circle')
      .attr('r', (d: any) => 20 + d.level * 10)
      .attr('fill', (d: any) => {
        const colors: Record<string, string> = {
          Programming: '#3b82f6',
          Frontend: '#06b6d4',
          Backend: '#8b5cf6',
          Database: '#10b981',
          Tools: '#f59e0b',
        };
        return colors[d.category] || '#6b7280';
      })
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
  }, []);

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
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
              <svg ref={svgRef} className="w-full" style={{ minHeight: '600px' }} />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {['Programming', 'Frontend', 'Backend', 'Database', 'Tools'].map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: {
                        Programming: '#3b82f6',
                        Frontend: '#06b6d4',
                        Backend: '#8b5cf6',
                        Database: '#10b981',
                        Tools: '#f59e0b',
                      }[category],
                    }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                </div>
              ))}
            </div>
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
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('career.recommended')}
                </h3>
              </div>
              <div className="space-y-2">
                {['Docker', 'Kubernetes', 'AWS'].map((skill) => (
                  <div
                    key={skill}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-xl font-bold">{t('career.paths')}</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-semibold">Full Stack Developer</p>
                  <p className="text-sm opacity-90">{t('career.estimate')}: 120 hours</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-semibold">Cloud Engineer</p>
                  <p className="text-sm opacity-90">{t('career.estimate')}: 80 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
