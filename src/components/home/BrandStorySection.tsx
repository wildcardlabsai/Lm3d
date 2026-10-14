import React from 'react';
import { ViewState } from '../../types/store';
import { ArrowRight, Wrench, Palette, HeartHandshake } from 'lucide-react';

interface BrandStorySectionProps {
  onNavigate: (view: ViewState) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  onNavigate,
}) => {
  return (
    <section className="py-20 bg-[#08080D] border-t border-[#232334] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Workshop Imagery Left */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#232334] bg-[#11111A] shadow-2xl group">
              <img
                src="/src/assets/images/promo_maker_lab_1791920992975.jpg"
                alt="3D printer nozzle extruding dual-color silk filament on build plate"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080D]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#11111A]/80 backdrop-blur-md border border-[#232334] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Precision Additive Manufacturing</span>
                  <span className="text-[#B8B8C8] text-[11px]">Direct-drive extrusion &amp; textured PEI plate</span>
                </div>
                <span className="text-[#00D9FF] font-mono text-[11px] font-semibold">UK Studio</span>
              </div>
            </div>
          </div>

          {/* Brand Philosophy Right */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF00D4]">
              About L&amp;M 3D Print Store
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight">
              SMALL DETAILS.{' '}
              <span className="bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] bg-clip-text text-transparent">
                BIG PERSONALITY.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#B8B8C8] leading-relaxed">
              We started L&amp;M 3D Print Store with a simple vision: to take 3D printing beyond grey prototypes and create vibrant, tactile objects you genuinely want to hold, display, and share.
            </p>

            <p className="text-sm text-[#B8B8C8] leading-relaxed">
              Whether it’s a coiled crystal dragon that shimmers between cyan and magenta as you turn it, a geometric succulent planter for your desk, or an illuminated multi-layer shadowbox, each design is individually inspected and carefully packaged right here in Britain.
            </p>

            {/* Three key pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#00D9FF] mt-0.5">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Colour-Shift Filaments</div>
                  <div className="text-xs text-[#B8B8C8]">Specially selected dual-extrusion silk polymers that refract light into vivid gradients.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#FF00D4] mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Mechanical &amp; Articulated Quality</div>
                  <div className="text-xs text-[#B8B8C8]">Tight tolerances calibrated for smooth print-in-place links and crisp geometric edges.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#792BFF] mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Independent British Studio</div>
                  <div className="text-xs text-[#B8B8C8]">Every product is hand-finished, checked for layer integrity, and shipped in protective packaging.</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'all' })}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#171722] hover:bg-[#232334] border border-[#232334] hover:border-[#00D9FF]/50 px-5 py-3 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Browse The Complete Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#00D9FF]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
