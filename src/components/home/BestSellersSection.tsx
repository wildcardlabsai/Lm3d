import React from 'react';
import { Product, ProductColor } from '../../types/store';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
  onSelectProduct: (handle: string) => void;
  onQuickAdd: (product: Product, color: ProductColor) => void;
  onViewAll: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onViewAll,
}) => {
  // 6 Best selling / standout products
  const bestSellers = products.slice(0, 6);

  return (
    <section className="py-16 bg-[#08080D] border-t border-[#232334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF00D4] mb-1">
              <Flame className="w-4 h-4 text-[#FF00D4]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              BEST SELLERS
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00D9FF] hover:text-white uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid: 6 items (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
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
