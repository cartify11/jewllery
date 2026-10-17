import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Gem, 
  Plus, 
  Minus, 
  ArrowLeft,
  Ruler,
  MessageSquare
} from 'lucide-react';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';
import { MetalType, Review } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    recentlyViewed,
    addToast,
  } = useShop();

  const product = LUXURY_PRODUCTS.find((p) => p.id === selectedProductId) || LUXURY_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metal);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [productReviews, setProductReviews] = useState<Review[]>(product.reviews);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    specs: true,
    shipping: false,
    care: false,
    certification: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedVariant = product.variants.find((v) => v.metal === selectedMetal);
  const finalPrice = product.price + (selectedVariant?.priceModifier || 0);

  // Image zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMetal, selectedSize, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard.', 'gold');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewContent) {
      addToast('Please complete all review fields.', 'info');
      return;
    }
    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle,
      content: newReviewContent,
      verified: true,
      location: 'Verified Client',
    };
    setProductReviews([createdReview, ...productReviews]);
    setReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewContent('');
    addToast('Thank you. Your authentic review has been published.', 'gold');
  };

  // Related products (same category or high rated)
  const relatedProducts = LUXURY_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)
  ).slice(0, 4);

  return (
    <div className="bg-brand-ivory min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Bar with Prominent Back to Home Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-beige">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-brand-gold hover:text-brand-black text-brand-black border border-brand-gold/40 text-xs uppercase tracking-luxury font-bold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              <span>← Back to Home</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent hover:bg-white text-stone-600 hover:text-brand-black text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              <span>View All Jewellery</span>
            </button>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500">
            <button onClick={() => navigateTo('home')} className="hover:text-brand-gold transition-colors font-medium">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors font-medium">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-brand-black font-semibold truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Gallery & Zoom Preview (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 border overflow-hidden transition-all bg-white shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-brand-gold ring-1 ring-brand-gold'
                      : 'border-brand-beige opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main High-Res Viewer with Interactive Hover Zoom */}
            <div
              className="relative flex-1 aspect-square bg-white border border-brand-beige overflow-hidden cursor-crosshair group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isBestSeller && (
                  <span className="bg-brand-black text-brand-gold text-[10px] uppercase tracking-luxury font-semibold px-3 py-1">
                    Signature Best Seller
                  </span>
                )}
                {product.isLimitedEdition && (
                  <span className="bg-brand-gold text-brand-black text-[10px] uppercase tracking-luxury font-bold px-3 py-1">
                    Rare Reserve Edition
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-brand-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-luxury px-2.5 py-1 pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity">
                Hover to Zoom Details
              </div>
            </div>
          </div>

          {/* Right: Product Buying Controls & Story (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Serial */}
              <div className="flex items-center justify-between text-xs uppercase tracking-luxury text-brand-gold font-medium">
                <span>{product.category} • {product.karat} High Fine Jewellery</span>
                <button
                  onClick={handleShare}
                  className="p-1 hover:text-brand-black transition-colors"
                  title="Share Creation"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-black mt-1 leading-tight tracking-normal">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-xs sm:text-sm text-stone-500 font-normal mt-2 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-brand-beige">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-black">{product.rating}</span>
                <span className="text-xs text-stone-500">
                  ({productReviews.length} Verified Client Reviews)
                </span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-sans text-3xl sm:text-4xl font-semibold text-brand-black tracking-tight whitespace-nowrap">
                {formatPrice(finalPrice)}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-base text-stone-400 line-through whitespace-nowrap">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[10px] text-stone-500 uppercase tracking-luxury ml-auto">
                Taxes & Duties Included
              </span>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-emerald-800 font-medium">
                In Stock — Only {product.stockCount} handcrafted specimens available
              </span>
            </div>

            {/* Metal Variant Selector */}
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-luxury font-medium text-brand-black mb-2.5">
                <span>Precious Metal: <strong className="text-brand-gold">{selectedMetal}</strong></span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant.metal}
                    onClick={() => setSelectedMetal(variant.metal)}
                    className={`flex items-center gap-3 p-3 text-left border transition-all ${
                      selectedMetal === variant.metal
                        ? 'border-brand-black bg-white shadow-sm ring-1 ring-brand-black'
                        : 'border-brand-beige bg-white/60 hover:border-brand-gold text-brand-grey'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                    <div className="min-w-0">
                      <span className="block text-xs font-medium text-brand-black truncate">
                        {variant.metal}
                      </span>
                      {variant.priceModifier ? (
                        <span className="block text-[10px] text-brand-gold">
                          +{formatPrice(variant.priceModifier)}
                        </span>
                      ) : (
                        <span className="block text-[10px] text-brand-grey">Included</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Link */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center text-xs uppercase tracking-luxury font-medium text-brand-black mb-2.5">
                  <span>Selected Size: <strong className="text-brand-gold">{selectedSize}</strong></span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-brand-gold hover:underline flex items-center gap-1 normal-case tracking-normal text-xs"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Complimentary Ring Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 px-3.5 py-2 border text-xs uppercase tracking-wide transition-all ${
                        selectedSize === size
                          ? 'border-brand-gold bg-brand-gold text-brand-black font-bold shadow-sm'
                          : 'border-brand-beige bg-white text-brand-black hover:border-brand-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-brand-beige bg-white px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-brand-gold text-brand-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-brand-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:text-brand-gold text-brand-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-4 px-6 text-xs uppercase tracking-luxury font-semibold transition-all duration-300 shadow-md"
                >
                  Add to Shopping Bag
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-4 border border-brand-beige bg-white hover:border-brand-gold transition-colors text-brand-black"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product.id) ? 'fill-brand-gold text-brand-gold' : 'stroke-[1.5]'
                    }`}
                  />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black py-4 px-6 text-xs uppercase tracking-luxury font-bold transition-all duration-300 shadow-lg"
              >
                Instant Buy Now & Armored Transit
              </button>
            </div>

            {/* Delivery Estimate Box */}
            <div className="bg-[#FAF4E6] border border-brand-gold/30 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-medium text-brand-black">
                <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Delivery: {product.deliveryEstimate}</span>
              </div>
              <p className="text-brand-grey text-[11px] leading-relaxed pl-6">
                Discreet armored transport in our signature velvet presentation vault, requiring adult signature.
              </p>
            </div>

            {/* Technical Accordions */}
            <div className="border-t border-brand-beige pt-4 divide-y divide-brand-beige">
              {/* 1. Specifications */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('specs')}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-semibold text-brand-black py-2"
                >
                  <span>Atelier Specifications & Gemstones</span>
                  {openAccordions.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.specs && (
                  <div className="pt-2 pb-3 text-xs text-brand-grey space-y-2">
                    <p className="leading-relaxed mb-3">{product.description}</p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-white p-3 border border-brand-beige">
                      {product.specifications.totalCaratWeight && (
                        <div>
                          <span className="text-[10px] uppercase text-brand-gold block">Carat Weight</span>
                          <span className="text-brand-black font-medium">{product.specifications.totalCaratWeight}</span>
                        </div>
                      )}
                      {product.specifications.diamondClarity && (
                        <div>
                          <span className="text-[10px] uppercase text-brand-gold block">Clarity & Color</span>
                          <span className="text-brand-black font-medium">{product.specifications.diamondClarity} • {product.specifications.diamondColor}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] uppercase text-brand-gold block">Precious Metal Purity</span>
                        <span className="text-brand-black font-medium">{product.specifications.metalPurity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-brand-gold block">Official Hallmark</span>
                        <span className="text-brand-black font-medium">{product.specifications.hallmarking}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-brand-gold block">Dimensions</span>
                        <span className="text-brand-black font-medium">{product.specifications.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-brand-gold block">Certification</span>
                        <span className="text-brand-black font-medium">{product.specifications.certification}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-semibold text-brand-black py-2"
                >
                  <span>Complimentary Shipping & Returns</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="pt-2 pb-3 text-xs text-brand-grey leading-relaxed space-y-2">
                    <p>
                      AURELIA JEWELS offers complimentary insured global courier delivery on all orders. Each shipment is protected by maritime high-value insurance until signed for in person.
                    </p>
                    <p>
                      We gladly offer a 30-day privilege return period for unworn creations accompanied by our intact security tamper-evident tag and original certificate deeds.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Care Guide */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-semibold text-brand-black py-2"
                >
                  <span>Jewellery Care & Preservation</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <div className="pt-2 pb-3 text-xs text-stone-600 leading-relaxed space-y-2">
                    <p>
                      To maintain the mirror brilliance of your 18K solid gold and gemstones:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Avoid direct contact with perfumes, chlorine, and abrasive chemicals.</li>
                      <li>Clean gently using lukewarm filtered water, mild artisan soap, and a natural soft-bristled brush.</li>
                      <li>Store independently in your provided Aurelia velvet box to prevent mutual facet scratching.</li>
                      <li>Enjoy complimentary lifetime ultrasonic inspection and steam cleaning at any Aurelia Salon.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 4. Piece FAQ & Guarantees */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('faq')}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-luxury font-semibold text-brand-black py-2"
                >
                  <span>Piece FAQ & Lifetime Guarantees</span>
                  {openAccordions.faq ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.faq && (
                  <div className="pt-2 pb-3 text-xs text-stone-600 leading-relaxed space-y-2.5">
                    <div>
                      <p className="font-semibold text-brand-black">Is complimentary ring resizing included?</p>
                      <p>Yes. Aurelia provides 1 complimentary resizing within 90 days of acquisition with insured door-to-door transit.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black">Does this piece include GIA / IGI certification?</p>
                      <p>Every creation is dispatched with its official physical laboratory certificate, origin deed, and laser-inscribed girdle serial verification.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black">What is the lifetime warranty coverage?</p>
                      <p>Includes annual prong tightness inspection, ultrasonic cleaning, rhodium re-plating, and secure storage counsel at any Aurelia Salon.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-24 pt-16 border-t border-brand-beige">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium">
                Client Reflections
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-black mt-1">
                Reviews & Verified Acclaim
              </h2>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-white border border-brand-black text-brand-black hover:bg-brand-black hover:text-white px-6 py-2.5 text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              Write Client Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white border border-brand-beige shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-brand-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-brand-grey">{rev.date}</span>
                </div>
                <h4 className="font-serif text-base font-medium text-brand-black mb-1">{rev.title}</h4>
                <p className="text-xs text-brand-grey leading-relaxed mb-4">{rev.content}</p>
                <div className="flex items-center justify-between text-[11px] text-brand-black font-medium border-t border-brand-beige/60 pt-2">
                  <span>{rev.author}</span>
                  {rev.location && <span className="text-brand-gold font-normal">{rev.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-brand-beige">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-3xl font-normal text-brand-black mt-1">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ring Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-ivory max-w-lg w-full p-8 border border-brand-beige relative shadow-2xl">
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-brand-black hover:text-brand-gold p-1"
            >
              ✕
            </button>
            <h3 className="font-serif text-2xl font-normal text-brand-black mb-1">
              International Ring Size Guide
            </h3>
            <p className="text-xs text-brand-grey mb-6">
              Aurelia sizing follows standard US millimeter circumference. Our concierge provides complimentary physical ring sizers upon request.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold text-brand-black uppercase tracking-luxury">
                    <th className="py-2">US Size</th>
                    <th className="py-2">UK Size</th>
                    <th className="py-2">EU (Circumference)</th>
                    <th className="py-2">Diameter (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-beige text-brand-grey">
                  <tr><td className="py-2 font-medium text-brand-black">5.0</td><td>J ½</td><td>49.3 mm</td><td>15.7 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">6.0</td><td>M</td><td>51.9 mm</td><td>16.5 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">6.5</td><td>N</td><td>53.1 mm</td><td>16.9 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">7.0</td><td>O</td><td>54.4 mm</td><td>17.3 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">7.5</td><td>P</td><td>55.7 mm</td><td>17.7 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">8.0</td><td>Q</td><td>57.0 mm</td><td>18.1 mm</td></tr>
                  <tr><td className="py-2 font-medium text-brand-black">9.0</td><td>R ½</td><td>59.5 mm</td><td>18.9 mm</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="mt-6 w-full bg-brand-black text-white py-3 text-xs uppercase tracking-luxury font-medium"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-ivory max-w-lg w-full p-8 border border-brand-beige relative shadow-2xl">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 text-brand-black hover:text-brand-gold p-1"
            >
              ✕
            </button>
            <h3 className="font-serif text-2xl font-normal text-brand-black mb-1">
              Share Your Client Experience
            </h3>
            <p className="text-xs text-brand-grey mb-6">
              Reviewing: <span className="font-medium text-brand-black">{product.name}</span>
            </p>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Charlotte M."
                  className="w-full bg-white border border-brand-beige px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                  Rating
                </label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full bg-white border border-brand-beige px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                >
                  <option value={5}>5 Stars - Superlative Masterpiece</option>
                  <option value={4}>4 Stars - Exquisite Craftsmanship</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable fire and presence"
                  className="w-full bg-white border border-brand-beige px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                  Your Reflections
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="Share thoughts on the luster, metal weight, packaging, or salon service..."
                  className="w-full bg-white border border-brand-beige px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-gold text-brand-black py-3 text-xs uppercase tracking-luxury font-bold hover:bg-brand-gold-light transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
