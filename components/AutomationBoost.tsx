
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Video, 
  Share2, 
  ShoppingCart, 
  X, 
  Send, 
  Loader2, 
  Globe, 
  User, 
  MessageSquare, 
  Mail,
  Phone,
  BarChart3,
  Layers,
  Activity,
  Users,
  TrendingUp,
  Lightbulb,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SectionTitle } from './ui/CyberComponents';
import { BoostOfferConfig } from '../types';

interface AutomationBoostProps {
  config: BoostOfferConfig;
}

interface AIProposal {
  score: number;
  priority: string;
  quickWin: string;
  expectedGain: string;
}

const AutomationBoost: React.FC<AutomationBoostProps> = ({ config }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiProposal, setAiProposal] = useState<AIProposal | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    businessType: 'ecommerce',
    teamSize: '1-3',
    revenue: '0-5k',
    tools: '',
    hoursLost: '10',
    bottleneck: '',
    description: ''
  });

  const generateAIProposal = async (data: typeof formData) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `En tant qu'expert en automatisation IA (Tony Payet), analyse ce profil business et génère une proposition flash en JSON.
      Profil:
      - Type: ${data.businessType}
      - Équipe: ${data.teamSize} personnes
      - CA: ${data.revenue}/mois
      - Perte de temps: ${data.hoursLost}h/semaine
      - Goulot d'étranglement: ${data.bottleneck}
      - Outils: ${data.tools}
      
      Réponds uniquement en JSON avec cette structure:
      {
        "score": number (0-100 d'automatisation potentielle),
        "priority": "La priorité n°1 à automatiser",
        "quickWin": "Une solution concrète et immédiate",
        "expectedGain": "Gain estimé en heures/mois"
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      return JSON.parse(response.text || '{}') as AIProposal;
    } catch (err) {
      console.error("AI Generation failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Step 1: Generate AI Proposal
    const proposal = await generateAIProposal(formData);
    setAiProposal(proposal);

    // Step 2: Send to Webhook (with fallback)
    try {
      await fetch('https://n8n.tonypayet.com/webhook-test/451ff7f3-b82a-4cce-9993-cf881a9970c0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ai_proposal: proposal,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      // We don't block the user if the webhook fails, the AI proposal is the main value here
      console.warn('Webhook failed but AI proposal generated:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'shopping-cart': return <ShoppingCart className="w-4 h-4 text-cyan-400" />;
      case 'video': return <Video className="w-4 h-4 text-purple-400" />;
      case 'share': return <Share2 className="w-4 h-4 text-yellow-400" />;
      default: return <Zap className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <section id="boost" className="py-24 relative overflow-hidden bg-black scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 text-sm font-bold tracking-widest uppercase mb-6"
          >
            <Rocket className="w-4 h-4" /> Offre Limitée
          </motion.div>
          <SectionTitle 
            title={config.title} 
            subtitle={config.subtitle} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/50 border-l-4 border-red-500 p-8 rounded-r-lg"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-500" /> Le Problème
              </h3>
              <ul className="space-y-4">
                {config.problems.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 group">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/50 border-l-4 border-green-500 p-8 rounded-r-lg"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="text-green-500" /> {config.solution1.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {config.solution1.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {config.solution1.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 border-l-4 border-cyan-500 p-8 rounded-r-lg group"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Video className="text-cyan-500" /> {config.solution2.title}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {config.solution2.description}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {config.solution2.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 bg-black/40 rounded border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                      <div className={`p-2 rounded bg-black/50`}>
                        {getIcon(step.icon)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">{step.title}</p>
                        <p className="text-gray-500 text-xs">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative p-10 bg-gradient-to-br from-zinc-900 to-black border-2 border-yellow-500/50 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.1)] overflow-hidden sticky top-24"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Rocket size={120} />
              </div>
              <h4 className="text-yellow-500 font-orbitron font-black text-2xl mb-2 tracking-tighter">BOOST_OFFER</h4>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-xl text-gray-500 line-through font-mono">{config.pricing.originalPrice}</span>
                   <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 font-bold rounded uppercase tracking-tighter">{config.pricing.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-black text-white">{config.pricing.discountedPrice}</span>
                  <span className="text-gray-500 font-mono">/ fixe</span>
                </div>
              </div>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-3 text-white font-bold">
                  <Clock className="text-yellow-500 w-5 h-5" />
                  Livré en 48 heures chrono
                </div>
                <div className="text-gray-400 text-sm italic">
                  {config.pricing.footerNote}
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-mono">Status: 5 PLACES / SEMAINE</p>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      className="h-full bg-yellow-500"
                    ></motion.div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest rounded hover:bg-yellow-400 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                >
                  Démarrer le Diagnostic <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl my-8 bg-black border border-yellow-500/30 rounded-lg shadow-[0_0_50px_rgba(234,179,8,0.1)] overflow-hidden"
              style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
              
              <div className="p-6 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-base sm:text-2xl font-black text-white font-orbitron tracking-tighter uppercase">DIAGNOSTIC_SYSTEM_V3</h3>
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">Génération de votre plan d'automatisation personnalisé</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white p-1 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-4"
                  >
                    <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                      <Lightbulb className="text-yellow-500 w-8 h-8" />
                    </div>
                    
                    <h4 className="text-white text-lg sm:text-2xl font-black mb-6 font-orbitron uppercase">VOTRE PLAN D'ACTION</h4>

                    {aiProposal ? (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-lg">
                            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Automatisation_Potentielle</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl sm:text-4xl font-black text-yellow-500">{aiProposal.score}%</span>
                                <div className="flex-1 h-2 bg-zinc-800 rounded-full mb-2 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${aiProposal.score}%` }} className="h-full bg-yellow-500" />
                                </div>
                            </div>
                          </div>
                          <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-lg">
                            <p className="text-[10px] text-gray-500 font-mono uppercase mb-1">Gain_Estimé</p>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-green-500 w-5 h-5" />
                                <span className="text-lg sm:text-2xl font-bold text-white">{aiProposal.expectedGain}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-lg space-y-4">
                          <div>
                            <h5 className="text-yellow-500 text-xs font-mono uppercase flex items-center gap-2 mb-2">
                                <Activity size={14} /> Priorité_Stratégique
                            </h5>
                            <p className="text-gray-200 text-sm font-medium leading-relaxed">{aiProposal.priority}</p>
                          </div>
                          <div className="pt-4 border-t border-white/5">
                            <h5 className="text-cyan-500 text-xs font-mono uppercase flex items-center gap-2 mb-2">
                                <Zap size={14} /> Solution_Immédiate (QuickWin)
                            </h5>
                            <p className="text-gray-300 text-sm leading-relaxed">{aiProposal.quickWin}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg flex items-center gap-4">
                           <div className="p-2 bg-blue-500/10 rounded"><FileText className="text-blue-500 w-5 h-5" /></div>
                           <p className="text-xs text-gray-400 font-mono italic">Diagnostic complet envoyé à Tony.AI. Je vous contacte pour le déploiement.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 text-gray-500 font-mono">
                         ANALYSE_PARTIELLE // TRANSMISSION RÉUSSIE
                      </div>
                    )}

                    <button 
                       onClick={() => setIsModalOpen(false)}
                       className="mt-8 py-3 px-8 border border-white/20 text-gray-400 hover:text-white hover:border-white transition-all rounded uppercase text-xs tracking-widest"
                    >
                      Terminer la session
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 1: CONTACT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Full_Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input required type="text" placeholder="Nom Prénom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Work_Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input required type="email" placeholder="email@pro.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Direct_Line</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input required type="tel" placeholder="06 XX XX XX XX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Website_URL</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <input required type="url" placeholder="https://..." value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani" />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: BUSINESS EVALUATION */}
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-500 font-mono uppercase">Business_Type</label>
                          <select value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani appearance-none">
                            <option value="ecommerce">E-commerce</option>
                            <option value="agency">Agence / Service</option>
                            <option value="saas">SaaS / Software</option>
                            <option value="content">Content Creator</option>
                            <option value="other">Autre</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-500 font-mono uppercase">Team_Size</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <select value={formData.teamSize} onChange={e => setFormData({...formData, teamSize: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 pl-10 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani appearance-none">
                              <option value="1">Solo (1)</option>
                              <option value="2-5">2-5 pers.</option>
                              <option value="6-15">6-15 pers.</option>
                              <option value="15+">15+ pers.</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-gray-500 font-mono uppercase">Est. Revenue</label>
                          <select value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani appearance-none">
                            <option value="0-5k">0 - 5k€ / mois</option>
                            <option value="5k-20k">5k - 20k€ / mois</option>
                            <option value="20k-100k">20k - 100k€ / mois</option>
                            <option value="100k+">100k+ / mois</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-500 font-mono uppercase">Main_Bottleneck (Qu'est-ce qui vous freine ?)</label>
                        <input required type="text" placeholder="Ex: Saisie manuelle de commandes, Gestion client..." value={formData.bottleneck} onChange={e => setFormData({...formData, bottleneck: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 rounded p-3 text-white text-sm focus:border-yellow-500/50 outline-none font-rajdhani" />
                      </div>

                      <div className="space-y-3">
                         <div className="flex justify-between items-center">
                            <label className="text-[10px] text-gray-500 font-mono uppercase">Time_Waste (hours/week)</label>
                            <span className="text-yellow-500 font-bold font-mono text-sm">{formData.hoursLost}h</span>
                         </div>
                         <input type="range" min="1" max="60" step="1" value={formData.hoursLost} onChange={e => setFormData({...formData, hoursLost: e.target.value})} className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest rounded hover:bg-yellow-400 transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            ANALYSING_BUSINESS_PROFILE...
                          </>
                        ) : (
                          <>
                            GÉNÉRER MON PLAN D'ACTION <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AutomationBoost;
