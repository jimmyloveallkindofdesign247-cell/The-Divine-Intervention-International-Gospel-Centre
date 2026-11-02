import React, { useState } from 'react';
import { Sparkles, HeartHandshake, BookOpen, Compass, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface AboutSectionProps {
  onPlanVisit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onPlanVisit }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Welcoming Church Imagery with Multi-Layered Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background border frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#070e1e] to-sky-700 rounded-2xl transform -rotate-2 opacity-15" />
              
              {/* Main Welcoming Church Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#070e1e]">
                <img
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
                  alt="Sanctuary of The Divine Intervention International Gospel Centre"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] sm:h-[500px] object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                
                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/85 to-transparent p-6 text-white">
                  <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">
                    A Global Family of Believers
                  </p>
                  <p className="font-serif text-lg font-bold">
                    Rooted in Truth · Empowered by Grace
                  </p>
                </div>
              </div>

              {/* Floating Stat / Experience Callout with Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-6 bg-[#070e1e] text-white p-3.5 sm:p-4 rounded-xl shadow-2xl border border-sky-900/60 max-w-[240px] sm:max-w-[260px] flex items-center gap-3 backdrop-blur-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-sky-600/40 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&q=80"
                    alt="Our Calling ministry gathering"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sky-400 mb-0.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Our Calling</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-snug font-light">
                    Over two decades of ministry transforming lives across nations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Mission, Vision, Values */}
          <div className="lg:col-span-7">
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-3">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>ABOUT OUR SANCTUARY</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#070e1e] tracking-tight leading-tight">
              A Home Where Heaven Meets Earth in Power and Love
            </h2>

            {/* Lead Narrative Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              Founded under divine mandate, <strong className="font-semibold text-slate-800">The Divine Intervention International Gospel Centre</strong> was established to be an oasis of hope in an uncertain generation. We are passionate about helping men, women, and young people encounter Jesus Christ personally, unpack God’s blueprint for their careers and families, and walk in victorious spiritual maturity.
            </p>

            {/* Mission & Vision Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#070e1e]">Our Mission</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {CHURCH_INFO.mission}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#070e1e] flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#070e1e]">Our Vision</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {CHURCH_INFO.vision}
                </p>
              </div>
            </div>

            {/* Dedicated Our Calling Showcase Banner with Image */}
            <div className="mt-8 rounded-2xl overflow-hidden bg-gradient-to-r from-[#070e1e] to-[#0d1c3b] text-white shadow-xl border border-sky-900/50">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                <div className="md:col-span-5 h-48 md:h-full relative min-h-[160px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80"
                    alt="Our Calling to Worship and Global Revival"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#070e1e]/90" />
                </div>

                <div className="md:col-span-7 p-6 sm:p-7 space-y-2.5">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>OUR CALLING & COMMISSION</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    Equipping Believers to Impact Generations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    We are called to preach the uncompromised cross, activate spiritual gifts, foster generational healing, and unleash kingdom leaders into marketplace influence.
                  </p>
                </div>
              </div>
            </div>

            {/* Senior Pastor Quote Callout */}
            <div className="mt-8 border-l-4 border-sky-500 pl-4 py-2 bg-sky-50/50 rounded-r-lg">
              <p className="text-sm italic text-slate-700 leading-relaxed">
                “You are not an accident of geography or biology. God has strategically placed you on earth for such a time as this, and our mission is to stand with you until your divine purpose is fully manifested.”
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#070e1e]">
                — {CHURCH_INFO.seniorPastors}
              </p>
            </div>

            {/* Action Buttons: DISCOVER MORE & Plan Visit */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-3.5 bg-[#070e1e] hover:bg-sky-950 text-white font-display font-semibold text-xs tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
              >
                DISCOVER MORE
              </button>

              <button
                onClick={onPlanVisit}
                className="px-6 py-3.5 border border-slate-300 hover:border-sky-600 text-slate-700 hover:text-sky-700 font-display font-semibold text-xs tracking-widest uppercase rounded-lg transition-all cursor-pointer"
              >
                Plan Your Sunday Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DISCOVER MORE Interactive Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discover-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>THE DIVINE INTERVENTION HERITAGE & BELIEFS</span>
            </div>

            <h3 id="discover-modal-title" className="text-2xl sm:text-3xl font-display font-extrabold text-[#070e1e]">
              Rooted in Apostolic Faith & Divine Revelation
            </h3>

            <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2 text-slate-600 text-sm leading-relaxed">
              <div>
                <div className="mb-4 rounded-xl overflow-hidden aspect-[16/7] shadow-sm border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=900&q=80"
                    alt="The Divine Intervention Apostolic Mandate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-base text-[#070e1e] mb-2">Our Origins & Divine Calling</h4>
                <p>
                  The Divine Intervention International Gospel Centre was birthed through fervent prayer and an undeniable heavenly mandate given to Rev. Dr. Emmanuel Adeyemi. What began as an intimate weekly prayer gathering of seekers crying out for God’s intervention has grown into a dynamic multi-ethnic congregation with thousands blessed through worship services, weekly media broadcasts, missions, and community compassion ministries.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#070e1e] mb-3">Our 5 Core Pillars</h4>
                <div className="space-y-3">
                  {CHURCH_INFO.coreValues.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900">{val.title}: </span>
                        <span className="text-slate-600">{val.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#070e1e] mb-2">What We Believe</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>We believe the Bible is the inspired, infallible, and authoritative Word of God.</li>
                  <li>We believe in one God eternally existent in three persons: Father, Son, and Holy Spirit.</li>
                  <li>We believe in the deity of our Lord Jesus Christ, His virgin birth, sinless life, miracles, vicarious and atoning death, bodily resurrection, and triumphant ascension.</li>
                  <li>We believe in the present ministry of the Holy Spirit, enabling believers to live a godly and empowered life.</li>
                  <li>We believe in the supernatural power of prayer, divine healing, and miracles as demonstrated through Christ.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-slate-500">
                You are always welcome in God’s presence.
              </span>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onPlanVisit();
                }}
                className="px-5 py-2.5 bg-[#070e1e] text-white font-medium text-xs rounded-lg hover:bg-sky-950 transition-colors"
              >
                Join Us This Sunday
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
