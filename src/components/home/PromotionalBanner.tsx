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
    <section className="relative py-24 lg:py-32 bg-brand-black text-white overflow-hidden">
      {/* Background with Dark Subtle Grain & Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&q=85&w=1600"
          alt="Limited Edition High Jewellery Exhibition"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Edition Release • 12 Numbered Pieces Worldwide</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
            The Sovereign Reserve <br />
            <span className="font-serif font-medium text-brand-gold">Colombie & Ceylon</span>
          </h2>

          <p className="mt-6 text-brand-beige/95 text-sm sm:text-base leading-relaxed font-normal">
            An extraordinary capsule featuring untreated royal blue Ceylon sapphires and deep Muzo emeralds, each certified by SSEF Swiss Gemmological Institute. Commissioned once; impossible to replicate.
          </p>

          <div className="mt-8 flex flex-wrap gap-8 text-xs text-brand-grey border-y border-white/10 py-5">
            <div>
              <span className="block text-white font-serif text-lg">SSEF & GIA</span>
              <span>Swiss Certified Origin</span>
            </div>
            <div>
              <span className="block text-white font-serif text-lg">PT950</span>
              <span>Solid Platinum Castings</span>
            </div>
            <div>
              <span className="block text-white font-serif text-lg">Discreet Vault</span>
              <span>Direct Insured Transit</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExploreLimited}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 text-xs uppercase tracking-luxury transition-all flex items-center justify-center gap-2 group"
            >
              <span>Acquire Limited Edition Pieces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="border border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Book Salon Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
