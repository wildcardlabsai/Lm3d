export interface ProductSpecification {
  dimensions: string;
  filament: string;
  layerHeight: string;
  printTime: string;
  weight: string;
  finish: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  filamentType: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  tagline: string;
  description: string;
  story: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categorySlug: string;
  badge?: 'Bestseller' | 'New Drop' | 'Staff Pick' | 'Limited Run';
  images: string[];
  variants: ProductVariant[];
  colors: ProductColor[];
  specifications: ProductSpecification;
  stockStatus: 'in_stock' | 'low_stock' | 'made_to_order';
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string; // Composite key: `${productId}-${variantId}-${colorId}`
  productId: string;
  product: Product;
  variant: ProductVariant;
  color: ProductColor;
  unitPrice: number;
  quantity: number;
}

export type ViewState =
  | { type: 'home' }
  | { type: 'collection'; categorySlug: string }
  | { type: 'product'; productHandle: string }
  | { type: 'policy'; policyKey: 'shipping' | 'returns' | 'privacy' | 'terms' | 'shopify' };
