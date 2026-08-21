import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsMatrix from './components/SkillsMatrix';
import Process from './components/Timeline';
import FAQ from './components/FAQ';
import Services from './components/Services';
import AutomationBoost from './components/AutomationBoost';
import Portfolio from './components/Portfolio';
import Videos from './components/Videos';
import LiveNow from './components/LiveNow';
// import Testimonials from './components/Testimonials'; // en pause (placeholders)
import Pricing from './components/Pricing';
import Contact from './components/Contact';
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
  subtitle: "Économisez 15h/semaine dès la première semaine — garanti ou remboursé",
  problems: [
    "Vous passez des heures sur des tâches répétitives (devis, relances, commandes, publications...)",
    "Chaque heure perdue en admin = une heure de moins à servir vos clients ou développer votre activité",
    "Vous savez qu'il existe des outils, mais vous n'avez pas le temps de les configurer",
    "Votre concurrent automatisé avance 3x plus vite que vous"
  ],
  solution1: {
    title: "Solution #1 : Automatisation Sur-Mesure",
    description: "J'identifie la tâche qui vous coûte le plus de temps et je l'automatise complètement en 48h.",
    items: [
      "Réponses automatiques aux demandes de réservation (restaurants, prestataires)",
      "Génération et envoi de devis automatique",
      "Relances clients et suivi de paiement",
      "Publication automatique sur vos réseaux sociaux",
      "Traitement des commandes e-commerce sans intervention manuelle"
    ]
  },
  solution2: {
    title: "Solution #2 : Visibilité Automatique",
    description: "Votre business tourne et se fait connaître même quand vous dormez :",
    steps: [
      { title: "Détection automatique des événements", desc: "Nouvelle commande, avis client, demande de contact — tout est capté.", icon: "shopping-cart" },
      { title: "Contenu généré par IA", desc: "Posts, stories, réponses aux avis créés automatiquement à votre image.", icon: "video" },
      { title: "Publication multi-canaux", desc: "Google, Instagram, Facebook, TikTok — mis à jour sans effort de votre part.", icon: "share" }
    ]
  },
  pricing: {
    originalPrice: "1 500 €",
    discountedPrice: "900 €",
    label: "-40%",
    footerNote: "* Satisfait ou remboursé sous 7 jours. Paiement en 2x450€ possible. Sans abonnement."
  }
};

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [heroMedia, setHeroMedia] = useState<{ type: 'image' | 'video', src: string }>({
    type: 'video',
    src: 'videos/tony-portrait-v2.mp4'
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
    <div className="relative min-h-screen bg-[#0C0D18] text-[#D1C5E0]">
      <Navbar />

      <main>
        <Hero media={heroMedia} />
        <LiveNow />
        <SkillsMatrix />
        <AutomationBoost config={activeOffer} />
        <SystemMonitor />
        <Process />
        <Services />
        <Portfolio />
        <Videos />
        {/* <Testimonials /> — en attente de 3 vrais verbatims clients avant mise en prod */}
        <Pricing />
        <FAQ />
        <Contact />
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
