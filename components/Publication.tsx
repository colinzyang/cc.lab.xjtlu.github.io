import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Link as LinkIcon } from 'lucide-react';

const PUBLICATIONS = [
  {
    year: 2024,
    papers: [
      {
        title: "Deep learning approaches for protein folding prediction in non-standard environments",
        authors: "Chen A, Wilson J, CC Lab PI",
        journal: "Nature Computational Science",
        link: "#"
      },
      {
        title: "Structural dynamics of membrane transporters revealed by coarse-grained simulations",
        authors: "Lee S, Kim D, CC Lab PI",
        journal: "Biophysical Journal",
        link: "#"
      }
    ]
  },
  {
    year: 2023,
    papers: [
      {
        title: "An efficient algorithm for large-scale genomic sequence alignment",
        authors: "Wilson J, CC Lab PI",
        journal: "Bioinformatics",
        link: "#"
      }
    ]
  }
];

export const Publication: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-gray-100 dark:border-gray-800 pb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Publications</h1>
        <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl">
          Selected peer-reviewed articles and conference proceedings.
        </p>
      </motion.div>

      <div className="space-y-16">
        {PUBLICATIONS.map((group, groupIdx) => (
          <motion.div
            key={group.year}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-32 flex-shrink-0">
              <span className="text-3xl font-black text-slate-200 dark:text-slate-800 sticky top-24">
                {group.year}
              </span>
            </div>
            <div className="flex-grow space-y-10">
              {group.papers.map((paper, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                    <a href={paper.link}>{paper.title}</a>
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-1">{paper.authors}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-serif italic text-slate-500">{paper.journal}</span>
                    <a href={paper.link} className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:underline">
                      <FileText className="w-3 h-3" /> PDF
                    </a>
                    <a href={paper.link} className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider hover:underline">
                      <LinkIcon className="w-3 h-3" /> DOI
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};