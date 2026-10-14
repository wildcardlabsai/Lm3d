import React from 'react';
import { X, Truck, RotateCcw, Shield, FileText, Code2, Check } from 'lucide-react';

interface PolicyModalProps {
  policyKey: 'shipping' | 'returns' | 'privacy' | 'terms' | 'shopify' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyKey, onClose }) => {
  if (!policyKey) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 z-10 relative">
        <div className="w-full max-w-2xl bg-[#08080D] border border-[#232334] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="bg-[#11111A] border-b border-[#232334] p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {policyKey === 'shipping' && <Truck className="w-5 h-5 text-[#00D9FF]" />}
              {policyKey === 'returns' && <RotateCcw className="w-5 h-5 text-[#FF00D4]" />}
              {policyKey === 'privacy' && <Shield className="w-5 h-5 text-[#792BFF]" />}
              {policyKey === 'terms' && <FileText className="w-5 h-5 text-[#00D9FF]" />}
              {policyKey === 'shopify' && <Code2 className="w-5 h-5 text-[#00D9FF]" />}
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
                {policyKey === 'shipping' && 'UK Shipping & Delivery Policy'}
                {policyKey === 'returns' && 'Returns & Exchanges Policy'}
                {policyKey === 'privacy' && 'Privacy Policy'}
                {policyKey === 'terms' && 'Terms & Conditions of Sale'}
                {policyKey === 'shopify' && 'Shopify Dawn Theme Architecture Blueprint'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs leading-relaxed text-[#B8B8C8]">
            {policyKey === 'shipping' && (
              <>
                <p className="text-white font-semibold">
                  L&amp;M 3D Print Store dispatches all items directly from our UK workshop.
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-white text-sm">Processing &amp; Print Times</h4>
                  <p>
                    All items listed as &ldquo;In Stock&rdquo; are pre-printed and undergo layer quality inspection. Orders dispatch within 1 to 2 business days.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-white text-sm">UK Shipping Rates</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Royal Mail Tracked 48:</strong> £2.99 (Free on UK orders over £45.00)</li>
                    <li><strong>Royal Mail Tracked 24:</strong> £4.50 priority service</li>
                  </ul>
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-white text-sm">Protective Packaging</h4>
                  <p>
                    Articulated flexi figures, geometric planters, and delicate multi-layer shadowbox frames are packed in custom die-cut protective cardboard boxes with biodegradable filler to prevent transit stress.
                  </p>
                </div>
              </>
            )}

            {policyKey === 'returns' && (
              <>
                <p className="text-white font-semibold">
                  We stand by the craftsmanship of every 3D print produced in our studio.
                </p>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-white text-sm">14-Day Return Guarantee</h4>
                  <p>
                    If you are not completely satisfied with your item, you may return it in its original condition within 14 calendar days of receipt for a replacement or refund.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-white text-sm">Layer Delamination or Transit Damage</h4>
                  <p>
                    In the unlikely event an item suffers transit damage or link breakage, photograph the item within 48 hours of delivery and contact hello@lm3dprintstore.co.uk. We will immediately dispatch a fresh reprint free of charge.
                  </p>
                </div>
              </>
            )}

            {policyKey === 'privacy' && (
              <>
                <p>
                  L&amp;M 3D Print Store respects customer privacy and complies with UK GDPR regulations. We collect only necessary contact and delivery information required to fulfill orders and communicate parcel dispatch tracking.
                </p>
                <p>
                  We never sell, rent, or trade your personal information. When converted to Shopify, all payment processing is handled through PCI Level 1 certified Shopify Payments infrastructure.
                </p>
              </>
            )}

            {policyKey === 'terms' && (
              <>
                <p>
                  By placing an order on L&amp;M 3D Print Store, you agree to these standard retail terms.
                </p>
                <p>
                  All products are 3D-printed using high-quality thermoplastic filaments (PLA/PETG). While our printing tolerances and visual finishes are exceptionally fine, characteristic micro-layer striations are inherent to the additive manufacturing process and form part of the authentic 3D-printed aesthetic.
                </p>
                <p>
                  All prices are quoted in Great British Pounds (GBP £) and include applicable UK taxes.
                </p>
              </>
            )}

            {policyKey === 'shopify' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#11111A] border border-[#00D9FF]/30 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00D9FF]" />
                    <span>Shopify Online Store 2.0 (Dawn Theme) Ready</span>
                  </div>
                  <p className="text-[#B8B8C8]">
                    This prototype was specifically architected with clean data isolation so that each React component corresponds directly to native Shopify 2.0 sections, snippets, and Liquid templates:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="p-3 bg-[#11111A] rounded-lg border border-[#232334]">
                    <strong className="text-[#00D9FF] font-sans block mb-1">React Component</strong>
                    HeroSection.tsx<br />
                    FeaturedCategories.tsx<br />
                    ProductCard.tsx<br />
                    CollectionPage.tsx<br />
                    ProductDetailPage.tsx<br />
                    CartDrawer.tsx
                  </div>
                  <div className="p-3 bg-[#11111A] rounded-lg border border-[#232334]">
                    <strong className="text-[#FF00D4] font-sans block mb-1">Shopify Dawn Equivalent</strong>
                    sections/hero-banner.liquid<br />
                    sections/collection-list.liquid<br />
                    snippets/card-product.liquid<br />
                    templates/collection.json<br />
                    sections/main-product.liquid<br />
                    snippets/cart-drawer.liquid
                  </div>
                </div>

                <p className="text-[#B8B8C8] pt-2">
                  Product models, variant dimensions, filament colorways, and price delta attributes are designed to translate directly into Shopify Metafields and Variant Options without architectural re-engineering.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#11111A] border-t border-[#232334] p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#171722] hover:bg-[#232334] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
