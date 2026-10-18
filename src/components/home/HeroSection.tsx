import React from 'react';
import { ArrowRight, Sparkles, Shield, Award, Gem } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Campaign Image with Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=85&w=1920"
          alt="Aurelia Jewels Haute Horlogerie Campaign"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Vignette & Vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-black/70" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white flex flex-col items-center">
        {/* Subtle Luxury Crest */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span>Royal Bridal & Fine Jewellery Collection</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.08] text-white max-w-4xl text-balance">
          Timeless Elegance. <br />
          <span className="font-serif font-medium text-brand-gold">Crafted to Shine.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-brand-ivory/95 max-w-2xl font-normal leading-relaxed tracking-wide">
          Discover jewellery that celebrates your individuality and makes every moment unforgettable. Handcrafted in pure 21K & 22K solid hallmarked gold and certified diamonds.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-light text-brand-black font-semibold px-8 py-4 text-xs uppercase tracking-luxury transition-all duration-300 shadow-xl hover:shadow-brand-gold/30 flex items-center justify-center gap-2 group"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-medium border border-white/40 hover:border-white px-8 py-4 text-xs uppercase tracking-luxury transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Explore Best Sellers</span>
          </button>
        </div>

        {/* Trust Mini-Bar (Mobile Optimized) */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-8 text-[9px] sm:text-xs text-brand-beige/80 uppercase tracking-wider sm:tracking-luxury max-w-xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Gem className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Certified Diamonds</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Award className="w-4 h-4 text-brand-gold shrink-0" />
            <span>21K / 22K Gold</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Shield className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Lifetime Guarantee</span>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 text-[10px] uppercase tracking-luxury">
        <span className="mb-1">Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-brand-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
};
