import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Grid, 
  LayoutGrid, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { LUXURY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';
import { MetalType, GemstoneType } from '../../types';

export const ShopPage: React.FC = () => {
  const { filters, setFilters, resetFilters, formatPrice } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Gold Jewellery', 'Diamond Jewellery'];
  const metals: (string | MetalType)[] = ['All', '18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum 950'];
  const gemstones: (string | GemstoneType)[] = ['All', 'Conflict-free Diamond', 'Emerald', 'Sapphire', 'Ruby', 'South Sea Pearl'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      // Metal filter
      if (filters.metal !== 'All' && !product.variants.some((v) => v.metal === filters.metal)) {
        return false;
      }
      // Gemstone filter
      if (filters.gemstone !== 'All' && product.gemstone !== filters.gemstone) {
        return false;
      }
      // In-stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.metal.toLowerCase().includes(q) ||
          product.gemstone.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured'
    });
  }, [filters]);

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.metal !== 'All' ? 1 : 0) +
    (filters.gemstone !== 'All' ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[1] < 15000 ? 1 : 0);

  return (
    <div className="bg-brand-ivory min-h-screen pb-24">
      {/* Editorial Catalog Hero */}
      <div className="bg-brand-charcoal text-white py-14 sm:py-20 border-b border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Aurelia Permanent Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-wide">
            Fine Jewellery & High Creations
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-brand-beige/95 max-w-xl mx-auto leading-relaxed font-normal">
            Each creation is an exquisite union of rare conflict-free gemstones, solid 18K gold, and master European goldsmithing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-beige gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-brand-beige px-4 py-2 text-xs uppercase tracking-luxury font-medium text-brand-black"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <span className="text-xs uppercase tracking-luxury text-brand-grey font-medium">
              Showing <span className="text-brand-black font-semibold">{filteredProducts.length}</span> of {LUXURY_PRODUCTS.length} Creations
            </span>
          </div>

          {/* Right Controls: Sort & Grid Switcher */}
          <div className="flex items-center space-x-4 self-end sm:self-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-brand-grey uppercase tracking-luxury hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-white border border-brand-beige px-3 py-2 text-xs uppercase tracking-luxury text-brand-black focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="featured">Featured Editions</option>
                <option value="best-selling">Best Sellers First</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid View Switcher (Desktop) */}
            <div className="hidden md:flex items-center border border-brand-beige bg-white">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors ${gridCols === 3 ? 'bg-brand-black text-brand-gold' : 'text-brand-grey hover:text-brand-black'}`}
                title="3 Column Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? 'bg-brand-black text-brand-gold' : 'text-brand-grey hover:text-brand-black'}`}
                title="4 Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-4 border-b border-brand-beige/60">
            <span className="text-[11px] uppercase tracking-luxury text-brand-grey font-medium mr-1">
              Active Filters:
            </span>

            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-brand-beige text-xs px-2.5 py-1 text-brand-black">
                Category: {filters.category}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-brand-gold"
                  onClick={() => setFilters((p) => ({ ...p, category: 'All' }))}
                />
              </span>
            )}

            {filters.metal !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-brand-beige text-xs px-2.5 py-1 text-brand-black">
                Metal: {filters.metal}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-brand-gold"
                  onClick={() => setFilters((p) => ({ ...p, metal: 'All' }))}
                />
              </span>
            )}

            {filters.gemstone !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-brand-beige text-xs px-2.5 py-1 text-brand-black">
                Gemstone: {filters.gemstone}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-brand-gold"
                  onClick={() => setFilters((p) => ({ ...p, gemstone: 'All' }))}
                />
              </span>
            )}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-brand-beige text-xs px-2.5 py-1 text-brand-black">
                In Stock Only
                <X
                  className="w-3 h-3 cursor-pointer hover:text-brand-gold"
                  onClick={() => setFilters((p) => ({ ...p, inStockOnly: false }))}
                />
              </span>
            )}

            {filters.priceRange[1] < 15000 && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-brand-beige text-xs px-2.5 py-1 text-brand-black">
                Max {formatPrice(filters.priceRange[1])}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-brand-gold"
                  onClick={() => setFilters((p) => ({ ...p, priceRange: [0, 15000] }))}
                />
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-brand-gold hover:underline flex items-center gap-1 ml-2 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Shop Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar (Left Column) */}
          <div className="hidden lg:block space-y-8 pr-6 border-r border-brand-beige/80">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-luxury font-semibold text-brand-black mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((p) => ({ ...p, category: cat }))}
                    className={`block w-full text-left py-1 text-xs transition-colors ${
                      filters.category === cat
                        ? 'text-brand-gold font-semibold translate-x-1'
                        : 'text-brand-black hover:text-brand-gold'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Type Filter */}
            <div className="pt-6 border-t border-brand-beige">
              <h3 className="text-xs uppercase tracking-luxury font-semibold text-brand-black mb-3">
                Precious Metal
              </h3>
              <div className="space-y-2">
                {metals.map((metal) => (
                  <label key={metal} className="flex items-center gap-2.5 text-xs text-brand-black cursor-pointer">
                    <input
                      type="radio"
                      name="metal"
                      checked={filters.metal === metal}
                      onChange={() => setFilters((p) => ({ ...p, metal }))}
                      className="accent-brand-gold focus:ring-brand-gold"
                    />
                    <span>{metal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gemstone Type Filter */}
            <div className="pt-6 border-t border-brand-beige">
              <h3 className="text-xs uppercase tracking-luxury font-semibold text-brand-black mb-3">
                Gemstone & Diamonds
              </h3>
              <div className="space-y-2">
                {gemstones.map((gem) => (
                  <label key={gem} className="flex items-center gap-2.5 text-xs text-brand-black cursor-pointer">
                    <input
                      type="radio"
                      name="gemstone"
                      checked={filters.gemstone === gem}
                      onChange={() => setFilters((p) => ({ ...p, gemstone: gem }))}
                      className="accent-brand-gold focus:ring-brand-gold"
                    />
                    <span>{gem}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="pt-6 border-t border-brand-beige">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase tracking-luxury font-semibold text-brand-black">
                  Maximum Price
                </h3>
                <span className="text-xs font-serif font-medium text-brand-gold">
                  {formatPrice(filters.priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="15000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, priceRange: [0, Number(e.target.value)] }))
                }
                className="w-full accent-brand-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-grey mt-1">
                <span>{formatPrice(1500)}</span>
                <span>{formatPrice(15000)}+</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-6 border-t border-brand-beige">
              <label className="flex items-center gap-2.5 text-xs text-brand-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters((p) => ({ ...p, inStockOnly: e.target.checked }))}
                  className="accent-brand-gold rounded"
                />
                <span className="font-medium">In Stock & Ready for Transit Only</span>
              </label>
            </div>
          </div>

          {/* Product Grid Area (3 Columns or 4 Columns) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-white border border-brand-beige p-8">
                <p className="font-serif text-xl text-brand-black mb-2">No creations meet your active criteria</p>
                <p className="text-xs text-brand-grey max-w-sm mx-auto mb-6">
                  Try adjusting your price range or clearing gemstone and metal filters to explore our full collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-black text-brand-gold px-6 py-3 text-xs uppercase tracking-luxury font-semibold hover:bg-brand-gold hover:text-brand-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'
                } gap-6 sm:gap-8`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="w-4/5 max-w-sm h-full bg-brand-ivory p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-beige">
                <h3 className="font-serif text-lg font-medium text-brand-black">Refine Selection</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-brand-black" />
                </button>
              </div>

              {/* Category */}
              <div className="py-4 border-b border-brand-beige">
                <h4 className="text-xs uppercase tracking-luxury font-semibold mb-2">Category</h4>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilters((p) => ({ ...p, category: c }))}
                      className={`block text-xs py-1 ${filters.category === c ? 'text-brand-gold font-semibold' : 'text-brand-black'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal */}
              <div className="py-4 border-b border-brand-beige">
                <h4 className="text-xs uppercase tracking-luxury font-semibold mb-2">Precious Metal</h4>
                {metals.map((m) => (
                  <label key={m} className="flex items-center gap-2 text-xs py-1">
                    <input
                      type="radio"
                      name="m-metal"
                      checked={filters.metal === m}
                      onChange={() => setFilters((p) => ({ ...p, metal: m }))}
                      className="accent-brand-gold"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>

              {/* Price */}
              <div className="py-4">
                <h4 className="text-xs uppercase tracking-luxury font-semibold mb-2">
                  Max Price: {formatPrice(filters.priceRange[1])}
                </h4>
                <input
                  type="range"
                  min="1500"
                  max="15000"
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters((p) => ({ ...p, priceRange: [0, Number(e.target.value)] }))}
                  className="w-full accent-brand-gold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-beige flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 border border-brand-black py-2.5 text-xs uppercase tracking-luxury"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 bg-brand-gold text-brand-black py-2.5 text-xs uppercase tracking-luxury font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
