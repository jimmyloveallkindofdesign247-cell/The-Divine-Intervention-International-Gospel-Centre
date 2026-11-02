import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle, Ticket, X } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/churchData';
import { ChurchEvent } from '../types/church';
import { calculateTimeRemaining } from '../utils/church';

export const EventsSection: React.FC = () => {
  const flagshipEvent = UPCOMING_EVENTS[0];
  const [countdown, setCountdown] = useState(calculateTimeRemaining(flagshipEvent.targetTimestamp));
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ChurchEvent | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', seats: 1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(flagshipEvent.targetTimestamp));
    }, 1000);
    return () => clearInterval(timer);
  }, [flagshipEvent.targetTimestamp]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim() || !rsvpForm.email.trim()) return;
    setRsvpSubmitted(true);
  };

  return (
    <section id="events" className="py-24 lg:py-32 bg-[#070e1e] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-950/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-400 mb-3">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>CALENDAR & GATHERINGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Upcoming Life-Changing Events
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light">
            Mark your calendar for our upcoming conferences, community outpourings, and celebration nights. Every event is designed to ignite your spiritual fire.
          </p>
        </div>

        {/* Flagship Event Featured Spotlight Card with Live Countdown */}
        <div className="mb-16 bg-gradient-to-br from-[#0d1b38] to-[#070e1e] rounded-3xl p-6 sm:p-10 border border-sky-800/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Event Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 bg-sky-500/20 text-sky-300 text-xs font-semibold rounded border border-sky-400/30">
                {flagshipEvent.category} · Featured Gathering
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                {flagshipEvent.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {flagshipEvent.description}
              </p>

              {/* Event Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{flagshipEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{flagshipEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{flagshipEvent.location}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-2">
                {flagshipEvent.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-sky-200 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-800/40"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedEventForRsvp(flagshipEvent);
                    setRsvpSubmitted(false);
                  }}
                  className="px-8 py-3.5 bg-white text-[#070e1e] font-display font-bold text-xs uppercase tracking-widest rounded-lg shadow-xl hover:bg-sky-100 hover:shadow-sky-400/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>RSVP & RESERVE SEAT</span>
                </button>
              </div>
            </div>

            {/* Right Col: Live Countdown Ticker */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#070e1e]/80 rounded-2xl border border-sky-900/60">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-4">
                Convention Begins In
              </span>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center w-full">
                <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-800/40">
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-white">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Days</span>
                </div>
                <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-800/40">
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-white">
                    {countdown.hours}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Hours</span>
                </div>
                <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-800/40">
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-white">
                    {countdown.minutes}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Mins</span>
                </div>
                <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-800/40">
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-sky-400 animate-pulse">
                    {countdown.seconds}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Secs</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400 text-center font-light">
                Admission is completely free. Early registration ensures priority seating.
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UPCOMING_EVENTS.slice(1).map((event) => (
            <div
              key={event.id}
              className="bg-[#0b1528] rounded-2xl overflow-hidden border border-sky-900/40 shadow-lg hover:border-sky-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1528] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#070e1e]/90 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-serif font-bold text-xl text-white mb-2">{event.title}</h4>
                  <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setSelectedEventForRsvp(event);
                    setRsvpSubmitted(false);
                  }}
                  className="w-full py-2.5 bg-sky-950 hover:bg-sky-900 text-sky-200 border border-sky-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Register Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEventForRsvp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#0b162c] text-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-sky-800/60 my-8">
            <button
              onClick={() => setSelectedEventForRsvp(null)}
              aria-label="Close RSVP form"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-950 text-emerald-400 border border-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-white">Seat Reserved!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We look forward to welcoming you, <strong className="text-white">{rsvpForm.name}</strong>! A confirmation pass has been noted for {rsvpForm.seats} seat(s).
                </p>
                <button
                  onClick={() => setSelectedEventForRsvp(null)}
                  className="mt-4 px-6 py-2.5 bg-white text-[#070e1e] font-bold text-xs uppercase rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                    Free Event Registration
                  </span>
                  <h3 id="rsvp-title" className="font-serif font-bold text-xl text-white mt-1">
                    {selectedEventForRsvp.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedEventForRsvp.date} · {selectedEventForRsvp.location}
                  </p>
                </div>

                <div>
                  <label htmlFor="rsvp-name" className="block text-xs font-medium text-slate-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="rsvp-name"
                    required
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Sister Grace Johnson"
                    className="w-full px-3.5 py-2.5 bg-[#070e1e] border border-sky-800/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-email" className="block text-xs font-medium text-slate-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="rsvp-email"
                    required
                    type="email"
                    value={rsvpForm.email}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                    placeholder="e.g. grace@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#070e1e] border border-sky-800/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-seats" className="block text-xs font-medium text-slate-200 mb-1">
                    Number of Attendees
                  </label>
                  <select
                    id="rsvp-seats"
                    value={rsvpForm.seats}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, seats: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#070e1e] border border-sky-800/80 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Attendee' : 'Attendees'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-[#070e1e] hover:bg-sky-100 font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg"
                  >
                    Confirm My Attendance
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
