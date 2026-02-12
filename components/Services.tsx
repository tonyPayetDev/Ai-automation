
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, Code2, Database } from 'lucide-react';
import { ServiceItem } from '../types';
import { SectionTitle } from './ui/CyberComponents';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Automatisation & IA',
    description: 'Make et IA pour une automatisation avancée. Nous combinons la puissance de la fabrication et de l\'intelligence artificielle pour optimiser vos processus.',
    icon: Bot
  },
  {
    id: '2',
    title: 'Développement Web',
    description: 'Des solutions sur mesure pour votre activité ! Applications réactives et performantes construites avec les dernières technologies (React, Node, AI integrations).',
    icon: Code2
  },
  {
    id: '3',
    title: 'SEO & SEA',
    description: 'Boostez votre visibilité en ligne. Stratégies de référencement optimisées par l\'IA pour dominer les résultats de recherche et maximiser le ROI.',
    icon: LineChart
  },
  {
    id: '4',
    title: 'Architecture Data',
    description: 'Structurez vos données pour l\'ère de l\'IA. Création de pipelines de données robustes et sécurisés pour alimenter vos modèles.',
    icon: Database
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative bg-zinc-950/50 scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Services" subtitle="Des prestations adaptées à vos besoins" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-black border border-white/5 p-8 overflow-hidden hover:border-yellow-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-14 h-14 mb-6 mx-auto flex items-center justify-center border border-white/10 rounded-lg bg-black/50 group-hover:border-yellow-500 text-gray-300 group-hover:text-yellow-500 transition-all duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="relative z-10 text-xl font-bold text-center text-white mb-4 group-hover:text-yellow-400 transition-colors">
                {service.title}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm text-center leading-relaxed">
                {service.description}
              </p>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-yellow-500 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-yellow-500 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
