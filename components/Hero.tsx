
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { CyberButton } from './ui/CyberComponents';

interface HeroProps {
  media: {
    type: 'image' | 'video';
    src: string;
  };
}

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const Hero: React.FC<HeroProps> = ({ media }) => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
  >
    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#B8965A]/[0.04] rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B8965A]/[0.03] rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: text */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.div variants={stagger.item} className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-px bg-[#B8965A]" />
            <span className="text-[#B8965A] text-xs font-medium tracking-[0.25em] uppercase">
              Architecte IA & Automatisation
            </span>
          </motion.div>

          <motion.h1
            variants={stagger.item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Gagnez du
            <br />
            <em className="not-italic text-[#B8965A]">temps,</em>
            <br />
            faites ×10.
          </motion.h1>

          <motion.p variants={stagger.item} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-3">
            J'automatise les tâches répétitives de votre business pour que vous vous concentriez sur ce qui rapporte vraiment.
          </motion.p>

          <motion.p variants={stagger.item} className="text-gray-600 text-sm mb-10">
            Restaurants · E-commerce · Agences · Indépendants — livraison 48h
          </motion.p>

          <motion.div variants={stagger.item} className="flex flex-col sm:flex-row gap-4">
            <CyberButton onClick={() => document.getElementById('boost')?.scrollIntoView({ behavior: 'smooth' })}>
              <Zap className="w-4 h-4" />
              Diagnostic gratuit
            </CyberButton>
            <CyberButton
              variant="secondary"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mes réalisations
              <ArrowRight className="w-4 h-4" />
            </CyberButton>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={stagger.item} className="mt-14 flex items-center gap-8 pt-8 border-t border-white/5">
            {[
              { value: '48h', label: 'Délai livraison' },
              { value: '15h', label: 'Gagnées / semaine' },
              { value: '100+', label: 'Sites déployés' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.value}</div>
                <div className="text-gray-600 text-xs mt-0.5 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Gold accent frames */}
            <div className="absolute -inset-4 border border-[#B8965A]/15 rounded-2xl" />
            <div className="absolute -inset-8 border border-[#B8965A]/6 rounded-3xl" />

            {/* Availability badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 bg-[#B8965A] text-[#050505] px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-lg shadow-[#B8965A]/20 z-20"
            >
              Disponible ✓
            </motion.div>

            {/* Portrait */}
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-2xl overflow-hidden bg-[#0d0d0d]">
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={media.src}
                  onError={(e) => {
                    e.currentTarget.src = 'https://raw.githubusercontent.com/tonyPayetDev/Ai-automation/main/tony-visage.jpg';
                  }}
                  alt="Tony Payet"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />

              {/* Name card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-[#050505]/80 backdrop-blur-md border border-white/8 rounded-xl px-4 py-3">
                  <p className="text-white font-medium text-sm">Tony Payet</p>
                  <p className="text-[#B8965A] text-xs mt-0.5">Expert IA · La Réunion</p>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-[#0d0d0d] border border-white/8 rounded-xl p-4 shadow-xl z-20"
            >
              <p className="text-gray-500 text-xs tracking-wider mb-1">Temps récupéré</p>
              <p className="text-2xl text-white font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                15h <span className="text-[#B8965A] text-sm">/semaine</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-gray-600 text-xs tracking-[0.2em] uppercase">Défiler</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-px h-10 bg-gradient-to-b from-[#B8965A]/50 to-transparent"
      />
    </motion.div>
  </section>
);

export default Hero;
