
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart, Award, Cpu } from 'lucide-react';
import { PricingPlan } from '../types';
import { SectionTitle, CyberButton } from './ui/CyberComponents';

const plans: PricingPlan[] = [
  { id: '1', name: 'SITE ECOM + SEO', price: '1499 €', description: 'Pour les entrepreneurs voulant dominer leur niche.', features: ['Développé sous WORDPRESS', 'Widget Elementor personnalisé', 'Formulaire de contact & Map', 'Mise en ligne du site', 'Seo Rank Math', 'Site responsive'] },
  { id: '2', name: 'SITE WEB + IA', price: '1299 €', description: 'La puissance de l\'IA intégrée à votre présence web.', features: ['Développé sous WORDPRESS', 'Outil de gestion de contenu', 'Automatisation avec Make', 'Génération d\'article avec IA', 'Design Web Elementor', 'Site responsive'], recommended: true },
  { id: '3', name: 'DEV SPÉCIFIQUE', price: '449 €', description: 'Développement sur mesure à la demande.', features: ['55 € / heure', 'Mes prix sont négociables', 'Audit technique complet', 'Code optimisé et propre', 'Documentation technique', 'Support prioritaire'] }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Mes Tarifs" subtitle="Un tarif adapté à votre projet web" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 border backdrop-blur-sm flex flex-col h-full ${plan.recommended ? 'bg-gradient-to-b from-yellow-900/20 to-black border-yellow-500/50 shadow-2xl shadow-yellow-500/10 scale-105 z-10' : 'bg-black border-white/10 hover:border-white/30'}`}
            >
              {plan.recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black font-bold text-xs px-4 py-1 rounded-full shadow-lg shadow-yellow-500/50">POPULAIRE</div>}
              <div className="mb-6 flex justify-center">
                  {index === 0 && <ShoppingCart className={`w-10 h-10 ${plan.recommended ? 'text-yellow-400' : 'text-gray-500'}`} />}
                  {index === 1 && <Award className={`w-10 h-10 ${plan.recommended ? 'text-yellow-400' : 'text-gray-500'}`} />}
                  {index === 2 && <Cpu className={`w-10 h-10 ${plan.recommended ? 'text-yellow-400' : 'text-gray-500'}`} />}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                 <span className="text-4xl font-black text-yellow-500">{plan.price}</span>
                 {index === 2 && <span className="text-sm text-gray-400 block mt-1">/ à partir de</span>}
              </div>
              <p className="text-gray-400 text-sm text-center mb-8 border-b border-gray-800 pb-8">{plan.description}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <CyberButton variant={plan.recommended ? 'primary' : 'secondary'} onClick={() => {}}>Demander un devis</CyberButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
