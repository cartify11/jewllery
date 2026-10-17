import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  Sparkles,
  PhoneCall,
  Lock
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const TrackOrderPage: React.FC = () => {
  const { placedOrder, formatPrice, navigateTo } = useShop();

  const defaultOrderId = placedOrder ? placedOrder.orderId : 'AUR-2026-894120';
  const [searchId, setSearchId] = useState(defaultOrderId);
  const [trackedOrder, setTrackedOrder] = useState<any>(
    placedOrder || {
      orderId: 'AUR-2026-894120',
      date: 'October 14, 2026',
      status: 'Shipped',
      estimatedDelivery: 'October 18, 2026 (by 12:00 PM)',
      courier: 'FedEx Armored Priority Transit (Policy #VX-99824)',
      trackingNumber: '7829-4102-8819',
      destination: 'New York, NY, United States',
      itemsCount: 1,
      total: 3850,
    }
  );

  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    if (placedOrder && searchId.trim().toUpperCase() === placedOrder.orderId.toUpperCase()) {
      setTrackedOrder(placedOrder);
    } else {
      setTrackedOrder({
        orderId: searchId.trim().toUpperCase(),
        date: 'October 14, 2026',
        status: 'Shipped',
        estimatedDelivery: 'October 18, 2026 (by 12:00 PM)',
        courier: 'FedEx Armored Priority Transit (Policy #VX-99824)',
        trackingNumber: '7829-4102-8819',
        destination: 'Client Residence / Private Salon',
        itemsCount: 1,
        total: 4200,
      });
    }
    setHasSearched(true);
  };

  const steps = [
    {
      title: 'Commission Confirmed',
      desc: 'Order authorized & assigned to Paris Atelier',
      date: 'Oct 14, 09:15 CET',
      completed: true,
      current: false,
    },
    {
      title: 'Vault Inspection & Hallmarking',
      desc: 'Microscopic inspection and Assay Office certification registered',
      date: 'Oct 14, 14:30 CET',
      completed: true,
      current: false,
    },
    {
      title: 'Discreet Armored Packaging',
      desc: 'Housed in velvet casket with tamper-evident seal #8841',
      date: 'Oct 15, 10:00 CET',
      completed: true,
      current: false,
    },
    {
      title: 'In Insured Courier Transit',
      desc: 'En route via priority armored air freight to destination hub',
      date: 'Oct 15, 16:45 CET',
      completed: true,
      current: true,
    },
    {
      title: 'Handover & Adult Signature',
      desc: 'Discreet white-glove handover to recipient with ID check',
      date: 'Expected Oct 18, 12:00 PM',
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Vault Logistics
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Track Your Acquisition
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            Enter your order reference number below to monitor your high jewellery creation through its private vault transit.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-brand-beige p-6 shadow-sm mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2 stroke-[1.5]" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order Reference (e.g. AUR-2026-894120)"
                className="w-full bg-brand-ivory border border-brand-beige pl-12 pr-4 py-3 text-xs uppercase tracking-luxury text-brand-black focus:outline-none focus:border-brand-gold font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white px-8 py-3 text-xs uppercase tracking-luxury font-semibold transition-colors shrink-0"
            >
              Track Status
            </button>
          </form>
        </div>

        {hasSearched && (
          <div className="bg-white border border-brand-beige shadow-sm p-8 sm:p-10 space-y-10">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-beige gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-grey block">
                  Vault Reference
                </span>
                <h3 className="font-serif text-2xl font-normal text-brand-black">
                  {trackedOrder.orderId}
                </h3>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] uppercase tracking-luxury text-brand-grey block">
                  Current Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury font-bold text-brand-gold">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  In Insured Transit
                </span>
              </div>
            </div>

            {/* Courier Details Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-brand-ivory border border-brand-beige text-xs text-brand-grey">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-black font-semibold block mb-1">
                  Air Bill / Courier
                </span>
                <span className="font-mono text-brand-black font-medium">{trackedOrder.trackingNumber || '7829-4102-8819'}</span>
                <span className="block text-[10px] text-brand-grey mt-0.5">FedEx Armed Priority</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-black font-semibold block mb-1">
                  Expected Delivery
                </span>
                <span className="text-brand-black font-medium">{trackedOrder.estimatedDelivery || 'October 18, 2026'}</span>
                <span className="block text-[10px] text-brand-grey mt-0.5">Signature Required</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-black font-semibold block mb-1">
                  Destination
                </span>
                <span className="text-brand-black font-medium">
                  {trackedOrder.shippingAddress
                    ? `${trackedOrder.shippingAddress.city}, ${trackedOrder.shippingAddress.country}`
                    : 'Client Residence'}
                </span>
                <span className="block text-[10px] text-brand-grey mt-0.5">Tamper-Evident Casket</span>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-serif text-lg font-normal text-brand-black mb-6">
                Vault Custody Timeline
              </h4>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-brand-beige">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.completed
                          ? 'bg-brand-black text-brand-gold border border-brand-gold'
                          : 'bg-white border-2 border-brand-beige text-brand-grey'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 fill-brand-gold text-brand-black" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-brand-grey" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5
                          className={`text-xs uppercase tracking-luxury font-semibold ${
                            step.current ? 'text-brand-gold' : 'text-brand-black'
                          }`}
                        >
                          {step.title}
                        </h5>
                        <span className="text-[10px] text-brand-grey">{step.date}</span>
                      </div>
                      <p className="text-xs text-brand-grey mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support hotline */}
            <div className="pt-6 border-t border-brand-beige flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-grey">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-gold" />
                <span>Maritime Insurance Carrier: Lloyd's of London Underwriting</span>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="text-brand-gold hover:underline font-semibold uppercase tracking-luxury"
              >
                Inquire With Concierge →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
