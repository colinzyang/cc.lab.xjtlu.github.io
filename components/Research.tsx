import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Dna, Pill, Lightbulb, Github, Database, Terminal, LucideIcon, Target } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';
import { loadResearch, ResearchData, IconName } from '../src/lib/dataLoader';

const iconMap: Record<IconName, LucideIcon> = {
  Brain,
  Dna,
  Pill,
  Lightbulb,
  Github,
  Database,
  Terminal
};

const getIcon = (name: IconName) => {
  const Icon = iconMap[name] || Brain;
  return <Icon className="w-6 h-6" />;
};

export const Research: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  const [data, setData] = React.useState<ResearchData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'Research' }]);
  }, [setBreadcrumbs]);

  React.useEffect(() => {
    loadResearch()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-6xl mx-auto flex justify-center items-center min-h-[400px]">
        <div className="text-slate-500">Failed to load research data.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text mb-6">Research</h1>
        <p className="text-xl text-slate-600 dark:text-text">
          {data.intro}
        </p>
      </motion.div>

      {/* Research Directions Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-text mb-8 border-b border-gray-200 dark:border-border pb-4 flex items-center gap-3">
          <Target className="w-7 h-7 text-primary dark:text-primary-dark" />
          Research Directions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.directions.map((direction, idx) => (
            <motion.div
              key={direction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className="bg-gray-50 dark:bg-surface border border-gray-100 dark:border-border p-8 hover:border-primary/30 dark:hover:border-primary-dark/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white dark:bg-surface-1 border border-gray-200 dark:border-surface flex items-center justify-center mb-6 text-primary dark:text-primary-dark group-hover:scale-110 transition-transform">
                {getIcon(direction.icon)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-text mb-2">{direction.title}</h3>
              <p className="text-lg text-primary dark:text-primary-dark font-medium mb-4 italic">{direction.question}</p>
              <p className="text-slate-600 dark:text-subtext leading-relaxed mb-6">
                {direction.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-700 dark:text-subtext">Key areas:</p>
                <ul className="list-disc list-inside text-slate-600 dark:text-subtext font-semibold">
                  {direction.keyAreas.map(area => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};
