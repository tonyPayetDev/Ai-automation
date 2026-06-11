import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ShoppingBag, Activity, Layers, Database, Video } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const skillCategories = [
  {
    id: 'dev',
    title: 'DEV_OPS & CODE',
    icon: Terminal,
    color: 'text-cyan-500',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-950/10',
    items: [
      "PHP Expert / Symfony / Laravel",
      "Python / Django / Odoo",
      "Java / Android SDK / SQLite",
      "React JS / Vue.js / .NET / C#",
      "Wordpress / Elementor Custom"
    ]
  },
  {
    id: 'ai',
    title: 'VISUAL_CORTEX (IA)',
    icon: Cpu,
    color: 'text-yellow-500',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-950/10',
    items: [
      "Midjourney & Prompt Engineering",
      "Kling AI (Text-to-Video Motion)",
      "SUNO AI (Composition Musicale)",
      "Automatisations Make & n8n",
      "Fusion de Styles & Esthétique"
    ]
  },
  {
    id: 'biz',
    title: 'ECOMMERCE_LINK',
    icon: ShoppingBag,
    color: 'text-pink-500',
    border: 'border-pink-500/30',
    bg: 'bg-pink-950/10',
    items: [
      "Architecture Shopify / Dropizi",
      "Stratégie SEO (Silos, Structures)",
      "Copywriting Émotionnel & Conversion",
      "Stratégie Organique & Branding",
      "Monétisation & Scaling (10k+)"
    ]
  },
  {
    id: 'prod',
    title: 'CORE_PROCESSOR',
    icon: Activity,
    color: 'text-green-500',
    border: 'border-green-500/30',
    bg: 'bg-green-950/10',
    items: [
      "Système OKR & Liberté Financière",
      "Méthode Pomodoro & Routines",
      "Structuration de Workflows",
      "Délégation & Automatisation Team",
      "Gestion du Temps Optimisée"
    ]
  },
  {
    id: 'media',
    title: 'MEDIA_OUTPUT',
    icon: Video,
    color: 'text-purple-500',
    border: 'border-purple-500/30',
    bg: 'bg-purple-950/10',
    items: [
      "Hooks TikTok & Scénarios Viraux",
      "Vidéo (Mouvements, Cadrage)",
      "Facebook Ads & Analyse KPIs",
      "Esthétique Luxe & Minimaliste",
      "Création Contenu Branding"
    ]
  },
  {
    id: 'projects',
    title: 'ACTIVE_NODES',
    icon: Layers,
    color: 'text-blue-500',
    border: 'border-blue-500/30',
    bg: 'bg-blue-950/10',
    items: [
      "Ozeroz (Luxe Minimaliste Rouge)",
      "Teyap Automobile (Branding)",
      "Fusionia (Jeu & IA)",
      "Koytcha Immo (Real Estate)",
      "Cnjoi (Plateforme Event)"
    ]
  }
];

const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-16 justify-center">
            <Database className="text-yellow-500 w-6 h-6 animate-pulse" />
            <SectionTitle title="Compétences" subtitle="Matrice de Capacités Techniques" />
        </div>

        {/* Mobile carousel */}
        <div className="carousel-x overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 pb-4 md:hidden">
          <div className="flex gap-4 w-max">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className={`snap-start w-[78vw] max-w-[280px] flex-shrink-0 relative p-5 rounded-lg border backdrop-blur-sm overflow-hidden ${cat.border} ${cat.bg}`}
              >
                <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                  <div className={`p-2 rounded bg-black/50 border ${cat.border} ${cat.color}`}>
                    <cat.icon size={18} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white tracking-wider text-xs">{cat.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-xs text-gray-400">
                      <span className={`mr-2 mt-0.5 text-[10px] ${cat.color}`}>{'>'}</span>
                      <span className="font-rajdhani font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 ${cat.border} rounded-tr-lg opacity-50`}></div>
                <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 ${cat.border} rounded-bl-lg opacity-50`}></div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-2 md:hidden">← glissez →</p>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}
              className={`
                relative p-6 rounded-lg border backdrop-blur-sm overflow-hidden group
                ${cat.border} ${cat.bg}
              `}
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded bg-black/50 border ${cat.border} ${cat.color}`}>
                    <cat.icon size={20} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white tracking-wider text-sm">{cat.title}</h3>
                </div>
                <div className={`text-[10px] font-mono ${cat.color} opacity-70`}>
                  SYS_RDY
                </div>
              </div>

              <ul className="space-y-3 relative z-10">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    <span className={`mr-2 mt-1 text-[10px] ${cat.color}`}>{'>'}</span>
                    <span className="font-rajdhani font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${cat.border} rounded-tr-lg opacity-50`}></div>
              <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${cat.border} rounded-bl-lg opacity-50`}></div>
              <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${cat.color.split('-')[1]}-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            {[
                { label: 'MODULES_ACTIVE', value: '42' },
                { label: 'AUTOMATION_RATE', value: '98%' },
                { label: 'AI_INTEGRATION', value: 'MAX' },
                { label: 'SYSTEM_STATUS', value: 'ONLINE' }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-[10px] text-gray-500 font-mono mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-white font-orbitron">{stat.value}</div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
