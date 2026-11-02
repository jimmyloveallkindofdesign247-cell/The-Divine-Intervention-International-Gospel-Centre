import React from 'react';
import { ChevronDown, Calendar, Play, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onJoinUs: () => void;
  onLearnMore: () => void;
  onWatchLatest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinUs, onLearnMore, onWatchLatest }) => {
  return (
    <header
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#070e1e]"
    >
      {/* Background Church Photograph with continuous slow zoom (Ken Burns effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic Sanctuary of The Divine Intervention International Gospel Centre"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center animate-ken-burns scale-105"
          loading="eager"
        />

        {/* Dark Navy-Blue Transparent Multi-Stop Overlay for Superior Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/85 to-[#070e1e]/75" />
        <div className="absolute inset-0 bg-[#070e1e]/40 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,14,30,0.7)_100%)]" />
      </div>

      {/* Decorative Subtle Accent Light Beam */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-center flex flex-col items-center">
        {/* Subtle Welcome Kicker / Unboxed Metadata */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-sky-300 mb-4 drop-shadow">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>WELCOME TO THE DIVINE INTERVENTION INTERNATIONAL GOSPEL CENTRE</span>
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-extrabold text-white tracking-tight leading-[1.18] max-w-4xl uppercase drop-shadow-2xl">
          FINDING YOUR PURPOSE,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-white">
            STRENGTHENING YOUR FAITH
          </span>{' '}
          AND GROWING.
        </h1>

        {/* Introductory Message */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed max-w-3xl font-light text-balance drop-shadow">
          Our church is a place where hearts are encouraged, lives are transformed, and faith is
          strengthened. It is a place that feels like home. Through inspiring worship and praise,
          thoughtful teachings, and a supportive community, we help people discover their purpose and
          grow in their relationship with God.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none">
          {/* JOIN US Button (Dark Blue and White Styling with elegant hover animation) */}
          <button
            onClick={onJoinUs}
            className="group w-full sm:w-auto px-7 py-3.5 bg-white text-[#070e1e] font-display font-bold text-xs sm:text-sm tracking-widest uppercase rounded-lg shadow-2xl hover:bg-sky-100 hover:shadow-sky-400/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 border border-white/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 cursor-pointer"
          >
            <span>JOIN US</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:scale-150 transition-transform" />
          </button>

          {/* LEARN MORE Button (Dark Navy Blue with White styling and elegant hover animation) */}
          <button
            onClick={onLearnMore}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#070e1e]/85 text-white font-display font-semibold text-xs sm:text-sm tracking-widest uppercase rounded-lg border-2 border-white/80 hover:border-sky-300 hover:bg-sky-950/90 hover:text-sky-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-xl backdrop-blur-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 cursor-pointer"
          >
            LEARN MORE
          </button>

          {/* Quick Watch Sermon Link */}
          <button
            onClick={onWatchLatest}
            className="w-full sm:w-auto px-4 py-3 text-xs font-semibold uppercase tracking-wider text-sky-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors hover:underline underline-offset-8 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>Watch Latest Sermon</span>
          </button>
        </div>

        {/* Live Service Times Pill Bar */}
        <div className="mt-8 pt-5 border-t border-sky-900/40 w-full max-w-2xl flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Sundays: 8:30 AM & 10:45 AM</span>
          </div>
          <span className="text-sky-800 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Wednesday Word: 6:30 PM CST</span>
          </div>
          <span className="text-sky-800 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Houston Sanctuary & Online</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-sky-300 transition-colors animate-bounce p-2"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </header>
  );
};
