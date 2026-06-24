import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { SectionTitle, CyberButton } from './ui/CyberComponents';

const WA_BASE = 'https://wa.me/262692417749?text=';

const plans = [
  {
    id: '1',
    name: 'Site Vitrine Pro',
    price: '799 €',
    forWho: 'Artisans · Restaurants · Indépendants',
    description: 'Votre vitrine en ligne qui attire et convertit, livrée en 5 jours.',
    features: [
      'Design professionnel sur-mesure',
      'Optimisé mobile & rapide',
      'Formulaire de contact & carte',
      'Référencement Google local',
      'Hébergement 1 an inclus',
      'Livraison en 5 jours',
    ],
    waText: 'Bonjour%20Tony%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20pack%20Site%20Vitrine%20Pro%20%C3%A0%20799%E2%82%AC.',
  },
  {
    id: '2',
    name: 'Site + Automatisation',
    price: '1 299 €',
    forWho: 'PME · Agences · E-commerce',
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
    waText: 'Bonjour%20Tony%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20pack%20Site%20%2B%20Automatisation%20%C3%A0%201299%E2%82%AC.',
  },
  {
    id: '3',
    name: 'Mission Spécifique',
    price: '55 €/h',
    forWho: 'Freelances · Startups · Toute activité',
    description: 'Un problème précis à régler ? Je m\'en occupe à la mission.',
    features: [
      'Audit de vos process actuels',
      'Devis gratuit sous 24h',
      'Automatisation ciblée',
      'Résultat garanti ou remboursé',
      'Sans engagement',
      'Disponible sous 48h',
    ],
    waText: 'Bonjour%20Tony%2C%20je%20voudrais%20un%20devis%20pour%20une%20mission%20sp%C3%A9cifique.',
  },
];

const Pricing: React.FC = () => (
  <section id="pricing" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3DC4C2]/[0.04] rounded-full blur-[160px]" />
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
                ? 'bg-[#1E1B35] border-[#3DC4C2]/35 shadow-2xl shadow-[#3DC4C2]/6'
                : 'bg-[#0C0D18] border-white/5 hover:border-white/10'}
            `}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#AD7AA4] text-[#0C0D18] text-xs font-semibold px-5 py-1 rounded-full tracking-wider shadow-lg shadow-[#AD7AA4]/30">
                Populaire
              </div>
            )}

            <div className="mb-8">
              <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${plan.recommended ? 'text-[#3DC4C2]' : 'text-gray-600'}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
              </div>
              <p className="text-xs text-[#AD7AA4] font-medium mb-2">Pour : {(plan as any).forWho}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-[#3DC4C2]' : 'text-gray-600'}`} strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={`${WA_BASE}${(plan as any).waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.02] ${
                plan.recommended
                  ? 'text-[#0C0D18] hover:opacity-90'
                  : 'text-[#3DC4C2] border border-[#3DC4C2]/30 hover:bg-[#3DC4C2]/5'
              }`}
              style={plan.recommended ? { background: 'linear-gradient(135deg, #3DC4C2, #26729F)', boxShadow: '0 4px 20px rgba(61,196,194,0.25)' } : {}}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.044 23.956l6.264-1.638A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.003-1.372l-.359-.213-3.72.974.992-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
              Je veux ce pack
            </a>
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
