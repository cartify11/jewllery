export type MetalType = '18K Yellow Gold' | '18K White Gold' | '18K Rose Gold' | 'Platinum 950' | '925 Sterling Silver';

export type CategoryType = 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Gold Jewellery' | 'Diamond Jewellery';

export type GemstoneType = 'Conflict-free Diamond' | 'Emerald' | 'Sapphire' | 'Ruby' | 'South Sea Pearl' | 'None';

export interface ProductVariant {
  metal: MetalType;
  colorHex: string;
  priceModifier?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  metal: MetalType;
  gemstone: GemstoneType;
  karat: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  images: string[];
  description: string;
  story: string;
  specifications: {
    totalCaratWeight?: string;
    diamondClarity?: string;
    diamondColor?: string;
    metalPurity: string;
    hallmarking: string;
    dimensions: string;
    claspOrSetting?: string;
    certification?: string;
  };
  sizes?: string[];
  variants: ProductVariant[];
  deliveryEstimate: string;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id based on product id + variant + size
  product: Product;
  selectedMetal: MetalType;
  selectedSize?: string;
  quantity: number;
  price: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  shippingMethod: string;
  shippingCost: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  estimatedDelivery: string;
  status: 'Confirmed' | 'In Vault' | 'Hallmarking' | 'Shipped' | 'Delivered';
}

export interface FilterState {
  category: string;
  metal: string;
  gemstone: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling';
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-success'
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'shipping' 
  | 'returns' 
  | 'care' 
  | 'privacy' 
  | 'terms' 
  | 'track' 
  | 'account' 
  | 'wishlist';

export type CurrencyCode = 'PKR' | 'USD' | 'EUR' | 'GBP' | 'AED';

