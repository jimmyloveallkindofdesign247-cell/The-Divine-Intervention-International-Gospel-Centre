import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Users, Heart, Car, Sparkles } from 'lucide-react';
import { CHURCH_INFO, CHURCH_SERVICES } from '../data/churchData';
import { ChurchService } from '../types/church';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ChurchService | null;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(
    preselectedService ? preselectedService.id : 'srv-1'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guestsCount: 1,
    hasChildren: false,
    needsAssistance: false,
    requestedPrayerUponArrival: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setIsSuccess(true);
  };

  const selectedService =
    CHURCH_SERVICES.find((s) => s.id === selectedServiceId) || CHURCH_SERVICES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-visit-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#070e1e]">
              We Are Excited To Welcome You!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your VIP Visit Pass has been registered for the{' '}
              <strong className="text-sky-700">{selectedService.title}</strong>. Our Welcome & Hospitality team will look out for you with warm smiles and reserved seating.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl text-left text-xs text-slate-600 space-y-2 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>7400 Kingdom Faith Blvd, Houston, TX 77036</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400" />
                <span>Reserved first-time guest parking directly in front of Sanctuary Gate A.</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#070e1e] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-sky-950 transition-colors"
            >
              Close & See You Soon!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FIRST-TIME GUEST & FAMILY WELCOME</span>
              </div>
              <h3 id="plan-visit-title" className="font-serif font-bold text-2xl text-[#070e1e] mt-1">
                Plan Your Visit With Us
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Let us know you are coming so we can roll out the red carpet for you and your family!
              </p>
            </div>

            {/* Select Service */}
            <div>
              <label htmlFor="service-select" className="block text-xs font-semibold text-slate-700 mb-1">
                Select Service Gathering
              </label>
              <select
                id="service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {CHURCH_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.time})
                  </option>
                ))}
              </select>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="guest-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="e.g. David & Mary Okonkwo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="guest-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="guest-email"
                  type="email"
                  required
                  placeholder="e.g. david@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Phone and Number of Attendees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="guest-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (for VIP SMS reminder)
                </label>
                <input
                  id="guest-phone"
                  type="tel"
                  placeholder="+1 (832) 555-0100"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="guest-count" className="block text-xs font-semibold text-slate-700 mb-1">
                  Total in Your Party
                </label>
                <select
                  id="guest-count"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Checkboxes for Kids / Assistance */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>I am bringing children (Pre-check them into Children’s Church)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestedPrayerUponArrival}
                  onChange={(e) =>
                    setFormData({ ...formData, requestedPrayerUponArrival: e.target.checked })
                  }
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>I would like a pastor to pray with me when I arrive</span>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-[#070e1e] hover:bg-sky-950 text-white font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-colors shadow-lg"
              >
                Confirm My Visit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
