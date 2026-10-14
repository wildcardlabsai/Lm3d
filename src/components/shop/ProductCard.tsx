import React, { useState } from 'react';
import { Product, ProductColor } from '../../types/store';
import { ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (handle: string) => void;
  onQuickAdd: (product: Product, selectedColor: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedColor);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1800);
  };

  const currentImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0];

  return (
    <article
      onClick={() => onSelectProduct(product.handle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-[#11111A] border border-[#232334] hover:border-[#00D9FF]/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#171722] overflow-hidden">
        {/* Subtle badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded backdrop-blur-md ${
              product.badge === 'Bestseller'
                ? 'bg-[#FF00D4]/90 text-white'
                : product.badge === 'New Drop'
                ? 'bg-[#00D9FF]/90 text-[#08080D]'
                : 'bg-[#171722]/90 text-white border border-[#232334]'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        <img
          src={currentImage}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/src/assets/images/hero_3d_prints_showcase_1791920823952.jpg';
          }}
        />

        {/* Quick Add Overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAddClick}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer ${
              addedRecently
                ? 'bg-emerald-500 text-white'
                : 'bg-white hover:bg-[#00D9FF] text-[#08080D] hover:text-[#08080D]'
            }`}
            aria-label={`Quick add ${product.title} to bag`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product.handle);
            }}
            className="p-2 bg-[#08080D]/80 hover:bg-[#08080D] text-white border border-[#232334] rounded-lg transition-colors cursor-pointer"
            aria-label="View details"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed category metadata (Anti-slop rule) */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#B8B8C8] uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#232334]">·</span>
            <span className="text-[#00D9FF]">{product.specifications.layerHeight}</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors line-clamp-1 font-display">
            {product.title}
          </h3>

          <p className="text-xs text-[#B8B8C8] line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#232334] flex items-center justify-between">
          {/* Price with tabular numerals */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white font-mono tabular-nums">
              £{product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#B8B8C8] line-through font-mono tabular-nums">
                £{product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colorway dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColor.id === color.id
                    ? 'border-white scale-125 ring-1 ring-[#00D9FF]'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                style={{
                  background: color.secondaryHex
                    ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                    : color.hex,
                }}
                title={`${color.name} (${color.filamentType})`}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
