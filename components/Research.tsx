import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Dna, Pill, Lightbulb } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';

const RESEARCH_DIRECTIONS = [
  {
    title: "Machine Learning for Biology",
    question: "How can we develop new machine learning methods tailored for biological data?",
    description: "We develop deep learning architectures and algorithms specifically designed for biological sequences, structures, and networks. Our methods handle the unique challenges of biological data including noise, missing values, and complex dependencies.",
    keyAreas: ["Generative models for molecular design", "Interpretable AI for biological insights"],
    icon: <Brain className="w-6 h-6" />
  },
  {
    title: "Precision Medicine",
    question: "How can we personalize treatments based on individual molecular profiles?",
    description: "We combine genomic, structural and molecular biology, and clinical data to predict treatment responses for patient stratification.",
    keyAreas: ["Treatment response prediction", "Clinical decision support"],
    icon: <Dna className="w-6 h-6" />
  }
];

const CURRENT_PROJECTS = [
  {
    title: "Deep Learning for Drug Discovery",
    description: "We're developing new deep learning models that can predict drug-target interactions and optimize molecular properties.",
    icon: <Pill className="w-6 h-6" />
  },
  {
    title: "Interpretable AI for Biology",
    description: "We're working on making predictive and generative models more interpretable for biological applications, allowing researchers to understand not just predictions but also the biological mechanisms behind them.",
    icon: <Lightbulb className="w-6 h-6" />
  }
];

export const Research: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'Research' }]);
  }, [setBreadcrumbs]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Research</h1>
        <p className="text-xl text-slate-600 dark:text-gray-300">
          Our lab focuses on developing computational methods to understand complex biological systems. We combine machine learning, molecular modeling, and experimental validation to tackle challenging problems in biology and medicine.
        </p>
      </motion.div>

      {/* Research Directions Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Research Directions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_DIRECTIONS.map((direction, idx) => (
            <motion.div
              key={direction.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                {direction.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{direction.title}</h3>
              <p className="text-lg text-primary font-medium mb-4 italic">{direction.question}</p>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                {direction.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Key areas:</p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-400 font-semibold">
                  {direction.keyAreas.map(area => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Current Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Current Projects</h2>
        <div className="flex flex-col gap-6">
          {CURRENT_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
