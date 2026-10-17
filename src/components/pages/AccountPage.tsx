import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  LogOut, 
  ChevronRight,
  Truck,
  FileText
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const AccountPage: React.FC = () => {
  const { placedOrder, navigateTo, formatPrice, wishlist } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'membership'>('orders');

  const savedWishlistProducts = LUXURY_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Bar */}
        <div className="bg-white border border-brand-beige p-8 mb-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-brand-black text-brand-gold flex items-center justify-center font-serif text-2xl font-normal border border-brand-gold/40">
              VB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-normal text-brand-black">
                  Vivienne Beaumont
                </h1>
                <span className="bg-brand-black text-brand-gold text-[9px] uppercase tracking-luxury font-semibold px-2 py-0.5 border border-brand-gold/40">
                  Tier: Solitaire VIP
                </span>
              </div>
              <p className="text-xs text-brand-grey mt-0.5">
                Private Client since 2026 • v.beaumont@client.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => navigateTo('wishlist')}
              className="border border-brand-beige hover:border-brand-gold px-4 py-2 text-brand-black flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-brand-gold" />
              <span>Saved Creations ({wishlist.length})</span>
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-4 py-2 uppercase tracking-luxury font-medium transition-colors"
            >
              Contact Assigned Concierge
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar (3 Columns) */}
          <div className="lg:col-span-3 bg-white border border-brand-beige divide-y divide-brand-beige text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-4 flex items-center justify-between transition-colors uppercase tracking-luxury font-medium ${
                activeTab === 'orders' ? 'bg-brand-ivory text-brand-gold font-semibold' : 'text-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-brand-gold" />
                <span>Acquisition History</span>
              </span>
              <ChevronRight className="w-4 h-4 text-brand-grey" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left p-4 flex items-center justify-between transition-colors uppercase tracking-luxury font-medium ${
                activeTab === 'addresses' ? 'bg-brand-ivory text-brand-gold font-semibold' : 'text-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Private Delivery Addresses</span>
              </span>
              <ChevronRight className="w-4 h-4 text-brand-grey" />
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`w-full text-left p-4 flex items-center justify-between transition-colors uppercase tracking-luxury font-medium ${
                activeTab === 'membership' ? 'bg-brand-ivory text-brand-gold font-semibold' : 'text-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Private Circle Privileges</span>
              </span>
              <ChevronRight className="w-4 h-4 text-brand-grey" />
            </button>
          </div>

          {/* Right Tab Content (9 Columns) */}
          <div className="lg:col-span-9 bg-white border border-brand-beige p-8 shadow-sm">
            {/* Tab 1: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-normal text-brand-black border-b border-brand-beige pb-3">
                  Recent Acquisitions & Vault Orders
                </h2>

                {/* If user placed order in session */}
                {placedOrder && (
                  <div className="border border-brand-gold/60 bg-brand-ivory/50 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-beige pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-semibold block">
                          Current Active Commission
                        </span>
                        <h4 className="font-serif text-base text-brand-black font-medium">{placedOrder.orderId}</h4>
                        <span className="text-xs text-brand-grey">{placedOrder.date}</span>
                      </div>
                      <span className="text-xs uppercase tracking-luxury font-bold text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 self-start sm:self-auto">
                        {placedOrder.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {placedOrder.items.map((i) => (
                        <div key={i.id} className="flex justify-between items-center">
                          <span>{i.product.name} ({i.selectedMetal}) x{i.quantity}</span>
                          <span className="font-medium text-brand-black">{formatPrice(i.price * i.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-brand-beige flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-black">Total: {formatPrice(placedOrder.total)}</span>
                      <button
                        onClick={() => navigateTo('track')}
                        className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-4 py-2 text-xs uppercase tracking-luxury font-medium transition-colors"
                      >
                        Track Shipment
                      </button>
                    </div>
                  </div>
                )}

                {/* Historic mock acquisition */}
                <div className="border border-brand-beige p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-beige pb-3">
                    <div>
                      <h4 className="font-serif text-base text-brand-black font-medium">AUR-2026-781902</h4>
                      <span className="text-xs text-brand-grey">August 24, 2026</span>
                    </div>
                    <span className="text-xs uppercase tracking-luxury font-medium text-brand-black bg-brand-ivory px-3 py-1 border border-brand-beige self-start sm:self-auto">
                      Delivered & Signed
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-brand-black">The Lumina Solitaire Diamond Ring (18K Yellow Gold)</p>
                      <p className="text-[11px] text-brand-grey">Delivered to Park Avenue Penthouse</p>
                    </div>
                    <span className="font-medium text-brand-black">{formatPrice(3850)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-normal text-brand-black border-b border-brand-beige pb-3">
                  Registered Private Addresses
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-grey">
                  <div className="p-6 border border-brand-gold/60 bg-brand-ivory space-y-2 relative">
                    <span className="absolute top-4 right-4 bg-brand-gold text-brand-black text-[9px] uppercase tracking-luxury font-semibold px-2 py-0.5">
                      Primary Residence
                    </span>
                    <h4 className="font-serif text-base font-medium text-brand-black">New York Penthouse</h4>
                    <p className="text-brand-black">Vivienne Beaumont</p>
                    <p>740 Park Avenue, Penthouse A</p>
                    <p>New York, NY 10021, USA</p>
                    <p className="pt-2 text-brand-gold">+1 (555) 019-2834</p>
                  </div>

                  <div className="p-6 border border-brand-beige bg-white space-y-2">
                    <h4 className="font-serif text-base font-medium text-brand-black">Paris Pied-à-terre</h4>
                    <p className="text-brand-black">Vivienne Beaumont</p>
                    <p>28 Avenue Montaigne</p>
                    <p>75008 Paris, France</p>
                    <p className="pt-2 text-brand-gold">+33 1 42 68 55 00</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Membership */}
            {activeTab === 'membership' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-[0.25em] font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Exclusive Tier Status</span>
                </div>
                <h2 className="font-serif text-3xl font-normal text-brand-black">
                  Aurelia Private Circle — Solitaire Level
                </h2>
                <p className="text-xs text-brand-grey leading-relaxed">
                  As a valued patron of our high jewellery maison, you enjoy uninhibited access to preview allocations before public release, invitations to our annual Place Vendôme gala, and dedicated armored delivery anywhere on the globe.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-beige text-xs">
                  <div className="p-4 bg-brand-ivory border border-brand-beige space-y-1">
                    <span className="font-semibold text-brand-black block">Dedicated Client Director</span>
                    <span className="text-brand-grey">Jean-Luc Moreau (Paris Salon)</span>
                  </div>
                  <div className="p-4 bg-brand-ivory border border-brand-beige space-y-1">
                    <span className="font-semibold text-brand-black block">Annual Salon Credit</span>
                    <span className="text-brand-gold font-medium">$500 Annual Courtesy Allocation</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
