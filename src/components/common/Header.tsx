import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    setFilters,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    'Complimentary Worldwide Armored Delivery on Orders Over $500',
    'Private Client Atelier: Book Bespoke Consultations in Paris & London',
    'Privilege Code: AURELIA10 — 10% Off Your Inaugural Acquisition',
    '100% Recycled 18K Solid Gold & Conflict-Free Certified Diamonds'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleNavCategory = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
    }));
    navigateTo('shop');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-sm bg-brand-ivory">
      {/* 1. Slim Luxury Announcement Bar */}
      <div className="bg-brand-black text-brand-ivory py-2 px-4 border-b border-brand-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <div className="flex items-center justify-center gap-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-normal text-brand-ivory select-none">
            <Sparkles className="w-3 h-3 text-brand-gold shrink-0 animate-pulse" />
            <span className="transition-opacity duration-500 truncate max-w-xl">
              {announcements[announcementIndex]}
            </span>
            <Sparkles className="w-3 h-3 text-brand-gold shrink-0 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar: Logo on Left, Menu in Center, Actions on Right */}
      <nav
        className={`w-full transition-all duration-300 border-b border-brand-beige/70 ${
          isScrolled ? 'py-3 bg-[#FAF7F0]/95 backdrop-blur-md' : 'py-4 bg-brand-ivory'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* LEFT: Mobile Menu Button & Brand Wordmark Logo */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 -ml-1 text-brand-black hover:text-brand-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo Anchor (On Left) */}
            <div 
              className="cursor-pointer select-none group flex items-center gap-2.5" 
              onClick={() => navigateTo('home')}
            >
              <div className="flex items-center justify-center text-brand-gold">
                <svg className="w-5 h-5 fill-current text-brand-gold group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.28em] uppercase font-normal text-brand-black leading-none group-hover:text-brand-gold-dark transition-colors">
                  AURELIA
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-brand-gold font-medium mt-0.5">
                  JEWELS
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Navigation Links (Refined Luxury Layout, Zero Wrapping) */}
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 text-[11.5px] xl:text-[12.5px] uppercase tracking-[0.2em] font-medium font-sans text-brand-black shrink-0">
            <button
              onClick={() => {
                setFilters((p) => ({ ...p, category: 'All' }));
                navigateTo('shop');
              }}
              className={`group relative py-1.5 px-0.5 whitespace-nowrap transition-colors duration-200 ${
                activePage === 'shop' ? 'text-brand-gold font-semibold' : 'text-brand-black/90 hover:text-brand-gold'
              }`}
            >
              <span>Shop</span>
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-gold transition-all duration-300 ${
                activePage === 'shop' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => handleNavCategory('Rings')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Rings</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavCategory('Necklaces')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Necklaces</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavCategory('Earrings')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Earrings</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavCategory('Bracelets')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Bracelets</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavCategory('Diamond Jewellery')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Diamonds</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => handleNavCategory('Gold Jewellery')}
              className="group relative py-1.5 px-0.5 whitespace-nowrap text-brand-black/90 hover:text-brand-gold transition-colors duration-200"
            >
              <span>Gold</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`group relative py-1.5 px-0.5 whitespace-nowrap transition-colors duration-200 ${
                activePage === 'about' ? 'text-brand-gold font-semibold' : 'text-brand-black/90 hover:text-brand-gold'
              }`}
            >
              <span>About</span>
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-gold transition-all duration-300 ${
                activePage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`group relative py-1.5 px-0.5 whitespace-nowrap transition-colors duration-200 ${
                activePage === 'contact' ? 'text-brand-gold font-semibold' : 'text-brand-black/90 hover:text-brand-gold'
              }`}
            >
              <span>Contact</span>
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-gold transition-all duration-300 ${
                activePage === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          </div>

          {/* RIGHT: Actions (Currency, Search, Account, Wishlist, Bag) */}
          <div className="flex items-center space-x-3 sm:space-x-4 justify-end text-brand-black shrink-0">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center border-r border-brand-beige pr-3 text-[11px]">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-brand-black hover:text-brand-gold font-medium border-none focus:outline-none cursor-pointer tracking-wider text-[11px] uppercase"
                aria-label="Select Currency"
              >
                <option value="PKR">PKR (Rs.)</option>
                <option value="USD">USD ($)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-brand-gold transition-colors flex items-center gap-1.5 text-brand-black"
              title="Search Collection"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden xl:inline text-[11px] uppercase tracking-luxury text-brand-grey font-medium hover:text-brand-gold">
                Search
              </span>
            </button>

            {/* Customer Account */}
            <button
              onClick={() => navigateTo('account')}
              className={`p-1.5 hover:text-brand-gold transition-colors ${
                activePage === 'account' ? 'text-brand-gold' : ''
              }`}
              title="Client Account"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-1.5 hover:text-brand-gold transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 stroke-[1.5] ${wishlist.length > 0 ? 'fill-brand-gold text-brand-gold' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-black text-brand-gold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 hover:text-brand-gold transition-colors flex items-center gap-2 group"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5] group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
              <span className="hidden xl:inline text-[11px] font-medium tracking-luxury uppercase">
                Bag ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm h-full bg-brand-ivory p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-beige">
                <div>
                  <span className="font-serif text-2xl tracking-[0.25em] font-normal">AURELIA</span>
                  <p className="text-[9px] tracking-[0.3em] text-brand-gold uppercase">Fine Jewellery</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-brand-black hover:text-brand-gold"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-3">
                {[
                  { label: 'Shop All Jewellery', action: () => { setFilters(p => ({ ...p, category: 'All' })); navigateTo('shop'); } },
                  { label: 'Rings & Solitaires', action: () => handleNavCategory('Rings') },
                  { label: 'Necklaces & Collars', action: () => handleNavCategory('Necklaces') },
                  { label: 'Earrings & Chandelier Drops', action: () => handleNavCategory('Earrings') },
                  { label: 'Tennis Bracelets & Cuffs', action: () => handleNavCategory('Bracelets') },
                  { label: 'Solid 18K Gold Collection', action: () => handleNavCategory('Gold Jewellery') },
                  { label: 'Conflict-Free Diamonds', action: () => handleNavCategory('Diamond Jewellery') },
                  { label: 'Our Atelier & Heritage', action: () => navigateTo('about') },
                  { label: 'VIP Concierge & Contact', action: () => navigateTo('contact') },
                  { label: 'Track Order Status', action: () => navigateTo('track') },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.action();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-xs uppercase tracking-luxury font-medium text-brand-black hover:text-brand-gold border-b border-brand-beige/50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-brand-beige space-y-4">
              <div className="flex items-center justify-between text-xs text-brand-grey">
                <span>Select Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-brand-beige/40 px-2 py-1 rounded text-brand-black font-medium text-xs"
                >
                  <option value="PKR">PKR (Rs.)</option>
                  <option value="USD">USD ($)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <p className="text-[11px] text-brand-grey text-center">
                Private Concierge: +1 (800) 489-AURELIA
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
