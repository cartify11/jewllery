import React from 'react';
import { ArrowRight, Sparkles, Award, Compass, Feather } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BrandStorySection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 lg:py-32 bg-brand-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-4/5 aspect-[3/4] overflow-hidden shadow-2xl border border-brand-beige">
              <img
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=85&w=1000"
                alt="Master Goldsmith Bench Atelier"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="absolute -bottom-8 -right-2 sm:right-4 z-20 w-3/5 aspect-square overflow-hidden shadow-2xl border-4 border-brand-ivory">
              <img
                src="https://images.unsplash.com/photo-1611591475879-f12a2e5d7a64?auto=format&fit=crop&q=85&w=800"
                alt="18K Gold Craftsmanship Detailing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Gold Accent Emblem */}
            <div className="absolute top-6 left-6 z-30 bg-brand-black/90 text-brand-gold p-4 shadow-xl border border-brand-gold/30 hidden sm:block">
              <span className="block text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold">
                Atelier Poinçon
              </span>
              <span className="font-serif text-lg text-white">750 / PT950</span>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] uppercase tracking-[0.28em] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Maison's Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-black leading-tight">
              Where Ancient Alchemy Meets Modern Architecture
            </h2>

            <div className="w-16 h-[1.5px] bg-brand-gold" />

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Founded on the belief that fine jewellery should be as personal as poetry and as lasting as sculpture, AURELIA JEWELS marries centuries of European bench-goldsmithing with clean, architectural lines.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Every creation begins with certified recycled 18K solid gold and meticulously scrutinized natural and ethical lab diamonds—chosen not merely for technical grades, but for the untamed fire and vitality of each individual stone.
            </p>

            {/* Three Pillar Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-beige">
              <div>
                <Award className="w-5 h-5 text-brand-gold mb-2 stroke-[1.5]" />
                <h4 className="text-xs uppercase tracking-luxury font-medium text-brand-black">RJ Council</h4>
                <p className="text-[11px] text-brand-grey mt-1">Certified sustainable sourcing protocols</p>
              </div>

              <div>
                <Compass className="w-5 h-5 text-brand-gold mb-2 stroke-[1.5]" />
                <h4 className="text-xs uppercase tracking-luxury font-medium text-brand-black">Micro-Prong</h4>
                <p className="text-[11px] text-brand-grey mt-1">Engineered for maximal optical brilliance</p>
              </div>

              <div>
                <Feather className="w-5 h-5 text-brand-gold mb-2 stroke-[1.5]" />
                <h4 className="text-xs uppercase tracking-luxury font-medium text-brand-black">Hand-Polished</h4>
                <p className="text-[11px] text-brand-grey mt-1">Silky mirror polish on all skin contacts</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-bold text-brand-black hover:text-brand-gold transition-colors group"
              >
                <span>Read The Aurelia Heritage & Atelier Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
