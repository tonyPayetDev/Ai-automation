
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { CyberButton } from './ui/CyberComponents';

interface HeroProps {
  media: {
    type: 'image' | 'video';
    src: string;
  };
}

const words = ['vos', 'tâches,', 'votre', 'business', 'décolle.'];

const wordVariants = {
  hidden: { opacity: 0, y: 40, skewY: 3 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const stats = [
  { value: '48h', label: 'Délai de livraison', icon: Clock },
  { value: '15h', label: 'Gagnées / semaine', icon: TrendingUp },
  { value: '50+', label: 'Clients automatisés', icon: Zap },
];

const Hero: React.FC<HeroProps> = ({ media }) => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
  >
    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#3DC4C2]/[0.05] rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#3DC4C2]/[0.04] rounded-full blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: text */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          {/* Tag */}
          <motion.div variants={stagger.item} className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-px bg-[#3DC4C2]" />
            <span className="text-[#3DC4C2] text-xs font-semibold tracking-[0.22em] uppercase">
              Architecte IA & Automatisation
            </span>
          </motion.div>

          {/* Headline with word-reveal */}
          <div className="mb-8 overflow-hidden">
            <motion.p
              variants={stagger.item}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.0] tracking-tight"
            >
              J'automatise
            </motion.p>
            <div className="flex flex-wrap gap-x-4 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mt-1">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className={word.includes('décolle') ? 'text-[#3DC4C2]' : 'text-[#D1C5E0]'}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p variants={stagger.item} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-3">
            Les devis, relances, publications, commandes — je les automatise pour que vous vous concentriez sur ce qui rapporte vraiment.
          </motion.p>

          <motion.p variants={stagger.item} className="text-[#4E7080] text-sm mb-10">
            Restaurants · E-commerce · Agences · Indépendants — livraison garantie en 48h
          </motion.p>

          <motion.div variants={stagger.item} className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <CyberButton onClick={() => document.getElementById('boost')?.scrollIntoView({ behavior: 'smooth' })}>
              <Zap className="w-4 h-4" />
              Diagnostic gratuit
            </CyberButton>
            <a
              href="https://wa.me/262692417749?text=Bonjour%20Tony%2C%20je%20voudrais%20d%C3%A9marrer%20mon%20diagnostic%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#25D366', color: 'white', boxShadow: '0 4px 20px rgba(37,211,102,0.2)' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.044 23.956l6.264-1.638A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.003-1.372l-.359-.213-3.72.974.992-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
              WhatsApp direct
            </a>
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
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3DC4C2]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-[#3DC4C2]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white leading-none">{value}</div>
                  <div className="text-gray-600 text-xs mt-1 leading-snug">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Accent frames */}
            <div className="absolute -inset-4 border border-[#3DC4C2]/12 rounded-2xl" />
            <div className="absolute -inset-8 border border-[#3DC4C2]/5 rounded-3xl" />

            {/* Ambient glow behind portrait */}
            <div className="absolute inset-0 bg-[#3DC4C2]/[0.07] rounded-2xl blur-3xl scale-110 -z-10" />

            {/* Availability badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-4 bg-[#3DC4C2] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-lg shadow-[#3DC4C2]/30 z-20"
            >
              Disponible ✓
            </motion.div>

            {/* Portrait */}
            <div className="relative w-60 h-72 sm:w-72 sm:h-88 lg:w-88 lg:h-[440px] rounded-2xl overflow-hidden bg-[#171726]">
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  poster="videos/tony-portrait-poster.jpg"
                  autoPlay loop muted playsInline preload="auto"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D18]/70 via-transparent to-transparent" />

              {/* Name card */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#0C0D18]/85 backdrop-blur-md border border-white/8 rounded-xl px-4 py-3">
                  <p className="text-white font-semibold text-sm">Tony Payet</p>
                  <p className="text-[#3DC4C2] text-xs mt-0.5 font-medium">Expert IA · La Réunion</p>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-[#171726] border border-white/8 rounded-2xl p-4 shadow-2xl z-20"
            >
              <p className="text-[#4E7080] text-xs tracking-wide mb-1">Temps récupéré</p>
              <p className="text-2xl font-bold text-white">
                15h <span className="text-[#3DC4C2] text-sm font-medium">/semaine</span>
              </p>
            </motion.div>

            {/* Top left floating WhatsApp badge */}
            <motion.a
              href="https://wa.me/262692417749?text=Bonjour%20Tony%2C%20je%20voudrais%20d%C3%A9marrer%20mon%20diagnostic%20gratuit."
              target="_blank"
              rel="noopener noreferrer"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute -top-3 -left-6 border rounded-xl px-3 py-2 shadow-xl z-20 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              style={{ background: '#171726', borderColor: 'rgba(37,211,102,0.3)' }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" style={{ color: '#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.044 23.956l6.264-1.638A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.003-1.372l-.359-.213-3.72.974.992-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
              <p className="text-xs font-semibold" style={{ color: '#25D366' }}>Réponse sous 2h</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[#4E7080] text-xs tracking-[0.2em] uppercase">Défiler</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="w-px h-10 bg-gradient-to-b from-[#3DC4C2]/60 to-transparent"
      />
    </motion.div>
  </section>
);

export default Hero;
