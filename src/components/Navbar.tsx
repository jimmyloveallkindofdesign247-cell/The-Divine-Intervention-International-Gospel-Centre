import React, { useState, useEffect } from 'react';
import { Church, Menu, X, Heart, Clock, Compass, Phone } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface NavbarProps {
  onOpenGiving: () => void;
  onOpenPlanVisit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGiving, onOpenPlanVisit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Church Services', href: '#services' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top Welcome Notification Ribbon */}
      <div className="bg-[#070e1e] border-b border-sky-950/60 text-xs text-sky-200/90 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sky-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Sunday Services: 8:30 AM & 10:45 AM CST</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>7400 Kingdom Faith Blvd, Houston TX</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CHURCH_INFO.directPhone}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{CHURCH_INFO.directPhone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenGiving}
              className="text-sky-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
            >
              <Heart className="w-3 h-3 text-sky-400 fill-sky-400/20" />
              <span>Give Online</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        aria-label="Main Navigation"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070e1e]/95 backdrop-blur-md shadow-xl border-b border-sky-900/40 py-3'
            : 'bg-[#070e1e] border-b border-sky-950 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Church Brand & Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 via-blue-700 to-[#070e1e] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#070e1e] rounded-[10px] flex items-center justify-center text-sky-400 group-hover:text-sky-300">
                  <Church className="w-6 h-6" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif font-bold text-sm sm:text-base tracking-wide leading-tight group-hover:text-sky-200 transition-colors uppercase">
                  THE DIVINE INTERVENTION
                </span>
                <span className="text-[10px] sm:text-xs text-sky-300/80 font-medium tracking-wider uppercase">
                  INTERNATIONAL GOSPEL CENTRE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white rounded-md hover:bg-sky-950/50 transition-colors relative after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-sky-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenGiving}
                className="px-3.5 py-2 text-xs font-semibold text-sky-300 hover:text-white border border-sky-600/40 hover:border-sky-400 rounded-md bg-sky-950/40 hover:bg-sky-900/60 transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Heart className="w-3.5 h-3.5 text-sky-400" />
                <span>GIVE</span>
              </button>
              <button
                onClick={onOpenPlanVisit}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#070e1e] bg-white hover:bg-sky-100 hover:shadow-lg hover:shadow-sky-500/20 rounded-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                PLAN A VISIT
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenGiving}
                aria-label="Give online"
                className="sm:hidden px-2.5 py-1.5 text-xs font-semibold text-sky-300 border border-sky-800 rounded bg-sky-950/70"
              >
                Give
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-sky-950/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070e1e] border-t border-sky-900/50 px-4 pt-3 pb-6 shadow-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-sky-950 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-sky-900/40 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGiving();
                }}
                className="w-full py-2.5 px-3 text-center text-xs font-semibold uppercase tracking-wider text-sky-200 border border-sky-700/60 rounded-md bg-sky-950/60"
              >
                Give Online
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanVisit();
                }}
                className="w-full py-2.5 px-3 text-center text-xs font-bold uppercase tracking-wider text-[#070e1e] bg-white rounded-md shadow-md"
              >
                Join Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
