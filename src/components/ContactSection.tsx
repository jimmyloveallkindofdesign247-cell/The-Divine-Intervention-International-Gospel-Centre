import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageSquare,
  Heart,
  Navigation,
} from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ContactFormData } from '../types/church';
import { validateContactForm, ValidationErrors } from '../utils/church';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    category: 'Prayer Request',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    // Simulate real submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        category: 'Prayer Request',
        message: '',
      });
    }, 700);
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent('7400 Kingdom Faith Boulevard Houston TX 77036');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-3">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>WE ARE HERE FOR YOU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#070e1e] tracking-tight">
            Connect With Our Pastoral Team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Whether you need urgent prayer, have questions about our worship gatherings, or want to speak with a minister, our hearts and doors are always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & Google Maps View */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#070e1e] pb-3 border-b border-slate-200">
                Church Information & Sanctuary
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800">Physical Address</span>
                    <span className="text-slate-600 leading-relaxed">
                      {CHURCH_INFO.address.fullFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800">Telephone / Prayer Line</span>
                    <a
                      href={`tel:${CHURCH_INFO.phone}`}
                      className="text-slate-600 hover:text-sky-700 transition-colors block"
                    >
                      {CHURCH_INFO.phone} (Toll-Free)
                    </a>
                    <a
                      href={`tel:${CHURCH_INFO.directPhone}`}
                      className="text-slate-600 hover:text-sky-700 transition-colors block text-xs"
                    >
                      {CHURCH_INFO.directPhone} (Houston Pastoral Office)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800">Official Correspondence</span>
                    <a
                      href={`mailto:${CHURCH_INFO.email}`}
                      className="text-slate-600 hover:text-sky-700 transition-colors block"
                    >
                      {CHURCH_INFO.email}
                    </a>
                    <a
                      href={`mailto:${CHURCH_INFO.prayerEmail}`}
                      className="text-sky-600 hover:text-sky-800 transition-colors block text-xs font-medium"
                    >
                      {CHURCH_INFO.prayerEmail} (24/7 Intercession)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800">Office Administration Hours</span>
                    <span className="text-slate-600">Monday – Friday: 9:00 AM – 5:00 PM CST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Preview Section */}
            <div className="bg-[#070e1e] text-white p-6 rounded-2xl border border-sky-900/60 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                  <Navigation className="w-4 h-4" />
                  <span>Sanctuary Location & Map</span>
                </div>
                <button
                  onClick={handleOpenGoogleMaps}
                  className="text-xs text-sky-300 hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Open In Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Styled Map Representation */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-800 border border-sky-950/80 mb-4 group cursor-pointer" onClick={handleOpenGoogleMaps}>
                {/* Visual Map Imagery Preview */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="Map location overview of church sanctuary"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 bg-[#070e1e]/60 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5 fill-white" />
                  </div>
                  <span className="font-serif font-bold text-sm text-white mt-2">
                    {CHURCH_INFO.shortName}
                  </span>
                  <span className="text-[11px] text-sky-200">
                    Houston, TX 77036 · Free Visitor Parking Available
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Direct transit: Metro Bus Line 9 & 65</span>
                <button
                  onClick={handleOpenGoogleMaps}
                  className="px-3 py-1.5 bg-sky-900/60 hover:bg-sky-800 text-sky-100 rounded font-medium transition-colors"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Prayer Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#070e1e]">
                    Message Received in Faith
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to <strong className="text-slate-800">{CHURCH_INFO.name}</strong>. Our intercessors and pastoral team will lift your request before God, and if requested, respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-[#070e1e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-sky-950 transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="font-serif font-bold text-2xl text-[#070e1e]">
                      Send a Message or Prayer Request
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
                      Every prayer request is treated with absolute confidentiality by our ministers.
                    </p>
                  </div>

                  {/* Form Category Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Purpose of Contact
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Prayer Request', 'General Inquiry', 'Counseling', 'Testimony'] as const).map(
                        (type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, category: type })}
                            className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                              formData.category === type
                                ? 'bg-[#070e1e] text-white border-[#070e1e] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="e.g. Samuel Adekunle"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                          errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g. samuel@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-slate-400 font-normal">(Optional for callback)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +1 (832) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message or Prayer Points <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Please share what is on your heart. We stand in faith with you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                        errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-[#070e1e] hover:bg-sky-950 text-white font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting In Faith...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Prayer / Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
