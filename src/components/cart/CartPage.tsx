import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  Truck, 
  Sparkles, 
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    formatPrice,
    navigateTo,
    addToast,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; amount: number } | null>(null);
  const [giftNote, setGiftNote] = useState('');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);

  const freeShippingThreshold = 500;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 45;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'AURELIA10') {
      const discount = cartSubtotal * 0.1;
      setAppliedDiscount({ code: 'AURELIA10', percent: 10, amount: discount });
      addToast('Promo code AURELIA10 applied: 10% luxury discount!', 'gold');
    } else if (clean === 'LUXURY') {
      setAppliedDiscount({ code: 'LUXURY', percent: 0, amount: 100 });
      addToast('Promo code LUXURY applied: $100 discount!', 'gold');
    } else {
      addToast('Invalid promo code. Please use AURELIA10 or LUXURY.', 'info');
    }
  };

  const discountAmount = appliedDiscount
    ? appliedDiscount.percent > 0
      ? (cartSubtotal * appliedDiscount.percent) / 100
      : appliedDiscount.amount
    : 0;

  const estimatedTax = (cartSubtotal - discountAmount) * 0.05; // 5% luxury tax
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost + estimatedTax);

  if (cart.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-beige/50 flex items-center justify-center text-brand-gold mb-6">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <h1 className="font-serif text-3xl font-normal text-brand-black mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 font-normal leading-relaxed">
          Explore our fine jewellery collections and discover timeless creations hand-sculpted in 18K solid gold and certified gemstones.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white px-8 py-4 text-xs uppercase tracking-luxury font-semibold transition-all duration-300"
        >
          Explore All Fine Jewellery
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Order Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mt-1">
            Shopping Bag ({cart.length} Item{cart.length > 1 ? 's' : ''})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Items Table (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-brand-beige divide-y divide-brand-beige">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  {/* Thumbnail & Name */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover border border-brand-beige shrink-0 bg-brand-ivory"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-medium">
                        {item.product.category}
                      </span>
                      <h3
                        className="font-serif text-base font-normal text-brand-black cursor-pointer hover:text-brand-gold transition-colors"
                        onClick={() => navigateTo('product-detail', item.product.id)}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-brand-grey mt-0.5">
                        Metal: {item.selectedMetal} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                      </p>
                      <span className="text-xs font-semibold text-brand-black mt-2 block sm:hidden">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-beige/50">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-brand-beige bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:text-brand-gold text-brand-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-brand-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:text-brand-gold text-brand-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <span className="block font-sans text-base font-semibold text-brand-black whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-stone-500 whitespace-nowrap">
                          {formatPrice(item.price)} each
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-brand-grey hover:text-red-700 transition-colors p-1"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Complimentary Gift Presentation Section */}
            <div className="bg-white border border-brand-beige p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-brand-gold" />
                <h3 className="font-serif text-lg font-normal text-brand-black">
                  Complimentary Luxury Presentation
                </h3>
              </div>
              <p className="text-xs text-brand-grey leading-relaxed">
                All Aurelia acquisitions arrive housed within our signature velvet-lined jewellery casket, tied with champagne grosgrain ribbon and accompanied by official certification deeds.
              </p>
              <div>
                <label className="block text-xs uppercase tracking-luxury font-medium text-brand-black mb-1">
                  Complimentary Calligraphy Message (Optional)
                </label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter a personal sentiment to be hand-transcribed on embossed Aurelia stationery..."
                  className="w-full bg-brand-ivory border border-brand-beige p-3 text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-brand-beige p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-xl font-normal text-brand-black pb-4 border-b border-brand-beige">
              Acquisition Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium">
                Privilege Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AURELIA10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-brand-ivory border border-brand-beige px-3 py-2 text-xs uppercase focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white px-5 py-2 text-xs uppercase tracking-luxury font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs text-brand-grey pt-2 border-t border-brand-beige">
              <div className="flex justify-between">
                <span>Creations Subtotal</span>
                <span className="text-brand-black font-medium">{formatPrice(cartSubtotal)}</span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Privilege Discount ({appliedDiscount.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured White-Glove Armored Transit</span>
                <span className="text-brand-black font-medium">
                  {isFreeShipping ? 'Complimentary' : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Luxury Import / VAT</span>
                <span className="text-brand-black font-medium">{formatPrice(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-base font-semibold text-brand-black pt-4 border-t border-brand-beige">
                <span>Total Acquisition</span>
                <span className="font-sans text-2xl font-semibold text-brand-black whitespace-nowrap">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black py-4 px-6 text-xs uppercase tracking-luxury font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Assurances */}
            <div className="space-y-2 pt-2 text-[11px] text-brand-grey border-t border-brand-beige">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Encrypted 256-Bit SSL Armored Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Fully insured courier transit with adult signature required</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand-gold shrink-0" />
                <span>30-day complimentary privilege return guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
