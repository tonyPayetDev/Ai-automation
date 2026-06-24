import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, Users, Zap, AlertCircle, CheckCircle2, Star, ChevronRight } from 'lucide-react';

const stats = [
  { icon: Clock, value: '15h', label: 'économisées par semaine en moyenne', color: 'text-[#3DC4C2]', border: 'border-[#3DC4C2]/30', bg: 'bg-[#3DC4C2]/5' },
  { icon: Users, value: '50+', label: 'entrepreneurs & PME automatisés', color: 'text-cyan-500', border: 'border-cyan-500/30', bg: 'bg-cyan-950/10' },
  { icon: TrendingUp, value: 'x3', label: 'de productivité gagnée en moyenne', color: 'text-green-500', border: 'border-green-500/30', bg: 'bg-green-950/10' },
  { icon: Zap, value: '48h', label: 'délai de livraison garanti', color: 'text-pink-500', border: 'border-pink-500/30', bg: 'bg-pink-950/10' },
];

const profiles = [
  {
    id: 'pme',
    label: 'PME',
    emoji: '🏢',
    color: 'cyan',
    problems: [
      "Devis rédigés à la main — des heures perdues chaque semaine",
      "Relances clients oubliées, paiements qui traînent",
      "Gestion des commandes dispersée entre e-mail, téléphone et tableaux Excel",
      "Vos concurrents automatisés avancent pendant que vous gérez l'admin",
    ],
    solutions: [
      "Devis générés et envoyés automatiquement dès la demande",
      "Relances clients programmées : e-mail + SMS sans intervention",
      "Pipeline de suivi centralisé : zéro commande oubliée",
      "Reporting automatique chaque lundi — vous pilotez, vous ne saisissez plus",
    ],
  },
  {
    id: 'freelance',
    label: 'Freelance',
    emoji: '💻',
    color: 'yellow',
    problems: [
      "30% de votre temps part en admin au lieu de missions facturables",
      "Propositions commerciales faites à la main, une par une",
      "Factures envoyées en retard, trésorerie imprévisible",
      "Réseaux sociaux vides faute de temps pour poster",
    ],
    solutions: [
      "Onboarding client automatisé : contrat, brief, accès — en 1 clic",
      "Template de proposition adapté automatiquement à chaque prospect",
      "Facturation déclenchée automatiquement à la livraison",
      "Contenu LinkedIn/Instagram généré et publié par l'IA à votre image",
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    emoji: '🍽️',
    color: 'pink',
    problems: [
      "Réservations gérées à la main entre appels, SMS et messages Instagram",
      "Aucune réponse aux avis Google — votre e-réputation en souffre",
      "Menus et promotions jamais mis à jour sur vos réseaux",
      "Vous perdez des clients car vous n'avez pas le temps de répondre vite",
    ],
    solutions: [
      "Système de réservation automatisé 24h/24 — confirmations envoyées instantanément",
      "Réponses aux avis Google générées par IA et publiées automatiquement",
      "Publication du menu du jour et des promos sur Instagram & Facebook sans effort",
      "Chatbot WhatsApp/Instagram qui répond et prend les commandes à votre place",
    ],
  },
];

const colorMap: Record<string, { tab: string; border: string; bg: string; badge: string; dot: string }> = {
  cyan:   { tab: 'border-cyan-500 text-cyan-400',   border: 'border-cyan-500/40',   bg: 'bg-cyan-950/10',   badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',   dot: 'bg-cyan-500' },
  yellow: { tab: 'border-[#3DC4C2] text-[#ff6b3d]', border: 'border-[#3DC4C2]/40', bg: 'bg-[#3DC4C2]/5', badge: 'bg-[#3DC4C2]/10 text-[#ff6b3d] border-[#3DC4C2]/30', dot: 'bg-[#3DC4C2]' },
  pink:   { tab: 'border-pink-500 text-pink-400',   border: 'border-pink-500/40',   bg: 'bg-pink-950/10',   badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30',   dot: 'bg-pink-500' },
};

const testimonials = [
  {
    name: 'Malik D.',
    role: 'Restaurateur · Saint-Denis Réunion',
    text: "Avant, je passais 1h30 par soir à répondre aux réservations et messages. Tony a mis en place un système en 48h : confirmations automatiques, rappels J-1, et même les réponses aux avis Google. J'ai récupéré mes soirées.",
    detail: '~10h/semaine récupérées',
    stars: 5,
  },
  {
    name: 'Sophie L.',
    role: 'Consultante e-commerce · Freelance',
    text: "J'envoyais mes propositions commerciales à la main, une par une. Tony a tout automatisé : devis généré en 2 min, relance à J+3, facture à la signature. Résultat : 4 nouveaux clients en 6 semaines sans effort supplémentaire.",
    detail: '+4 clients en 6 semaines',
    stars: 5,
  },
  {
    name: 'Romain V.',
    role: 'Gérant BTP · 8 salariés',
    text: "On perdait des chantiers parce qu'on répondait trop tard aux demandes. Maintenant le prospect reçoit un devis pré-rempli dans l'heure. Taux de transformation passé de 20% à 38% en deux mois.",
    detail: 'Conversion +18pts en 2 mois',
    stars: 5,
  },
];

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pme');
  const active = profiles.find(p => p.id === activeTab)!;
  const c = colorMap[active.color];

  return (
    <section className="py-20 bg-[#0C0D18] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-lg border ${stat.border} ${stat.bg} text-center`}
            >
              <stat.icon className={`w-7 h-7 mx-auto mb-3 ${stat.color}`} />
              <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-gray-400 text-xs leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Problem / Solution section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Reconnaissez-vous votre situation ?</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Votre problème. Notre solution.</h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {profiles.map(p => {
              const isActive = p.id === activeTab;
              const tc = colorMap[p.color];
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`px-5 py-2 rounded-full border font-bold text-sm transition-all ${
                    isActive
                      ? `${tc.tab} ${tc.bg}`
                      : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                  }`}
                >
                  {p.emoji} {p.label}
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Problems */}
              <div className="bg-zinc-900/50 border-l-4 border-red-500 p-8 rounded-r-lg">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <AlertCircle className="text-red-500 w-5 h-5" />
                  Ce qui vous coûte du temps
                </h3>
                <ul className="space-y-4">
                  {active.problems.map((prob, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-red-500"></span>
                      {prob}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className={`bg-zinc-900/50 border-l-4 ${c.border} p-8 rounded-r-lg`}>
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5`} style={{ color: active.color === 'yellow' ? '#eab308' : active.color === 'cyan' ? '#06b6d4' : '#ec4899' }} />
                  Ce qu'on automatise pour vous
                </h3>
                <ul className="space-y-4">
                  {active.solutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                      <ChevronRight className="mt-0.5 w-4 h-4 shrink-0" style={{ color: active.color === 'yellow' ? '#eab308' : active.color === 'cyan' ? '#06b6d4' : '#ec4899' }} />
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonials */}
        <div className="mb-8 text-center">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Ce que disent nos clients</p>
          <h2 className="text-2xl md:text-3xl font-black text-white">Ils ont automatisé, ils témoignent</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/60 border border-white/10 rounded-lg p-6 hover:border-[#3DC4C2]/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#3DC4C2] fill-[#3DC4C2]" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#3DC4C2]/20 border border-[#3DC4C2]/40 flex items-center justify-center text-[#3DC4C2] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
                {'detail' in t && (
                  <span className="text-[#3DC4C2] text-xs font-semibold bg-[#3DC4C2]/10 px-2.5 py-1 rounded-full border border-[#3DC4C2]/20 whitespace-nowrap ml-2">
                    {(t as any).detail}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-500">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>Satisfait ou remboursé sous 7 jours — aucun risque pour vous</span>
        </div>
      </div>
    </section>
  );
};

export default SystemMonitor;
