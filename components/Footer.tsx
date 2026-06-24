
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Lock, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const footerLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Tarifs', href: '#pricing' },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative scroll-mt-20" id="contact-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-white block mb-4">
              Tony<span className="text-[#f05a28]">.</span>
            </span>
            <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
              Expert IA & Automatisation Business. Je transforme vos process manuels en systèmes automatisés qui travaillent pour vous 24h/24.
            </p>

            <div className="space-y-3 mb-8 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={14} className="text-[#f05a28]" />
                <a href="tel:0692417749" className="hover:text-white transition-colors">0692 41 77 49</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={14} className="text-[#f05a28]" />
                <a href="mailto:tony.payet.professionnel@gmail.com" className="hover:text-white transition-colors break-all">
                  tony.payet.professionnel@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={14} className="text-[#f05a28]" />
                <span>Saint-Denis 97490, La Réunion</span>
              </div>
            </div>

            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#f05a28]/40 hover:bg-[#f05a28]/8 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">Légal</h4>
            <ul className="space-y-3">
              {['Mentions Légales', 'Confidentialité', 'CGV'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 Tony Payet. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#f05a28]/40 font-medium">Automatisation · IA · Web</span>
            <button
              onClick={onOpenAdmin}
              className="text-gray-700 hover:text-[#f05a28] transition-colors p-1.5 rounded-full"
              title="Accès Admin"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
