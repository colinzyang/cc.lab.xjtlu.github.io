import React from 'react';
import { ArrowRight, Network } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export const Hero: React.FC = () => {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center w-full min-h-[600px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Text Content */}
      <div className="lg:col-span-7 flex flex-col items-start gap-10">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl xl:text-[6.5rem] font-black tracking-[-0.04em] leading-[0.9] text-slate-900 dark:text-white uppercase break-words"
          variants={itemVariants}
        >
          Structural<br />
          Bioinformatics<br />
          & Dynamics
        </motion.h1>

        <motion.div
          className="w-24 h-1.5 bg-slate-900 dark:bg-white"
          variants={itemVariants}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <motion.p
            className="text-lg font-normal leading-relaxed text-slate-800 dark:text-gray-300 max-w-md"
            variants={itemVariants}
          >
            CC Lab specializes in Structural Bioinformatics & Molecular Dynamics to decipher the mechanisms of life at the atomic scale.
          </motion.p>

          <motion.div
            className="flex items-start md:justify-start pt-1"
            variants={itemVariants}
          >
            <Link
              to="/publication"
              className="group flex items-center gap-3 text-primary font-bold text-lg tracking-tight hover:text-[#003366] transition-all"
            >
              Explore Research
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Visual Content */}
      <motion.div
        className="lg:col-span-5 w-full h-full min-h-[400px] flex items-center justify-center relative group"
        variants={imageVariants}
      >
        {/* Geometric Container */}
        <div className="w-full aspect-square relative bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-in-out group-hover:scale-110 grayscale contrast-125"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHfaWcOYQfKVMGHLLXRDxmgV8NVNX0a7aHvpAFkOAwA_JwJRiCpTFevGf-W4HjGdxAusIn_iMsCq74rQYnIluYCWcWdDKpCW4EIch4-ISQS2Oxv8chkK9ZfsChDKGobvxDftU9hPO_ur8j8RCts72nxpu8yxfR7_YmC8chGlbGGi9ILLYdiv6c9xkAyaPlxuZlFOZCvXqcCQk9VJWCcmDyj7Eps5hv5xb_kyiq-8RyCGrh7xKA1pKs_8RY9nnhfGvV1ClAHtkp7Q4')",
            }}
            role="img"
            aria-label="Abstract 3D white protein wireframe structure"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-white/10 dark:bg-black/20 mix-blend-overlay" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-6">
            <Network className="text-primary w-10 h-10 opacity-60" strokeWidth={1.5} />
          </div>

          <div className="absolute bottom-6 left-6 font-mono text-xs text-primary font-bold uppercase tracking-widest opacity-90 bg-white/80 dark:bg-black/80 px-2 py-1 backdrop-blur-sm">
            Fig. 01 — Protein Structure
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="hidden xl:block absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 -z-10 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
};