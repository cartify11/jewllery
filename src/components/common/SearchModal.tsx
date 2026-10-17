import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { LUXURY_PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPrice } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Solitaire Diamond',
    'Tennis Bracelet',
    'Colombian Emerald',
    '18K Solid Gold',
    'South Sea Pearl',
    'Eternity Band',
  ];

  const filteredProducts = query.trim()
    ? LUXURY_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.gemstone.toLowerCase().includes(query.toLowerCase()) ||
          p.metal.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 sm:px-6">
        <div
          className="w-full max-w-3xl bg-brand-ivory rounded-none shadow-2xl border border-brand-beige overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="p-6 border-b border-brand-beige flex items-center gap-4 bg-white">
            <Search className="w-6 h-6 text-brand-gold shrink-0 stroke-[1.5]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by gemstone, collection, metal, or creation name..."
              className="w-full bg-transparent text-base sm:text-lg text-brand-black placeholder:text-brand-grey focus:outline-none font-serif tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-brand-grey hover:text-brand-black p-1 text-xs uppercase"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-brand-black hover:text-brand-gold rounded-full hover:bg-brand-beige/30 transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-6 py-4 bg-[#F8F4EC] border-b border-brand-beige/80">
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-luxury text-brand-grey font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Curated Searches:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-white border border-brand-beige hover:border-brand-gold px-3 py-1.5 rounded-none text-brand-black hover:text-brand-gold transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Area */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="text-center py-10 text-brand-grey text-xs">
                <p className="font-serif text-base text-brand-black mb-1">Explore our High Jewellery Catalog</p>
                <p>Type keywords like "Diamond", "Gold", "Ring", or "Sapphire" to view available creations.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-serif text-lg text-brand-black mb-1">No matching creations found</p>
                <p className="text-brand-grey text-xs max-w-sm mx-auto">
                  We could not find any fine jewellery matching "{query}". Our private concierge can craft bespoke commissions upon request.
                </p>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('contact');
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-luxury text-brand-gold hover:underline"
                >
                  Consult Concierge for Custom Inquiries →
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-luxury text-brand-grey">
                    Found {filteredProducts.length} Creation{filteredProducts.length > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop');
                    }}
                    className="text-xs text-brand-gold hover:underline flex items-center gap-1 uppercase tracking-luxury font-medium"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product-detail', product.id);
                      }}
                      className="group flex gap-4 p-3 bg-white border border-brand-beige/80 hover:border-brand-gold transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover shrink-0 bg-brand-ivory group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-medium">
                          {product.category} • {product.metal}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-brand-black truncate group-hover:text-brand-gold transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-sans text-xs font-semibold text-brand-black mt-1 whitespace-nowrap">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
