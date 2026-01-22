import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Users, GraduationCap } from 'lucide-react';
import { CONTACT, LAB_INFO } from '../src/data/labInfo';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';

export const Contact: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'Contact' }]);
  }, [setBreadcrumbs]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Get in Touch</h1>
        <p className="text-xl text-slate-600 dark:text-gray-300 mb-12">
          Interested in our research or collaborations?<br />
          We'd love to hear from you!
        </p>      

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Visit Us</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {CONTACT.office}<br />
                {LAB_INFO.fullName}<br />
                {LAB_INFO.affiliation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Email</h3>
              <p className="text-slate-600 dark:text-gray-400">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <GraduationCap className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Join</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                We're always looking for talented and motivated individuals to join our team.
                Opportunities for graduate students, postdocs, and undergraduate researchers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Collaborations</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                We actively seek collaborations with experimental labs, clinicians, and industry partners.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-800"
      >
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wide mb-2">Name</label>
            <input type="text" id="name" className="w-full bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 p-3 focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wide mb-2">Email</label>
            <input type="email" id="email" className="w-full bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 p-3 focus:outline-none focus:border-primary transition-colors" placeholder="your.email@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wide mb-2">Message</label>
            <textarea id="message" rows={5} className="w-full bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 p-3 focus:outline-none focus:border-primary transition-colors" placeholder="How can we help?"></textarea>
          </div>
          <button type="button" className="w-full bg-primary text-white font-bold uppercase tracking-widest py-4 hover:bg-[#003366] transition-colors">
            Send Message
          </button>
        </form>
      </motion.div>
      </div>
    </div>
  );
};