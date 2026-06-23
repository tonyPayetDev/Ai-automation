import React from 'react';
import { motion } from 'framer-motion';

const GOLD = '#B8965A';

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <span className={`relative inline-block ${className}`}>
    {text}
  </span>
);

export const CyberButton: React.FC<{ children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' }> = ({ children, onClick, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative px-8 py-3.5 text-sm font-medium tracking-widest uppercase
        transition-all duration-500 overflow-hidden group
        ${isPrimary
          ? 'bg-[#B8965A] text-[#050505] hover:bg-[#D4AF70]'
          : 'bg-transparent border border-[#B8965A]/50 text-[#B8965A] hover:border-[#B8965A] hover:bg-[#B8965A]/5'}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {isPrimary && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF70] to-[#B8965A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-20">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-[#B8965A] text-xs font-medium tracking-[0.25em] uppercase mb-4"
    >
      {subtitle}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-6 h-px w-16 bg-[#B8965A] origin-left"
    />
  </div>
);
