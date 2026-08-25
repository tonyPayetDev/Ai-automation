import React from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp, PenLine, Sprout, ShieldAlert, Megaphone, Cpu } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';
import { useContent } from './useContent';

/* Les icônes viennent de lucide-react, la banque libre déjà installée.
   Le nom est choisi dans content.json (champ `icone`), pas ici : ajouter un
   agent reste une modification de données. `Cpu` sert de repli — un nom
   inconnu doit donner une icône neutre, jamais un trou dans la carte. */
const ICONES: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Compass, TrendingUp, PenLine, Sprout, ShieldAlert, Megaphone,
};

/**
 * Les agents que Tony a construits pour sa propre opération.
 *
 * Ce ne sont pas des promesses commerciales : chacun existe dans le dépôt,
 * et ceux marqués « en service » ont une mémoire de travail — c'est-à-dire
 * qu'ils ont réellement tourné, pas seulement été écrits.
 *
 * Le contenu vient de content.json pour qu'un ajout d'agent ne demande pas
 * de toucher au code.
 */

type Agent = {
  id: string;
  nom: string;
  role: string;
  quoi: string;
  enService?: boolean;
  icone?: string;
};

const Agents: React.FC = () => {
  const contenu = useContent();
  const agents: Agent[] = (contenu as any)?.agents || [];
  if (!agents.length) return null;

  const enService = agents.filter((a) => a.enService).length;

  return (
    <section id="agents" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Mes agents" title="Ce que j'ai construit pour moi" />

        <p className="mt-6 max-w-2xl text-gray-500 text-[15px] leading-relaxed">
          Avant de vendre des automatisations, je les fais tourner sur ma propre activité.
          Ces agents lisent mes chiffres, écrivent mes scripts, surveillent mes workflows.
          {enService > 0 && (
            <>
              {' '}
              <span className="text-[#3DC4C2]">{enService} d'entre eux tournent en production</span> —
              ils ont une mémoire de travail, pas seulement une fiche.
            </>
          )}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative flex flex-col rounded-2xl border p-6 transition-colors duration-500 ${
                a.enService
                  ? 'bg-[#0F1E2E] border-[#3DC4C2]/28 hover:border-[#3DC4C2]/50'
                  : 'bg-[#0C0D18] border-white/6 hover:border-white/12'
              }`}
            >
              {a.enService && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3DC4C2]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DC4C2]" aria-hidden="true" />
                  En service
                </span>
              )}

              {(() => {
                const Icone = ICONES[a.icone || ''] || Cpu;
                return (
                  <span
                    aria-hidden="true"
                    className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
                      a.enService
                        ? 'border-[#3DC4C2]/30 bg-[#3DC4C2]/10 text-[#3DC4C2]'
                        : 'border-white/8 bg-white/[0.04] text-gray-500'
                    }`}
                  >
                    <Icone size={17} strokeWidth={1.8} />
                  </span>
                );
              })()}

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                {a.role}
              </p>
              <h3 className="mt-2.5 font-mono text-[15px] font-semibold text-white">{a.nom}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{a.quoi}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;
