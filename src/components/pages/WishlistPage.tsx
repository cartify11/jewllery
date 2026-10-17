import React from 'react';
import { Heart, ShoppingBag, Share2, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo, addToast, formatPrice } = useShop();

  const savedProducts = LUXURY_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Private Wishlist link copied to clipboard.', 'gold');
    }
  };

  if (savedProducts.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-beige/50 flex items-center justify-center text-brand-gold mb-4">
          <Heart className="w-8 h-8 stroke-[1.2]" />
        </div>
        <h1 className="font-serif text-3xl font-normal text-brand-black mb-2">
          Your Saved Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-grey max-w-sm mb-6 leading-relaxed">
          Curate your personal collection of fine jewellery by clicking the heart icon on any creation you admire.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-3.5 text-xs uppercase tracking-luxury font-semibold transition-colors"
        >
          Explore High Fine Jewellery
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-brand-beige gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
              Curated Desires
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mt-1">
              Your Saved Wishlist ({savedProducts.length} Piece{savedProducts.length > 1 ? 's' : ''})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShareWishlist}
              className="border border-brand-beige hover:border-brand-black bg-white text-brand-black px-4 py-2.5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-gold" />
              <span>Share Wishlist</span>
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {savedProducts.map((product) => (
            <div key={product.id} className="relative flex flex-col justify-between bg-white border border-brand-beige">
              <ProductCard product={product} />
              <div className="p-3 bg-brand-ivory border-t border-brand-beige flex gap-2">
                <button
                  onClick={() => addToCart(product, product.metal, product.sizes ? product.sizes[0] : undefined, 1)}
                  className="flex-1 bg-brand-gold hover:bg-brand-gold-light text-brand-black py-2.5 text-[11px] uppercase tracking-luxury font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2.5 border border-brand-beige hover:border-red-500 text-brand-grey hover:text-red-600 bg-white transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
