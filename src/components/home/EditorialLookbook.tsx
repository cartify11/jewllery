import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { EDITORIAL_LOOKBOOK } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const EditorialLookbook: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#F4EEDA]/40 border-b border-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Haute Joaillerie Campaign</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-black">
            The Autumn / Winter Lookbook
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto my-4" />
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            A visual symphony of rare light, sculpted 18K solid gold, and sovereign gemstones captured in our European ateliers.
          </p>
        </div>

        {/* 6 High Jewellery Editorial Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EDITORIAL_LOOKBOOK.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo('shop')}
              className="group relative h-[420px] overflow-hidden bg-brand-black cursor-pointer shadow-luxury border border-brand-beige transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/30 to-transparent transition-opacity" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-semibold">
                  Editorial Plate 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-1 group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-ivory/90 mt-1 font-normal">
                  {item.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-gold font-medium uppercase tracking-luxury opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Creation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
