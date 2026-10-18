import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const BestSellersSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'Rings' | 'Necklaces' | 'Bracelets' | 'Gold Jewellery'>('all');

  const bestSellers = LUXURY_PRODUCTS.filter((p) => p.isBestSeller);
  const displayProducts = activeTab === 'all'
    ? bestSellers
    : bestSellers.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F4EC] border-b border-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[11px] uppercase tracking-[0.28em] font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Timeless Acquisitions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-black">
              The Best-Selling Icons
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Icons' },
              { id: 'Rings', label: 'Rings' },
              { id: 'Necklaces', label: 'Necklaces' },
              { id: 'Bracelets', label: 'Bracelets' },
              { id: 'Gold Jewellery', label: 'Solid Gold' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs uppercase tracking-luxury px-4 py-2 border transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-black text-white border-brand-black font-semibold'
                    : 'bg-white text-brand-black border-brand-beige hover:border-brand-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (2-cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {displayProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-brand-black text-brand-black hover:text-white border border-brand-black px-8 py-3.5 text-xs uppercase tracking-luxury font-medium transition-all duration-300"
          >
            <span>View All Creations ({LUXURY_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
