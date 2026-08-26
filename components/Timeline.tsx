import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const WA_LINK = 'https://wa.me/262692417749?text=Bonjour%20Tony%2C%20je%20voudrais%20démarrer%20mon%20diagnostic%20gratuit.';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Appel diagnostic gratuit',
    duration: '20 min',
    description: 'On identifie ensemble la tâche qui vous coûte le plus de temps. Sans jargon, sans engagement. Je pose les bonnes questions pour comprendre votre situation réelle.',
    detail: 'Par WhatsApp, téléphone ou visio — à votre convenance.',
    color: '#3DC4C2',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Je construis l\'automatisation',
    duration: '48h max',
    description: 'Je configure, teste et peaufine le workflow dans les 48h. Vous ne touchez à rien. Je gère les outils (n8n, API, IA) et vous tiens informé à chaque étape.',
    detail: 'Vous recevez une démo vidéo avant la mise en production.',
    color: '#26729F',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Livraison & prise en main',
    duration: '30 min',
    description: 'On fait un appel de livraison ensemble. Je vous montre comment ça fonctionne, je réponds à toutes vos questions. L\'automatisation tourne, vous récupérez vos heures.',
    detail: 'Support inclus 30 jours. Satisfait ou remboursé sous 7 jours.',
    color: '#3DC4C2',
  },
];

const Process: React.FC = () => (
  <section id="process" className="py-24 md:py-32 relative scroll-mt-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <SectionTitle title="Comment ça marche" subtitle="Processus" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
        {/* Connector line desktop */}
        <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(to right, #3DC4C2, #26729F, #3DC4C2)', opacity: 0.2 }} />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-col bg-[#171726] border border-white/6 rounded-2xl p-7 hover:border-white/12 transition-all duration-500"
          >
            {/* Step number */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: step.color, opacity: 0.7 }}>
                Étape {step.number}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border font-medium" style={{ color: step.color, borderColor: `${step.color}40`, background: `${step.color}10` }}>
                {step.duration}
              </span>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
              <step.icon size={22} style={{ color: step.color }} strokeWidth={1.5} />
            </div>

            <h3 className="text-white text-lg font-semibold mb-3 leading-snug">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{step.description}</p>

            <p className="text-xs leading-relaxed" style={{ color: step.color, opacity: 0.7 }}>{step.detail}</p>

            {/* Arrow connector mobile */}
            {i < steps.length - 1 && (
              <div className="md:hidden flex justify-center mt-6">
                <ArrowRight size={16} className="text-gray-700 rotate-90" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-14 text-center"
      >
        <p className="text-gray-500 text-sm mb-5">Prêt à récupérer vos premières heures cette semaine ?</p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #3DC4C2, #26729F)', color: 'white', boxShadow: '0 8px 32px rgba(61,196,194,0.25)' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.044 23.956l6.264-1.638A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.003-1.372l-.359-.213-3.72.974.992-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
          Démarrer mon diagnostic gratuit sur WhatsApp
        </a>
        <p className="text-gray-600 text-xs mt-3">Réponse garantie sous 2h en semaine · 0 engagement</p>
      </motion.div>
    </div>
  </section>
);

export default Process;
