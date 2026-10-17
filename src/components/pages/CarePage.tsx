import React from 'react';
import { Gem, Sparkles, Shield, HeartHandshake, Droplets, Sun, Archive } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CarePage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Heirloom Preservation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Jewellery Care & Preservation Guide
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            Crafted from high-carat solid gold and precious gemstones, each Aurelia piece is engineered to endure across generations with mindful daily preservation.
          </p>
        </div>

        <div className="space-y-10">
          {/* Diamonds & Solid 18K Gold */}
          <div className="bg-white border border-brand-beige p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-brand-gold stroke-[1.2]" />
              <h2 className="font-serif text-2xl font-normal text-brand-black">
                Diamonds, Platinum & 18K Solid Gold
              </h2>
            </div>
            <p className="text-xs text-brand-grey leading-relaxed mb-4">
              While diamonds are the hardest known mineral and 18K solid gold does not tarnish, daily cosmetics, natural body oils, and hand lotions can build up a thin film behind stone baskets, temporarily diminishing light refraction.
            </p>
            <div className="bg-brand-ivory p-4 border border-brand-beige text-xs space-y-2">
              <span className="font-semibold text-brand-black block">Atelier Home Cleaning Protocol:</span>
              <p className="text-brand-grey">
                1. Soak your piece in a small bowl of lukewarm filtered water with two drops of mild organic dish soap for 10 minutes.
              </p>
              <p className="text-brand-grey">
                2. Use an extra-soft baby toothbrush to delicately brush behind the gemstone setting and between pavé prongs.
              </p>
              <p className="text-brand-grey">
                3. Rinse thoroughly under running lukewarm water and pat dry with the lint-free microfiber polishing cloth provided in your presentation box.
              </p>
            </div>
          </div>

          {/* South Sea Pearls & Organic Gems */}
          <div className="bg-white border border-brand-beige p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-brand-gold stroke-[1.2]" />
              <h2 className="font-serif text-2xl font-normal text-brand-black">
                South Sea Pearls & Delicate Organic Gems
              </h2>
            </div>
            <p className="text-xs text-brand-grey leading-relaxed mb-3">
              Pearls are living organic gems requiring special reverence. Their nacre is sensitive to acids, harsh perfumes, and alcohol-based hairsprays.
            </p>
            <ul className="list-disc pl-5 text-xs text-brand-grey space-y-2">
              <li>
                <strong className="text-brand-black">"Last On, First Off":</strong> Always adorn your pearl jewellery as the very last step in your dressing ritual, after makeup and fragrance have dried completely.
              </li>
              <li>
                <strong className="text-brand-black">Never Ultrasonic:</strong> Never submerge pearls in an ultrasonic cleaner or steam bath. Clean exclusively by wiping with a barely damp chamois cloth.
              </li>
            </ul>
          </div>

          {/* Emeralds & Color Stones */}
          <div className="bg-white border border-brand-beige p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Gem className="w-6 h-6 text-brand-gold stroke-[1.2]" />
              <h2 className="font-serif text-2xl font-normal text-brand-black">
                Natural Emeralds, Sapphires & Rubies
              </h2>
            </div>
            <p className="text-xs text-brand-grey leading-relaxed">
              Emeralds contain natural internal inclusions (known as the emerald "jardin"). Avoid exposing emeralds to sudden extreme thermal shifts, hot water, or harsh solvents. Clean only using room-temperature water and a micro-soft brush.
            </p>
          </div>

          {/* Proper Storage */}
          <div className="bg-white border border-brand-beige p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Archive className="w-6 h-6 text-brand-gold stroke-[1.2]" />
              <h2 className="font-serif text-2xl font-normal text-brand-black">
                Storage & Daily Preservation
              </h2>
            </div>
            <p className="text-xs text-brand-grey leading-relaxed mb-3">
              Store each fine piece independently in individual velvet-lined compartments to prevent diamonds from scratching softer precious metals or neighboring stones. Always fasten necklaces and bracelets prior to storage to prevent knotting.
            </p>
          </div>
        </div>

        {/* Lifetime Salon Service Banner */}
        <div className="mt-14 p-8 bg-[#FAF4E6] border border-brand-gold/40 text-center">
          <h3 className="font-serif text-xl font-normal text-brand-black mb-2">
            Complimentary Lifetime Salon Inspection
          </h3>
          <p className="text-xs text-brand-grey max-w-md mx-auto mb-6">
            Aurelia clients enjoy complimentary lifetime ultrasonic maintenance, prong tightness checks, and professional repolishing at any of our worldwide boutiques.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-6 py-3 text-xs uppercase tracking-luxury font-semibold transition-all"
          >
            Book Salon Service Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
