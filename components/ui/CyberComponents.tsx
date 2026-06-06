import React from 'react';
import { motion } from 'framer-motion';

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-yellow-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse group-hover:translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse group-hover:-translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};

export const CyberButton: React.FC<{ children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' }> = ({ children, onClick, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-8 py-3 font-bold tracking-wider uppercase
        overflow-hidden transition-all duration-300
        clip-path-polygon
        ${isPrimary 
          ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
          : 'bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10'}
      `}
      style={{
        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
      }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16 relative">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter"
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
        {title.charAt(0)}
      </span>
      {title.slice(1)}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 tracking-widest text-sm md:text-base uppercase"
      >
        // {subtitle}
      </motion.p>
    )}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-yellow-500/50 blur-sm mt-4"></div>
  </div>
);
