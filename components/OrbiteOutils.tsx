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

/* Centre de la boule dans le cadre, relevé sur une capture du site en ligne :
   le cadre vidéo mesurait 485 × 590 px et la boule était centrée à 407,575 —
   soit 48 % en largeur et 50 % en hauteur. Un premier jet à (45, 61) plaçait
   l'orbite trop bas, sur la main plutôt que sur la boule.

   RAYON est en % de la LARGEUR ; comme le cadre est plus haut que large, l'axe
   vertical est corrigé par APLATI = largeur/hauteur, sinon le cercle devient
   un ovale étiré. La boule fait ~15 % de rayon : 21 % laisse un peu d'air. */
const CX = 48;
const CY = 50;
const RAYON = 21;
const APLATI = 0.82;

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
      const rayon = RAYON - 4 + p * 4;          // s'ouvre pendant l'apparition
      const x = CX + Math.cos(angle) * rayon;
      const y = CY + Math.sin(angle) * rayon * APLATI;

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
              /* Mesuré en ligne : la première version tombait à clamp() = 22px
                 sur mobile, et le glyphe à l'intérieur ne faisait plus que 8px
                 — illisible. La borne basse suit maintenant la largeur du
                 cadre, pas une valeur fixe trop prudente. */
              width: 'clamp(30px, 7.2vw, 46px)',
              height: 'clamp(30px, 7.2vw, 46px)',
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
                  width: '60%',
                  height: '60%',
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
              o.Icone && <o.Icone size={18} strokeWidth={1.9} color="#3DC4C2" />
            )}
          </div>
          <span
            style={{
              fontSize: 'clamp(9px, 2.4vw, 11px)',
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
