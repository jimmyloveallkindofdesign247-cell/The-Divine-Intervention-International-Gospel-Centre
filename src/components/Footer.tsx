import React, { useState } from 'react';
import {
  Church,
  MapPin,
  Phone,
  Mail,
  Heart,
  ArrowUp,
  Youtube,
  Facebook,
  Instagram,
  Radio,
  Send,
  CheckCircle,
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface FooterProps {
  onOpenGiving: () => void;
  onOpenPlanVisit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGiving, onOpenPlanVisit }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050b18] text-slate-300 border-t border-sky-950 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-sky-900/40">
          {/* Col 1: Brand & Ministry Purpose (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#070e1e] rounded-[10px] flex items-center justify-center text-sky-400">
                  <Church className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif font-bold text-sm tracking-wide leading-tight uppercase">
                  THE DIVINE INTERVENTION
                </span>
                <span className="text-[10px] text-sky-400 font-medium tracking-wider uppercase">
                  INTERNATIONAL GOSPEL CENTRE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              A dynamic international church community dedicated to finding your divine purpose, strengthening your faith, and walking in uncompromised biblical victory through Christ Jesus.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CHURCH_INFO.social.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube channel"
                className="w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-800/50 hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={CHURCH_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook page"
                className="w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-800/50 hover:bg-blue-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CHURCH_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                className="w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-800/50 hover:bg-pink-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CHURCH_INFO.social.podcast}
                target="_blank"
                rel="noreferrer"
                aria-label="Audio podcast stream"
                className="w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-800/50 hover:bg-emerald-600 hover:text-white text-slate-400 flex items-center justify-center transition-all"
              >
                <Radio className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-sky-300 transition-colors">
                  Home Sanctuary
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-300 transition-colors">
                  About Our Church & Pastors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-300 transition-colors">
                  Worship Gatherings & Times
                </a>
              </li>
              <li>
                <a href="#sermons" className="hover:text-sky-300 transition-colors">
                  Sermon Archive & Media
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-sky-300 transition-colors">
                  Upcoming Events & Conferences
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-sky-300 transition-colors">
                  Faith Teachings & Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-300 transition-colors">
                  Prayer Requests & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Times & Contact Info (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Service Times
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <span className="block font-semibold text-sky-200">Sunday Celebration</span>
                <span>8:30 AM & 10:45 AM CST</span>
              </div>
              <div>
                <span className="block font-semibold text-sky-200">Wednesday Encounter</span>
                <span>6:30 PM - 8:00 PM CST</span>
              </div>
              <div>
                <span className="block font-semibold text-sky-200">Friday Midnight Vigil</span>
                <span>Last Friday at 10:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPlanVisit}
                className="text-xs text-sky-400 hover:text-white font-medium underline underline-offset-4"
              >
                Plan a Sunday Visit →
              </button>
            </div>
          </div>

          {/* Col 4: Newsletter & Daily Devotional (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Weekly Faith Devotionals
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Receive uplifting scripture meditations, sermon notes, and church announcements directly to your inbox every Tuesday.
            </p>

            {newsletterSuccess ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Subscribed! Grace and peace be multiplied to you.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#070e1e] border border-sky-800/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe to Devotionals</span>
                </button>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenGiving}
                className="w-full py-2.5 px-3 bg-[#0d1c3a] hover:bg-[#12244a] border border-sky-700/60 rounded-lg text-xs font-semibold text-sky-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-sky-400" />
                <span>Support Our Ministry (Give Online)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {CHURCH_INFO.name}. All Rights Reserved. Built to honor Jesus Christ.
          </p>

          <div className="flex items-center gap-6">
            <span>Houston, Texas · Worldwide Ministry</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-sky-950/80 hover:bg-sky-900 text-sky-300 hover:text-white border border-sky-800/50 transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
