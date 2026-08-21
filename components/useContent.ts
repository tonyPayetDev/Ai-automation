import { useEffect, useState } from 'react';

export interface StatItem { id: string; label: string; value: number; suffix?: string }
export interface WorkItem { id: string; label: string; tag: string }
export interface SiteItem { id: string; title: string; category: string; url: string; image: string }
export interface VideoItem { id: string; title: string; subtitle?: string; src: string }

export interface SiteContent {
  meta: { updated: string; cadence: string; note?: string };
  stats: StatItem[];
  currentWork: WorkItem[];
  featuredSites: SiteItem[];
  videos: VideoItem[];
}

// Fallback baked in so sections always render even if /content.json fails to load.
export const FALLBACK_CONTENT: SiteContent = {
  meta: { updated: '2026-08-21', cadence: 'Mis à jour toutes les 2 semaines' },
  stats: [
    { id: 'videos', label: 'Vidéos IA produites', value: 120, suffix: '+' },
    { id: 'workflows', label: 'Automatisations construites', value: 500, suffix: '+' },
    { id: 'delai', label: 'Délai de livraison', value: 48, suffix: 'h' },
  ],
  currentWork: [
    { id: 'cw1', label: 'Header vidéo cinématique — Koytcha Immo', tag: 'En cours de livraison' },
    { id: 'cw2', label: 'Journal IA quotidien — publication automatisée', tag: 'En production' },
    { id: 'cw3', label: 'Vitrine vidéo food IA — BeFresh Events', tag: 'En cours' },
  ],
  featuredSites: [
    { id: 'fusionia', title: 'FusionIA', category: 'App IA — fusion de personnages en vidéo', url: 'https://fusionia.app', image: 'https://image.thum.io/get/width/1200/crop/900/https://fusionia.app' },
    { id: 'koytcha', title: 'Koytcha Immo', category: 'Immobilier — Réunion', url: 'https://koytchaimmo.re', image: 'https://image.thum.io/get/width/1200/crop/900/https://koytchaimmo.re' },
    { id: 'bourbon', title: 'Bourbon Voyages', category: 'Offres voyages — landing conversion', url: 'https://offres.bourbonvoyages.fr', image: 'https://image.thum.io/get/width/1200/crop/900/https://offres.bourbonvoyages.fr' },
    { id: 'autoboost', title: 'Automatisation Boost', category: 'SaaS — automatisation réseaux par IA', url: 'https://automatisationboost.com', image: 'https://image.thum.io/get/width/1200/crop/900/https://automatisationboost.com' },
  ],
  videos: [
    { id: 'videoboost-luxe-01', title: 'Publicité luxe', subtitle: 'Générée par VideoBoost', src: 'https://previsualisation.automatisationboost.com/videoboost-luxe-01/video.mp4' },
    { id: 'videoboost-star', title: 'Format signature', subtitle: 'Générée par VideoBoost', src: 'https://previsualisation.automatisationboost.com/videoboost-star/video.mp4' },
    { id: 'essai-ego', title: 'Essai contemplatif', subtitle: 'Un seul prompt, aucun montage', src: 'https://previsualisation.automatisationboost.com/essai-ego-tom-odell/video.mp4' },
    { id: 'prompt-reveal', title: 'Prompt reveal', subtitle: 'Keynote animée', src: 'https://previsualisation.automatisationboost.com/prompt-reveal-05/video.mp4' },
  ],
};

export function useContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(FALLBACK_CONTENT);
  useEffect(() => {
    let alive = true;
    fetch('content.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => { if (alive && data) setContent({ ...FALLBACK_CONTENT, ...data }); })
      .catch(() => { /* keep fallback */ });
    return () => { alive = false; };
  }, []);
  return content;
}
