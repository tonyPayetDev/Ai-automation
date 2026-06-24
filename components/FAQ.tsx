import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const WA_LINK = 'https://wa.me/262692417749?text=Bonjour%20Tony%2C%20j%27ai%20une%20question%20sur%20tes%20services.';

const faqs = [
  {
    q: "Est-ce que je dois avoir des compétences techniques ?",
    a: "Non. Zéro. Je configure tout de A à Z. Vous n'avez pas besoin de savoir ce qu'est n8n, une API ou un webhook. Vous décrivez ce que vous voulez automatiser en langage courant — je m'occupe du reste. Vous recevez un système qui tourne tout seul.",
  },
  {
    q: "Comment se déroulent concrètement les 48h du Boost ?",
    a: "1) On fait un appel de 20 min pour cerner votre problème numéro 1. 2) Je construis et teste l'automatisation dans les 48h qui suivent. 3) Je vous envoie une démo vidéo pour validation. 4) On fait un appel de 30 min pour la livraison et la prise en main. Vous n'intervenez qu'aux deux appels.",
  },
  {
    q: "Que se passe-t-il si le résultat ne me convient pas ?",
    a: "Remboursement intégral sous 7 jours, sans condition, sans question. C'est noir sur blanc. Si l'automatisation ne fait pas ce que vous attendiez, vous récupérez votre argent. Aucun prestataire ne propose ça — moi si, parce que je suis sûr de mon travail.",
  },
  {
    q: "Est-ce que ça marchera pour mon activité ?",
    a: "Si vous avez des tâches que vous répétez plus de 3 fois par semaine — répondre aux mêmes questions, créer des devis, publier sur les réseaux, relancer des clients — alors oui, ça marche. Restaurant, freelance, e-commerce, artisan, PME : j'ai automatisé dans tous ces secteurs.",
  },
  {
    q: "Combien de temps avant de voir des résultats ?",
    a: "Dès le premier jour de livraison, l'automatisation tourne. Vous commencez à récupérer du temps immédiatement. Pas dans 3 mois. Pas après une formation. Le jour même où on livre, ça fonctionne.",
  },
  {
    q: "Et si l'automatisation tombe en panne après la livraison ?",
    a: "Support inclus 30 jours pour toute mission. Si quelque chose casse ou se comporte bizarrement dans ce délai, je corrige sans supplément. Après 30 jours, une maintenance mensuelle est disponible sur option — mais la grande majorité des automatisations tournent sans intervention.",
  },
  {
    q: "Quelle est la différence entre les 3 formules et le Boost 48H ?",
    a: "Le Site Vitrine (799 €) et le Site + Automatisation (1299 €) sont des forfaits complets qui incluent la création de site. La Mission Spécifique (55 €/h) c'est pour un problème ciblé sans site. Le Boost 48H (900 €) c'est l'offre flash pour automatiser votre tâche la plus chronophage en 48h — sans site, juste l'automatisation pure.",
  },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <SectionTitle title="Questions fréquentes" subtitle="FAQ" align="center" />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border border-white/6 rounded-2xl overflow-hidden"
              style={{ background: open === i ? '#171726' : 'rgba(23,23,38,0.5)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group transition-colors hover:bg-white/2"
              >
                <span className={`text-sm font-medium leading-snug transition-colors ${open === i ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: open === i ? 'rgba(61,196,194,0.15)' : 'rgba(255,255,255,0.05)' }}>
                  {open === i
                    ? <Minus size={13} style={{ color: '#3DC4C2' }} />
                    : <Plus size={13} className="text-gray-500" />
                  }
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="w-full h-px bg-white/5 mb-5" />
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Vous avez une autre question ?</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:opacity-80"
            style={{ color: '#3DC4C2' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.044 23.956l6.264-1.638A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.003-1.372l-.359-.213-3.72.974.992-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
            Posez-la directement sur WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
