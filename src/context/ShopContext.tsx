import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, MetalType, FilterState, ActivePage, CurrencyCode } from '../types';
import { LUXURY_PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface ShopContextType {
  activePage: ActivePage;
  selectedProductId: string | null;
  navigateTo: (page: ActivePage, productId?: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedMetal: MetalType, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Search
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (priceInUSD: number) => string;

  // Shop Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Orders
  placedOrder: OrderDetails | null;
  setPlacedOrder: (order: OrderDetails | null) => void;

  // Toast notifications
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const defaultFilters: FilterState = {
  category: 'All',
  metal: 'All',
  gemstone: 'All',
  priceRange: [0, 30000],
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('aur-001');

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_wishlist');
      return saved ? JSON.parse(saved) : ['aur-001', 'aur-004'];
    } catch {
      return ['aur-001', 'aur-004'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  // Toast Notification helper
  const addToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation
  const navigateTo = (page: ActivePage, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
      const prod = LUXURY_PRODUCTS.find((p) => p.id === productId);
      if (prod) addRecentlyViewed(prod);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recently viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 4);
    });
  };

  // Cart operations
  const addToCart = (product: Product, selectedMetal: MetalType, selectedSize?: string, quantity: number = 1) => {
    const variantItem = product.variants.find((v) => v.metal === selectedMetal);
    const finalPrice = product.price + (variantItem?.priceModifier || 0);
    const cartItemId = `${product.id}-${selectedMetal}-${selectedSize || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedMetal,
            selectedSize,
            quantity,
            price: finalPrice,
          },
        ];
      }
    });

    addToast(`Added "${product.name}" to your shopping bag`, 'gold');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const isCurrentlySaved = wishlist.includes(productId);
    const product = LUXURY_PRODUCTS.find((p) => p.id === productId);

    if (isCurrentlySaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast(`Removed "${product?.name || 'item'}" from your wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast(`Saved "${product?.name || 'item'}" to your wishlist`, 'gold');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => setFilters(defaultFilters);

  // Currency Converter (Base currency: PKR)
  const formatPrice = (priceInPKR: number) => {
    const rates: Record<CurrencyCode, { rate: number; symbol: string }> = {
      PKR: { rate: 1, symbol: 'Rs.\u00A0' },
      USD: { rate: 1 / 280, symbol: '$' },
      AED: { rate: 3.67 / 280, symbol: 'AED\u00A0' },
      GBP: { rate: 0.79 / 280, symbol: '£' },
      EUR: { rate: 0.92 / 280, symbol: '€' },
    };

    const target = rates[currency] || rates.PKR;
    const converted = Math.round(priceInPKR * target.rate);
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        selectedProductId,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        currency,
        setCurrency,
        formatPrice,
        filters,
        setFilters,
        resetFilters,
        placedOrder,
        setPlacedOrder,
        toasts,
        addToast,
        removeToast,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
