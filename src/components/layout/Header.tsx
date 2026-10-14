import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { CATEGORIES } from '../../data/categories';
import { ViewState } from '../../types/store';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  FileCode,
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenShopifyTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onOpenShopifyTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const handleCategoryClick = (slug: string) => {
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate({ type: 'collection', categorySlug: slug });
  };

  const isCurrentCategory = (slug: string) => {
    return currentView.type === 'collection' && currentView.categorySlug === slug;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#08080D]/95 backdrop-blur-md border-b border-[#232334] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors focus:outline-none cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Zone 1: Brand Wordmark / Emblem */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className="group text-left focus:outline-none cursor-pointer"
                aria-label="Go to L&M 3D Print Store homepage"
              >
                <BrandLogo size="md" showText={true} />
              </button>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  currentView.type === 'home'
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'all' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  currentView.type === 'collection' && currentView.categorySlug === 'all'
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Shop All
              </button>

              {/* Categories Mega Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsCategoriesDropdownOpen((prev) => !prev)}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    currentView.type === 'collection' && currentView.categorySlug !== 'all'
                      ? 'text-[#00D9FF] font-semibold'
                      : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                  }`}
                  aria-expanded={isCategoriesDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180 text-[#00D9FF]' : ''}`} />
                </button>

                {/* Categories Dropdown Menu */}
                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[540px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-[#11111A] border border-[#232334] rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-2 backdrop-blur-xl">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.slug)}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#171722] text-left transition-colors group cursor-pointer"
                        >
                          <img
                            src={cat.image}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-[#232334] group-hover:border-[#00D9FF]/50 transition-colors"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-[#00D9FF] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-xs text-[#B8B8C8] line-clamp-1">
                              {cat.tagline}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Popular Category Quick Links */}
              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'pokemon-anime' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentCategory('pokemon-anime')
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Pokémon &amp; Anime
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'halloween-horror' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentCategory('halloween-horror')
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Halloween &amp; Horror
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'flexis-fidgets' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentCategory('flexis-fidgets')
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Flexis &amp; Fidgets
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'planters' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentCategory('planters')
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Planters
              </button>

              <button
                onClick={() => onNavigate({ type: 'collection', categorySlug: 'household-products' })}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isCurrentCategory('household-products')
                    ? 'text-[#00D9FF] font-semibold'
                    : 'text-[#B8B8C8] hover:text-white hover:bg-[#171722]/60'
                }`}
              >
                Household
              </button>
            </nav>

            {/* Zone 3: Interactive Utilities (Shopify Theme Files, Search, Account, Bag) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Shopify Dawn Theme Porter Button */}
              <button
                onClick={onOpenShopifyTheme}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[#00D9FF]/10 via-[#792BFF]/10 to-[#FF00D4]/10 hover:from-[#00D9FF]/20 hover:to-[#FF00D4]/20 border border-[#00D9FF]/40 text-xs font-bold text-white transition-all cursor-pointer shadow-sm group"
                title="View & Download Modified Shopify Dawn Theme Files"
              >
                <FileCode className="w-4 h-4 text-[#00D9FF] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-white">SHOPIFY DAWN FILES</span>
                <span className="xl:hidden text-white">THEME</span>
                <span className="text-[10px] bg-[#00D9FF] text-[#08080D] font-black px-1.5 py-0.2 rounded font-mono">
                  .ZIP
                </span>
              </button>

              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-2.5 text-[#B8B8C8] hover:text-white hover:bg-[#171722] rounded-lg transition-colors cursor-pointer flex items-center gap-2 group"
                aria-label="Search products"
                title="Search store"
              >
                <Search className="w-5 h-5 group-hover:text-[#00D9FF] transition-colors" />
                <span className="hidden xl:inline text-xs text-[#B8B8C8]">Search</span>
              </button>

              {/* Account / Order History */}
              <button
                onClick={onOpenAccount}
                className="p-2.5 text-[#B8B8C8] hover:text-white hover:bg-[#171722] rounded-lg transition-colors cursor-pointer"
                aria-label="Customer account and order history"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button with Live Badge */}
              <button
                onClick={onOpenCart}
                className="relative px-3.5 py-2.5 rounded-lg bg-[#171722] hover:bg-[#232334] border border-[#232334] hover:border-[#00D9FF]/50 transition-all flex items-center gap-2.5 text-white group cursor-pointer"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#00D9FF] group-hover:scale-105 transition-transform" />
                <span className="hidden sm:inline text-xs font-semibold tracking-wide">BAG</span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#00D9FF] to-[#FF00D4] text-[#08080D]">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#08080D] border-r border-[#232334] shadow-2xl flex flex-col z-50 overflow-y-auto">
            <div className="p-5 border-b border-[#232334] flex items-center justify-between">
              <BrandLogo size="sm" showText={true} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#B8B8C8] hover:text-white rounded-lg hover:bg-[#171722] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 space-y-6">
              <div>
                <span className="text-[11px] font-semibold text-[#B8B8C8] uppercase tracking-wider px-3">
                  Store Navigation
                </span>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate({ type: 'home' });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#171722] hover:text-[#00D9FF] text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate({ type: 'collection', categorySlug: 'all' });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#171722] hover:text-[#00D9FF] text-white transition-colors cursor-pointer"
                  >
                    Shop All Products
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#B8B8C8] uppercase tracking-wider px-3">
                  Product Categories
                </span>
                <div className="mt-2 space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#171722] text-[#B8B8C8] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-[#B8B8C8]/60 font-mono">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#232334]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#B8B8C8] hover:text-white hover:bg-[#171722] transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#00D9FF]" />
                  <span>Search Catalog</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#B8B8C8] hover:text-white hover:bg-[#171722] transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#FF00D4]" />
                  <span>Account &amp; Orders</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenShopifyTheme();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-[#171722] transition-colors cursor-pointer bg-gradient-to-r from-[#00D9FF]/10 to-[#FF00D4]/10 border border-[#00D9FF]/30 mt-2"
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="w-4 h-4 text-[#00D9FF]" />
                    <span>Shopify Dawn Files</span>
                  </div>
                  <span className="text-[10px] bg-[#00D9FF] text-[#08080D] font-mono font-bold px-1.5 py-0.5 rounded">
                    .ZIP
                  </span>
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-[#232334] bg-[#11111A]">
              <div className="flex items-center gap-2 text-xs text-[#B8B8C8]">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>UK Studio · Free UK delivery over £45</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
