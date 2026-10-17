import React, { useState } from 'react';
import { ChevronDown, Sparkles, MessageCircle, Phone, ArrowRight, ShieldCheck, Gem, Truck, RotateCcw } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface FaqItem {
  q: string;
  a: string;
  category: 'gold' | 'delivery' | 'sizing' | 'warranty';
}

export const FaqSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Are Aurelia diamonds and gemstones certified by GIA / IGI?',
      a: 'Yes, absolutely. 100% of our diamonds and sovereign gemstones are accompanied by an independent international gemological certificate (GIA, IGI, or SSEF). Each piece features laser-inscribed girdle serials matching your physical deed and origin dossier.',
      category: 'gold',
    },
    {
      q: 'What gold purity does Aurelia craft in?',
      a: 'We craft exclusively in solid 18K gold (750/1000 purity — yellow, rose, and white) and PT950 solid platinum. We never manufacture vermeil, plated, or hollow pieces. Every creation bears official government assay hallmark poinçons.',
      category: 'gold',
    },
    {
      q: 'How are orders dispatched and is delivery insured?',
      a: 'Every parcel is dispatched via specialized armored couriers (Ferrari Group / Malca-Amit) in discrete, tamper-evident packaging. All shipments are 100% insured underwritten by Lloyd’s of London until registered signature by an adult upon arrival.',
      category: 'delivery',
    },
    {
      q: 'Do you offer complimentary ring resizing if it does not fit?',
      a: 'Yes. We provide one complimentary bespoke resizing on all solitaire, band, and cocktail rings within 90 days of acquisition. We provide an armored return shipping label and our master goldsmiths handle the precision adjustment.',
      category: 'sizing',
    },
    {
      q: 'What is Aurelia’s warranty and lifetime care policy?',
      a: 'All acquisitions include our Lifetime Maison Warranty, covering annual prong security checks, complimentary ultrasonic cleaning, and rhodium rejuvenation. We also offer trade-in and upgrade privileges for private clients.',
      category: 'warranty',
    },
    {
      q: 'Can I arrange for a private salon consultation or bespoke commission?',
      a: 'Yes. You can schedule private appointments at our Paris, London, or New York salons. Our design studio also accepts select custom commissions to craft one-of-a-kind heirloom pieces with hand-selected gemstones.',
      category: 'sizing',
    },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter((item) => item.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-brand-beige">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-brand-gold text-[11px] uppercase tracking-[0.28em] font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Advisory & Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto my-4" />
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            Essential information regarding our European master goldsmithing, GIA certifications, armored worldwide transit, and lifetime guarantees.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-brand-beige/80 text-[11px] font-medium text-brand-black">
              <Gem className="w-4 h-4 text-brand-gold shrink-0" />
              <span>18K & GIA Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-brand-beige/80 text-[11px] font-medium text-brand-black">
              <Truck className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Armored Transit</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-brand-beige/80 text-[11px] font-medium text-brand-black">
              <RotateCcw className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Free 90-Day Resizing</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-brand-beige/80 text-[11px] font-medium text-brand-black">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'gold', label: 'Gold & Gemstones' },
            { id: 'delivery', label: 'Armored Shipping' },
            { id: 'sizing', label: 'Sizing & Bespoke' },
            { id: 'warranty', label: 'Lifetime Care' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setOpenIndex(0);
              }}
              className={`py-2 px-4 text-[11px] uppercase tracking-luxury font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-brand-black text-brand-gold border-brand-black shadow-sm font-semibold'
                  : 'bg-white text-stone-600 hover:text-brand-black border border-brand-beige hover:border-brand-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border transition-all duration-300 ${
                  isOpen ? 'border-brand-gold shadow-luxury' : 'border-brand-beige/90 hover:border-brand-gold/60'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-base sm:text-lg font-normal transition-colors ${
                    isOpen ? 'text-brand-gold-dark font-medium' : 'text-brand-black hover:text-brand-gold-dark'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen 
                      ? 'border-brand-gold bg-brand-gold text-brand-black rotate-180' 
                      : 'border-brand-beige text-stone-500'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 border-t border-brand-beige/40">
                    <p className="font-sans text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-white border border-brand-beige flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-semibold">
              Private Concierge Service
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-black mt-1">
              Have an Individual Inquiry?
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-lg leading-relaxed">
              Our diamond specialists and private client advisors are available via bespoke consultation, phone, or live messaging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="bg-brand-black hover:bg-brand-gold hover:text-brand-black text-brand-gold px-5 py-3 text-xs uppercase tracking-luxury font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Concierge</span>
            </button>

            <button
              onClick={() => navigateTo('faq')}
              className="bg-transparent hover:bg-brand-ivory text-brand-black border border-brand-beige hover:border-brand-black px-5 py-3 text-xs uppercase tracking-luxury font-medium transition-all duration-300 flex items-center gap-2"
            >
              <span>Full FAQ Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
