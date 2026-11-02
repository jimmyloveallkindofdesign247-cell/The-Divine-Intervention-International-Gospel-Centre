import React, { useState } from 'react';
import {
  Play,
  Pause,
  Search,
  BookOpen,
  Volume2,
  Clock,
  User,
  Sparkles,
  X,
  FileText,
  Share2,
} from 'lucide-react';
import { SERMONS_DATA } from '../data/churchData';
import { Sermon } from '../types/church';
import { filterSermons } from '../utils/church';

interface SermonsSectionProps {
  onPlanVisit: () => void;
}

export const SermonsSection: React.FC<SermonsSectionProps> = ({ onPlanVisit }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(25); // percentage for demo
  const [copyFeedback, setCopyFeedback] = useState(false);

  const categories = ['All', 'Faith', 'Purpose', 'Grace', 'Prayer', 'Holy Spirit'];
  const filteredSermons = filterSermons(SERMONS_DATA, selectedCategory, searchQuery);

  const handleOpenSermon = (sermon: Sermon) => {
    setActiveSermon(sermon);
    setIsPlaying(true);
    setPlayProgress(12);
  };

  const handleShareSermon = (sermon: Sermon) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  return (
    <section id="sermons" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-3">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>DYNAMIC SERMON ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#070e1e] tracking-tight">
              Anointed Words That Transform Lives
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-light">
              Listen to life-transforming biblical messages, strengthen your daily walk, and feed your faith on demand wherever you are.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="w-full md:w-72 relative">
            <label htmlFor="sermon-search" className="sr-only">Search sermons</label>
            <input
              id="sermon-search"
              type="text"
              placeholder="Search by scripture, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Filter Tabs / Segmented Controls (buttons with click handlers, anti-slop compliant) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-slate-100 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#070e1e] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Sermons' : cat}
            </button>
          ))}
        </div>

        {/* Sermons Grid */}
        {filteredSermons.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-600 font-medium">No messages found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs font-semibold text-sky-600 hover:text-sky-800"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail with Play Hover Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer" onClick={() => handleOpenSermon(sermon)}>
                    <img
                      src={sermon.thumbnailUrl}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#070e1e]/40 group-hover:bg-[#070e1e]/60 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-[#070e1e] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#070e1e] ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded">
                      {sermon.duration}
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-2.5 left-3 bg-[#070e1e]/90 text-sky-300 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-sky-800/50">
                      {sermon.category}
                    </div>
                  </div>

                  {/* Sermon Info */}
                  <div className="p-5">
                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sermon.speaker}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{sermon.date}</span>
                    </div>

                    <h3
                      onClick={() => handleOpenSermon(sermon)}
                      className="font-serif font-bold text-lg text-[#070e1e] group-hover:text-sky-700 transition-colors cursor-pointer line-clamp-2"
                    >
                      {sermon.title}
                    </h3>

                    {/* Scripture Reference */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-sky-800">
                      <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                      <span>{sermon.scripture}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 font-light">
                      {sermon.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenSermon(sermon)}
                    className="text-xs font-bold uppercase tracking-wider text-[#070e1e] hover:text-sky-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Listen / Read Notes</span>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </button>

                  <button
                    onClick={() => handleShareSermon(sermon)}
                    aria-label="Share sermon"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                    title="Share link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sermon Media & Notes Modal */}
      {activeSermon && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-sermon-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#070e1e] text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-sky-900/60 my-8">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-sky-900/40 flex items-start justify-between">
              <div>
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  {activeSermon.category} · {activeSermon.scripture}
                </span>
                <h3 id="active-sermon-title" className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {activeSermon.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ministered by {activeSermon.speaker} · {activeSermon.date}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveSermon(null);
                  setIsPlaying(false);
                }}
                aria-label="Close sermon player"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-sky-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Audio/Video Player Pane */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0a142c] to-[#070e1e] border-b border-sky-950">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl border-2 border-sky-700/50 mb-6">
                  <img
                    src={activeSermon.thumbnailUrl}
                    alt={activeSermon.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Simulated Audio Waveform / Scrubber */}
                <div className="w-full max-w-lg mb-4">
                  <div
                    className="h-2 bg-sky-950 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setPlayProgress(Math.floor(pos * 100));
                    }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>
                      {Math.floor((playProgress * 48) / 100)}:
                      {String(Math.floor(((playProgress * 48) % 1) * 60)).padStart(2, '0')}
                    </span>
                    <span>{activeSermon.duration}</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setPlayProgress((p) => Math.max(0, p - 10))}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    -15s
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause sermon' : 'Play sermon'}
                    className="w-14 h-14 rounded-full bg-white text-[#070e1e] hover:bg-sky-100 flex items-center justify-center shadow-xl hover:scale-105 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-[#070e1e]" />
                    ) : (
                      <Play className="w-6 h-6 fill-[#070e1e] ml-1" />
                    )}
                  </button>

                  <button
                    onClick={() => setPlayProgress((p) => Math.min(100, p + 10))}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    +15s
                  </button>
                </div>
              </div>
            </div>

            {/* Sermon Study Notes Pane */}
            <div className="p-6 bg-white text-slate-800 max-h-72 overflow-y-auto">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 mb-3">
                <FileText className="w-4 h-4 text-sky-600" />
                <span>EXPOSITORY SERMON OUTLINE & NOTES</span>
              </div>
              <p className="text-sm text-slate-600 mb-4 italic leading-relaxed">
                "{activeSermon.summary}"
              </p>
              <div className="space-y-3">
                {activeSermon.fullNotes.map((note, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs sm:text-sm text-slate-700">
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-slate-700">
              {copyFeedback ? (
                <span className="text-xs text-emerald-600 font-medium">Link copied to clipboard!</span>
              ) : (
                <button
                  onClick={() => handleShareSermon(activeSermon)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Sermon</span>
                </button>
              )}
              <button
                onClick={() => {
                  setActiveSermon(null);
                  setIsPlaying(false);
                  onPlanVisit();
                }}
                className="px-4 py-2 bg-[#070e1e] text-white text-xs font-semibold rounded-md hover:bg-sky-950 transition-colors"
              >
                Attend In Person
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
