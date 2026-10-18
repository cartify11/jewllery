import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Gift, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
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
  const [giftPackaging, setGiftPackaging] = useState(true);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'AURELIA10') {
      const discountVal = cartSubtotal * 0.1;
      setAppliedDiscount({ code: 'AURELIA10', percent: 10, amount: discountVal });
      addToast('Promo code AURELIA10 applied: 10% discount!', 'gold');
    } else if (clean === 'LUXURY') {
      setAppliedDiscount({ code: 'LUXURY', percent: 0, amount: 500 });
      addToast('Promo code LUXURY applied: Rs. 500 off your order', 'gold');
    } else {
      addToast('Invalid promotion code. Please try AURELIA10.', 'info');
    }
  };

  const discountAmount = appliedDiscount
    ? appliedDiscount.percent > 0
      ? (cartSubtotal * appliedDiscount.percent) / 100
      : appliedDiscount.amount
    : 0;

  const finalSubtotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-ivory text-brand-black shadow-drawer flex flex-col justify-between">
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-brand-beige flex items-center justify-between bg-[#F8F4EC]">
            <div>
              <h2 className="font-serif text-lg tracking-luxury uppercase font-medium">Your Shopping Bag</h2>
              <span className="text-xs text-brand-grey tracking-wider">
                {cart.length === 0 ? 'Empty bag' : `${cart.length} unique creation${cart.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-brand-black hover:text-brand-gold transition-colors rounded-full hover:bg-black/5"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-brand-charcoal text-white text-[11px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-brand-beige">
                {cartSubtotal >= freeShippingThreshold
                  ? '✓ Qualified for Complimentary Insured Courier Shipping'
                  : `Add ${formatPrice(amountRemaining)} for Complimentary White-Glove Shipping`}
              </span>
              <span className="text-brand-gold font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-brand-beige/60">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-beige/50 flex items-center justify-center text-brand-gold">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl text-brand-black font-normal">Your shopping bag is empty</h3>
                <p className="text-brand-grey text-xs max-w-xs leading-relaxed">
                  Explore our handcrafted collections and discover exceptional pieces designed for timeless moments.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-2 bg-brand-black text-brand-gold px-6 py-2.5 text-xs uppercase tracking-luxury hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded border border-brand-beige/80 shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-serif text-sm font-medium text-brand-black truncate cursor-pointer hover:text-brand-gold transition-colors"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('product-detail', item.product.id);
                      }}
                    >
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-brand-grey mt-0.5">
                      {item.selectedMetal} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                    </p>
                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-brand-beige rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-brand-gold text-brand-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-brand-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-brand-gold text-brand-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-sans text-xs font-semibold text-brand-black whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-brand-grey hover:text-red-700 transition-colors p-1"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t border-brand-beige bg-[#FAF7F0] space-y-4">
              {/* Complimentary Gift Packaging Toggle */}
              <label className="flex items-center gap-2 text-xs text-brand-black cursor-pointer select-none bg-white p-2.5 rounded border border-brand-beige">
                <input
                  type="checkbox"
                  checked={giftPackaging}
                  onChange={(e) => setGiftPackaging(e.target.checked)}
                  className="rounded text-brand-gold focus:ring-brand-gold accent-brand-gold"
                />
                <Gift className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-[11px]">
                  Complimentary Luxury Presentation Box & Hand-Embossed Card
                </span>
              </label>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. AURELIA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-brand-beige text-xs px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="bg-brand-black text-white px-3.5 py-2 text-xs uppercase tracking-luxury hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-brand-grey pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-black font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Armored Delivery</span>
                  <span className="text-brand-gold font-medium">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : formatPrice(45)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-brand-black pt-2 border-t border-brand-beige">
                  <span>Estimated Total</span>
                  <span className="font-sans text-lg font-semibold text-brand-black whitespace-nowrap">{formatPrice(finalSubtotal)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-black py-3.5 text-xs uppercase tracking-luxury font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full border border-brand-black text-brand-black hover:bg-brand-black hover:text-white py-2.5 text-xs uppercase tracking-luxury font-medium transition-colors"
                >
                  View Full Cart & Details
                </button>
              </div>

              <div className="text-center pt-1 flex items-center justify-center gap-2 text-[10px] text-brand-grey">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>Insured White-Glove Guarantee • 30-Day Privilege Return</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
