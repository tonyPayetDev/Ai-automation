import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';
import { useContent } from './useContent';

const VideoCard: React.FC<{ title: string; subtitle?: string; src: string; index: number }> = ({ title, subtitle, src, index }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => { const v = ref.current; if (v) { v.play().catch(() => {}); } };
  const pause = () => { const v = ref.current; if (v) { v.pause(); } };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#171726] hover:border-[#3DC4C2]/25 transition-all duration-500"
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={play}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0D18]/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
            <Play size={20} className="ml-0.5 text-white" fill="white" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <span className="text-[11px] font-medium text-[#3DC4C2]">{subtitle}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const Videos: React.FC = () => {
  const { videos } = useContent();
  return (
    <section id="videoboost" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle title="Vidéos générées par IA" subtitle="VideoBoost" />

        <p className="-mt-4 mb-10 max-w-2xl text-sm text-gray-500">
          <Sparkles size={14} className="mr-1.5 inline text-[#3DC4C2]" />
          Chacune de ces vidéos est produite par mon propre système VideoBoost — script, voix, montage et habillage générés automatiquement.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {videos.map((v, i) => (
            <VideoCard key={v.id} title={v.title} subtitle={v.subtitle} src={v.src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
