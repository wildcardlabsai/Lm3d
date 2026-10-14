import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'flexis' | 'planters' | 'halloween'>('all');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-[#11111A]/50 border-t border-[#232334] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D9FF]">
          <Sparkles className="w-4 h-4 text-[#FF00D4]" />
          <span>VIP Workshop Drops</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
          GET THE NEXT DROP.
        </h2>

        <p className="text-xs sm:text-sm text-[#B8B8C8] max-w-xl mx-auto leading-relaxed">
          Be the first to know when new articulated flexis, limited multi-layer prints, or seasonal items come off the build plate. No spam, only genuine workshop drops.
        </p>

        {isSubmitted ? (
          <div className="p-6 rounded-xl bg-[#171722] border border-[#00D9FF]/40 max-w-md mx-auto space-y-2 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">You&apos;re On The Drop List!</h3>
            <p className="text-xs text-[#B8B8C8]">
              We&apos;ve registered <span className="text-[#00D9FF] font-mono">{email}</span> for notifications. (Demonstration Form — ready for Klaviyo / Shopify Email integration).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            {/* Category preference buttons */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-[#171722] border border-[#232334] rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setInterest('all')}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors cursor-pointer ${
                  interest === 'all' ? 'bg-[#232334] text-white' : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                All Drops
              </button>
              <button
                type="button"
                onClick={() => setInterest('flexis')}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors cursor-pointer ${
                  interest === 'flexis' ? 'bg-[#232334] text-white' : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                Flexis
              </button>
              <button
                type="button"
                onClick={() => setInterest('planters')}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors cursor-pointer ${
                  interest === 'planters' ? 'bg-[#232334] text-white' : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                Planters
              </button>
              <button
                type="button"
                onClick={() => setInterest('halloween')}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors cursor-pointer ${
                  interest === 'halloween' ? 'bg-[#232334] text-white' : 'text-[#B8B8C8] hover:text-white'
                }`}
              >
                Halloween
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#B8B8C8] absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#171722] border border-[#232334] focus:border-[#00D9FF] rounded-lg pl-9 pr-3 py-3 text-xs text-white placeholder-[#B8B8C8]/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] text-[#08080D] font-bold text-xs uppercase tracking-wider rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>JOIN DROPS</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] text-[#B8B8C8]/70">
              * Demonstration prototype newsletter form. Real integration connects to Shopify Email / Klaviyo.
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
