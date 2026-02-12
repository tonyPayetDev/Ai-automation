
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PortfolioItem } from '../types';
import { SectionTitle } from './ui/CyberComponents';

const projects: PortfolioItem[] = [
  { id: 'ozeroz', title: 'Ozeroz', category: 'Cadeaux Personnalisés Luxe', imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop' },
  { id: 'koytcha', title: 'Koytcha Immo', category: 'Immobilier (React)', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop' },
  { id: 'fusionia', title: 'Fusionia', category: 'Jeu & IA', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
  { id: 'cnjoi', title: 'Cnjoi.fr', category: 'Plateforme Événementielle', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop' },
  { id: 'inosys', title: 'Inosys', category: 'E-commerce Gourmand', imageUrl: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800&auto=format&fit=crop' },
  { id: 'bestrun', title: 'Bestrun.fr', category: 'Association & Blog', imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=800&auto=format&fit=crop' },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-black relative scroll-mt-20">
       <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Portfolio" subtitle="Réalisations & Projets" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer"
            >
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                <span className="text-yellow-500 font-mono text-sm mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">[{project.category}]</span>
                <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  <button className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors"><ExternalLink size={20} /></button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-cyan-500 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <motion.button whileHover={{ scale: 1.05 }} className="text-sm font-mono text-gray-500 hover:text-yellow-500 border-b border-transparent hover:border-yellow-500 transition-colors pb-1">VOIR TOUS LES PROJETS {'>'}</motion.button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
