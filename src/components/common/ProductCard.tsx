import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

import { handleImageError } from '../../utils/imageFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setQuickViewProduct,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.metal, product.sizes ? product.sizes[0] : undefined, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-white border border-brand-beige/70 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-luxury cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateTo('product-detail', product.id)}
    >
      {/* Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-ivory">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-brand-black text-brand-gold text-[9px] uppercase tracking-luxury font-semibold px-2 py-0.5 shadow-sm">
              Best Seller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-brand-gold text-brand-black text-[9px] uppercase tracking-luxury font-bold px-2 py-0.5 shadow-sm">
              Limited Edition
            </span>
          )}
          {product.isNew && (
            <span className="bg-white/90 text-brand-black text-[9px] uppercase tracking-luxury font-medium px-2 py-0.5 shadow-sm border border-brand-beige">
              New Creation
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-brand-black transition-all shadow-sm hover:scale-110"
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-brand-gold text-brand-gold' : 'text-brand-black stroke-[1.5]'
            }`}
          />
        </button>

        {/* Hover Quick Actions (Desktop only, mobile taps open product) */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-white/95 hover:bg-brand-black hover:text-white text-brand-black py-2 px-3 text-[10px] uppercase tracking-[0.16em] font-sans font-medium border border-brand-beige/80 backdrop-blur-sm shadow-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-2 px-3.5 text-[10px] uppercase tracking-[0.16em] font-sans font-medium shadow-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Bag</span>
          </button>
        </div>
      </div>

      {/* Info Content Area */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-brand-gold-dark font-medium mb-1">
            <span className="truncate max-w-[90px] sm:max-w-none">{product.category}</span>
            <span className="text-stone-400 font-normal truncate max-w-[80px] sm:max-w-none">{product.metal}</span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-medium text-brand-black line-clamp-1 group-hover:text-brand-gold-dark transition-colors tracking-normal">
            {product.name}
          </h3>

          <p className="font-sans text-[10.5px] sm:text-[12px] text-stone-500 mt-1 line-clamp-1 font-normal tracking-normal leading-normal">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-brand-beige/50 flex items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="font-sans text-xs sm:text-[15.5px] font-semibold text-brand-black tracking-tight whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-[11px] sm:text-xs text-stone-400 line-through whitespace-nowrap">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-stone-500 shrink-0">
            <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold shrink-0" />
            <span className="font-medium text-brand-black">{product.rating}</span>
            <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
