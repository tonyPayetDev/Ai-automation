import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, Building2, Clock, Wallet, CheckSquare, MessageSquare, Zap } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';

const WEBHOOK_URL = 'https://n7n.automatisationboost.com/webhook/Form-tony-ia';

const TACHES = [
  'Réponses aux clients / emails',
  'Création de devis / factures',
  'Publication sur les réseaux sociaux',
  'Gestion des commandes / stocks',
  'Relances clients & paiements',
  'Prise de rendez-vous',
  'Reporting & tableaux de bord',
  'Autre',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    activite: '',
    equipe: '',
    taches: [] as string[],
    objectif: '',
    budget: '',
    delai: '',
    source: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const toggleTache = (t: string) => {
    setForm(f => ({
      ...f,
      taches: f.taches.includes(t) ? f.taches.filter(x => x !== t) : [...f.taches, t],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.prenom) return;
    setStatus('loading');
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          taches: form.taches.join(', '),
          source_page: window.location.href,
          submitted_at: new Date().toISOString(),
        }),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputCls = 'w-full bg-[#171726]/90 border border-white/8 text-white placeholder-[#4E7080] px-4 py-3.5 text-sm focus:outline-none focus:border-[#3DC4C2]/50 transition-colors rounded-xl';
  const labelCls = 'block text-xs font-semibold text-[#4E7080] uppercase tracking-widest mb-2';
  const selectCls = inputCls + ' cursor-pointer appearance-none';

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 relative scroll-mt-20">
        <div id="audit" className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 mx-auto mb-6 bg-[#3DC4C2]/15 border-2 border-[#3DC4C2]/40 rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-[#3DC4C2]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Message reçu !</h2>
            <p className="text-gray-400 mb-2">Je vous réponds sous <span className="text-[#3DC4C2] font-semibold">24h</span> avec un plan d'action personnalisé.</p>
            <p className="text-gray-600 text-sm">Vérifiez aussi vos spams 😉</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />

      <div id="audit" className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 scroll-mt-20">
        <SectionTitle title="Décrivez votre projet" subtitle="Contact" />
        <p className="text-gray-500 text-sm mb-12 -mt-8">Réponse garantie sous 24h · Aucun engagement</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BLOC 1 — Identité */}
          <div className="border border-white/6 bg-[#171726] p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#3DC4C2]/15 flex items-center justify-center">
                <User className="w-3 h-3 text-[#3DC4C2]" />
              </div>
              <span className="text-xs font-semibold text-[#3DC4C2] uppercase tracking-widest">01 / Votre identité</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Prénom *</label>
                <input required className={inputCls} placeholder="Tony" value={form.prenom} onChange={e => set('prenom', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nom</label>
                <input className={inputCls} placeholder="Payet" value={form.nom} onChange={e => set('nom', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input required type="email" className={inputCls} placeholder="tony@monentreprise.fr" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Téléphone / WhatsApp</label>
                <input type="tel" className={inputCls} placeholder="+262 692 XX XX XX" value={form.telephone} onChange={e => set('telephone', e.target.value)} />
              </div>
            </div>
          </div>

          {/* BLOC 2 — Business */}
          <div className="border border-white/6 bg-[#171726] p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#3DC4C2]/15 flex items-center justify-center">
                <Building2 className="w-3 h-3 text-[#3DC4C2]" />
              </div>
              <span className="text-xs font-semibold text-[#3DC4C2] uppercase tracking-widest">02 / Votre business</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Type d'activité</label>
                <select className={selectCls} value={form.activite} onChange={e => set('activite', e.target.value)}>
                  <option value="">— Choisir —</option>
                  <option>Restaurant / Hôtellerie</option>
                  <option>E-commerce / Boutique en ligne</option>
                  <option>Freelance / Agence</option>
                  <option>PME / Commerce local</option>
                  <option>Profession libérale</option>
                  <option>Startup / Tech</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Taille de l'équipe</label>
                <select className={selectCls} value={form.equipe} onChange={e => set('equipe', e.target.value)}>
                  <option value="">— Choisir —</option>
                  <option>Solo (juste moi)</option>
                  <option>2 – 5 personnes</option>
                  <option>6 – 20 personnes</option>
                  <option>20+ personnes</option>
                </select>
              </div>
            </div>
          </div>

          {/* BLOC 3 — Besoin */}
          <div className="border border-white/6 bg-[#171726] p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#3DC4C2]/15 flex items-center justify-center">
                <CheckSquare className="w-3 h-3 text-[#3DC4C2]" />
              </div>
              <span className="text-xs font-semibold text-[#3DC4C2] uppercase tracking-widest">03 / Votre besoin</span>
            </div>

            <div className="mb-6">
              <label className={labelCls}>Quelles tâches vous volent le plus de temps ? (plusieurs choix)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {TACHES.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTache(t)}
                    className={`text-left px-4 py-3 text-xs border rounded-xl transition-all ${
                      form.taches.includes(t)
                        ? 'border-[#3DC4C2]/50 bg-[#3DC4C2]/10 text-[#3DC4C2]'
                        : 'border-white/6 bg-[#171726]/60 text-gray-500 hover:border-white/15 hover:text-gray-300'
                    }`}
                  >
                    <span className={`mr-2 ${form.taches.includes(t) ? 'text-[#3DC4C2]' : 'text-gray-700'}`}>
                      {form.taches.includes(t) ? '■' : '□'}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Résultat principal recherché</label>
              <select className={selectCls} value={form.objectif} onChange={e => set('objectif', e.target.value)}>
                <option value="">— Choisir —</option>
                <option>Gagner du temps grâce à l'automatisation</option>
                <option>Créer ou refaire mon site web</option>
                <option>Améliorer ma visibilité Google / Réseaux</option>
                <option>Intégrer l'IA dans mon activité</option>
                <option>Plusieurs de ces objectifs</option>
                <option>Je ne sais pas encore</option>
              </select>
            </div>
          </div>

          {/* BLOC 4 — Timing & Budget */}
          <div className="border border-white/6 bg-[#171726] p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#3DC4C2]/15 flex items-center justify-center">
                <Clock className="w-3 h-3 text-[#3DC4C2]" />
              </div>
              <span className="text-xs font-semibold text-[#3DC4C2] uppercase tracking-widest">04 / Timing & budget</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Budget approximatif</label>
                <select className={selectCls} value={form.budget} onChange={e => set('budget', e.target.value)}>
                  <option value="">— Choisir —</option>
                  <option>Moins de 500 €</option>
                  <option>500 € – 1 000 €</option>
                  <option>1 000 € – 2 000 €</option>
                  <option>2 000 € – 5 000 €</option>
                  <option>Plus de 5 000 €</option>
                  <option>Pas encore défini</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Délai souhaité</label>
                <select className={selectCls} value={form.delai} onChange={e => set('delai', e.target.value)}>
                  <option value="">— Choisir —</option>
                  <option>Urgent — moins de 2 semaines</option>
                  <option>Dans le mois</option>
                  <option>Dans 2 – 3 mois</option>
                  <option>Pas encore pressé</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Comment avez-vous entendu parler de moi ?</label>
                <select className={selectCls} value={form.source} onChange={e => set('source', e.target.value)}>
                  <option value="">— Choisir —</option>
                  <option>Réseaux sociaux (Instagram, TikTok, LinkedIn…)</option>
                  <option>Bouche à oreille / recommandation</option>
                  <option>Google / recherche en ligne</option>
                  <option>automatisationboost.com</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>
          </div>

          {/* BLOC 5 — Message libre */}
          <div className="border border-white/6 bg-[#171726] p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#3DC4C2]/15 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-[#3DC4C2]" />
              </div>
              <span className="text-xs font-semibold text-[#3DC4C2] uppercase tracking-widest">05 / Décrivez votre projet</span>
            </div>
            <textarea
              className={inputCls + ' h-32 resize-none'}
              placeholder="Décrivez votre situation, vos objectifs, ou posez-moi directement une question…"
              value={form.message}
              onChange={e => set('message', e.target.value)}
            />
          </div>

          {/* SUBMIT */}
          <div className="text-center pt-4">
            {status === 'error' && (
              <p className="text-red-400 text-sm mb-4">Erreur d'envoi — réessayez ou contactez tony.payet.professionnel@gmail.com</p>
            )}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#3DC4C2] text-white font-semibold text-sm rounded-full hover:bg-[#26729F] transition-all shadow-xl shadow-[#3DC4C2]/25 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </>
              )}
            </motion.button>
            <p className="text-gray-600 text-xs mt-4">Réponse garantie sous 24h · Aucun engagement</p>
          </div>

        </form>
      </div>
    </section>
  );
};

export default Contact;
