import React from 'react';
import { Product, ProductColor } from '../../types/store';
import { ProductCard } from '../shop/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
  onSelectProduct: (handle: string) => void;
  onQuickAdd: (product: Product, color: ProductColor) => void;
  onViewAllNew: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onViewAllNew,
}) => {
  // Filter for products that are new or recently dropped
  const newArrivals = products.filter((p) => p.isNew || p.badge === 'New Drop' || p.badge === 'Limited Run');

  return (
    <section className="py-16 bg-[#11111A]/40 border-t border-[#232334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00D9FF] mb-1">
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span>Fresh Off The Build Plate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              NEW ARRIVALS
            </h2>
          </div>

          <button
            onClick={onViewAllNew}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FF00D4] hover:text-white uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Distinctive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
