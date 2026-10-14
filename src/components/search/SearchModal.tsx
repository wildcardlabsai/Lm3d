import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '../../types/store';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (handle: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specifications.filament.toLowerCase().includes(q)
    );
  }, [query, products]);

  const popularSearches = ['Dragon', 'Planter', 'Skull', 'Anime', 'Shadowbox', 'Silk'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 z-10 relative">
        <div className="w-full max-w-2xl bg-[#08080D] border border-[#232334] rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="p-4 sm:p-5 border-b border-[#232334] flex items-center gap-3 bg-[#11111A]">
            <Search className="w-5 h-5 text-[#00D9FF] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, category, filament or style..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#B8B8C8]/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#B8B8C8] hover:text-white p-1 cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-[#171722] text-[#B8B8C8] hover:text-white transition-colors cursor-pointer border border-[#232334]"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 max-h-[60vh] overflow-y-auto space-y-5">
            {/* If no query yet, show popular suggestions */}
            {!query.trim() && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-[#11111A] hover:bg-[#171722] border border-[#232334] text-xs text-[#B8B8C8] hover:text-white transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#232334]">
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Trending Right Now
                  </div>
                  <div className="space-y-2">
                    {products.slice(0, 3).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p.handle);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#11111A] text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover border border-[#232334]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-[#B8B8C8]">{p.category}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-white tabular-nums">
                          £{p.price.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {query.trim() && (
              <div>
                <div className="text-xs text-[#B8B8C8] mb-3">
                  Found <span className="font-bold text-white">{searchResults.length}</span> results for &ldquo;{query}&rdquo;
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#232334]">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(product.handle);
                        }}
                        className="py-3 flex items-center justify-between hover:bg-[#11111A] -mx-2 px-2 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover border border-[#232334]"
                          />
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                              {product.title}
                            </div>
                            <div className="text-[11px] text-[#B8B8C8] line-clamp-1">
                              {product.category} · {product.specifications.filament}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-white tabular-nums">
                            £{product.price.toFixed(2)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#B8B8C8] group-hover:text-[#00D9FF] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <p className="text-sm font-semibold text-white">No products found matching &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-[#B8B8C8]">
                      Try searching for &quot;dragon&quot;, &quot;planter&quot;, &quot;skull&quot;, or &quot;silk&quot;.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
