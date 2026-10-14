import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { CATEGORIES } from '../../data/categories';
import { ViewState } from '../../types/store';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Cpu } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicy: (policyKey: 'shipping' | 'returns' | 'privacy' | 'terms' | 'shopify') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  return (
    <footer className="bg-[#08080D] border-t border-[#232334] text-[#B8B8C8] text-sm mt-20">
      {/* Brand value pillars */}
      <div className="border-b border-[#232334] py-8 bg-[#11111A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#00D9FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">0.16mm Layer Slicing</div>
                <div className="text-[11px] text-[#B8B8C8]">High resolution surface detail</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#FF00D4]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Dual-Tone Silk Filaments</div>
                <div className="text-[11px] text-[#B8B8C8]">Premium iridescent finishes</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#792BFF]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">UK Workshop Crafted</div>
                <div className="text-[11px] text-[#B8B8C8]">Inspected and packed in Britain</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-lg bg-[#171722] border border-[#232334] flex items-center justify-center shrink-0 text-[#00D9FF]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">Safe UK Delivery</div>
                <div className="text-[11px] text-[#B8B8C8]">Protective bespoke packaging</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate({ type: 'home' })}
              className="focus:outline-none cursor-pointer"
            >
              <BrandLogo size="lg" showText={true} />
            </button>
            <p className="text-xs leading-relaxed text-[#B8B8C8] max-w-sm">
              L&amp;M 3D Print Store is an independent UK studio crafting original 3D-printed creations: articulated flexis, architectural planters, illuminated multi-layer shadowboxes, spooky Halloween creations, and distinctive homeware.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">UK Studio Enquiries</div>
              <div className="text-xs text-[#B8B8C8] space-y-1 font-mono">
                <div>hello@lm3dprintstore.co.uk</div>
                <div>Mon–Fri, 9:00am – 5:00pm GMT</div>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate({ type: 'collection', categorySlug: cat.slug })}
                    className="hover:text-[#00D9FF] transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate({ type: 'collection', categorySlug: 'all' })}
                  className="hover:text-[#00D9FF] transition-colors font-medium text-white cursor-pointer"
                >
                  Shop All Products →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; Exchanges Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shopify')}
                  className="hover:text-[#00D9FF] transition-colors font-medium cursor-pointer"
                >
                  Shopify Online Store 2.0 Blueprint
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Community */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Stay Connected
            </h4>
            <p className="text-xs text-[#B8B8C8] mb-3">
              Be first to discover new print drops, seasonal figures, and limited batch releases.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to L&M 3D Print Store drops!');
              }}
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#11111A] border border-[#232334] rounded-lg px-3 py-2 text-xs text-white placeholder-[#B8B8C8]/60 focus:outline-none focus:border-[#00D9FF]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#171722] hover:bg-[#232334] text-[#00D9FF] rounded-md transition-colors text-xs flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="mt-4 pt-4 border-t border-[#232334] flex items-center gap-3">
              <span className="text-[11px] text-[#B8B8C8]">Follow the studio:</span>
              <span className="text-xs text-[#00D9FF] font-medium">@lm3dprintstore</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#232334] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B8C8]/70">
          <div>
            &copy; {new Date().getFullYear()} L&amp;M 3D Print Store. All rights reserved. Registered UK Retail Brand.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#00D9FF]/80">Prices displayed in GBP (£)</span>
            <span>·</span>
            <span>Hand-finished in the UK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
