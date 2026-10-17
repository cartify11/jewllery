import React from 'react';
import { Sparkles, Award, Shield, Compass, Gem, HeartHandshake } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Maison Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-brand-black mt-2">
            The Story of Aurelia
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
            Born from an obsession with light, balance, and pure materiality, AURELIA JEWELS reimagines high fine jewellery for modern connoisseurs who value quiet opulence over fleeting trends.
          </p>
        </div>

        {/* Story Section 1: European Ateliers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl border border-brand-beige">
            <img
              src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=85&w=1200"
              alt="Artisanal Jewellery Bench"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold">
              The European Ateliers
            </span>
            <h2 className="font-serif text-3xl font-normal text-brand-black">
              Centuries of Goldsmith Mastery
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Our master setters and polishers practice an unbroken lineage of benchwork rooted in Place Vendôme and Vicenza. Every curve is sculpted by hand, ensuring that behind every diamond facet lies decades of learned intuition.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              We reject industrial high-speed casting in favor of slow, deliberate micro-prong settings. The result is fine jewellery with substantial weight yet effortless tactility—pieces meant to live against your skin forever.
            </p>
          </div>
        </div>

        {/* Story Section 2: Ethical Sourcing & Sustainability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:flex-row-reverse">
          <div className="space-y-6 lg:order-1 order-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl font-normal text-brand-black">
              100% Recycled 18K Gold & Conflict-Free Stones
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              True luxury does not come at the expense of our earth. Every grain of 18K yellow, rose, and white gold used in our ateliers is refined from certified post-consumer precious metals, drastically reducing mining footprint while preserving identical 750/1000 purity.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              All diamonds adhere strictly to the Kimberley Process and Responsible Jewellery Council (RJC) protocols. Accompanied by individual GIA, IGI, or SSEF reports, our gems possess complete origin traceability and uncompromised brilliance.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl border border-brand-beige lg:order-2 order-1">
            <img
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=85&w=1200"
              alt="Gemstone Selection and Scrutiny"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="border-t border-brand-beige pt-16 mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif text-2xl font-normal text-brand-black">Our Four Pillars of Excellence</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 border border-brand-beige text-center">
              <Gem className="w-8 h-8 text-brand-gold mx-auto mb-4 stroke-[1.2]" />
              <h4 className="font-serif text-base font-medium text-brand-black mb-2">Rare Precision</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Only the top 1% of rough diamonds and color gemstones meet our master gemmologist's eye.
              </p>
            </div>

            <div className="bg-white p-6 border border-brand-beige text-center">
              <Award className="w-8 h-8 text-brand-gold mx-auto mb-4 stroke-[1.2]" />
              <h4 className="font-serif text-base font-medium text-brand-black mb-2">Hallmark Registry</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Individually struck with national assay office poinçons and stamped with the Aurelia maker's mark.
              </p>
            </div>

            <div className="bg-white p-6 border border-brand-beige text-center">
              <Shield className="w-8 h-8 text-brand-gold mx-auto mb-4 stroke-[1.2]" />
              <h4 className="font-serif text-base font-medium text-brand-black mb-2">Lifetime Warranty</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Complimentary annual prong inspection, professional ultrasonic cleaning, and repolishing.
              </p>
            </div>

            <div className="bg-white p-6 border border-brand-beige text-center">
              <HeartHandshake className="w-8 h-8 text-brand-gold mx-auto mb-4 stroke-[1.2]" />
              <h4 className="font-serif text-base font-medium text-brand-black mb-2">Bespoke Dialogue</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Collaborate directly with our design studio to realize personalized heirloom commissions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="text-center py-12 bg-white border border-brand-beige p-8">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-black mb-3">
            Experience the Aurelia Collection
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
            Discover pieces designed to transcend generations. Available for private viewing or worldwide insured delivery.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-8 py-3.5 text-xs uppercase tracking-luxury font-semibold transition-all"
          >
            Explore The Creations
          </button>
        </div>
      </div>
    </div>
  );
};
