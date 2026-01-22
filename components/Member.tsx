import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, GraduationCap } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';
import { loadMembers, Member as MemberType } from '../src/lib/dataLoader';

export const Member: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  const [pi, setPi] = useState<MemberType | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([{ label: 'People' }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    loadMembers().then(data => {
      setPi(data.PI);
      setMembers(data.MEMBERS);
      setLoading(false);
    }).catch(error => {
      console.error('Error loading members:', error);
      setLoading(false);
    });
  }, []);

  if (loading || !pi) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Members</h1>
        <p className="text-slate-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Members</h1>
        <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl">
        </p>
      </motion.div>

      {/* PI Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
      >
         <div className="md:col-span-5 aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={pi.image}
              alt={pi.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
         </div>
         <div className="md:col-span-7 flex flex-col justify-center h-full pt-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{pi.role}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{pi.name}</h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
              {pi.bio_long}
            </p>
            {pi.interest && (
              <div className="text-sm font-semibold text-slate-500 dark:text-gray-400 mb-4">
                Focus: {pi.interest}
              </div>
            )}
            <div className="flex gap-4 items-center">
              {pi.email && (
                <a href={`mailto:${pi.email}`} className="text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {pi.github && (
                <a href={`https://github.com/${pi.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {pi.google_scholar && (
                <a href={`https://scholar.google.com/citations?user=${pi.google_scholar}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </a>
              )}
              {pi.orcid && (
                <a href={`https://orcid.org/${pi.orcid}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-gray-400 hover:text-primary transition-colors text-xs font-bold">
                  ORCID
                </a>
              )}
            </div>
         </div>
      </motion.div>

      {/* Members Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Current Members
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 + 0.2 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-5 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{member.name}</h3>
              <p className="text-primary font-medium text-sm my-1">{member.title || member.role}</p>
              <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">{member.interest}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};