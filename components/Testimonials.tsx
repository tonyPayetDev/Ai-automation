import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

// ⚠️ PLACEHOLDERS — à remplacer par de VRAIS verbatims clients avant mise en prod.
// Ne pas publier ces textes tels quels : ce sont des gabarits, pas des avis réels.
// Mapping suggéré vers les clients déjà affichés dans le Portfolio (Ozeroz, Koytcha, Cnjoi...).
const testimonials = [
  {
    id: 't1',
    quote: "« Remplacer par le retour réel du client : le problème de départ, ce qui a été automatisé, et le résultat concret obtenu (temps gagné, CA, sérénité). »",
    author: 'Prénom N.',
    role: 'Gérant·e — Restaurant / Hôtellerie',
    result: 'ex. 12h/semaine économisées',
  },
  {
    id: 't2',
    quote: "« Remplacer par un verbatim court et parlant. Idéalement une phrase qui cite un chiffre ou un bénéfice précis plutôt qu'un compliment vague. »",
    author: 'Prénom N.',
    role: 'Fondateur·rice — E-commerce',
    result: 'ex. +30% de commandes traitées',
  },
  {
    id: 't3',
    quote: "« Remplacer par le témoignage d'un client local (Réunion). La preuve de proximité rassure autant que le résultat. »",
    author: 'Prénom N.',
    role: 'Dirigeant·e — PME / Commerce local',
    result: 'ex. site + visibilité en 2 semaines',
  },
];

const Testimonials: React.FC = () => (
  <section id="temoignages" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Ils m'ont fait confiance" subtitle="Témoignages" />

      {/* Desktop grid */}
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#171726] p-7 hover:border-[#3DC4C2]/25 transition-all duration-500"
          >
            <Quote
              className="absolute top-6 right-6 text-[#3DC4C2]/15 group-hover:text-[#3DC4C2]/30 transition-colors duration-500"
              size={40}
              strokeWidth={1.5}
            />

            <div className="mb-6 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-[#3DC4C2]" fill="#3DC4C2" />
              ))}
            </div>

            <blockquote className="relative z-10 text-sm leading-relaxed text-[#D1C5E0]/85">
              {t.quote}
            </blockquote>

            <figcaption className="mt-7 border-t border-white/5 pt-5">
              <div className="text-sm font-semibold text-white">{t.author}</div>
              <div className="text-xs text-gray-500">{t.role}</div>
              {t.result && (
                <div className="mt-2 inline-block rounded-full bg-[#3DC4C2]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#3DC4C2]">
                  {t.result}
                </div>
              )}
            </figcaption>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#3DC4C2] transition-all duration-600 ease-out group-hover:w-full" />
          </motion.figure>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-xs tracking-widest text-gray-600"
      >
        Un projet en tête ? Rejoignez-les.
      </motion.p>
    </div>
  </section>
);

export default Testimonials;
