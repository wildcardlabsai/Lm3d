import React from 'react';
import { ViewState } from '../../types/store';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: ViewState) => void;
  onSelectProduct: (handle: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#08080D] pt-6 pb-16 lg:py-16">
      {/* Background ambient lighting effects inspired by L&M logo */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#FF00D4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#792BFF]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand Statement & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Subtle kicker (clean unboxed text, anti-slop) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00D9FF] uppercase">
              <Sparkles className="w-4 h-4 text-[#FF00D4]" />
              <span>Independent British 3D Print Studio</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.05] text-balance">
                PRINTED{' '}
                <span className="bg-gradient-to-r from-[#00D9FF] via-white to-[#FF00D4] bg-clip-text text-transparent">
                  DIFFERENT.
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-white/90 font-display">
                Unique designs. Bold colours. Made to stand out.
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#B8B8C8] leading-relaxed max-w-xl">
              Welcome to L&amp;M 3D Print Store. We craft original 3D-printed collectibles, articulated flexi figures, geometric architectural planters, and illuminated multi-layer shadowboxes. Every piece is precision-sliced, printed in vibrant dual-color silk filaments, and hand-finished in our UK workshop.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'all' })}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#00D9FF] via-[#792BFF] to-[#FF00D4] text-[#08080D] font-black text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,217,255,0.25)] cursor-pointer"
              >
                <span>SHOP ALL PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'flexis-fidgets' })}
                className="px-6 py-3.5 rounded-lg bg-[#11111A] hover:bg-[#171722] text-white border border-[#232334] hover:border-[#00D9FF]/50 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>

            {/* Studio trust markers */}
            <div className="pt-4 border-t border-[#232334] grid grid-cols-3 gap-4 text-xs text-[#B8B8C8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0" />
                <span className="font-medium">Dual-Silk PLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF00D4] shrink-0" />
                <span className="font-medium">0.16mm Slicing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#792BFF] shrink-0" />
                <span className="font-medium">UK Workshop</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Product Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#232334] bg-[#11111A] shadow-2xl group">
              <img
                src="/src/assets/images/hero_3d_prints_showcase_1791920823952.jpg"
                alt="L&M 3D Print Store Showcase: Articulated Crystal Dragon, Succulent Planter, Skull Lantern, and Layered Shadowbox"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover group-hover:scale-102 transition-transform duration-700"
              />

              {/* Bottom interactive overlay shelf */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/80 to-transparent p-5 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                    Featured Workshop Drops
                  </div>
                  <div className="text-[11px] text-[#B8B8C8]">
                    Click below to inspect individual featured pieces
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onSelectProduct('articulated-crystal-serpent-dragon')}
                    className="text-[11px] font-semibold bg-[#171722]/90 hover:bg-[#00D9FF] text-white hover:text-[#08080D] px-2.5 py-1.5 rounded border border-[#232334] transition-colors cursor-pointer"
                  >
                    Flexi Dragon
                  </button>
                  <button
                    onClick={() => onSelectProduct('faceted-geodesic-hex-planter')}
                    className="text-[11px] font-semibold bg-[#171722]/90 hover:bg-[#00D9FF] text-white hover:text-[#08080D] px-2.5 py-1.5 rounded border border-[#232334] transition-colors cursor-pointer"
                  >
                    Faceted Planter
                  </button>
                  <button
                    onClick={() => onSelectProduct('alpine-sanctuary-multi-layer-shadowbox')}
                    className="text-[11px] font-semibold bg-[#171722]/90 hover:bg-[#FF00D4] text-white hover:text-white px-2.5 py-1.5 rounded border border-[#232334] transition-colors cursor-pointer"
                  >
                    Shadowbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
