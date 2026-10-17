import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const NewArrivalsSection: React.FC = () => {
  const { navigateTo } = useShop();

  const newArrivals = LUXURY_PRODUCTS.filter((p) => p.isNew || p.isLimitedEdition);

  return (
    <section className="py-20 lg:py-28 bg-[#F4EEDA]/40 border-b border-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[11px] uppercase tracking-[0.28em] font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-black">
              New High Fine Arrivals
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury font-semibold text-brand-black hover:text-brand-gold transition-colors"
          >
            <span>Explore All New Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
