import React, { useEffect, useRef, useState } from 'react';
import { Play, MousePointerClick, ExternalLink, CalendarCheck, MessageCircle, Search } from 'lucide-react';
import { SectionTitle } from './ui/CyberComponents';
import { signaler } from './interet';

// Every demo below is already public. Nothing loads before the visitor taps:
// the card shows a still image, the video or the page is only fetched on click.

type Demo = {
  slug: string;
  kind: 'video' | 'page' | 'youtube';
  badge: string;
  title: string;
  text: string;
  poster: string;
  src: string;
  tall?: boolean;
  extra?: { label: string; href: string; slug: string };
};

const ASSETS = 'https://assets.automatisationboost.com/previsualisation';

const DEMOS: Demo[] = [
  {
    slug: 'journal-ia',
    kind: 'video',
    badge: 'Vidéo · tourne chaque matin',
    title: 'Une vidéo d’actualité prête chaque matin, sans moi',
    text: 'Une automatisation rassemble l’actualité, écrit le texte, monte la vidéo et prépare la page qui l’accompagne. Voici l’édition d’aujourd’hui.',
    poster: '/demos/journal-ia.jpg',
    src: `${ASSETS}/journal-ia-2026-10-06-bn/video-v5.mp4`,
    extra: {
      label: 'Voir la page publiée ce matin',
      href: 'https://automatisationboost.com/ressources/journal-ia-2026-10-06.html',
      slug: 'journal-ia-page',
    },
  },
  {
    slug: 'foodboost-editeur',
    kind: 'page',
    badge: 'Démo à essayer',
    title: 'Vos photos deviennent des publications prêtes',
    text: 'À partir des photos d’un restaurant, l’outil propose les visuels et les textes. Vous choisissez, il programme.',
    poster: '/demos/foodboost-editeur.jpg',
    src: 'https://resto.automatisationboost.com/foodboost-editeur/?client=arbradelis',
  },
  {
    slug: 'feed-exemple',
    kind: 'page',
    badge: 'Exemple réel',
    title: 'Votre compte Instagram, avant même d’avoir posté',
    text: 'Un aperçu complet du compte d’un restaurant, construit automatiquement à partir de ses propres photos.',
    poster: '/demos/feed-demo.jpg',
    src: 'https://resto.automatisationboost.com/demo/arbradelis/',
  },
  {
    slug: 'studio-video',
    kind: 'page',
    badge: 'Démo à essayer',
    title: 'Un studio vidéo aux couleurs de votre marque',
    text: 'On choisit un angle, on ajuste le texte, la vidéo se prépare aux couleurs de l’enseigne. Conçu pour un bar à jus.',
    poster: '/demos/befresh-studio.jpg',
    src: 'https://previsualisation.automatisationboost.com/befresh-studio/',
  },
  {
    slug: 'refonte-immo',
    kind: 'page',
    badge: 'Prototype',
    title: 'Prototype de refonte pour une agence immobilière',
    text: 'Un site haut de gamme pensé d’abord pour le téléphone : recherche de biens, annonces mises en avant, contact en un geste.',
    poster: '/demos/refonte-immo.jpg',
    src: 'https://previsualisation.automatisationboost.com/koytcha-refonte-v5/',
  },
  {
    slug: 'video-4h-0',
    kind: 'youtube',
    badge: 'Vidéo · 1 min',
    title: '4 heures de montage par vidéo → 0',
    text: 'Le système qui prépare et publie mes vidéos pendant que je fais autre chose.',
    poster: '/demos/video-4h.jpg',
    src: 'https://www.youtube-nocookie.com/embed/GD2ujCF2IiM?autoplay=1&playsinline=1&rel=0&enablejsapi=1',
    tall: true,
  },
  {
    slug: 'audit-clients',
    kind: 'video',
    badge: 'Vidéo · 30 s',
    title: 'Savoir où votre entreprise perd des clients',
    text: 'Quelques questions, et un audit écrit qui montre où les demandes se perdent — sans appel commercial.',
    poster: '/demos/09-audit-deux-minutes.jpg',
    src: `${ASSETS}/split-preuve-09-audit-deux-minutes/video.mp4`,
  },
  {
    slug: 'site-vers-feed',
    kind: 'video',
    badge: 'Vidéo · 30 s',
    title: 'Votre site devient votre fil Instagram',
    text: 'Le site existant sert de matière : photos et textes sont repris et transformés en publications cohérentes.',
    poster: '/demos/17-site-devient-feed.jpg',
    src: `${ASSETS}/split-preuve-17-site-devient-feed/video.mp4`,
  },
];

const WA_CV = 'https://wa.me/262692417749?text=Bonjour%20Tony%2C%20j%27ai%20vu%20votre%20CV%20interactif';

const VideoPlayer: React.FC<{ d: Demo }> = ({ d }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { ref.current?.play().catch(() => {}); }, []);
  const onTime = () => {
    const v = ref.current;
    if (v && v.duration && v.currentTime / v.duration >= 0.75) signaler('demo_fin', d.slug);
  };
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full bg-black object-contain"
      src={d.src}
      poster={d.poster}
      playsInline
      controls
      preload="none"
      onPlay={() => signaler('demo_lue', d.slug)}
      onTimeUpdate={onTime}
      onEnded={() => signaler('demo_fin', d.slug)}
    />
  );
};

const YouTubePlayer: React.FC<{ d: Demo }> = ({ d }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // The YouTube player reports its state by postMessage once asked to.
    const onMsg = (e: MessageEvent) => {
      if (!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(String(e.origin))) return;
      let data: any = e.data;
      try { if (typeof data === 'string') data = JSON.parse(data); } catch { return; }
      const state = data?.info?.playerState;
      if (state === 1) signaler('demo_lue', d.slug);
      if (state === 0) signaler('demo_fin', d.slug);
      const t = data?.info?.currentTime, dur = data?.info?.duration;
      if (t && dur && t / dur >= 0.75) signaler('demo_fin', d.slug);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [d.slug]);
  const listen = () => {
    try {
      ref.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: d.slug }), '*');
    } catch { /* ignore */ }
  };
  return (
    <iframe
      ref={ref}
      className="absolute inset-0 h-full w-full"
      src={d.src}
      title={d.title}
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      onLoad={listen}
    />
  );
};

const DemoCard: React.FC<{ d: Demo }> = ({ d }) => {
  const [open, setOpen] = useState(false);
  const isPage = d.kind === 'page';
  const start = () => {
    signaler('demo_ouverte', d.slug);
    setOpen(true);
  };
  // Vertical videos keep their 9:16 frame once playing; pages get a tall,
  // usable viewport; the still image is cropped to keep the grid compact.
  const frame = open
    ? isPage ? 'h-[78vh] min-h-[520px] max-h-[860px]' : 'aspect-[9/16] max-h-[82vh] mx-auto w-full'
    : 'aspect-[4/5]';

  return (
    <article
      data-demo={d.slug}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#171726] transition-colors hover:border-[#3DC4C2]/35"
    >
      <div className={`relative overflow-hidden bg-black ${frame}`}>
        {!open ? (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#3DC4C2]"
            aria-label={`${isPage ? 'Essayer ici' : 'Lancer la vidéo'} : ${d.title}`}
          >
            <img
              src={d.poster}
              alt=""
              loading="lazy"
              decoding="async"
              width={360}
              height={640}
              className="h-full w-full object-cover object-top opacity-85 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0D18] via-[#0C0D18]/10 to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#3DC4C2] px-4 py-2.5 text-sm font-semibold text-[#0C0D18] shadow-lg shadow-black/40">
              {isPage ? <MousePointerClick size={16} /> : <Play size={16} fill="currentColor" />}
              {isPage ? 'Essayer ici' : 'Lancer la vidéo'}
            </span>
          </button>
        ) : d.kind === 'video' ? (
          <VideoPlayer d={d} />
        ) : d.kind === 'youtube' ? (
          <YouTubePlayer d={d} />
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full bg-white"
            src={d.src}
            title={d.title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => signaler('demo_lue', d.slug)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3DC4C2]">{d.badge}</span>
        <h3 className="text-lg font-bold leading-snug text-white">{d.title}</h3>
        <p className="text-sm leading-relaxed text-[#B9B0C9]">{d.text}</p>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm">
          {open && isPage && (
            <a
              href={d.src}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-[#3DC4C2] underline-offset-4 hover:underline"
            >
              Ouvrir en plein écran <ExternalLink size={14} />
            </a>
          )}
          {d.extra && (
            <a
              href={d.extra.href}
              target="_blank"
              rel="noopener"
              onClick={() => signaler('demo_ouverte', d.extra!.slug)}
              className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-[#3DC4C2] underline-offset-4 hover:underline"
            >
              {d.extra.label} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Demos: React.FC = () => (
  <section id="demos" className="relative scroll-mt-20 py-20 md:py-28">
    <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#3DC4C2]/20 to-transparent" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
      <SectionTitle title="Des démos à essayer ici" subtitle="Démos" />
      <p className="-mt-10 mb-10 max-w-2xl text-base leading-relaxed text-[#B9B0C9]">
        Plutôt que de longues explications, voici ce que je construis, en vrai. Touchez une carte :
        la vidéo se lance ou la démo s’ouvre sur place.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d) => <DemoCard key={d.slug} d={d} />)}
      </div>

      <div data-interet="demos-bas" className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
        <a
          href="#audit"
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-2xl bg-[#3DC4C2] px-6 py-4 text-center text-base font-bold text-[#0C0D18] transition-colors hover:bg-white"
        >
          <CalendarCheck size={20} /> Réserver l’audit gratuit
        </a>
        <a
          href={WA_CV}
          target="_blank"
          rel="noopener"
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-2xl border border-[#2fa768] bg-[#1f7a4c] px-6 py-4 text-center text-base font-bold text-white transition-colors hover:bg-[#2fa768]"
        >
          <MessageCircle size={20} /> Écrire sur WhatsApp
        </a>
        <a
          href="#audit"
          className="flex min-h-[60px] items-center justify-center gap-2 rounded-2xl border border-[#3DC4C2]/50 bg-[#3DC4C2]/10 px-6 py-4 text-center text-base font-bold text-[#3DC4C2] transition-colors hover:bg-[#3DC4C2]/20"
        >
          <Search size={20} /> Voir ce qui peut tourner seul chez moi
        </a>
      </div>
    </div>
  </section>
);

export default Demos;
