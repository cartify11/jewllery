import React from 'react';
import { ArrowRight, Sparkles, Gem, Clock, Calendar } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const PromotionalBanner: React.FC = () => {
  const { navigateTo, setFilters } = useShop();

  const handleExploreLimited = () => {
    setFilters((prev) => ({
      ...prev,
      category: 'All',
      sortBy: 'featured',
    }));
    navigateTo('shop');
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#0D0D0D] text-white overflow-hidden border-y border-brand-gold/20">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Col 7): Editorial Story & Accreditations */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Limited Haute Joaillerie • 12 Numbered Pieces Worldwide</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.15]">
              The Sovereign Reserve <br />
              <span className="font-serif italic font-normal text-brand-gold">Colombie & Ceylon</span>
            </h2>

            <p className="mt-6 text-brand-beige/90 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              An extraordinary capsule featuring unheated royal Ceylon sapphires and deep Muzo emeralds, each individually certified by the SSEF Swiss Gemmological Institute. Commissioned once in our Geneva atelier; impossible to replicate.
            </p>

            {/* Swiss Certification & Material Highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs border-y border-white/10 py-6 max-w-xl">
              <div>
                <span className="block text-white font-serif text-base sm:text-lg text-brand-gold">SSEF & GIA</span>
                <span className="text-stone-400 text-[11px] sm:text-xs">Swiss Certified</span>
              </div>
              <div className="border-x border-white/10 px-4">
                <span className="block text-white font-serif text-base sm:text-lg text-brand-gold">PT950 / 18K</span>
                <span className="text-stone-400 text-[11px] sm:text-xs">Hand-Forged Solid</span>
              </div>
              <div>
                <span className="block text-white font-serif text-base sm:text-lg text-brand-gold">Bespoke Vault</span>
                <span className="text-stone-400 text-[11px] sm:text-xs">Armoured Transit</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleExploreLimited}
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 text-xs uppercase tracking-luxury transition-all flex items-center justify-center gap-2 group shadow-lg"
              >
                <span>Acquire Limited Edition Pieces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="border border-brand-gold/40 hover:border-brand-gold text-brand-ivory hover:text-white hover:bg-white/5 px-8 py-4 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>Book Salon Viewing</span>
              </button>
            </div>
          </div>

          {/* Right Column (Col 5): Visual Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Gold Frame */}
              <div className="relative p-3 bg-gradient-to-b from-brand-gold/30 via-brand-gold/10 to-transparent border border-brand-gold/40 shadow-2xl">
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-gold" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-gold" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-gold" />

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-black">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1000"
                    alt="The Muzo Sovereign Emerald & Diamond Necklace"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 bg-brand-black/85 backdrop-blur-sm border border-brand-gold/40 px-3 py-1">
                    <span className="text-[10px] font-mono tracking-wider text-brand-gold">
                      SSEF CERT #114829
                    </span>
                  </div>

                  {/* Bottom Plate Detailing */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-left bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent">
                    <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-medium block">
                      Piece N° 04 / 12 • Limited Capsule
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-normal mt-0.5">
                      The Sovereign Muzo Emerald Collier
                    </h3>
                    <p className="text-[11px] text-stone-300 mt-1 font-normal">
                      6.42ct untreated Colombian emerald & D/Flawless diamonds in 18K solid yellow gold.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Shadow Behind Card */}
              <div className="absolute -inset-2 bg-brand-gold/5 blur-xl -z-10 rounded-sm pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
