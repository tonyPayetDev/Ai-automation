import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ShoppingBag, Activity, Layers, Video } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const skillCategories = [
  {
    id: 'dev',
    title: 'Dev & Code',
    icon: Terminal,
    items: [
      'PHP / Symfony / Laravel',
      'Python / Django / Odoo',
      'React JS / Vue.js / .NET',
      'Java / Android SDK',
      'WordPress / Elementor',
    ],
  },
  {
    id: 'ai',
    title: 'IA & Automatisation',
    icon: Cpu,
    items: [
      'Automatisations Make & n8n',
      'Midjourney & Prompt Engineering',
      'Kling AI (Text-to-Video)',
      'ChatGPT / Claude API',
      'Agents IA sur-mesure',
    ],
  },
  {
    id: 'biz',
    title: 'E-commerce & SEO',
    icon: ShoppingBag,
    items: [
      'Architecture Shopify / WooCommerce',
      'Stratégie SEO & Silos',
      'Copywriting & Conversion',
      'Branding & Identité visuelle',
      'Scaling 10k+/mois',
    ],
  },
  {
    id: 'prod',
    title: 'Productivité & Process',
    icon: Activity,
    items: [
      'Workflows & Délégation',
      'Système OKR',
      'Méthode Pomodoro',
      'Automatisation Team',
      'Gestion du temps',
    ],
  },
  {
    id: 'media',
    title: 'Contenu & Réseaux',
    icon: Video,
    items: [
      'Hooks TikTok & Scénarios viraux',
      'Vidéo (Cadrage, Montage)',
      'Facebook Ads & KPIs',
      'Esthétique Luxe & Minimaliste',
      'Création Contenu Branding',
    ],
  },
  {
    id: 'projects',
    title: 'Projets actifs',
    icon: Layers,
    items: [
      'Ozeroz (Luxe Minimaliste)',
      'Teyap Automobile (Branding)',
      'Fusionia (Jeu & IA)',
      'Koytcha Immo (Real Estate)',
      'Cnjoi (Plateforme Event)',
    ],
  },
];

const SkillsMatrix: React.FC = () => (
  <section id="skills" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f05a28]/20 to-transparent" />
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Compétences" subtitle="Matrice de capacités" />

      {/* Mobile carousel */}
      <div className="carousel-x overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 pb-4 md:hidden">
        <div className="flex gap-4 w-max">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="snap-start w-[78vw] max-w-[300px] flex-shrink-0 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 hover:border-[#f05a28]/25 transition-colors duration-500"
            >
              <div className="flex items-center gap-3 mb-5">
                <cat.icon size={18} className="text-[#f05a28]/70" strokeWidth={1.5} />
                <h3 className="text-white text-sm font-medium">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-start gap-2">
                    <span className="text-[#f05a28]/50 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-700 text-xs mt-3 md:hidden tracking-widest">← glissez →</p>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-7 hover:border-[#f05a28]/25 transition-all duration-500 hover:bg-[#0d0d0d]"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-9 h-9 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center text-[#f05a28]/60 group-hover:text-[#f05a28] group-hover:border-[#f05a28]/20 transition-all duration-400">
                <cat.icon size={17} strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-sm font-medium">{cat.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {cat.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-500 flex items-start gap-2.5 group-hover:text-gray-400 transition-colors duration-300">
                  <span className="text-[#f05a28]/40 mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-10"
      >
        {[
          { label: 'Compétences actives', value: '42' },
          { label: 'Taux automatisation', value: '98%' },
          { label: 'Intégration IA', value: 'Max' },
          { label: 'Statut système', value: 'En ligne' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-gray-600 tracking-wider mb-2 uppercase">{stat.label}</div>
            <div
              className="text-2xl font-light text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', serif" }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsMatrix;
