import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Lock, Sparkles, DollarSign } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { validateGivingAmount } from '../utils/church';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GivingModal: React.FC<GivingModalProps> = ({ isOpen, onClose }) => {
  const [fund, setFund] = useState<'Tithes' | 'General Offering' | 'Missions & Outreach' | 'Church Building Project'>('Tithes');
  const [frequency, setFrequency] = useState<'One-Time' | 'Weekly' | 'Monthly'>('One-Time');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<{ id: string; amount: number } | null>(null);

  if (!isOpen) return null;

  const presets = [25, 50, 100, 250, 500, 1000];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setSelectedAmount(num);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const validation = validateGivingAmount(finalAmount);

    if (!validation.isValid) {
      setError(validation.error || 'Please enter a valid gift amount');
      return;
    }

    if (!donorName.trim() || !donorEmail.trim()) {
      setError('Please provide your name and email for your receipt');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptData({
        id: `DIIGC-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: finalAmount,
      });
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="giving-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
        <button
          onClick={onClose}
          aria-label="Close giving modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {receiptData ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#070e1e]">
              Thank You For Your Generosity!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your gift of <strong className="text-slate-900">${receiptData.amount.toFixed(2)}</strong> toward the <strong className="text-sky-700">{fund}</strong> has been received with deep gratitude. A tax-deductible receipt has been dispatched to <strong className="text-slate-900">{donorEmail}</strong>.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Confirmation Code:</span>
                <span className="font-mono font-bold text-slate-900">{receiptData.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Ministry Entity:</span>
                <span className="font-semibold text-slate-800">{CHURCH_INFO.shortName}</span>
              </div>
              <div className="flex justify-between">
                <span>Giving Frequency:</span>
                <span className="capitalize">{frequency}</span>
              </div>
            </div>

            <div className="p-3 bg-sky-50 rounded-lg text-sky-950 font-serif italic text-xs">
              “God loves a cheerful giver. And God is able to make all grace abound toward you.” — 2 Corinthians 9:7-8
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#070e1e] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-sky-950 transition-colors"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 fill-sky-600/20" />
                <span>ONLINE GIVING & TITHE PORTAL</span>
              </div>
              <h3 id="giving-modal-title" className="font-serif font-bold text-2xl text-[#070e1e] mt-1">
                Support God’s Kingdom Work
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Your faithful giving empowers evangelism, international missions, and community compassion.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
                {error}
              </div>
            )}

            {/* Fund Selection */}
            <div>
              <label htmlFor="giving-fund" className="block text-xs font-semibold text-slate-700 mb-1">
                Select Fund Designation
              </label>
              <select
                id="giving-fund"
                value={fund}
                onChange={(e) => setFund(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Tithes">Tithes (Honoring God With the First Tenth)</option>
                <option value="General Offering">General Free-Will Offering</option>
                <option value="Missions & Outreach">Global Missions & Food Pantry</option>
                <option value="Church Building Project">Sanctuary Expansion & Youth Center</option>
              </select>
            </div>

            {/* Frequency Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Giving Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {(['One-Time', 'Weekly', 'Monthly'] as const).map((freq) => (
                  <button
                    type="button"
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      frequency === freq
                        ? 'bg-[#070e1e] text-white border-[#070e1e]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Amount</label>
              <div className="grid grid-cols-3 gap-2 mb-2.5">
                {presets.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => handlePresetClick(amt)}
                    className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#070e1e] text-white border-[#070e1e] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Or enter custom gift amount"
                  value={customAmount}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="donor-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="donor-name"
                  type="text"
                  required
                  placeholder="e.g. Deacon Robert Miller"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="donor-email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email For Tax Receipt *
                </label>
                <input
                  id="donor-email"
                  type="email"
                  required
                  placeholder="robert@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Security Indicator */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>256-bit bank encrypted transaction. Tax-deductible under 501(c)(3) status.</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#070e1e] hover:bg-sky-950 text-white font-display font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Securing Transaction...</span>
              ) : (
                <span>
                  Give ${customAmount ? parseFloat(customAmount || '0') : selectedAmount} Now
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
