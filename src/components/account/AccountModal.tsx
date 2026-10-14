import React from 'react';
import { X, Package, Heart, MapPin, User, LogOut, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 z-10 relative">
        <div className="w-full max-w-lg bg-[#08080D] border border-[#232334] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#11111A] border-b border-[#232334] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#171722] border border-[#232334] flex items-center justify-center text-[#00D9FF]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Collector Account</h3>
                <span className="text-[11px] text-[#B8B8C8]">VIP Maker Club Member</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Details */}
          <div className="p-6 space-y-6 text-xs">
            {/* Recent Orders Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#00D9FF]" />
                  <span>Recent Workshop Orders</span>
                </span>
                <span className="text-[11px] text-[#00D9FF]">1 Active Order</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#11111A] border border-[#232334] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white">#LM-729410</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                    Dispatched · Royal Mail Tracked 48
                  </span>
                </div>
                <div className="text-[#B8B8C8] text-[11px]">
                  Articulated Crystal Serpent Dragon (Electric Cyan &amp; Magenta Silk) × 1
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#232334] text-[11px]">
                  <span className="text-[#B8B8C8]">Tracking: RM948201849GB</span>
                  <span className="font-mono font-bold text-white">£24.99</span>
                </div>
              </div>
            </div>

            {/* Saved Delivery Address */}
            <div>
              <div className="font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF00D4]" />
                <span>Primary UK Delivery Address</span>
              </div>
              <div className="p-3 rounded-xl bg-[#11111A] border border-[#232334] text-[#B8B8C8] leading-relaxed">
                <div className="text-white font-semibold">Alex Morgan</div>
                <div>42 Baker High Street</div>
                <div>Manchester, M1 4BT</div>
                <div>United Kingdom</div>
              </div>
            </div>

            {/* Shopify Note */}
            <div className="p-3.5 rounded-xl bg-[#171722] border border-[#232334] text-[#B8B8C8] text-[11px] leading-relaxed">
              <strong className="text-white block mb-0.5">Shopify Customer Accounts Note:</strong>
              When transitioned to Shopify Online Store 2.0, this module seamlessly maps to Shopify&apos;s new customer accounts portal with passwordless login and one-click checkout.
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#171722] hover:bg-[#232334] text-white border border-[#232334] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
