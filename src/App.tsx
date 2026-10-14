import React, { useState, useEffect } from 'react';
import { ViewState, CartItem, Product, ProductVariant, ProductColor } from './types/store';
import { PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedCategories } from './components/home/FeaturedCategories';
import { BestSellersSection } from './components/home/BestSellersSection';
import { NewArrivalsSection } from './components/home/NewArrivalsSection';
import { BrandStorySection } from './components/home/BrandStorySection';
import { PromoBannerSection } from './components/home/PromoBannerSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { CollectionPage } from './components/shop/CollectionPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SearchModal } from './components/search/SearchModal';
import { AccountModal } from './components/account/AccountModal';
import { PolicyModal } from './components/common/PolicyModal';
import { ShopifyThemePorterModal } from './components/shopify/ShopifyThemePorterModal';

export default function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lm_cart_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Seed with 1 popular item initially so visitors immediately experience the live cart
    const initialProduct = PRODUCTS[0];
    return [
      {
        id: `${initialProduct.id}-${initialProduct.variants[0].id}-${initialProduct.colors[0].id}`,
        productId: initialProduct.id,
        product: initialProduct,
        variant: initialProduct.variants[0],
        color: initialProduct.colors[0],
        unitPrice: initialProduct.price,
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isShopifyThemeOpen, setIsShopifyThemeOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'returns' | 'privacy' | 'terms' | 'shopify' | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lm_cart_items', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Scroll to top on view changes
  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (handle: string) => {
    setView({ type: 'product', productHandle: handle });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    color: ProductColor,
    quantity: number
  ) => {
    const compositeId = `${product.id}-${variant.id}-${color.id}`;
    const effectivePrice = product.price + variant.priceDelta;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            productId: product.id,
            product,
            variant,
            color,
            unitPrice: effectivePrice,
            quantity,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, color: ProductColor) => {
    handleAddToCart(product, product.variants[0], color, 1);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setDiscountAmount(discount);
    setAppliedPromo(promo);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Find active product for PDP
  const activeProduct =
    view.type === 'product'
      ? PRODUCTS.find((p) => p.handle === view.productHandle) || PRODUCTS[0]
      : null;

  return (
    <div className="min-h-screen bg-[#08080D] text-white flex flex-col font-sans selection:bg-[#00D9FF]/20 selection:text-[#00D9FF]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header
        currentView={view}
        onNavigate={handleNavigate}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenShopifyTheme={() => setIsShopifyThemeOpen(true)}
      />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {view.type === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
            <FeaturedCategories
              onSelectCategory={(slug) =>
                handleNavigate({ type: 'collection', categorySlug: slug })
              }
            />
            <BestSellersSection
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={handleQuickAdd}
              onViewAll={() =>
                handleNavigate({ type: 'collection', categorySlug: 'all' })
              }
            />
            <PromoBannerSection
              onNavigate={handleNavigate}
              title="SEASONAL SPOTLIGHT: HALLOWEEN & GOTHIC ARTIFACTS"
              destinationSlug="halloween-horror"
            />
            <NewArrivalsSection
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={handleQuickAdd}
              onViewAllNew={() =>
                handleNavigate({ type: 'collection', categorySlug: 'all' })
              }
            />
            <BrandStorySection onNavigate={handleNavigate} />
            <NewsletterSection />
          </>
        )}

        {view.type === 'collection' && (
          <CollectionPage
            categorySlug={view.categorySlug}
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
            onSelectCategory={(slug) =>
              handleNavigate({ type: 'collection', categorySlug: slug })
            }
          />
        )}

        {view.type === 'product' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            allProducts={PRODUCTS}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Primary Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(key) => setActivePolicy(key)}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      {/* Multi-step Simulated Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        promoCode={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Global Real-Time Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={(slug) =>
          handleNavigate({ type: 'collection', categorySlug: slug })
        }
      />

      {/* Customer Account & Orders Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Store Policies & Shopify Blueprint Modal */}
      <PolicyModal
        policyKey={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Shopify Dawn Theme Porter & Exporter Modal */}
      <ShopifyThemePorterModal
        isOpen={isShopifyThemeOpen}
        onClose={() => setIsShopifyThemeOpen(false)}
      />
    </div>
  );
}
