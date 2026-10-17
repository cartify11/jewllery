import React, { useState } from 'react';
import { X, Heart, Star, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MetalType, Product } from '../../types';

interface QuickViewModalContentProps {
  product: Product;
}

const QuickViewModalContent: React.FC<QuickViewModalContentProps> = ({ product }) => {
  const {
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    navigateTo,
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metal);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find((v) => v.metal === selectedMetal);
  const currentPrice = product.price + (selectedVariant?.priceModifier || 0);

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative w-full max-w-4xl bg-brand-ivory text-brand-black shadow-2xl border border-brand-beige overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-brand-black rounded-full shadow-sm hover:text-brand-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Images */}
            <div className="p-6 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-beige">
              <div className="relative aspect-square w-full overflow-hidden bg-brand-ivory mb-4">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.isBestSeller && (
                  <span className="absolute top-3 left-3 bg-brand-black text-brand-gold text-[10px] uppercase tracking-luxury font-semibold px-2.5 py-1">
                    Best Seller
                  </span>
                )}
                {product.isLimitedEdition && (
                  <span className="absolute top-3 left-3 bg-brand-gold text-brand-black text-[10px] uppercase tracking-luxury font-bold px-2.5 py-1">
                    Rare Edition
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 border overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-brand-gold ring-1 ring-brand-gold' : 'border-brand-beige opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info & Purchase Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-luxury text-brand-gold font-medium">
                  {product.category} • {product.karat}
                </span>

                <h3 className="font-serif text-2xl font-medium text-brand-black mt-1">
                  {product.name}
                </h3>

                <p className="font-sans text-[12px] text-stone-500 mt-1.5 font-normal leading-normal">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-brand-black">{product.rating}</span>
                  <span className="text-xs text-stone-500">({product.reviewCount} Reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-sans text-2xl sm:text-3xl font-semibold text-brand-black tracking-tight whitespace-nowrap">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-sm sm:text-base line-through text-stone-400 whitespace-nowrap">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Metal Selection */}
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-luxury font-medium text-brand-black block mb-2">
                    Metal: <span className="text-brand-gold font-semibold">{selectedMetal}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.metal}
                        onClick={() => setSelectedMetal(variant.metal)}
                        className={`text-xs px-3 py-1.5 border transition-all ${
                          selectedMetal === variant.metal
                            ? 'border-brand-black bg-brand-black text-white font-medium'
                            : 'border-brand-beige text-brand-black hover:border-brand-gold'
                        }`}
                      >
                        {variant.metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                {product.sizes && (
                  <div className="mt-4">
                    <span className="text-xs uppercase tracking-luxury font-medium text-brand-black block mb-2">
                      Select Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-9 h-9 text-xs border flex items-center justify-center transition-all ${
                            selectedSize === sz
                              ? 'border-brand-black bg-brand-black text-white font-medium'
                              : 'border-brand-beige text-brand-black hover:border-brand-gold'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-brand-beige">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-3.5 text-xs uppercase tracking-luxury font-medium transition-colors"
                  >
                    Add to Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3.5 border border-brand-beige bg-white hover:border-brand-gold transition-colors text-brand-black"
                    title="Add to Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(product.id) ? 'fill-brand-gold text-brand-gold' : ''
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={() => {
                    const id = product.id;
                    setQuickViewProduct(null);
                    navigateTo('product-detail', id);
                  }}
                  className="w-full text-center text-xs uppercase tracking-luxury text-stone-500 hover:text-brand-gold flex items-center justify-center gap-1.5 py-1"
                >
                  <span>View Complete Specifications & Atelier Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Complimentary Insured Courier Delivery • 30-Day Privilege Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct } = useShop();
  if (!quickViewProduct) return null;
  return <QuickViewModalContent product={quickViewProduct} />;
};
