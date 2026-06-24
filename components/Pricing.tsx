import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { SectionTitle, CyberButton } from './ui/CyberComponents';

const plans = [
  {
    id: '1',
    name: 'Site Vitrine Pro',
    price: '799 €',
    description: 'Votre vitrine en ligne qui attire et convertit, livrée en 5 jours.',
    features: [
      'Design professionnel sur-mesure',
      'Optimisé mobile & rapide',
      'Formulaire de contact & carte',
      'Référencement Google local',
      'Hébergement 1 an inclus',
      'Livraison en 5 jours',
    ],
  },
  {
    id: '2',
    name: 'Site + Automatisation',
    price: '1 299 €',
    description: 'Votre site web ET une automatisation qui vous fait gagner du temps chaque jour.',
    features: [
      'Tout le pack Site Vitrine',
      '1 automatisation sur-mesure',
      'Connexion réseaux sociaux',
      'Chatbot ou relance client auto',
      'Formation 1h incluse',
      'Support 30 jours offert',
    ],
    recommended: true,
  },
  {
    id: '3',
    name: 'Mission Spécifique',
    price: '55 €/h',
    description: 'Un problème précis à régler ? Je m\'en occupe à la mission.',
    features: [
      'Audit de vos process actuels',
      'Devis gratuit sous 24h',
      'Automatisation ciblée',
      'Résultat garanti ou remboursé',
      'Sans engagement',
      'Disponible sous 48h',
    ],
  },
];

const Pricing: React.FC = () => (
  <section id="pricing" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#46DCC0]/20 to-transparent" />
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#46DCC0]/[0.04] rounded-full blur-[160px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <SectionTitle title="Investissement transparent" subtitle="Tarifs" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className={`
              relative flex flex-col rounded-2xl p-8 border transition-all duration-500
              ${plan.recommended
                ? 'bg-[#0B4C3D] border-[#46DCC0]/35 shadow-2xl shadow-[#46DCC0]/6'
                : 'bg-[#1F1C1A] border-white/5 hover:border-white/10'}
            `}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C39B4F] text-[#1F1C1A] text-xs font-semibold px-5 py-1 rounded-full tracking-wider shadow-lg shadow-[#C39B4F]/30">
                Populaire
              </div>
            )}

            <div className="mb-8">
              <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${plan.recommended ? 'text-[#46DCC0]' : 'text-gray-600'}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-[#46DCC0]' : 'text-gray-600'}`} strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>

            <CyberButton
              variant={plan.recommended ? 'primary' : 'secondary'}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </CyberButton>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-600 text-xs mt-10 tracking-wide"
      >
        Satisfait ou remboursé sous 7 jours · Paiement en 2× possible · Sans abonnement
      </motion.p>
    </div>
  </section>
);

export default Pricing;
