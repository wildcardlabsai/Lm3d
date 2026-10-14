import React, { useState } from 'react';
import { CartItem } from '../../types/store';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  Check,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 45;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = appliedPromo === 'PRINT10' ? subtotal * 0.10 : 0;
  const finalSubtotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'PRINT10') {
      setAppliedPromo('PRINT10');
      setPromoError(null);
    } else {
      setPromoError('Invalid discount code. Try PRINT10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#08080D] border-l border-[#232334] shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-5 border-b border-[#232334] bg-[#11111A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#00D9FF]" />
              <h2 className="text-base font-bold text-white font-display">
                SHOPPING BAG
              </h2>
              <span className="text-xs bg-[#171722] text-[#00D9FF] px-2 py-0.5 rounded-full font-mono font-bold border border-[#232334]">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#11111A]/60 px-5 py-3 border-b border-[#232334]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-[#B8B8C8]">
                <Truck className="w-3.5 h-3.5 text-[#00D9FF]" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-white font-mono">£{remainingForFreeShipping.toFixed(2)}</strong> for Free UK Delivery
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Qualified for Free UK Delivery!
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#B8B8C8]">£45.00</span>
            </div>
            <div className="w-full bg-[#171722] h-1.5 rounded-full overflow-hidden border border-[#232334]">
              <div
                className="h-full bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] transition-all duration-300"
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#11111A] border border-[#232334] text-[#B8B8C8] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-display">Your bag is empty</h3>
                  <p className="text-xs text-[#B8B8C8] max-w-xs">
                    Explore our range of articulated flexis, anime collectibles, and geometric planters.
                  </p>
                </div>
                <button
                  onClick={onContinueShopping}
                  className="px-5 py-2.5 bg-[#00D9FF] text-[#08080D] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#11111A] border border-[#232334] flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover border border-[#232334] shrink-0 bg-[#171722]"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate font-display">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#B8B8C8] hover:text-[#FF00D4] transition-colors p-1 -mr-1 cursor-pointer"
                          aria-label={`Remove ${item.product.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#B8B8C8] space-y-0.5 mt-0.5">
                        <div className="truncate">Scale: {item.variant.name}</div>
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                            style={{
                              background: item.color.secondaryHex
                                ? `linear-gradient(135deg, ${item.color.hex} 50%, ${item.color.secondaryHex} 50%)`
                                : item.color.hex,
                            }}
                          />
                          <span>{item.color.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#232334]/60">
                      <div className="flex items-center border border-[#232334] rounded-lg bg-[#08080D]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-white hover:bg-[#171722] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-white hover:bg-[#171722] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-bold text-white font-mono tabular-nums">
                        £{(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Promo Code & Subtotal */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#232334] bg-[#11111A] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#B8B8C8] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Discount code (try PRINT10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-[#171722] border border-[#232334] focus:border-[#00D9FF] rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-[#B8B8C8]/60 focus:outline-none uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#232334] hover:bg-[#2e2e46] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 pt-1">
                    <Check className="w-3 h-3" /> Code {appliedPromo} applied (10% off)!
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-400 pt-1">{promoError}</div>
                )}
              </form>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs border-t border-[#232334] pt-3">
                <div className="flex justify-between text-[#B8B8C8]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white tabular-nums">£{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%):</span>
                    <span className="font-mono tabular-nums">-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#B8B8C8]">
                  <span>Estimated Shipping:</span>
                  <span className="font-mono text-white">
                    {subtotal >= 45 ? 'FREE' : '£2.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#232334]">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-[#00D9FF] text-base tabular-nums">
                    £{(finalSubtotal + (subtotal >= 45 ? 0 : 2.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, appliedPromo || '')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00D9FF] via-[#792BFF] to-[#FF00D4] text-[#08080D] font-black text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  onClick={onContinueShopping}
                  className="text-xs text-[#B8B8C8] hover:text-white transition-colors cursor-pointer underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
