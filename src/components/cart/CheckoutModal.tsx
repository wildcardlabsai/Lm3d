import React, { useState } from 'react';
import { CartItem } from '../../types/store';
import { BrandLogo } from '../common/BrandLogo';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Lock,
  Sparkles,
  Printer,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  promoCode,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [formData, setFormData] = useState({
    email: 'collector@example.co.uk',
    firstName: 'Alex',
    lastName: 'Morgan',
    address: '42 Baker High Street',
    city: 'Manchester',
    postcode: 'M1 4BT',
    deliveryMethod: 'tracked48',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const shippingCost = formData.deliveryMethod === 'tracked24' ? 4.50 : subtotal >= 45 ? 0 : 2.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCompleteOrder = () => {
    const generatedOrderNo = `LM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNo);
    setStep('confirmed');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 z-10 relative">
        <div className="w-full max-w-2xl bg-[#08080D] border border-[#232334] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Top Banner / Disclaimer */}
          <div className="bg-[#11111A] border-b border-[#232334] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" showText={true} />
              <div className="hidden sm:block border-l border-[#232334] pl-3 text-[11px] text-[#00D9FF] font-semibold uppercase">
                Simulated Checkout Flow
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prototype Notice Callout */}
          <div className="bg-[#171722]/80 border-b border-[#232334] px-6 py-2.5 flex items-center gap-2 text-xs text-[#B8B8C8]">
            <Lock className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
            <span>
              <strong>Shopify Architecture Prototype:</strong> This simulates the customer checkout journey without processing live payments. Real store will use Shopify Dawn native checkout.
            </span>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto max-h-[75vh]">
            {step === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">1. UK Delivery Details</h3>
                  <p className="text-xs text-[#B8B8C8]">Where should we dispatch your 3D-printed order?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">Email Address for Tracking</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">City / Town</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#B8B8C8] mb-1 font-semibold">UK Postcode</label>
                    <input
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full bg-[#11111A] border border-[#232334] focus:border-[#00D9FF] rounded-lg p-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-white uppercase tracking-wider">
                    Shipping Method
                  </label>
                  <div className="space-y-2">
                    <label
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'tracked48' })}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        formData.deliveryMethod === 'tracked48'
                          ? 'border-[#00D9FF] bg-[#171722] text-white'
                          : 'border-[#232334] bg-[#11111A] text-[#B8B8C8]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-4 h-4 text-[#00D9FF]" />
                        <div>
                          <div className="font-semibold text-white">Royal Mail Tracked 48</div>
                          <div className="text-[11px] text-[#B8B8C8]">Estimated delivery: 2–3 business days</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold">
                        {subtotal >= 45 ? 'FREE' : '£2.99'}
                      </span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'tracked24' })}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        formData.deliveryMethod === 'tracked24'
                          ? 'border-[#00D9FF] bg-[#171722] text-white'
                          : 'border-[#232334] bg-[#11111A] text-[#B8B8C8]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-4 h-4 text-[#FF00D4]" />
                        <div>
                          <div className="font-semibold text-white">Royal Mail Tracked 24 Priority</div>
                          <div className="text-[11px] text-[#B8B8C8]">Estimated delivery: Next business day</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold">£4.50</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3.5 bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] text-[#08080D] font-black text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>CONTINUE TO SIMULATED PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">2. Simulated Payment &amp; Confirmation</h3>
                  <p className="text-xs text-[#B8B8C8]">Verify your order items and dispatch summary.</p>
                </div>

                {/* Items Summary */}
                <div className="bg-[#11111A] border border-[#232334] rounded-xl p-4 divide-y divide-[#232334] space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider pb-2">
                    Order Items ({items.reduce((acc, i) => acc + i.quantity, 0)})
                  </div>
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-10 h-10 rounded-lg object-cover border border-[#232334]"
                        />
                        <div>
                          <div className="font-semibold text-white">{item.product.title}</div>
                          <div className="text-[11px] text-[#B8B8C8]">
                            {item.variant.name} · {item.color.name} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-white tabular-nums">
                        £{(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#11111A] border border-[#232334] rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#B8B8C8]">
                    <span>Subtotal:</span>
                    <span className="font-mono text-white">£{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({promoCode}):</span>
                      <span className="font-mono">-£{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#B8B8C8]">
                    <span>UK Shipping ({formData.deliveryMethod === 'tracked24' ? 'Tracked 24' : 'Tracked 48'}):</span>
                    <span className="font-mono text-white">
                      {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#232334] flex justify-between text-sm font-bold text-white">
                    <span>Total (GBP):</span>
                    <span className="font-mono text-[#00D9FF] text-base">£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Mock Card selector */}
                <div className="p-4 rounded-xl bg-[#171722] border border-[#232334] text-xs space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Instant Prototype Payment Test</span>
                  </div>
                  <p className="text-[#B8B8C8] text-[11px]">
                    No real credit card required. Click the button below to confirm the order and verify the post-order receipt state.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="py-3 px-4 rounded-xl bg-[#11111A] hover:bg-[#171722] border border-[#232334] text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="flex-1 py-3.5 bg-gradient-to-r from-[#00D9FF] via-[#792BFF] to-[#FF00D4] text-[#08080D] font-black text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRM SIMULATED ORDER (£{grandTotal.toFixed(2)})</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'confirmed' && (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">
                    Order Received &amp; Queued For Print
                  </span>
                  <h3 className="text-2xl font-black text-white font-display">
                    THANK YOU FOR YOUR ORDER!
                  </h3>
                  <div className="text-sm font-mono text-white font-bold pt-1">
                    Order Reference: <span className="text-[#FF00D4]">{orderNumber}</span>
                  </div>
                </div>

                <p className="text-xs text-[#B8B8C8] max-w-md mx-auto leading-relaxed">
                  We&apos;ve sent a confirmation receipt to <strong className="text-white">{formData.email}</strong>. In the real store, your print order will be routed into production with real-time tracking updates.
                </p>

                <div className="p-4 rounded-xl bg-[#11111A] border border-[#232334] text-left text-xs max-w-md mx-auto space-y-1.5 font-mono">
                  <div className="text-[#00D9FF] font-bold font-sans uppercase mb-1">Dispatch Summary</div>
                  <div>Recipient: {formData.firstName} {formData.lastName}</div>
                  <div>Address: {formData.address}, {formData.city}, {formData.postcode}</div>
                  <div>Shipping: Royal Mail {formData.deliveryMethod === 'tracked24' ? 'Tracked 24' : 'Tracked 48'}</div>
                  <div className="text-white font-bold pt-1">Total Paid: £{grandTotal.toFixed(2)}</div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#171722] hover:bg-[#232334] border border-[#232334] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
