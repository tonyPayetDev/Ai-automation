import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';
import { useContent } from './useContent';

const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

const LiveNow: React.FC = () => {
  const { stats, currentWork, meta } = useContent();
  return (
    <section id="en-ce-moment" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTitle title="En ce moment à l'atelier" subtitle="Live" />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col justify-center rounded-2xl border border-white/5 bg-[#171726] p-5 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] leading-tight text-gray-500">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Current work feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 rounded-2xl border border-white/5 bg-[#171726] p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#3DC4C2]">
                <Activity size={14} />
                Chantiers en cours
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DC4C2] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DC4C2]" />
                </span>
                actif
              </span>
            </div>

            <ul className="space-y-3">
              {currentWork.map((w, i) => (
                <motion.li
                  key={w.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#0C0D18]/60 px-4 py-3"
                >
                  <span className="text-sm text-[#D1C5E0]/90">{w.label}</span>
                  <span className="flex-shrink-0 rounded-full bg-[#3DC4C2]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#3DC4C2]">
                    {w.tag}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-5 text-[11px] tracking-wide text-gray-600">
              {meta?.cadence} · dernière mise à jour {meta?.updated}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveNow;
