import React from 'react';
import { motion } from 'framer-motion';

const ACCENT = '#46DCC0';

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
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative px-7 py-3.5 text-sm font-semibold tracking-wide rounded-full
        transition-all duration-300 overflow-hidden group flex items-center gap-2
        ${isPrimary
          ? 'bg-[#46DCC0] text-white hover:bg-[#35B8A4] shadow-lg shadow-[#46DCC0]/20'
          : 'bg-transparent border border-[#46DCC0]/50 text-[#46DCC0] hover:border-[#46DCC0] hover:bg-[#46DCC0]/8'}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {isPrimary && (
        <span className="absolute inset-0 bg-gradient-to-r from-[#C39B4F] to-[#46DCC0] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      )}
    </motion.button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[#46DCC0] text-xs font-semibold tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
        style={{ justifyContent: align === 'center' ? 'center' : undefined }}
      >
        {align !== 'center' && <span className="inline-block w-6 h-px bg-[#46DCC0]" />}
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E3] leading-tight"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className={`mt-5 h-0.5 w-12 bg-[#46DCC0] ${align === 'center' ? 'mx-auto' : 'origin-left'}`}
    />
  </div>
);
