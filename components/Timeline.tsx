
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Code, MapPin } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  technologies: string[];
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 'dsi-information',
    role: 'Développeur Web & IA Automatisation',
    company: 'DSI INFORMATION',
    period: 'Sep 2022 - Présent',
    type: '3 ans 8 mois',
    technologies: ['React', 'Node.js', 'Python', 'n8n', 'IA / LLM', 'API REST', 'Automatisation'],
    description: [
      'Développement et maintenance d\'applications web full-stack',
      'Mise en place de workflows d\'automatisation IA (n8n, LLM)',
      'Intégration d\'APIs tierces et connecteurs intelligents',
      'Optimisation des processus internes par l\'automatisation'
    ]
  },
  {
    id: 'koytcha',
    role: 'Developer Web',
    company: 'GROUPE KOYTCHA',
    period: 'Mai 2021 - Mai 2022',
    type: 'CDD',
    technologies: ['WordPress', 'React', 'Elementor', 'SEO'],
    description: [
      'Refonte complète des sites web du groupe',
      'Création de 14 pages + proposition design',
      'Développement widget de recherche de biens (React/Elementor)',
      'Hébergement et optimisation SEO'
    ]
  },
  {
    id: 'freelance-android',
    role: 'Developer Android',
    company: 'FREELANCE',
    period: 'Dec 2019 - Fev 2021',
    technologies: ['Java', 'Android SDK', 'SQLite'],
    description: [
      'Développement d\'une application de commande',
      'Intégration module de paiement',
      'Gestion design, impression, tâches et paramètres',
      'Configuration complète et support client'
    ]
  },
  {
    id: 'c2i',
    role: 'Développeur Fullstack',
    company: 'C2I RÉUNION',
    period: 'Avr 2019 - Dec 2020',
    location: 'Saint-Denis',
    technologies: ['PHP', 'Python', 'C#', '.NET', 'Symfony', 'Vue.js'],
    description: [
      'Développement d\'applications web et lourdes',
      'Création Tchat Websocket (Python/Vue.js)',
      'Migration et modification Odoo (Python)',
      'Site de sondage & Front/Back Orange Réunion'
    ]
  },
  {
    id: 'freelance-web',
    role: 'Développeur Web',
    company: 'FREELANCE',
    period: 'Nov 2018 - Fev 2019',
    technologies: ['Symfony', 'Vue.js', 'Laravel', 'SQL'],
    description: [
      'Création d\'une application contacts et annonces',
      'Refactoring d\'une appli web de formation',
      'Tests unitaires et modification front'
    ]
  },
  {
    id: 'cnjoi',
    role: 'Developer WordPress',
    company: 'CNJOI',
    period: '2016 - Present',
    technologies: ['PHP', 'WordPress', 'MySQL'],
    description: [
      'Maintenance du site mjr974',
      'Création de formulaires d\'enquête',
      'Création d\'avatars et sites dédiés'
    ]
  }
];

const Timeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-zinc-950 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-16 justify-center">
            <Briefcase className="text-yellow-500 w-6 h-6" />
            <SectionTitle title="Expérience" subtitle="Parcours Professionnel" />
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-cyan-500 to-transparent md:-translate-x-1/2 opacity-30"></div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-black border-2 border-yellow-500 rounded-full translate-x-[-7px] md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                <div className="ml-12 md:ml-0 md:w-1/2">
                   <div className={`p-6 bg-black/50 border border-white/10 rounded-lg hover:border-yellow-500/30 transition-colors backdrop-blur-sm group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className={`flex flex-col mb-4 ${index % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                          <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-yellow-500 transition-colors">{exp.role}</h3>
                          <div className="text-cyan-500 font-bold tracking-wider text-sm mb-1">{exp.company}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                             <Calendar size={12} />
                             <span>{exp.period}</span>
                             {exp.type && <span className="bg-white/10 px-1.5 rounded text-white">{exp.type}</span>}
                          </div>
                      </div>
                      <ul className={`space-y-2 mb-4 text-sm text-gray-400 ${index % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                             {index % 2 === 0 && <span className="text-yellow-500 mt-1.5 text-[8px]">▶</span>}
                             <span>{desc}</span>
                             {index % 2 !== 0 && <span className="text-yellow-500 mt-1.5 text-[8px] hidden md:block">◀</span>}
                          </li>
                        ))}
                      </ul>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                         {exp.technologies.map((tech) => (
                           <span key={tech} className="px-2 py-1 text-[10px] font-mono border border-cyan-500/20 bg-cyan-950/10 text-cyan-400 rounded">
                             {tech}
                           </span>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
