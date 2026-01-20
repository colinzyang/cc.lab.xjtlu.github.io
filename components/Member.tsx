import React from 'react';
import { motion } from 'framer-motion';

const PI = {
  name: "Dr. Charles Carter",
  role: "Principal Investigator",
  image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=1000",
  bio: "Dr. Carter is a Professor of Computational Biology and the director of the CC Lab. His research focuses on developing novel algorithms for understanding protein dynamics and allosteric regulation.",
  interest: "Molecular Dynamics, Drug Design"
};

const MEMBERS = [
  {
    name: "Dr. Alice Chen",
    role: "Postdoctoral Fellow",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Protein Design, Deep Learning"
  },
  {
    name: "James Wilson",
    role: "Ph.D. Candidate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Cryo-EM Data Processing"
  },
  {
    name: "Sarah Lee",
    role: "Ph.D. Candidate",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Molecular Dynamics Simulation"
  },
  {
    name: "David Kim",
    role: "Master Student",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Structural Bioinformatics"
  },
  {
    name: "Dr. Robert Fox",
    role: "Research Scientist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Genomic Algorithms"
  },
  {
    name: "Emily Zhang",
    role: "Ph.D. Candidate",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "RNA Structure Prediction"
  },
  {
    name: "Michael Torres",
    role: "Undergraduate Researcher",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Machine Learning"
  },
  {
    name: "Priya Patel",
    role: "Lab Manager",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=750",
    interest: "Lab Operations"
  }
];

export const Member: React.FC = () => {
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
        <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl">
          We are a multidisciplinary team of biologists, computer scientists, and physicists.
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
              src={PI.image} 
              alt={PI.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
         </div>
         <div className="md:col-span-7 flex flex-col justify-center h-full pt-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">{PI.role}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{PI.name}</h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
              {PI.bio}
            </p>
            <div className="text-sm font-semibold text-slate-500 dark:text-gray-400">
              Focus: {PI.interest}
            </div>
         </div>
      </motion.div>

      {/* Members Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          Current Members
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {MEMBERS.map((member, idx) => (
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
              <p className="text-primary font-medium text-sm my-1">{member.role}</p>
              <p className="text-sm text-slate-500 dark:text-gray-400 leading-snug">{member.interest}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};