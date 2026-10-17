import React from 'react';
import { Truck, ShieldCheck, Lock, Globe, Clock, PackageCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ShippingPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Logistics & Security
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Shipping & Armored Delivery
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            Every Aurelia piece is transported under strict high-value security protocols, ensuring confidential, fully insured transit directly to your hands.
          </p>
        </div>

        <div className="bg-white border border-brand-beige p-8 sm:p-12 space-y-10 shadow-sm text-xs text-brand-grey leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-gold" />
              <span>Complimentary Worldwide Armored Courier Delivery</span>
            </h2>
            <p>
              We provide complimentary priority insured delivery on all orders over $500. Deliveries within the continental United States and Western Europe arrive within 2 to 4 business days following vault inspection. Dedicated armored overnight courier service is available at checkout for urgent acquisitions.
            </p>
          </div>

          {/* Section 2 */}
          <div className="pt-6 border-t border-brand-beige">
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold" />
              <span>Discreet, Tamper-Evident Packaging</span>
            </h2>
            <p>
              To protect client confidentiality and prevent transit diversion, the exterior packaging is completely unbranded and reveals no indication of jewellery or high value. Within the outer security box, your creation rests within our signature hard-shell presentation casket, secured with an individual numbered holographic seal.
            </p>
          </div>

          {/* Section 3 */}
          <div className="pt-6 border-t border-brand-beige">
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-gold" />
              <span>Adult Signature & Identification Required</span>
            </h2>
            <p>
              Under no circumstances will couriers leave shipments unattended or with third parties. A government-issued photo ID and adult physical signature are strictly required at the time of handover.
            </p>
          </div>

          {/* Section 4 */}
          <div className="pt-6 border-t border-brand-beige">
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-gold" />
              <span>Customs, Duties & International Taxes</span>
            </h2>
            <p>
              All orders are shipped DDP (Delivered Duty Paid). Any applicable international VAT, customs tariffs, or import duties are accounted for at checkout. You will never encounter unexpected fees or customs clearance delays upon arrival.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('track')}
            className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-3.5 text-xs uppercase tracking-luxury font-semibold transition-colors"
          >
            Track Existing Acquisition
          </button>
        </div>
      </div>
    </div>
  );
};
