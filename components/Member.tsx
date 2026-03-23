import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, GraduationCap } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';
import { loadMembers, Member as MemberType } from '../src/lib/dataLoader';

const ROLE_ORDER: Record<string, number> = {
  'PhD Student': 0,
  'MSc Student': 1,
  'Undergraduate Researcher': 2,
  'Lab Manager': 3,
};

const GROUP_LABELS: Record<string, string> = {
  'PhD Student': 'PhD Students',
  'MSc Student': 'MSc Students',
  'Undergraduate Researcher': 'Undergraduate Researchers',
  'Lab Manager': 'Staff',
};

function groupMembers(members: MemberType[]): { label: string; members: MemberType[] }[] {
  const groups: Record<string, MemberType[]> = {};
  const sorted = [...members].sort((a, b) => {
    const orderDiff = (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99);
    if (orderDiff !== 0) return orderDiff;
    return a.name.localeCompare(b.name);
  });
  for (const member of sorted) {
    const key = member.role in ROLE_ORDER ? member.role : 'Lab Manager';
    if (!groups[key]) groups[key] = [];
    groups[key].push(member);
  }
  return Object.entries(groups).map(([role, members]) => ({
    label: GROUP_LABELS[role] ?? role,
    members,
  }));
}

export const Member: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  const [pi, setPi] = useState<MemberType | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [alumni, setAlumni] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBreadcrumbs([{ label: 'People' }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    loadMembers().then(data => {
      setPi(data.PI);
      setMembers(data.MEMBERS);
      setAlumni(data.ALUMNI ?? []);
      setLoading(false);
    }).catch(error => {
      console.error('Error loading members:', error);
      setLoading(false);
    });
  }, []);

  if (loading || !pi) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">People</h1>
        <p className="text-slate-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  const groups = groupMembers(members);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">People</h1>
      </motion.div>

      {/* PI Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Principal Investigator
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
        >
          <div className="md:col-span-4 aspect-square overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <img
              src={pi.image}
              alt={pi.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="md:col-span-8 flex flex-col justify-center h-full pt-4">
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
      </div>

      {/* Members — grouped by role */}
      {groups.map((group, groupIdx) => (
        <div key={group.label} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            {group.label}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            {group.members.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIdx * 0.05 + idx * 0.05 + 0.2 }}
              >
                <div className="aspect-square overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 mb-5 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{member.name}</h3>
                <p className="text-primary font-medium text-sm my-1">{member.title || member.role}</p>
                {member.interest && (
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">{member.interest}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Alumni — compact text roster, hidden when empty */}
      {alumni.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            Alumni
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {alumni.map((alum, idx) => (
              <motion.div
                key={alum.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 + 0.3 }}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0"
              >
                <span className="font-semibold text-slate-900 dark:text-white sm:w-48 shrink-0">
                  {alum.name}
                </span>
                <span className="text-sm text-primary font-medium sm:w-48 shrink-0">
                  {alum.title || alum.role}
                </span>
                {alum.current_position && (
                  <span className="text-sm text-slate-500 dark:text-gray-400">
                    → {alum.current_position}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
