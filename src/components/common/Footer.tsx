import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Gem, 
  Lock, 
  PhoneCall, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'info');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Aurelia Private Circle. Your 10% code is AURELIA10.', 'gold');
    setEmail('');
  };

  return (
    <footer className="bg-brand-black text-brand-beige border-t border-brand-charcoal pt-16 pb-12">
      {/* 1. Value Pillars & Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-gold mb-2">
              <Gem className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h4 className="text-white text-xs uppercase tracking-luxury font-medium">Master Artisanship</h4>
            <p className="text-brand-grey text-xs leading-relaxed max-w-xs">
              Hand-finished in Europe using recycled 18K solid gold and hand-selected certified stones.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-gold mb-2">
              <Truck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h4 className="text-white text-xs uppercase tracking-luxury font-medium">Armored Courier Transit</h4>
            <p className="text-brand-grey text-xs leading-relaxed max-w-xs">
              Complimentary discreet, fully-insured delivery directly to your residence or private bank.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-gold mb-2">
              <RotateCcw className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h4 className="text-white text-xs uppercase tracking-luxury font-medium">30-Day Privilege Returns</h4>
            <p className="text-brand-grey text-xs leading-relaxed max-w-xs">
              Complimentary return shipping and exchanges with our tamper-evident signature vault seal.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-brand-gold mb-2">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h4 className="text-white text-xs uppercase tracking-luxury font-medium">Lifetime Authenticity</h4>
            <p className="text-brand-grey text-xs leading-relaxed max-w-xs">
              Accompanied by GIA/GRS gemological reports and official governmental hallmark certification.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-brand-gold mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] tracking-[0.3em] uppercase">Maison Fondée 2026</span>
              </div>
              <h3 className="font-serif text-2xl tracking-[0.3em] uppercase text-white font-normal">
                AURELIA JEWELS
              </h3>
              <p className="text-brand-gold text-[10px] tracking-[0.4em] uppercase mt-1">
                High Fine Jewellery
              </p>
            </div>

            <p className="text-brand-grey text-xs leading-relaxed max-w-sm">
              Aurelia Jewels creates transcendent fine jewellery born from uncompromising craftsmanship, sustainable metallurgy, and rare, ethically sourced gemstones. Timeless elegance crafted to illuminate your individuality.
            </p>

            <div className="pt-2 text-xs space-y-2 text-brand-grey">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Salons: Place Vendôme, Paris • Bond St, London • Madison Ave, New York</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-gold shrink-0" />
                <span>VIP Concierge: +1 (800) 489-AURELIA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>concierge@aureliajewels.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Column: Collections */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-luxury font-semibold border-b border-white/10 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-grey">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  Rings & Solitaires
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  Diamond Collars & Pendants
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  Chandelier & Stud Earrings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  Tennis Bracelets & Cuffs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  18K Solid Gold Editions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-brand-gold transition-colors">
                  Rare Gemstone High Jewellery
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Client Care */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-luxury font-semibold border-b border-white/10 pb-2">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-grey">
              <li>
                <button onClick={() => navigateTo('track')} className="hover:text-brand-gold transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-brand-gold transition-colors">
                  Shipping & Armored Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns')} className="hover:text-brand-gold transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('care')} className="hover:text-brand-gold transition-colors">
                  Jewellery Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-brand-gold transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-brand-gold transition-colors">
                  Book a Private Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column: Maison & Legal */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-luxury font-semibold border-b border-white/10 pb-2">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-grey">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-brand-gold transition-colors">
                  Our Heritage & Ateliers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-brand-gold transition-colors">
                  Ethical Sourcing & RJC Purity
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-brand-gold transition-colors">
                  Private Client Membership
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-brand-gold transition-colors">
                  Terms of Service & Warranty
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-brand-charcoal/50 border-y border-white/5 my-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-medium">
              Private Newsletter Invitation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-1">
              Join The Aurelia Private Circle
            </h3>
            <p className="text-brand-grey text-xs mt-1.5 max-w-xl">
              Receive private previews of limited high jewellery releases, bespoke invitations to salon exhibitions, and complimentary priority consultation.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-brand-charcoal border border-brand-gold/40 py-3 px-5 text-xs text-brand-gold uppercase tracking-luxury font-medium">
              ✓ Subscribed to Private Circle • Code: AURELIA10
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email address"
                className="w-full bg-brand-black border border-white/20 text-white placeholder-brand-grey text-xs px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-brand-gold text-brand-black px-6 py-3 text-xs uppercase tracking-luxury font-semibold hover:bg-brand-gold-light transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 4. Bottom Legal, Payment Badges & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-brand-grey">
        <div>
          <p>© 2026 AURELIA JEWELS MAISON S.A. All rights reserved. Registered High Fine Jeweller.</p>
        </div>

        {/* Payment and Security Emblems */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1 text-white/80">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            256-Bit SSL Encrypted Vault Checkout
          </span>
          <span className="text-white/40">|</span>
          <div className="flex items-center space-x-2">
            <span className="border border-white/20 px-2 py-0.5 rounded text-[10px] text-white">VISA</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[10px] text-white">MASTERCARD</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[10px] text-white">AMEX</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[10px] text-white">APPLE PAY</span>
            <span className="border border-white/20 px-2 py-0.5 rounded text-[10px] text-white">WIRE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
