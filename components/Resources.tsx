import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Dna, Pill, Lightbulb, Github, Database, Terminal, LucideIcon } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';
import { loadResources, ResourcesData, IconName } from '../src/lib/dataLoader';
import { useDocumentTitle } from '../src/hooks/useDocumentTitle';

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

export const Resources: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useDocumentTitle('Resources & Software');
  const [data, setData] = React.useState<ResourcesData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'Resources' }]);
  }, [setBreadcrumbs]);

  React.useEffect(() => {
    loadResources()
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
        <div className="text-slate-500">Failed to load resources data.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text mb-6">Resources & Software</h1>
        <p className="text-xl text-slate-600 dark:text-text">
          {data.intro}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.tools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-50 dark:bg-surface border border-gray-100 dark:border-border p-8 hover:border-primary/30 dark:hover:border-primary-dark/30 transition-colors group"
          >
            <div className="w-12 h-12 bg-white dark:bg-surface-1 border border-gray-200 dark:border-surface flex items-center justify-center mb-6 text-primary dark:text-primary-dark group-hover:scale-110 transition-transform">
              {getIcon(tool.icon)}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-text mb-3">{tool.name}</h3>
            <p className="text-slate-600 dark:text-subtext leading-relaxed mb-6">
              {tool.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tool.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-surface text-xs font-mono text-slate-600 dark:text-subtext">
                  {tag}
                </span>
              ))}
            </div>
            <a href={tool.link} className="inline-flex items-center text-sm font-bold text-primary dark:text-primary-dark uppercase tracking-wider hover:underline">
              View Repository &rarr;
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
