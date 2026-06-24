import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Minimize2, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// ── Base de connaissances de Tony ──────────────────────────────────────────
const KNOWLEDGE = {
  identity: {
    name: 'Tony Payet',
    role: 'Architecte IA & Automatisation Business',
    location: 'Saint-Denis 97490, La Réunion',
    email: 'tony.payet.professionnel@gmail.com',
    phone: '0692 41 77 49',
    siret: '82376164800018',
    experience: '10+ ans en développement web & automatisation IA',
    bio: "Expert en automatisation basé à La Réunion. J'aide les restaurants, PME, e-commerces et indépendants à récupérer 10 à 20h/semaine grâce à l'IA et n8n.",
  },
  pricing: [
    {
      name: 'Site Vitrine Pro',
      price: '799 €',
      delay: '5 jours',
      features: ['Design professionnel sur-mesure', 'Optimisé mobile & rapide', 'Formulaire de contact & carte', 'Référencement Google local', 'Hébergement 1 an inclus'],
      ideal: 'Idéal pour les artisans, restaurants, professions libérales qui veulent une présence pro rapidement.',
    },
    {
      name: 'Site + Automatisation',
      price: '1 299 €',
      delay: '7-10 jours',
      features: ['Tout le pack Site Vitrine', '1 automatisation sur-mesure', 'Connexion réseaux sociaux auto', 'Chatbot ou relance client auto', 'Formation 1h incluse', 'Support 30 jours offert'],
      recommended: true,
      ideal: 'Le pack le plus populaire — un site ET un système qui tourne tout seul.',
    },
    {
      name: 'Mission Spécifique',
      price: '55 €/h',
      delay: 'Dispo sous 48h',
      features: ['Audit de vos process', 'Devis gratuit sous 24h', 'Automatisation ciblée', 'Résultat garanti ou remboursé', 'Sans engagement'],
      ideal: "Un problème précis à automatiser — je m'en occupe à la mission.",
    },
    {
      name: 'Automation Boost 48H',
      price: '900 € (au lieu de 1 500 €)',
      discount: '-40%',
      delay: '48 heures',
      features: ['Diagnostic de vos process', 'Automatisation de la tâche la plus chronophage', 'Livraison en 48h chrono', 'Garanti ou remboursé sous 7 jours', 'Paiement en 2×450 € possible'],
      ideal: "J'identifie et j'automatise votre tâche numéro 1 en 48h.",
    },
  ],
  services: [
    'Automatisation des tâches répétitives (devis, relances, commandes, publications)',
    'Sites web professionnels qui convertissent, livrés en 5 jours',
    'Référencement Google local & publications automatiques sur les réseaux sociaux',
    'Chatbots et assistants IA sur-mesure pour votre métier',
    'Formations n8n et workflows automatisés',
  ],
  stack: ['n8n', 'Make/Zapier', 'React', 'Vue.js', 'PHP', 'Python', 'WordPress/Elementor', 'Shopify', 'ChatGPT/Claude API'],
  guarantee: 'Satisfait ou remboursé sous 7 jours. Paiement en 2× possible. Sans abonnement caché.',
};

function getLocalResponse(query: string): string {
  const q = query.toLowerCase();

  if (/^(bonjour|salut|hello|coucou|bonsoir|hey|hi)\b/.test(q)) {
    return "Bonjour ! Je suis l'assistant de **Tony Payet**, expert IA & automatisation à La Réunion. 😊\n\nJe peux vous renseigner sur :\n• **Les tarifs** — dès 799 €\n• **Les services** — automatisation, site web, SEO, IA\n• **Le Boost 48H** — offre flash à 900 €\n• **Contacter Tony** — email, téléphone\n\nQue puis-je faire pour vous ?";
  }

  if (/tarif|prix|co[uû]t|combien|offre|pack|forfait|budget/.test(q)) {
    const p = KNOWLEDGE.pricing;
    return `Voici les tarifs de Tony :\n\n**1. ${p[0].name} — ${p[0].price}**\n${p[0].delay}. ${p[0].ideal}\n\n**2. ${p[1].name} — ${p[1].price}** ⭐\n${p[1].delay}. ${p[1].ideal}\n\n**3. ${p[2].name} — ${p[2].price}**\n${p[2].ideal}\n\n**4. ${p[3].name} — ${p[3].price}** (${p[3].discount})\n${p[3].ideal}\n\n📩 Devis via le formulaire Contact ou : ${KNOWLEDGE.identity.email}`;
  }

  if (/boost|48h|48 h|urgent|flash/.test(q)) {
    const b = KNOWLEDGE.pricing[3];
    return `**Automation Boost 48H** ⚡\n\n💥 **${b.price}** (${b.discount})\n⏱ Livraison en ${b.delay}\n\n${b.features.map(f => `• ${f}`).join('\n')}\n\n${b.ideal}\n\n📞 **${KNOWLEDGE.identity.phone}** ou formulaire de diagnostic en haut de page.`;
  }

  if (/site|vitrine|web|wordpress|landing/.test(q)) {
    const s = KNOWLEDGE.pricing[0];
    return `**${s.name} — ${s.price}**\n\n${s.features.map(f => `✅ ${f}`).join('\n')}\n\nLivraison en **${s.delay}**.\n${s.ideal}\n\nBesoin du combo site + auto ? → **Site + Automatisation à 1 299 €**`;
  }

  if (/automati|n8n|make|zapier|workflow|t[aâ]che|relance|devis|commande|publication/.test(q)) {
    return `Tony automatise tous types de tâches :\n\n${KNOWLEDGE.services.map(s => `• ${s}`).join('\n')}\n\n**Stack :** ${KNOWLEDGE.stack.join(', ')}\n\n**Tarif :** à partir de 55 €/h ou 900 € pour le Boost 48H.`;
  }

  if (/contact|joindre|appeler|email|mail|t[eé]l[eé]phone|whatsapp|rdv/.test(q)) {
    return `Pour contacter Tony :\n\n📧 **Email :** ${KNOWLEDGE.identity.email}\n📞 **Tél / WhatsApp :** ${KNOWLEDGE.identity.phone}\n📍 **Localisation :** ${KNOWLEDGE.identity.location}\n\nOu le **formulaire Contact** en bas de page — réponse sous 24h.`;
  }

  if (/qui est|tony|profil|exp[eé]rience|background/.test(q)) {
    return `**${KNOWLEDGE.identity.name}** — ${KNOWLEDGE.identity.role}\n\n📍 ${KNOWLEDGE.identity.location}\n💼 ${KNOWLEDGE.identity.experience}\n\n${KNOWLEDGE.identity.bio}\n\n🛡️ SIRET : ${KNOWLEDGE.identity.siret}`;
  }

  if (/garanti|remboursement|satisfaction|risque/.test(q)) {
    return `**Garanties de Tony :**\n\n✅ Satisfait ou remboursé sous 7 jours\n✅ Paiement en 2× sans frais\n✅ Sans abonnement caché\n✅ Devis gratuit sous 24h\n\nZéro risque pour vous.`;
  }

  if (/délai|livraison|combien de temps|quand/.test(q)) {
    return `**Délais de livraison :**\n\n• Site Vitrine Pro → **5 jours**\n• Site + Automatisation → **7-10 jours**\n• Automation Boost 48H → **48h chrono** ⚡\n• Mission Spécifique → sous 48h, durée selon projet\n\nTous les délais sont garantis.`;
  }

  if (/r[eé]union|local|[îi]le|saint-denis|974/.test(q)) {
    return `Tony est basé à **Saint-Denis, La Réunion (974)**. Il travaille avec des clients locaux (restaurants, PME, commerces) et à distance partout en France et dans l'Océan Indien.\n\n📞 **${KNOWLEDGE.identity.phone}** — appel ou WhatsApp`;
  }

  return `Je suis l'assistant de **Tony Payet**, ${KNOWLEDGE.identity.role}.\n\nPosez-moi une question sur :\n• 💰 Tarifs → "quels sont tes prix ?"\n• 🤖 Services → "qu'est-ce que tu automatises ?"\n• ⚡ Boost 48H → "offre Boost"\n• 📞 Contact → "comment te joindre ?"\n\nOu utilisez le formulaire de contact en bas de page.`;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Bonjour ! 👋 Je suis l'assistant IA de **Tony Payet**.\n\nJe peux vous renseigner sur ses services, tarifs et disponibilités. Comment puis-je vous aider ?", sender: 'bot', timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now(), text: text.trim(), sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 300 + Math.random() * 500));

    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch('https://n7n.automatisationboost.com/webhook/tony-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, history: messages.slice(-4).map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })) }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const reply = data.output || data.text || data.message || data.response || data.content?.[0]?.text;
        if (reply) {
          setMessages(prev => [...prev, { id: Date.now(), text: reply, sender: 'bot', timestamp: new Date() }]);
          setIsLoading(false);
          return;
        }
      }
    } catch { /* fallback */ }

    setMessages(prev => [...prev, { id: Date.now(), text: getLocalResponse(text), sender: 'bot', timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(inputValue);
  };

  const suggestions = ['Quels sont tes tarifs ?', 'Offre Boost 48H', 'Comment te contacter ?'];

  const renderText = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i} style={{ color: '#3DC4C2', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="mb-4 flex flex-col overflow-hidden rounded-2xl border border-white/8 shadow-2xl"
            style={{
              width: 'min(92vw, 380px)',
              maxHeight: 'min(560px, 80vh)',
              background: '#171726',
              boxShadow: '0 0 0 1px rgba(61,196,194,0.1), 0 24px 64px rgba(0,0,0,0.65)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/6" style={{ background: 'linear-gradient(135deg, rgba(61,196,194,0.08), rgba(108,67,138,0.06))' }}>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(61,196,194,0.12)', border: '1px solid rgba(61,196,194,0.25)' }}>
                  <Bot size={17} style={{ color: '#3DC4C2' }} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ background: isLoading ? '#AD7AA4' : '#3DC4C2', borderColor: '#171726' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Tony AI</p>
                  <p className="text-[10px]" style={{ color: isLoading ? '#AD7AA4' : '#3DC4C2' }}>
                    {isLoading ? 'En train de répondre…' : '● En ligne — répond rapidement'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                <Minimize2 size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#0C0D18' }}>
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[88%] px-4 py-3 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap"
                    style={
                      msg.sender === 'user'
                        ? { background: 'linear-gradient(135deg, #3DC4C2, #26729F)', color: 'white', borderRadius: '18px 18px 4px 18px' }
                        : { background: '#171726', border: '1px solid rgba(255,255,255,0.06)', color: '#D1C5E0', borderRadius: '18px 18px 18px 4px' }
                    }
                  >
                    <span>{renderText(msg.text)}</span>
                    <span className="block text-right text-[9px] mt-1.5 opacity-30">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm" style={{ background: '#171726', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px' }}>
                    <Loader2 size={13} className="animate-spin" style={{ color: '#3DC4C2' }} />
                    <span className="text-gray-500 text-xs">Réflexion…</span>
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !isLoading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => sendMessage(s)} className="px-3 py-1.5 text-xs rounded-full transition-all duration-200" style={{ border: '1px solid rgba(61,196,194,0.3)', color: '#3DC4C2', background: 'rgba(61,196,194,0.06)' }}>
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/6" style={{ background: '#171726' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Posez votre question…"
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none px-1"
                style={{ caretColor: '#3DC4C2' }}
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
                style={{ background: inputValue.trim() ? 'linear-gradient(135deg, #3DC4C2, #26729F)' : 'rgba(255,255,255,0.06)' }}
              >
                <Send size={14} className={inputValue.trim() ? 'text-white' : 'text-gray-600'} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(v => !v)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={isOpen
          ? { background: '#171726', border: '1px solid rgba(255,255,255,0.1)' }
          : { background: 'linear-gradient(135deg, #3DC4C2 0%, #26729F 60%, #6C438A 100%)' }
        }
      >
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(61,196,194,0.25)' }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}><X size={22} className="text-gray-300" /></motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}><MessageSquare size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 6, scale: 0.9 }}
            whileHover={{ opacity: 1, x: 0, scale: 1 }}
            className="absolute right-16 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium pointer-events-none hidden md:flex"
            style={{ background: '#171726', border: '1px solid rgba(61,196,194,0.2)', color: '#3DC4C2', whiteSpace: 'nowrap' }}
          >
            <Sparkles size={11} /> Parler à l'IA
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
