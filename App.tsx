
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsMatrix from './components/SkillsMatrix';
import Timeline from './components/Timeline';
import Services from './components/Services';
import AutomationBoost from './components/AutomationBoost';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AdminPanel from './components/AdminPanel';
import SystemMonitor from './components/SystemMonitor';
import { BoostOfferConfig } from './types';

const DEFAULT_OFFER: BoostOfferConfig = {
  id: 'variant-a',
  active: true,
  name: 'Variante Alpha',
  title: "Automation Boost 48H",
  subtitle: "Gagne 10 à 20 heures par semaine immédiatement",
  problems: [
    "Tu perds des heures sur des tâches répétitives",
    "Tu sais que l’automatisation existe, mais tu ne passes jamais à l’action",
    "Tu testes des outils, mais rien n’est vraiment connecté",
    "Ton business avance, mais trop lentement"
  ],
  solution1: {
    title: "Solution #1 : Système Sur-Mesure",
    description: "Je mets en place UNE automatisation IA personnalisée, livrée en 48h.",
    items: [
      "Auto-publication SEO",
      "Upload produits e-commerce",
      "Ajout de produits automatique",
      "Nettoyage IA (images / data)",
      "Installation de chatbot et analyse concurrentielle"
    ]
  },
  solution2: {
    title: "Solution #2 : Content Factory IA",
    description: "Automatise ta création + publication de contenu sans lever le petit doigt :",
    steps: [
      { title: "Trigger Shopify / Dropizi", desc: "Nouveau produit détecté automatiquement.", icon: "shopping-cart" },
      { title: "Génération Vidéo Automatique", desc: "Création d'un format UGC / RS dynamique via IA.", icon: "video" },
      { title: "Multi-Posting Instantané", desc: "TikTok, Instagram, Shorts & Reels publiés d'un coup.", icon: "share" }
    ]
  },
  pricing: {
    originalPrice: "999 €",
    discountedPrice: "900 €",
    label: "REMISE_LIMITEE",
    footerNote: "* Pas d’abonnement, pas de coûts cachés. Paiement en 2x450€ possible."
  }
};

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [heroMedia, setHeroMedia] = useState<{ type: 'image' | 'video', src: string }>({
    type: 'image',
    src: 'https://raw.githubusercontent.com/tonyPayetDev/Ai-automation/main/tony-visage.jpg'
  });

  const [activeOffer, setActiveOffer] = useState<BoostOfferConfig>(() => {
    const saved = localStorage.getItem('tony_ai_active_offer');
    return saved ? JSON.parse(saved) : DEFAULT_OFFER;
  });

  const handleUpdateHero = (type: 'image' | 'video', src: string) => {
    setHeroMedia({ type, src });
  };

  const handleUpdateOffer = (newConfig: BoostOfferConfig) => {
    setActiveOffer(newConfig);
    localStorage.setItem('tony_ai_active_offer', JSON.stringify(newConfig));
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
      <div className="scanline"></div>
      
      <Navbar />
      
      <main>
        <Hero media={heroMedia} />
        <SkillsMatrix />
        <AutomationBoost config={activeOffer} />
        <SystemMonitor />
        <Timeline />
        <Services />
        <Portfolio />
        <Pricing />
      </main>
      
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <ChatWidget />
      
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onUpdateHero={handleUpdateHero}
        activeOffer={activeOffer}
        onUpdateOffer={handleUpdateOffer}
      />
    </div>
  );
}

export default App;
