import React, { useEffect, useRef, useState } from 'react';
import OrbiteOutils from './OrbiteOutils';

/**
 * Vidéo d'en-tête : le clip de Tony, en boucle, dans le cadre du portrait.
 *
 * Trois règles tenues ici, et pas ailleurs :
 *
 * 1. Le son ne se coupe PAS au défilement. Un observateur d'intersection qui
 *    met la vidéo en pause dès qu'elle sort du cadre produisait exactement le
 *    défaut signalé : « la musique s'arrête au scroll ». Une fois que la
 *    personne a demandé le son, il continue jusqu'à ce qu'elle le coupe.
 *    On ne met en pause que l'image, jamais l'audio, et seulement quand
 *    l'onglet passe en arrière-plan.
 *
 * 2. La lecture démarre muette. Aucun navigateur ne laisse démarrer du son
 *    sans geste de l'utilisateur : sans `muted`, l'appel à play() est rejeté
 *    et le cadre reste noir. D'où le bouton.
 *
 * 3. Le prénom apparaît QUAND LA BOULE S'ALLUME, pas à un instant choisi au
 *    hasard. Les bornes ci-dessous sont mesurées sur le clip lui-même
 *    (luminance image par image, 10 images/s) :
 *      · 3,3 s  la boule franchit 35 % de son pic lumineux
 *      · 5,5 s  pic
 *      · 6,8 s  extinction
 *    On lit `currentTime` plutôt que de lancer un minuteur : à chaque boucle
 *    de la vidéo l'animation se recale toute seule. Un minuteur, lui,
 *    dériverait dès le premier tour.
 */

/* Les outils ne sont plus une liste posée en haut du cadre : ils tournent
   autour de la boule et s'allument avec elle. Voir `OrbiteOutils`, qui porte
   aussi le choix des glyphes (assets Simple Icons, CC0, servis localement). */

const DEBUT = 3.3;      // la boule s'allume
const PLEIN = 4.2;      // prénom entièrement lisible
const SORTIE = 5.9;     // début de la disparition
const FIN = 6.9;        // plus rien

const HeroVideo: React.FC<{ src: string; poster?: string; nom?: string; role?: string }> = ({
  src, poster, nom = 'TONY PAYET', role = 'EXPERT IA',
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [sonActif, setSonActif] = useState(false);
  const [av, setAv] = useState(0);          // 0 → 1, l'avancement du réveil

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const lancer = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    lancer();

    /* Onglet caché : on suspend pour ne pas consommer de batterie. Au retour,
       on relance — et le son revient s'il était actif, puisque `muted` n'a pas
       été touché. */
    const surVisibilite = () => { if (document.hidden) v.pause(); else lancer(); };
    document.addEventListener('visibilitychange', surVisibilite);

    const doux = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (doux) {
      setAv(1);
      return () => document.removeEventListener('visibilitychange', surVisibilite);
    }

    /* requestAnimationFrame plutôt que l'événement `timeupdate` : ce dernier
       ne se déclenche que 4 à 8 fois par seconde selon le navigateur, ce qui
       hacherait une apparition de 0,9 s. */
    let raf = 0;
    const suivre = () => {
      const t = v.currentTime;
      let a = 0;
      if (t >= DEBUT && t < PLEIN) a = (t - DEBUT) / (PLEIN - DEBUT);
      else if (t >= PLEIN && t < SORTIE) a = 1;
      else if (t >= SORTIE && t < FIN) a = 1 - (t - SORTIE) / (FIN - SORTIE);
      setAv(a);
      raf = requestAnimationFrame(suivre);
    };
    raf = requestAnimationFrame(suivre);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', surVisibilite);
    };
  }, []);

  const basculer = () => {
    const v = ref.current;
    if (!v) return;
    const prochain = !sonActif;
    /* Une seule source sonore à la fois : si une autre vidéo de la page joue
       déjà, on la coupe plutôt que de superposer deux bandes-son. */
    if (prochain) {
      document.querySelectorAll('video').forEach((o) => { if (o !== v) (o as HTMLVideoElement).muted = true; });
    }
    v.muted = !prochain;
    v.volume = 1;
    setSonActif(prochain);
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  };

  const lettres = nom.split('');

  return (
    <div className="absolute inset-0">
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        /* `metadata` ne télécharge que l'en-tête : le clip ne commence à se
           charger qu'à l'appel de play(), et la première image mesurée en
           conditions réelles arrivait 5,98 s après l'ouverture de la page.
           Tout le reste étant calé sur `currentTime`, ce retard décale ce que
           voit le visiteur sans rien casser — mais il repousse l'explosion
           d'autant. `auto` met le clip en file dès le chargement. */
        preload="auto"
        className="w-full h-full object-cover"
      />

      {/* Voile sombre sous le nom.
       *
       * Sans lui, le nom est illisible exactement au moment où il compte : la
       * boule s'allume, la scène passe au clair, et du texte blanc sur fond
       * clair disparaît. Une ombre portée ne suffit pas sur un fond aussi
       * mouvant. Le voile suit l'apparition (`av`), donc il n'assombrit jamais
       * l'image quand le nom n'est pas là. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[46%]"
        style={{
          opacity: av,
          background: 'linear-gradient(to bottom, rgba(5,7,14,.80) 0%, rgba(5,7,14,.55) 45%, rgba(5,7,14,0) 100%)',
        }}
      />

      {/* Réveil du prénom — calé sur l'allumage de la boule.
          `data-hero-nom` sert de prise pour les contrôles de rendu : la page
          compte plusieurs blocs décoratifs `aria-hidden`, et viser par
          position en attrapait un autre. */}
      <div
        data-hero-nom
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 flex flex-col items-start gap-1 px-3 sm:px-4 top-[2%] sm:top-[4.5%]"
        style={{ opacity: av }}
      >
        <span
          className="flex"
          style={{
            filter: `drop-shadow(0 0 ${(8 + av * 18).toFixed(0)}px rgba(61,196,194,${(av * 0.8).toFixed(2)}))`
              + ` drop-shadow(0 2px 6px rgba(0,0,0,.9))`,
          }}
        >
          {lettres.map((l, i) => {
            /* Chaque lettre part un peu après la précédente : l'ensemble
               s'allume comme la boule, pas d'un bloc.
             *
             * Le retard est réparti sur une FRACTION du réveil, jamais en pas
             * fixe. Avec `retard = i * 0.13`, la 9e lettre atteignait 1.04 :
             * le diviseur `1 - retard` passait alors NÉGATIF et inversait la
             * rampe. Résultat visible à l'écran sur « TONY PAYET » — le « ET »
             * final apparaissait d'un coup, en place et à pleine opacité,
             * pendant que « PAY » était encore invisible et que « TONY »
             * montait encore. Tout nom de 9 caractères ou plus cassait.
             * Ici le diviseur vaut 1 - ETALEMENT, constant et positif, quelle
             * que soit la longueur du nom. */
            const ETALEMENT = 0.5;
            const retard = (i / Math.max(1, lettres.length - 1)) * ETALEMENT;
            const p = Math.max(0, Math.min(1, (av - retard) / (1 - ETALEMENT)));
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  color: '#EAF7F7',
                  /* Plus Jakarta Sans, et pas Inter : la page ne charge Inter
                     qu'en 300→600. Demander 800 à Inter donnait un faux gras
                     synthétique — des lettres molles et grisâtres, mesurées à
                     2,9:1 de contraste. Jakarta est chargé jusqu'en 800 et
                     c'est déjà la police d'affichage du site. */
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(16px, 1.8vw, 24px)',
                  lineHeight: 1,
                  textShadow: '0 1px 2px rgba(0,0,0,.95), 0 0 8px rgba(0,0,0,.85)',
                  letterSpacing: `${(0.26 - p * 0.16).toFixed(3)}em`,
                  transform: `translateY(${((1 - p) * 16).toFixed(1)}px)`,
                  opacity: p,
                }}
              >
                {l === ' ' ? '\u00A0' : l}
              </span>
            );
          })}
        </span>

        <span
          style={{
            /* Décalé d'un cran : le rôle arrive quand le nom est déjà lisible. */
            opacity: Math.max(0, Math.min(1, (av - 0.45) / 0.55)).toFixed(3),
            transform: `translateY(${((1 - Math.max(0, Math.min(1, (av - 0.45) / 0.55))) * 10).toFixed(1)}px)`,
            color: '#7FE6E4',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(10px, 1vw, 13px)',
            letterSpacing: '.22em',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,.95)',
            filter: `drop-shadow(0 0 ${(6 + av * 12).toFixed(0)}px rgba(61,196,194,.75)) drop-shadow(0 2px 5px rgba(0,0,0,.9))`,
          }}
        >
          {role}
        </span>

      </div>

      {/* Les outils en orbite autour de la boule — voir OrbiteOutils. */}
      <OrbiteOutils av={av} />

      <button
        type="button"
        onClick={basculer}
        aria-pressed={sonActif}
        aria-label={sonActif ? 'Couper le son' : 'Activer le son'}
        className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/25
                   bg-[#0C0D18]/75 px-2.5 py-1.5 sm:px-3 text-[11px] font-semibold tracking-wide text-white
                   backdrop-blur-md transition hover:bg-[#0C0D18]/90
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3DC4C2]"
      >
        <span aria-hidden="true">{sonActif ? '🔊' : '🔇'}</span>
        <span className="hidden sm:inline">{sonActif ? 'Couper le son' : 'Activer le son'}</span>
      </button>
    </div>
  );
};

export default HeroVideo;
