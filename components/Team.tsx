import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  return (
    <div className="w-full">
      {/* PI Section */}
      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            className="lg:col-span-5 aspect-[3/4] bg-gray-200 dark:bg-gray-800 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Dr. Charles Carter"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          <motion.div 
            className="lg:col-span-7 pt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Principal Investigator</span>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">Dr. Charles Carter</h1>
            <div className="text-lg leading-relaxed text-slate-600 dark:text-gray-300 space-y-6">
              <p>
                Dr. Carter is a Professor of Computational Biology and the director of the CC Lab. 
                His research focuses on developing novel algorithms for understanding protein dynamics 
                and allosteric regulation.
              </p>
              <p>
                Prior to joining the university, he completed his postdoctoral training at MIT and received 
                his Ph.D. from Stanford University. He is a recipient of the NSF CAREER Award and 
                an Alfred P. Sloan Research Fellow.
              </p>
              
              <div className="pt-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">Research Areas</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    Molecular Dynamics Simulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    Structure-based Drug Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    Machine Learning in Genomics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    Protein-Protein Interactions
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lab Culture / Group Photo Placeholder */}
      <motion.section 
        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Join the Lab</h2>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 mb-8">
          We are always looking for motivated Ph.D. students and postdocs to join our team. 
          If you are interested in structural bioinformatics, please reach out.
        </p>
        <Link to="/contact" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 font-medium hover:bg-primary hover:text-white transition-colors">
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
};