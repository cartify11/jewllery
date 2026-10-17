import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo, setFilters } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
    }));
    navigateTo('shop');
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-ivory border-b border-brand-beige/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.28em] text-brand-gold font-medium">
            Curated Metiers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-black mt-2">
            Explore By Category
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed font-normal">
            Every creation is designed in our European ateliers, marrying classical goldsmithing techniques with contemporary sculptural proportions.
          </p>
        </div>

        {/* Categories Grid (6 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-[380px] sm:h-[420px] overflow-hidden bg-brand-black cursor-pointer shadow-luxury border border-brand-beige/80 transition-all duration-500"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-medium">
                      {cat.itemCount}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1 group-hover:text-brand-gold transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-brand-black transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-brand-ivory/90 mt-2 font-normal line-clamp-1 group-hover:text-white transition-colors">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
