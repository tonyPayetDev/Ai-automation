
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, Code2, Database } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const services = [
  {
    id: '1',
    title: 'Automatisation des tâches',
    description: 'Devis, relances, commandes, publications — j\'automatise ce qui vous vole du temps. Résultat : 10 à 20h récupérées chaque semaine, sans effort de votre part.',
    icon: Bot,
    number: '01',
  },
  {
    id: '2',
    title: 'Site Web qui convertit',
    description: 'Un site rapide, beau et optimisé qui transforme vos visiteurs en clients. Livré en quelques jours, pas en plusieurs mois.',
    icon: Code2,
    number: '02',
  },
  {
    id: '3',
    title: 'Visibilité Google & Réseaux',
    description: 'Vos clients vous trouvent avant vos concurrents. Référencement local, Google Business, publications automatiques — votre présence travaille pour vous 24h/24.',
    icon: LineChart,
    number: '03',
  },
  {
    id: '4',
    title: 'IA sur-mesure pour votre métier',
    description: 'Chatbot pour votre restaurant, assistant pour vos devis, analyse de vos données — des outils IA adaptés à votre activité, pas des solutions génériques.',
    icon: Database,
    number: '04',
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f05a28]/20 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Ce que je fais pour vous" subtitle="Services" />

      {/* Mobile carousel */}
      <div className="carousel-x overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 pb-4 md:hidden">
        <div className="flex gap-4 w-max">
          {services.map((service) => (
            <div
              key={service.id}
              className="snap-start w-[78vw] max-w-[300px] flex-shrink-0 bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#f05a28]/25 transition-colors duration-400"
            >
              <span className="text-[#f05a28]/50 text-xs font-semibold tracking-[0.2em] mb-4 block">{service.number}</span>
              <div className="w-10 h-10 mb-5 flex items-center justify-center text-[#f05a28]/70">
                <service.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-base font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-700 text-xs mt-3 md:hidden tracking-widest">← glissez →</p>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative bg-[#080808] p-8 hover:bg-[#0e0e0e] transition-colors duration-500 cursor-default"
          >
            <span className="text-[#f05a28]/30 text-xs font-semibold tracking-[0.2em] mb-6 block group-hover:text-[#f05a28]/70 transition-colors duration-300">
              {service.number}
            </span>

            <div className="w-12 h-12 mb-6 flex items-center justify-center border border-white/5 rounded-xl bg-[#111] text-gray-600 group-hover:text-[#f05a28] group-hover:border-[#f05a28]/20 transition-all duration-400">
              <service.icon size={22} strokeWidth={1.5} />
            </div>

            <h3 className="text-white text-lg font-semibold mb-4 group-hover:text-[#f05a28] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
              {service.description}
            </p>

            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f05a28]/60 group-hover:w-full transition-all duration-700 ease-out" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
