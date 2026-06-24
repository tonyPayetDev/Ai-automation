
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const projects = [
  { id: 'ozeroz', title: 'Ozeroz', category: 'Cadeaux Personnalisés Luxe', imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop' },
  { id: 'koytcha', title: 'Koytcha Immo', category: 'Immobilier — React', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop' },
  { id: 'fusionia', title: 'Fusionia', category: 'Jeu & IA', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
  { id: 'cnjoi', title: 'Cnjoi.fr', category: 'Plateforme Événementielle', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop' },
  { id: 'inosys', title: 'Inosys', category: 'E-commerce', imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800&auto=format&fit=crop' },
  { id: 'bestrun', title: 'Bestrun.fr', category: 'Association & Blog', imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop' },
];

const Portfolio: React.FC = () => (
  <section id="portfolio" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Réalisations & projets" subtitle="Portfolio" />

      {/* Mobile carousel */}
      <div className="carousel-x overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 pb-4 md:hidden">
        <div className="flex gap-4 w-max">
          {projects.map((project) => (
            <div
              key={project.id}
              className="snap-start w-[80vw] max-w-[300px] flex-shrink-0 relative overflow-hidden rounded-2xl border border-white/5 bg-[#171726]"
            >
              <div className="aspect-video relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D18]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-semibold text-white mb-0.5">{project.title}</h3>
                  <span className="text-[#3DC4C2] text-xs font-medium">{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-700 text-xs mt-3 md:hidden tracking-widest">← glissez →</p>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#171726] cursor-pointer hover:border-[#3DC4C2]/20 transition-all duration-500"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-55 transition-all duration-700 group-hover:scale-105 group-hover:opacity-35"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold text-white mb-1">
                  {project.title}
                </h3>
                <span className="text-[#3DC4C2] text-xs font-semibold tracking-wider">{project.category}</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 w-9 h-9 bg-[#3DC4C2]/0 rounded-full flex items-center justify-center text-transparent group-hover:bg-[#3DC4C2]/15 group-hover:text-[#3DC4C2] transition-all duration-300">
              <ArrowUpRight size={16} />
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3DC4C2] group-hover:w-full transition-all duration-600 ease-out" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <button className="text-sm text-gray-600 hover:text-[#3DC4C2] border-b border-transparent hover:border-[#3DC4C2]/50 transition-all duration-300 pb-1 tracking-wider font-medium">
          Voir tous les projets →
        </button>
      </motion.div>
    </div>
  </section>
);

export default Portfolio;
