
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
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative scroll-mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold tracking-widest text-white block mb-4">
              TONY<span className="text-yellow-500">.AI</span>
            </span>
            <p className="text-gray-400 max-w-sm mb-6">
              Développeur web expert & Spécialiste IA. Je transforme vos idées en systèmes digitaux performants.
            </p>
            
            <div className="space-y-3 mb-6 font-mono text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={16} className="text-yellow-500" />
                    <a href="tel:0692417749" className="hover:text-yellow-500 transition-colors">0692 41 77 49</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={16} className="text-yellow-500" />
                    <a href="mailto:tony.payet.professionnel@gmail.com" className="hover:text-yellow-500 transition-colors break-all">tony.payet.professionnel@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={16} className="text-yellow-500" />
                    <span>Saint-Denis 97490, Réunion</span>
                </div>
            </div>

            <div className="flex space-x-4">
              {[Github, Linkedin, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-500 hover:text-yellow-500 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3">
              {['Mentions Légales', 'Politique de Confidentialité', 'CGV'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2024 Tony Payet. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0 group">
             <p className="font-mono">SYSTEM_STATUS: <span className="text-green-500">OPTIMAL</span></p>
             <button 
                onClick={onOpenAdmin} 
                className="text-gray-600 hover:text-yellow-500 transition-all duration-300 p-2 rounded-full hover:bg-white/5"
                title="Accès Admin"
             >
                <Lock size={14} />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
