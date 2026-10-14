import React from 'react';
import { ViewState } from '../../types/store';
import { ArrowRight, Flame } from 'lucide-react';

interface PromoBannerSectionProps {
  onNavigate: (view: ViewState) => void;
  title?: string;
  tagline?: string;
  description?: string;
  destinationSlug?: string;
  buttonText?: string;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({
  onNavigate,
  title = 'SEASONAL SPOTLIGHT: HALLOWEEN & GOTHIC ARTIFACTS',
  tagline = 'Spooky Desk Companions & Glowing Skull Vessels',
  description = 'From filigree carved skull planters with integrated drainage trays to glowing low-poly ghost tealights that cast geometric shadows. Explore our curated spooky season collection.',
  destinationSlug = 'halloween-horror',
  buttonText = 'EXPLORE SPOOKY COLLECTION',
}) => {
  return (
    <section className="py-12 bg-[#08080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-[#232334] bg-gradient-to-r from-[#11111A] via-[#171722] to-[#11111A] p-8 sm:p-12 lg:p-14">
          {/* Subtle accent glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF00D4]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF00D4]">
              <Flame className="w-4 h-4 text-[#FF00D4]" />
              <span>{tagline}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display leading-tight text-balance">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-[#B8B8C8] leading-relaxed">
              {description}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: destinationSlug })}
                className="px-6 py-3.5 rounded-lg bg-[#FF00D4] hover:bg-[#FF00D4]/90 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#FF00D4]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
