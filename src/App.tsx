import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SermonsSection } from './components/SermonsSection';
import { EventsSection } from './components/EventsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PlanVisitModal } from './components/PlanVisitModal';
import { GivingModal } from './components/GivingModal';
import { ChurchService } from './types/church';
import { CHURCH_SERVICES, TESTIMONIALS } from './data/churchData';
import { Quote, Sparkles } from 'lucide-react';

export default function App() {
  const [planVisitOpen, setPlanVisitOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ChurchService | null>(null);
  const [givingModalOpen, setGivingModalOpen] = useState(false);

  const handleOpenPlanVisit = (service?: ChurchService) => {
    setSelectedService(service || CHURCH_SERVICES[0]);
    setPlanVisitOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenGiving={() => setGivingModalOpen(true)}
        onOpenPlanVisit={() => handleOpenPlanVisit()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Full-screen Hero Section with slow Ken Burns zoom & dark navy overlay */}
        <Hero
          onJoinUs={() => handleOpenPlanVisit()}
          onLearnMore={() => handleScrollToSection('about')}
          onWatchLatest={() => handleScrollToSection('sermons')}
        />

        {/* About Us Section */}
        <AboutSection onPlanVisit={() => handleOpenPlanVisit()} />

        {/* Church Services Section */}
        <ServicesSection
          onPlanVisitWithService={(svc) => handleOpenPlanVisit(svc)}
          onWatchStream={() => handleScrollToSection('sermons')}
        />

        {/* Dynamic Sermon Archive Section */}
        <SermonsSection onPlanVisit={() => handleOpenPlanVisit()} />

        {/* Upcoming Events Section with Live Countdown */}
        <EventsSection />

        {/* Community Testimonials & Life Transformation Section */}
        <section className="py-20 bg-white border-y border-slate-200/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>TRANSFORMED LIVES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#070e1e]">
                Stories of Faith, Healing and Purpose
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-sky-300 transition-colors"
                >
                  <div>
                    <Quote className="w-8 h-8 text-sky-300/80 mb-3" />
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                      "{t.story}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <h4 className="font-serif font-bold text-sm text-[#070e1e]">{t.name}</h4>
                    <span className="text-[11px] text-slate-500">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Church Blog Section */}
        <BlogSection />

        {/* Contact Us Section with Interactive Form & Maps */}
        <ContactSection />
      </main>

      {/* Dark Navy-Blue Footer */}
      <Footer
        onOpenGiving={() => setGivingModalOpen(true)}
        onOpenPlanVisit={() => handleOpenPlanVisit()}
      />

      {/* Plan A Visit Modal */}
      <PlanVisitModal
        isOpen={planVisitOpen}
        onClose={() => setPlanVisitOpen(false)}
        preselectedService={selectedService}
      />

      {/* Online Giving Modal */}
      <GivingModal
        isOpen={givingModalOpen}
        onClose={() => setGivingModalOpen(false)}
      />
    </div>
  );
}
