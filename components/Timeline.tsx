
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type?: string;
  technologies: string[];
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 'koytcha',
    role: 'Developer Web',
    company: 'Groupe Koytcha',
    period: 'Mai 2021 — Mai 2022',
    type: 'CDD',
    technologies: ['WordPress', 'React', 'Elementor', 'SEO'],
    description: [
      'Refonte complète des sites web du groupe',
      'Développement widget de recherche de biens (React)',
      'Hébergement et optimisation SEO',
    ],
  },
  {
    id: 'freelance-android',
    role: 'Developer Android',
    company: 'Freelance',
    period: 'Déc 2019 — Fév 2021',
    technologies: ['Java', 'Android SDK', 'SQLite'],
    description: [
      'Application de commande avec module de paiement',
      'Gestion design, impression, tâches et paramètres',
      'Configuration complète et support client',
    ],
  },
  {
    id: 'c2i',
    role: 'Développeur Fullstack',
    company: 'C2I Réunion',
    period: 'Avr 2019 — Déc 2020',
    technologies: ['PHP', 'Python', 'C#', '.NET', 'Symfony', 'Vue.js'],
    description: [
      'Développement d\'applications web et lourdes',
      'Création Tchat Websocket (Python/Vue.js)',
      'Migration et modification Odoo — Front/Back Orange Réunion',
    ],
  },
  {
    id: 'freelance-web',
    role: 'Développeur Web',
    company: 'Freelance',
    period: 'Nov 2018 — Fév 2019',
    technologies: ['Symfony', 'Vue.js', 'Laravel', 'SQL'],
    description: [
      'Application contacts et annonces',
      'Refactoring d\'une appli web de formation',
      'Tests unitaires et modification front',
    ],
  },
  {
    id: 'cnjoi',
    role: 'Developer WordPress',
    company: 'CNJOI',
    period: '2016 — Présent',
    technologies: ['PHP', 'WordPress', 'MySQL'],
    description: [
      'Maintenance du site mjr974',
      'Création de formulaires d\'enquête',
      'Création d\'avatars et sites dédiés',
    ],
  },
];

const Timeline: React.FC = () => (
  <section id="experience" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46DCC0]/20 to-transparent" />
    <div className="max-w-4xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Expérience" subtitle="Parcours professionnel" />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#46DCC0]/30 via-[#46DCC0]/10 to-transparent md:-translate-x-px" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-[#06201A] border border-[#46DCC0]/60 rounded-full md:-translate-x-1.5 mt-2 z-10" />

              <div className="pl-8 md:pl-0 md:w-1/2">
                <div className={`bg-[#082E22] border border-white/5 rounded-2xl p-6 hover:border-[#46DCC0]/20 transition-all duration-500 ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                  <div className="mb-4">
                    <h3
                      className="text-white text-xl font-light mb-1"
                      style={{ fontFamily: "'Plus Jakarta Sans', serif" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="text-[#46DCC0] text-sm font-medium mb-2">{exp.company}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <Calendar size={11} />
                      <span>{exp.period}</span>
                      {exp.type && (
                        <span className="border border-white/10 px-1.5 py-0.5 rounded text-gray-500">
                          {exp.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-[#46DCC0]/40 mt-1.5 flex-shrink-0 text-[8px]">◆</span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs border border-white/5 bg-[#06201A] text-gray-600 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Timeline;
