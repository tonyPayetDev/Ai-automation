import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, Star, Zap, CheckCircle } from 'lucide-react';

const stats = [
  { icon: Clock, value: '15h', label: 'économisées par semaine en moyenne', color: 'text-yellow-500', border: 'border-yellow-500/30', bg: 'bg-yellow-950/10' },
  { icon: Users, value: '50+', label: 'entrepreneurs & PME automatisés', color: 'text-cyan-500', border: 'border-cyan-500/30', bg: 'bg-cyan-950/10' },
  { icon: TrendingUp, value: 'x3', label: 'de productivité gagnée en moyenne', color: 'text-green-500', border: 'border-green-500/30', bg: 'bg-green-950/10' },
  { icon: Zap, value: '48h', label: 'délai de livraison garanti', color: 'text-pink-500', border: 'border-pink-500/30', bg: 'bg-pink-950/10' },
];

const testimonials = [
  {
    name: 'Malik D.',
    role: 'Restaurateur, Saint-Denis',
    text: 'Mes réservations sont maintenant gérées automatiquement. Je gagne facilement 2h par jour que je réinvestis en cuisine.',
    stars: 5,
  },
  {
    name: 'Sophie L.',
    role: 'Freelance e-commerce',
    text: 'Tony a automatisé mes publications et mes relances clients en 48h. Mon CA a augmenté de 30% le mois suivant.',
    stars: 5,
  },
  {
    name: 'Romain V.',
    role: 'Gérant PME BTP',
    text: 'Les devis partent maintenant tout seuls dès qu\'un client remplit le formulaire. Un gain de temps énorme.',
    stars: 5,
  },
];

const SystemMonitor: React.FC = () => {
  return (
    <section className="py-20 bg-black relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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
              className="bg-zinc-900/60 border border-white/10 rounded-lg p-6 hover:border-yellow-500/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Satisfait ou remboursé sous 7 jours — aucun risque pour vous</span>
        </div>
      </div>
    </section>
  );
};

export default SystemMonitor;
