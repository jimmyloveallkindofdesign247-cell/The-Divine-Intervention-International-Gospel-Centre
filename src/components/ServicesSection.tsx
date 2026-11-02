import React, { useState } from 'react';
import { Clock, MapPin, Video, CalendarPlus, Check, Sparkles } from 'lucide-react';
import { CHURCH_SERVICES } from '../data/churchData';
import { ChurchService } from '../types/church';

interface ServicesSectionProps {
  onPlanVisitWithService: (service: ChurchService) => void;
  onWatchStream: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onPlanVisitWithService,
  onWatchStream,
}) => {
  const [calendarSavedId, setCalendarSavedId] = useState<string | null>(null);

  const handleAddToCalendar = (service: ChurchService) => {
    // Generate clean Google Calendar link or simulation
    const title = encodeURIComponent(`${service.title} - The Divine Intervention Gospel Centre`);
    const details = encodeURIComponent(`${service.description}\nLocation: ${service.location}`);
    const location = encodeURIComponent('7400 Kingdom Faith Blvd, Houston, TX 77036');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    
    // Provide instant feedback
    setCalendarSavedId(service.id);
    setTimeout(() => {
      setCalendarSavedId(null);
    }, 3000);

    // Open link in new tab or fallback gracefully
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-3">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>WORSHIP GATHERINGS & TIMES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#070e1e] tracking-tight">
            Encounter God in Every Service
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Whether you join us in person at our Houston sanctuary or worship with us online across the globe, there is a place prepared especially for you and your family.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CHURCH_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Service Image with Ken Burns / Zoom on hover */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/40 to-transparent" />

                  {/* Clean unboxed tag overlay */}
                  <div className="absolute top-4 left-4 bg-[#070e1e]/90 text-sky-300 text-xs font-semibold px-3 py-1 rounded backdrop-blur-sm border border-sky-800/60">
                    {service.tag}
                  </div>

                  {service.streamAvailable && (
                    <div className="absolute top-4 right-4 bg-emerald-950/80 text-emerald-300 text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1.5 backdrop-blur-sm border border-emerald-700/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Stream Available</span>
                    </div>
                  )}

                  {/* Service Day Banner */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-widest text-sky-300 font-medium">
                      {service.day}
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-sky-200 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Time and Location details */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-slate-100 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-700 font-medium">
                      <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{service.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{service.location}</span>
                    </div>
                  </div>

                  {/* Service Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => onPlanVisitWithService(service)}
                  className="px-4 py-2.5 bg-[#070e1e] hover:bg-sky-950 text-white font-medium text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  Plan To Attend
                </button>

                <div className="flex items-center gap-2">
                  {service.streamAvailable && (
                    <button
                      onClick={onWatchStream}
                      className="px-3 py-2 text-xs font-medium text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Watch Stream</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleAddToCalendar(service)}
                    aria-label={`Add ${service.title} to your calendar`}
                    className="p-2 text-slate-500 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Add to Calendar"
                  >
                    {calendarSavedId === service.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <CalendarPlus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Need Translation / Kids Ministry Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#070e1e] rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif font-bold text-lg sm:text-xl text-sky-100">
              Visiting With Children or Need Special Assistance?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              Our Kingdom Kids Church offers secure, age-appropriate worship and Bible learning for ages 1-12. Wheelchair accessibility, valet assistance, and language translation headsets are readily available.
            </p>
          </div>
          <button
            onClick={() => onPlanVisitWithService(CHURCH_SERVICES[0])}
            className="shrink-0 px-6 py-3 bg-white hover:bg-sky-100 text-[#070e1e] font-bold text-xs uppercase tracking-widest rounded-lg transition-colors"
          >
            Pre-Register Children
          </button>
        </div>
      </div>
    </section>
  );
};
