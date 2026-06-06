
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, Code2, Database } from 'lucide-react';
import { ServiceItem } from '../types';
import { SectionTitle } from './ui/CyberComponents';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Automatisation des tâches',
    description: 'Devis, relances, commandes, publications — j\'automatise ce qui vous vole du temps. Résultat : 10 à 20h récupérées chaque semaine, sans effort de votre part.',
    icon: Bot
  },
  {
    id: '2',
    title: 'Site Web qui convertit',
    description: 'Un site rapide, beau et optimisé qui transforme vos visiteurs en clients. Livré en quelques jours, pas en plusieurs mois.',
    icon: Code2
  },
  {
    id: '3',
    title: 'Visibilité Google & Réseaux',
    description: 'Vos clients vous trouvent avant vos concurrents. Référencement local, Google Business, publications automatiques — votre présence travaille pour vous 24h/24.',
    icon: LineChart
  },
  {
    id: '4',
    title: 'IA sur-mesure pour votre métier',
    description: 'Chatbot pour votre restaurant, assistant pour vos devis, analyse de vos données — des outils IA adaptés à votre activité, pas des solutions génériques.',
    icon: Database
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative bg-zinc-950/50 scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Services" subtitle="Des prestations adaptées à vos besoins" />

        {/* Mobile carousel */}
        <div className="carousel-x overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 pb-4 md:hidden">
          <div className="flex gap-4 w-max">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="snap-start w-[78vw] max-w-[280px] flex-shrink-0 group relative bg-black border border-white/5 p-6 overflow-hidden hover:border-yellow-500/50 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-12 h-12 mb-4 mx-auto flex items-center justify-center border border-white/10 rounded-lg bg-black/50 text-gray-300">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="relative z-10 text-base font-bold text-center text-white mb-3">{service.title}</h3>
                <p className="relative z-10 text-gray-400 text-xs text-center leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-2 md:hidden">← glissez →</p>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
