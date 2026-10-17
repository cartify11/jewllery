import React from 'react';
import { RotateCcw, ShieldCheck, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ReturnsPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Client Assurance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Returns & Privilege Exchanges
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            We desire that you feel boundless joy in every Aurelia piece. Should any creation not meet your highest expectations, we provide a seamless 30-day return experience.
          </p>
        </div>

        <div className="bg-white border border-brand-beige p-8 sm:p-12 space-y-10 shadow-sm text-xs text-brand-grey leading-relaxed">
          {/* Policy Overview */}
          <div>
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3">
              The 30-Day Privilege Return Policy
            </h2>
            <p>
              Creations purchased through Aurelia Jewellers online or through our private concierge may be returned or exchanged within 30 calendar days of delivery. All returns are subject to a complimentary insured return shipping label provided by our client services team.
            </p>
          </div>

          {/* Condition of Pieces */}
          <div className="pt-6 border-t border-brand-beige">
            <h2 className="font-serif text-xl font-normal text-brand-black mb-3">
              Condition & Security Tag Requirements
            </h2>
            <p className="mb-3">
              To be eligible for a full refund or exchange:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The creation must remain unworn, unaltered, and without scratches or damage.</li>
              <li>The individual red security seal tag attached to the piece must remain intact and uncut.</li>
              <li>All original packaging, leather caskets, GIA/SSEF certificates, and invoice deeds must be returned in their entirety.</li>
            </ul>
          </div>

          {/* Step-by-Step Return Process */}
          <div className="pt-6 border-t border-brand-beige">
            <h2 className="font-serif text-xl font-normal text-brand-black mb-4">
              Step-by-Step Return Procedure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-brand-ivory p-5 border border-brand-beige">
                <span className="w-8 h-8 rounded-full bg-brand-black text-brand-gold inline-flex items-center justify-center font-serif text-sm font-semibold mb-2">1</span>
                <h4 className="font-medium text-brand-black mb-1">Notify Concierge</h4>
                <p className="text-[11px]">Contact concierge@aureliajewels.com to request an armored return authorization number (RMA).</p>
              </div>

              <div className="bg-brand-ivory p-5 border border-brand-beige">
                <span className="w-8 h-8 rounded-full bg-brand-black text-brand-gold inline-flex items-center justify-center font-serif text-sm font-semibold mb-2">2</span>
                <h4 className="font-medium text-brand-black mb-1">Insured Collection</h4>
                <p className="text-[11px]">We dispatch an armored courier directly to your residence to collect the pre-sealed parcel.</p>
              </div>

              <div className="bg-brand-ivory p-5 border border-brand-beige">
                <span className="w-8 h-8 rounded-full bg-brand-black text-brand-gold inline-flex items-center justify-center font-serif text-sm font-semibold mb-2">3</span>
                <h4 className="font-medium text-brand-black mb-1">Vault Reimbursement</h4>
                <p className="text-[11px]">Following optical inspection (within 48 hours), your refund is credited to your original payment method.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('contact')}
            className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-3.5 text-xs uppercase tracking-luxury font-semibold transition-colors"
          >
            Initiate Return with Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
