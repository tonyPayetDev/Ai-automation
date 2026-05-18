
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Mail,
  User,
  Loader2,
  Clock,
  Star,
  AlertCircle,
  Zap,
  MessageSquare,
  Calendar,
  TrendingUp,
  ChefHat,
} from 'lucide-react';

const PROBLEMS = [
  { icon: <Clock className="w-5 h-5 text-red-400" />, text: "Saisie manuelle des commandes Uber Eats / Deliveroo qui bouffe tes soirées" },
  { icon: <MessageSquare className="w-5 h-5 text-red-400" />, text: "Réponses aux avis Google faites à la main, quand tu as le temps (souvent jamais)" },
  { icon: <Calendar className="w-5 h-5 text-red-400" />, text: "Gestion des réservations et des no-shows sans aucune relance automatique" },
  { icon: <TrendingUp className="w-5 h-5 text-red-400" />, text: "Zéro visibilité sur tes heures de pointe pour anticiper les stocks" },
];

const AUTOMATIONS = [
  { num: "01", title: "Commandes centralisées", desc: "Agrège Uber Eats, Deliveroo et ton site dans un seul flux automatique." },
  { num: "02", title: "Réponses Google auto", desc: "L'IA répond à tes avis Google en moins de 5 minutes, 24h/24." },
  { num: "03", title: "Relances réservations", desc: "SMS automatique la veille pour réduire les no-shows de 40%." },
  { num: "04", title: "Alertes stock IA", desc: "Détecte les ruptures avant le service et commande automatiquement." },
  { num: "05", title: "Rapport hebdo instantané", desc: "Chiffres, avis, tendances — envoyés chaque lundi matin sur ton téléphone." },
];

const WEBHOOK_URL = 'https://n8n.tonypayet.com/webhook/restaurateur-leads';

const RestaurateurPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'restaurateur', timestamp: new Date().toISOString() }),
      });
    } catch {
      // On affiche quand même le succès si le webhook est down
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
      <div className="scanline" />

      {/* Navbar minimaliste */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <a href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-yellow-500/10 rounded border border-yellow-500/30 group-hover:bg-yellow-500/20 transition-colors">
              <Cpu className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="text-lg font-bold tracking-widest text-white">
              TONY<span className="text-yellow-500">.AI</span>
            </span>
          </a>
        </div>
      </nav>

      <main className="pt-16">
        {/* HERO */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,179,8,0.08)_0%,_transparent_60%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-6"
            >
              <ChefHat className="w-3.5 h-3.5" /> Guide Gratuit — Restaurateurs
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black leading-tight mb-6"
            >
              Récupère{' '}
              <span className="text-yellow-500">10 heures</span>
              {' '}par semaine<br />grâce à l'IA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-4"
            >
              Le guide des <strong className="text-white">5 automatisations concrètes</strong> que les restaurateurs qui gagnent du temps ont déjà mis en place — téléchargeable gratuitement.
            </motion.p>
          </div>
        </section>

        {/* PROBLÈMES + FORMULAIRE */}
        <section className="py-8 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Problèmes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-zinc-900/50 border-l-4 border-red-500 p-8 rounded-r-lg mb-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertCircle className="text-red-500 w-5 h-5" /> Tu te reconnais là-dedans ?
                </h2>
                <ul className="space-y-5">
                  {PROBLEMS.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="mt-0.5 flex-shrink-0">{p.icon}</span>
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-500 italic px-2">
                <Zap className="text-yellow-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dans ce guide, tu découvres comment d'autres restaurateurs ont résolu ces 5 problèmes avec des outils IA accessibles — sans avoir besoin d'un développeur.</span>
              </div>
            </motion.div>

            {/* Formulaire / Succès */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative p-8 bg-gradient-to-br from-zinc-900 to-black border-2 border-yellow-500/40 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.08)]"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-14 h-14 bg-yellow-500/20 border border-yellow-500/50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                      <CheckCircle2 className="text-yellow-500 w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">C'est dans ta boîte !</h3>
                    <p className="text-gray-400 text-sm mb-8">Vérifie tes spams si tu ne vois rien d'ici 2 minutes.</p>

                    <div className="text-left space-y-3">
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3">Aperçu du guide :</p>
                      {AUTOMATIONS.map((a) => (
                        <div key={a.num} className="flex items-start gap-3 p-3 bg-black/50 border border-white/5 rounded-lg">
                          <span className="text-yellow-500 font-mono text-xs font-bold mt-0.5">{a.num}</span>
                          <div>
                            <p className="text-white text-sm font-semibold">{a.title}</p>
                            <p className="text-gray-500 text-xs">{a.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <div className="mb-6">
                      <h3 className="text-xl font-black text-white mb-1">Reçois le guide gratuitement</h3>
                      <p className="text-gray-500 text-sm">Aucune carte bancaire. Juste ton email.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Prénom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input
                            required
                            type="text"
                            placeholder="Marie"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Email pro</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input
                            required
                            type="email"
                            placeholder="marie@monresto.fr"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isSubmitting}
                        className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest rounded hover:bg-yellow-400 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.25)] disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="animate-spin w-4 h-4" /> Envoi en cours...</>
                        ) : (
                          <>Recevoir le guide gratuit <ArrowRight size={16} /></>
                        )}
                      </button>

                      <p className="text-[11px] text-gray-600 text-center">
                        Pas de spam. Désinscription en un clic.
                      </p>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex -space-x-1">
                        {['M','L','P'].map(l => (
                          <div key={l} className="w-6 h-6 rounded-full bg-zinc-700 border border-black flex items-center justify-center text-[9px] font-bold text-gray-300">{l}</div>
                        ))}
                      </div>
                      <span>+47 restaurateurs l'ont déjà reçu ce mois-ci</span>
                      <Star className="w-3 h-3 text-yellow-500 ml-auto flex-shrink-0" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* FOOTER minimaliste */}
        <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Tony Payet — Automatisation IA &nbsp;·&nbsp;
          <a href="/" className="hover:text-yellow-500 transition-colors">Retour à l'accueil</a>
        </footer>
      </main>
    </div>
  );
};

export default RestaurateurPage;
