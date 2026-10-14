import React, { useState, useMemo } from 'react';
import { Product, ProductColor } from '../../types/store';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface CollectionPageProps {
  categorySlug: string;
  products: Product[];
  onSelectProduct: (handle: string) => void;
  onQuickAdd: (product: Product, color: ProductColor) => void;
  onSelectCategory: (slug: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  categorySlug,
  products,
  onSelectProduct,
  onQuickAdd,
  onSelectCategory,
}) => {
  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);
  const isAll = categorySlug === 'all';

  // Filter and sort states
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(70);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedFilament, setSelectedFilament] = useState<string>('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Available filaments
  const filamentTypes = [
    { id: 'all', label: 'All Filaments' },
    { id: 'silk', label: 'Dual-Color Silk PLA' },
    { id: 'matte', label: 'Matte Composite PLA' },
    { id: 'glow', label: 'Phosphorescent / Glow' },
    { id: 'petg', label: 'Impact PETG' },
  ];

  // Reset filters
  const handleResetFilters = () => {
    setMaxPrice(70);
    setOnlyInStock(false);
    setSelectedFilament('all');
  };

  const hasActiveFilters = maxPrice < 70 || onlyInStock || selectedFilament !== 'all';

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (!isAll && p.categorySlug !== categorySlug) {
        return false;
      }
      // Price match
      if (p.price > maxPrice) {
        return false;
      }
      // Stock match
      if (onlyInStock && p.stockStatus !== 'in_stock') {
        return false;
      }
      // Filament match
      if (selectedFilament !== 'all') {
        const filamentLower = p.specifications.filament.toLowerCase();
        if (selectedFilament === 'silk' && !filamentLower.includes('silk')) return false;
        if (selectedFilament === 'matte' && !filamentLower.includes('matte')) return false;
        if (selectedFilament === 'glow' && !filamentLower.includes('glow') && !filamentLower.includes('phosphor') && !filamentLower.includes('translucent')) return false;
        if (selectedFilament === 'petg' && !filamentLower.includes('petg')) return false;
      }
      return true;
    });
  }, [products, isAll, categorySlug, maxPrice, onlyInStock, selectedFilament]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (selectedSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Featured: best sellers & new drops first
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return list;
  }, [filteredProducts, selectedSort]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="bg-[#08080D] min-h-screen pb-20">
      {/* Collection Hero Banner */}
      <div className="relative border-b border-[#232334] bg-gradient-to-b from-[#11111A] to-[#08080D] py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00D9FF]">
                {isAll ? 'Complete Catalog' : 'Curated Collection'}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                {isAll ? 'SHOP ALL 3D PRINTS' : currentCategory?.name || 'Collection'}
              </h1>
              <p className="text-xs sm:text-sm text-[#B8B8C8] leading-relaxed">
                {isAll
                  ? 'Browse our complete catalog of articulated dragons, anime figures, low-poly lanterns, geometric planters, and precision multi-layer shadowbox art.'
                  : currentCategory?.description || 'Browse products in this collection.'}
              </p>
            </div>

            {/* Product count indicator */}
            <div className="bg-[#171722] border border-[#232334] rounded-lg px-4 py-2.5 text-xs text-[#B8B8C8] shrink-0 self-start md:self-end">
              Showing <span className="font-bold text-white font-mono">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'Design' : 'Designs'}
            </div>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-8 pb-2 no-scrollbar">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isAll
                  ? 'bg-gradient-to-r from-[#00D9FF] to-[#792BFF] text-[#08080D]'
                  : 'bg-[#171722] text-[#B8B8C8] hover:text-white border border-[#232334]'
              }`}
            >
              All Prints
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  categorySlug === cat.slug
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#792BFF] text-[#08080D]'
                    : 'bg-[#171722] text-[#B8B8C8] hover:text-white border border-[#232334]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar: Filters Toggle & Sort Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#232334]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
              className="px-3.5 py-2 rounded-lg bg-[#171722] hover:bg-[#232334] border border-[#232334] text-xs font-semibold text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>{isFilterDrawerOpen ? 'Hide Filters' : 'Filter Products'}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#FF00D4]" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#B8B8C8] hover:text-white flex items-center gap-1.5 px-2 py-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#B8B8C8]">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="bg-[#171722] border border-[#232334] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#00D9FF] cursor-pointer"
            >
              <option value="featured">Featured &amp; Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Panel (Collapsible) */}
        {isFilterDrawerOpen && (
          <div className="py-6 border-b border-[#232334] grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#11111A]/50 p-6 rounded-xl my-6">
            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-white mb-2">
                <span>Max Price</span>
                <span className="font-mono text-[#00D9FF]">£{maxPrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="14"
                max="70"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#00D9FF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#B8B8C8] mt-1 font-mono">
                <span>£14.00</span>
                <span>£70.00</span>
              </div>
            </div>

            {/* Filament Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-white mb-2">
                Filament Polymer
              </label>
              <select
                value={selectedFilament}
                onChange={(e) => setSelectedFilament(e.target.value)}
                className="w-full bg-[#171722] border border-[#232334] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#00D9FF] cursor-pointer"
              >
                {filamentTypes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Availability Toggle */}
            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#171722] border-[#232334] text-[#00D9FF] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-semibold text-white">
                  In Stock in UK Workshop Only
                </span>
              </label>
              <span className="text-[11px] text-[#B8B8C8] ml-7 mt-0.5">
                Ready for dispatch within 24 hours
              </span>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 py-4">
            <span className="text-xs text-[#B8B8C8]">Active filters:</span>
            {maxPrice < 70 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#171722] border border-[#232334] rounded text-xs text-white">
                Under £{maxPrice}
                <button onClick={() => setMaxPrice(70)} className="hover:text-[#FF00D4] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFilament !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#171722] border border-[#232334] rounded text-xs text-white">
                Filament: {filamentTypes.find((f) => f.id === selectedFilament)?.label}
                <button onClick={() => setSelectedFilament('all')} className="hover:text-[#FF00D4] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#171722] border border-[#232334] rounded text-xs text-white">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)} className="hover:text-[#FF00D4] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid / Empty State */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                />
              ))}
            </div>

            {/* Load More Button */}
            {sortedProducts.length > visibleCount && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-3 rounded-lg bg-[#171722] hover:bg-[#232334] text-white border border-[#232334] hover:border-[#00D9FF]/50 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Load More Designs ({sortedProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#171722] border border-[#232334] text-[#B8B8C8] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">No 3D prints match your filters</h3>
            <p className="text-xs text-[#B8B8C8] leading-relaxed">
              Try adjusting your price range, filament selection, or browse all categories to discover available designs.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#00D9FF] text-[#08080D] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
