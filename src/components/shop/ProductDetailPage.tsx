import React, { useState } from 'react';
import { Product, ProductVariant, ProductColor, ViewState } from '../../types/store';
import { ProductCard } from './ProductCard';
import {
  ShoppingBag,
  Check,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Layers,
  ThermometerSnowflake,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (view: ViewState) => void;
  onSelectProduct: (handle: string) => void;
  onAddToCart: (product: Product, variant: ProductVariant, color: ProductColor, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'shipping'>('details');
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  // Price calculated with variant delta
  const effectivePrice = product.price + selectedVariant.priceDelta;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, selectedColor, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2400);
  };

  // Related products from same category or featured
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.isFeatured))
    .slice(0, 3);

  return (
    <div className="bg-[#08080D] min-h-screen pb-20">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#232334] py-3.5 bg-[#11111A]/40 text-xs text-[#B8B8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#232334]" />
          <button
            onClick={() => onNavigate({ type: 'collection', categorySlug: product.categorySlug })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#232334]" />
          <span className="text-white font-medium truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery (Contiguous Module Left) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Photo */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#232334] bg-[#11111A] shadow-2xl">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF00D4] text-white backdrop-blur-md shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}

              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Photo watermark indicator */}
              <div className="absolute bottom-4 right-4 bg-[#08080D]/80 backdrop-blur-md border border-[#232334] px-3 py-1 rounded text-[11px] text-[#B8B8C8]">
                Studio Photography · 8K Resolution
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#00D9FF] ring-2 ring-[#00D9FF]/40 scale-102'
                        : 'border-[#232334] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Workshop highlight box */}
            <div className="p-4 rounded-xl bg-[#11111A] border border-[#232334] flex items-center justify-between text-xs text-[#B8B8C8]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00D9FF]" />
                <span>
                  Continuous Print Duration:{' '}
                  <span className="text-white font-mono font-medium">{product.specifications.printTime}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF00D4]" />
                <span className="text-white font-mono">{product.specifications.layerHeight}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (PDP Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Slicing unboxed metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8B8C8] uppercase tracking-wider mb-2">
                <span className="text-[#00D9FF]">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Hand-finished in UK</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#B8B8C8] mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price display with tabular numerals */}
            <div className="flex items-baseline gap-3 py-3 border-y border-[#232334]">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                £{effectivePrice.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#B8B8C8] line-through font-mono tabular-nums">
                  £{(product.compareAtPrice + selectedVariant.priceDelta).toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#00D9FF] font-medium ml-auto">
                Taxes included · UK Delivery from £2.99
              </span>
            </div>

            {/* Size / Scale Variant Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                Select Size / Scale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedVariant.id === v.id
                        ? 'border-[#00D9FF] bg-[#171722] text-white shadow-sm'
                        : 'border-[#232334] bg-[#11111A] text-[#B8B8C8] hover:border-[#B8B8C8]/50'
                    }`}
                  >
                    <div className="text-xs font-semibold">{v.name}</div>
                    {v.priceDelta > 0 && (
                      <div className="text-[11px] text-[#00D9FF] font-mono mt-0.5">
                        +£{v.priceDelta.toFixed(2)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filament Colorway Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Color &amp; Filament:</span>
                <span className="text-[#00D9FF] font-medium">{selectedColor.name}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                      selectedColor.id === c.id
                        ? 'border-[#00D9FF] bg-[#171722] ring-1 ring-[#00D9FF]'
                        : 'border-[#232334] bg-[#11111A] hover:border-[#B8B8C8]/40'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{
                        background: c.secondaryHex
                          ? `linear-gradient(135deg, ${c.hex} 50%, ${c.secondaryHex} 50%)`
                          : c.hex,
                      }}
                    />
                    <span className="text-xs text-white font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-[#B8B8C8] flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Polymer specification: {selectedColor.filamentType}</span>
              </div>
            </div>

            {/* Quantity Selector & Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Quantity</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock ({product.stockCount} available)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#232334] rounded-xl bg-[#11111A] overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3.5 py-2.5 text-white hover:bg-[#171722] text-sm font-bold transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3.5 py-2.5 text-white hover:bg-[#171722] text-sm font-bold transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00D9FF] via-[#792BFF] to-[#FF00D4] text-[#08080D] font-black text-xs sm:text-sm uppercase tracking-wider hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  {isAddedToast ? (
                    <>
                      <Check className="w-4 h-4 text-[#08080D]" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#08080D]" />
                      <span>ADD TO BAG · £{(effectivePrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Trust Markers Strip */}
            <div className="p-4 rounded-xl bg-[#11111A] border border-[#232334] grid grid-cols-2 gap-3 text-xs text-[#B8B8C8]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00D9FF]" />
                <span>UK Dispatch in 24–48h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FF00D4]" />
                <span>Layer Inspection Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#792BFF]" />
                <span>14-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#00D9FF]" />
                <span>Free UK Delivery over £45</span>
              </div>
            </div>

            {/* Tabbed Product Details */}
            <div className="pt-4 border-t border-[#232334]">
              <div className="flex items-center border-b border-[#232334] text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 font-bold uppercase tracking-wider px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-[#00D9FF] text-white'
                      : 'border-transparent text-[#B8B8C8] hover:text-white'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 font-bold uppercase tracking-wider px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#00D9FF] text-white'
                      : 'border-transparent text-[#B8B8C8] hover:text-white'
                  }`}
                >
                  3D Specs
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2.5 font-bold uppercase tracking-wider px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-[#00D9FF] text-white'
                      : 'border-transparent text-[#B8B8C8] hover:text-white'
                  }`}
                >
                  Filament Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 font-bold uppercase tracking-wider px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'border-[#00D9FF] text-white'
                      : 'border-transparent text-[#B8B8C8] hover:text-white'
                  }`}
                >
                  Shipping
                </button>
              </div>

              <div className="py-4 text-xs leading-relaxed text-[#B8B8C8] space-y-3">
                {activeTab === 'details' && (
                  <>
                    <p>{product.description}</p>
                    <p className="pt-2 text-white/90 italic font-medium">{product.story}</p>
                  </>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between py-1 border-b border-[#232334]">
                      <span className="text-[#B8B8C8]">Dimensions:</span>
                      <span className="text-white">{product.specifications.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#232334]">
                      <span className="text-[#B8B8C8]">Polymer:</span>
                      <span className="text-white">{product.specifications.filament}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#232334]">
                      <span className="text-[#B8B8C8]">Layer Height:</span>
                      <span className="text-[#00D9FF]">{product.specifications.layerHeight}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#232334]">
                      <span className="text-[#B8B8C8]">Approx Weight:</span>
                      <span className="text-white">{product.specifications.weight}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#B8B8C8]">Surface Finish:</span>
                      <span className="text-white">{product.specifications.finish}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <ThermometerSnowflake className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Temperature Guidance:</strong>
                        <p>PLA filament softens at temperatures exceeding 55°C (130°F). Avoid leaving inside hot vehicles during high summer or on top of high-heat radiators.</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <strong className="text-white">Cleaning:</strong>
                      <p>Dust with a soft dry brush or microfiber cloth. For planters, rinse with lukewarm water. Not dishwasher safe.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      <strong>UK Royal Mail Tracked 48:</strong> £2.99 (Free on UK orders over £45).
                    </p>
                    <p>
                      <strong>UK Royal Mail Tracked 24:</strong> £4.50.
                    </p>
                    <p>
                      Items in stock ship within 1-2 business days in reinforced protective boxes with biodegradable packaging.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#232334]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#00D9FF]">You May Also Like</div>
                <h2 className="text-2xl font-black text-white font-display">RELATED 3D PRINTS</h2>
              </div>
              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: product.categorySlug })}
                className="text-xs font-bold text-[#FF00D4] hover:text-white uppercase transition-colors cursor-pointer"
              >
                View More In {product.category} →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={() => onAddToCart(relProduct, relProduct.variants[0], relProduct.colors[0], 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
