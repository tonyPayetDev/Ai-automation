import React from 'react';
import { Radar } from 'lucide-react';

/* Les outils en orbite autour de la boule d'énergie.
 *
 * Ils étaient auparavant alignés en puces sous le rôle, en haut du cadre :
 * une liste posée à côté de l'image, sans rapport avec ce qui se passe à
 * l'écran. Ici ils tournent autour de la boule, et ils s'allument avec elle.
 *
 * Les glyphes viennent de Simple Icons (fichiers en CC0), déposés dans
 * `public/icons/` — pas d'appel à un CDN, le site reste autonome. Ce sont les
 * assets officiels de la banque, pas des logos redessinés à la main : c'est
 * précisément ce que cette banque existe pour permettre.
 *
 * Ils sont colorés par `mask-image` plutôt qu'affichés en <img> : une image
 * SVG ne se teinte pas, alors qu'un masque prend la couleur du fond et suit
 * donc l'allumage de la boule.
 *
 * Le scraper garde un pictogramme générique : « Scraper » n'est pas une
 * marque, et coller le logo d'un outil précis affirmerait lequel est utilisé.
 */

type Outil = { nom: string; masque?: string; Icone?: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }> };

const OUTILS: Outil[] = [
  { nom: 'Claude Code', masque: '/icons/claude.svg' },
  { nom: 'ChatGPT', masque: '/icons/openai.svg' },
  { nom: 'n8n', masque: '/icons/n8n.svg' },
  { nom: 'Scraper', Icone: Radar },
];

/* Centre de la boule dans le cadre, relevé sur le clip. La vidéo est en
   object-cover : ces valeurs suivent l'image, pas la fenêtre. */
const CX = 45;
const CY = 61;

const OrbiteOutils: React.FC<{ av: number }> = ({ av }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10"
    style={{ opacity: Math.min(1, av * 1.15) }}
  >
    {OUTILS.map((o, i) => {
      /* Chaque outil entre après le précédent, sur l'allumage de la boule —
         même rampe courte que le nom, sinon rien n'est lisible avant la fin
         de l'explosion. */
      const seuil = 0.28 + i * 0.09;
      const p = Math.max(0, Math.min(1, (av - seuil) / 0.24));

      /* Position sur le cercle. On part de midi et on tourne d'un quart de
         tour par outil ; le rayon s'ouvre légèrement pendant l'apparition,
         ce qui donne l'impression qu'ils sont éjectés par la boule. */
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / OUTILS.length;
      const rayon = 17 + p * 5;                 // en % de la largeur du cadre
      const x = CX + Math.cos(angle) * rayon;
      const y = CY + Math.sin(angle) * rayon * 0.62;   // aplati : le cadre est vertical

      return (
        <div
          key={o.nom}
          title={o.nom}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%,-50%) scale(${(0.72 + p * 0.28).toFixed(3)})`,
            opacity: p,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              width: 'clamp(22px, 3.2vw, 34px)',
              height: 'clamp(22px, 3.2vw, 34px)',
              borderRadius: 999,
              border: '1px solid rgba(61,196,194,.45)',
              background: 'rgba(12,13,24,.55)',
              backdropFilter: 'blur(4px)',
              boxShadow: `0 0 ${(8 + p * 14).toFixed(0)}px rgba(61,196,194,${(0.25 + p * 0.35).toFixed(2)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {o.masque ? (
              <span
                style={{
                  display: 'block',
                  width: '58%',
                  height: '58%',
                  backgroundColor: '#3DC4C2',
                  WebkitMaskImage: `url(${o.masque})`,
                  maskImage: `url(${o.masque})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            ) : (
              o.Icone && <o.Icone size={14} strokeWidth={1.9} color="#3DC4C2" />
            )}
          </div>
          <span
            style={{
              fontSize: 'clamp(7px, .68vw, 9.5px)',
              fontWeight: 600,
              letterSpacing: '.07em',
              color: '#CFEFEE',
              textShadow: '0 1px 4px rgba(0,0,0,.95)',
              whiteSpace: 'nowrap',
            }}
          >
            {o.nom}
          </span>
        </div>
      );
    })}
  </div>
);

export default OrbiteOutils;
