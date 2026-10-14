import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (slug: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-16 bg-[#08080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#00D9FF] mb-1">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B8B8C8] max-w-md">
            From flexible articulated dragons and anime collectibles to geometric planters and layered wall shadowboxes.
          </p>
        </div>

        {/* 6 Category Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative h-72 sm:h-80 rounded-xl overflow-hidden border border-[#232334] hover:border-[#00D9FF]/50 bg-[#11111A] transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
            >
              {/* Category Photography Asset */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/images/hero_3d_prints_showcase_1791920823952.jpg';
                }}
              />

              {/* Scrim gradient overlay (measured contrast scrim) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080D] via-[#08080D]/60 to-transparent group-hover:via-[#08080D]/40 transition-colors" />

              {/* Content Box */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D9FF] group-hover:text-white transition-colors">
                    {cat.itemCount} Designs
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#171722]/80 border border-[#232334] group-hover:bg-[#00D9FF] group-hover:border-[#00D9FF] text-white group-hover:text-[#08080D] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-white font-display group-hover:text-[#00D9FF] transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#B8B8C8] line-clamp-1 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
