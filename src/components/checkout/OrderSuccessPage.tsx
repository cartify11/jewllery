import React, { useEffect } from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  Package, 
  Truck, 
  ArrowRight, 
  Printer, 
  PhoneCall, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';

export const OrderSuccessPage: React.FC = () => {
  const { placedOrder, navigateTo, formatPrice } = useShop();

  useEffect(() => {
    // Elegant luxury gold confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C6A15B', '#FAF7F0', '#111111', '#E9DFD0', '#D8B878'],
      });
    } catch (_err) {
      // safe fallback
    }
  }, []);

  // Default fallback if directly visited
  const order = placedOrder || {
    orderId: 'AUR-2026-981245',
    date: 'October 15, 2026',
    items: [],
    subtotal: 3850,
    discount: 0,
    shippingMethod: 'Complimentary Insured Courier',
    shippingCost: 0,
    tax: 192.5,
    total: 4042.5,
    shippingAddress: {
      firstName: 'Vivienne',
      lastName: 'Beaumont',
      email: 'v.beaumont@client.com',
      phone: '+1 (555) 019-2834',
      address: '740 Park Avenue',
      apartment: 'Penthouse A',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
    },
    paymentMethod: 'Card ending in 8842',
    estimatedDelivery: '3–5 business days via insured FedEx Priority',
    status: 'Confirmed' as const,
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white border border-brand-beige shadow-xl p-8 sm:p-12 text-center">
          {/* Gold Crest */}
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
            <CheckCircle className="w-8 h-8 stroke-[1.5]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Acquisition Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mt-2">
            Thank You For Your Acquisition
          </h1>

          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto mt-3 leading-relaxed">
            Your fine jewellery creation has been successfully commissioned and is now entering our private vault for final microscopic inspection and hallmarking authentication.
          </p>

          {/* Order Reference Box */}
          <div className="mt-8 p-4 bg-brand-ivory border border-brand-gold/40 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs">
            <div>
              <span className="text-brand-grey uppercase tracking-luxury block text-[10px]">Order Reference</span>
              <span className="font-serif text-base text-brand-black font-semibold">{order.orderId}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-brand-beige" />
            <div>
              <span className="text-brand-grey uppercase tracking-luxury block text-[10px]">Estimated Delivery</span>
              <span className="font-medium text-brand-black">{order.estimatedDelivery}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-brand-beige" />
            <div>
              <span className="text-brand-grey uppercase tracking-luxury block text-[10px]">Payment Status</span>
              <span className="font-medium text-emerald-800">Authorized & Confirmed</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('track')}
              className="w-full sm:w-auto bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white px-8 py-3.5 text-xs uppercase tracking-luxury font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Vault Transit</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto border border-brand-beige hover:border-brand-black text-brand-black px-6 py-3.5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-brand-gold" />
              <span>Print Official Receipt</span>
            </button>
          </div>

          {/* Itemized Order Summary */}
          <div className="mt-12 text-left border-t border-brand-beige pt-8">
            <h3 className="font-serif text-lg font-normal text-brand-black mb-4">
              Acquisition Details
            </h3>

            {order.items.length > 0 && (
              <div className="divide-y divide-brand-beige/70 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover border border-brand-beige bg-brand-ivory"
                      />
                      <div>
                        <h4 className="font-serif text-xs font-medium text-brand-black">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-brand-grey">
                          Qty: {item.quantity} • {item.selectedMetal} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans text-xs font-semibold text-brand-black whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Delivery and Financial Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-brand-ivory border border-brand-beige text-xs text-brand-grey">
              <div>
                <h4 className="uppercase tracking-luxury text-brand-black font-semibold mb-2">
                  Delivery Destination
                </h4>
                <p className="text-brand-black font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address} {order.shippingAddress.apartment}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2 text-brand-gold font-medium">{order.shippingAddress.phone}</p>
              </div>

              <div>
                <h4 className="uppercase tracking-luxury text-brand-black font-semibold mb-2">
                  Financial Settlement
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-brand-black font-medium">{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Courtesy Deduction:</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Transit:</span>
                    <span className="text-brand-black font-medium">
                      {order.shippingCost === 0 ? 'Complimentary' : formatPrice(order.shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax / VAT:</span>
                    <span className="text-brand-black font-medium">{formatPrice(order.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-brand-black pt-2 border-t border-brand-beige">
                    <span>Grand Total:</span>
                    <span className="font-sans text-lg font-semibold text-brand-black whitespace-nowrap">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge Hotline */}
          <div className="mt-10 pt-6 border-t border-brand-beige flex flex-col sm:flex-row items-center justify-between text-xs text-brand-grey gap-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-gold" />
              <span>Questions regarding your commission? Call VIP Concierge: +1 (800) 489-AURELIA</span>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-brand-gold hover:underline uppercase tracking-luxury font-semibold"
            >
              Continue Exploring Collection →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
