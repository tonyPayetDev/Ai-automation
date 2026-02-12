
import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Boost 48H', href: '#boost', special: true },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      setIsOpen(false);
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL hash without jumping
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-yellow-500/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-yellow-500/10 rounded border border-yellow-500/30 group-hover:bg-yellow-500/20 transition-colors">
               <Cpu className="h-6 w-6 text-yellow-500" />
            </div>
            <span className="text-xl font-bold tracking-widest text-white">
              TONY<span className="text-yellow-500">.AI</span>
            </span>
          </a>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-colors group overflow-hidden flex items-center gap-1
                    ${link.special ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-yellow-400'}
                  `}
                >
                  {link.special && <Rocket className="w-3.5 h-3.5 animate-pulse" />}
                  <span className="relative z-10">{link.name}</span>
                  {!link.special && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  )}
                  {link.special && (
                    <span className="absolute inset-0 bg-yellow-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-yellow-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-yellow-500/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`
                    block px-3 py-4 text-base font-medium text-center border-b border-gray-800 last:border-0
                    ${link.special ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-yellow-500'}
                  `}
                >
                  {link.special && "🚀 "} {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
