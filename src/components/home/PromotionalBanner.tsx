import React from 'react';
import { ArrowRight, Sparkles, Gem, Clock, Calendar } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const PromotionalBanner: React.FC = () => {
  const { navigateTo, setFilters } = useShop();

  const handleExploreBridal = () => {
    setFilters((prev) => ({
      ...prev,
      category: 'All',
      sortBy: 'featured',
    }));
    navigateTo('shop');
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#FBF8F3] text-stone-900 overflow-hidden border-y border-brand-gold/30">
      {/* Background Subtle Warm Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-36 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Col 7): Bridal & Gold Collection Story for Pakistan */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-gold/15 border border-brand-gold/40 text-brand-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Exclusive Bridal & Fine Jewellery • Signature Collection</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 leading-[1.15]">
              The Royal Heritage <br />
              <span className="font-serif italic font-normal text-brand-gold">Bridal & Gold Collection</span>
            </h2>

            <p className="mt-6 text-stone-700 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Handcrafted in pure 21K and 22K solid hallmarked gold with natural emeralds, uncut polki, and certified brilliant diamonds. Specially designed for timeless Pakistani weddings, royal brides, and heirloom celebrations.
            </p>

            {/* Pakistani Trust Pillars */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs border-y border-stone-200 py-6 max-w-xl">
              <div>
                <span className="block text-stone-900 font-serif text-base sm:text-lg font-semibold">21K & 22K Gold</span>
                <span className="text-stone-600 text-[11px] sm:text-xs">100% Hallmarked Purity</span>
              </div>
              <div className="border-x border-stone-200 px-4">
                <span className="block text-stone-900 font-serif text-base sm:text-lg font-semibold">Free Delivery</span>
                <span className="text-stone-600 text-[11px] sm:text-xs">Insured Across Pakistan</span>
              </div>
              <div>
                <span className="block text-stone-900 font-serif text-base sm:text-lg font-semibold">Lifetime Guarantee</span>
                <span className="text-stone-600 text-[11px] sm:text-xs">Official Card & Buyback</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleExploreBridal}
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 text-xs uppercase tracking-luxury transition-all flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Explore Bridal Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="border border-stone-300 hover:border-brand-gold bg-white hover:bg-brand-ivory text-stone-800 px-8 py-4 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>Book Showroom Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Column (Col 5): Light Luxury Visual Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Gold Frame */}
              <div className="relative p-3.5 bg-white border border-brand-gold/40 shadow-xl">
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-gold" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-gold" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-gold" />

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1000"
                    alt="The Royal Emerald & Gold Bridal Necklace"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-brand-gold/40 px-3 py-1 shadow-sm">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-brand-black">
                      100% 22K HALLMARKED
                    </span>
                  </div>

                  {/* Bottom Plate Detailing in Light Luxury Style */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-left bg-gradient-to-t from-brand-black/90 via-brand-black/75 to-transparent text-white">
                    <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-semibold block">
                      Royal Bridal Masterpiece
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal mt-0.5">
                      The Shahi Emerald & Diamond Choker
                    </h3>
                    <p className="text-[11px] text-stone-200 mt-1 font-normal">
                      Pure 22K solid gold with natural deep green emerald & certified brilliant diamonds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Glow Behind Card */}
              <div className="absolute -inset-2 bg-brand-gold/10 blur-xl -z-10 rounded-sm pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
