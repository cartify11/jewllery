import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FaqPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true,
    '1-0': true,
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      category: 'Acquisitions & Delivery',
      questions: [
        {
          q: 'How are Aurelia creations packaged and dispatched?',
          a: 'Every piece is housed in our signature velvet-lined jewellery casket, tied with champagne grosgrain ribbon, and enclosed in an unbranded, tamper-evident armored dispatch carton. Transit is fully insured underwritten by Lloyd’s of London until an adult signature is registered upon delivery.',
        },
        {
          q: 'Do you deliver internationally?',
          a: 'Yes, we provide complimentary insured courier shipping to over 80 countries worldwide. All local customs duties and VAT taxes are calculated and guaranteed at checkout with zero unexpected border fees.',
        },
        {
          q: 'Can I arrange for salon collection instead of home delivery?',
          a: 'Certainly. You may elect to collect your acquisition at any of our flagship salons in Paris (Place Vendôme), London (New Bond Street), or New York (Madison Avenue), accompanied by private champagne service and on-site fit adjustments.',
        },
      ],
    },
    {
      category: 'Sizing & Custom Bespoke',
      questions: [
        {
          q: 'What if my ring does not fit perfectly?',
          a: 'Aurelia offers one complimentary bespoke resizing on all solitaire and cocktail rings within 90 days of purchase. Simply contact your private concierge to receive a pre-insured return dispatch label.',
        },
        {
          q: 'Can I commission a one-of-a-kind bespoke design?',
          a: 'Our European ateliers accept a limited number of private bespoke commissions each year. Our head designer will work with you to sketch conceptual gouache renderings and source exceptional certified gemstones to realize your personal vision.',
        },
      ],
    },
    {
      category: 'Gemstones, Gold & Certifications',
      questions: [
        {
          q: 'Are your diamonds ethically certified?',
          a: 'Yes. 100% of our diamonds conform to the Kimberley Process and are certified by leading independent gemological laboratories including GIA, IGI, and SSEF. We never deal in conflict minerals.',
        },
        {
          q: 'What gold purity does Aurelia use?',
          a: 'We craft exclusively in solid 18K gold (750/1000 purity) and solid Platinum 950. We never produce gold vermeil or plated items. Every creation is struck with governmental assay hallmarks certifying metal purity.',
        },
      ],
    },
  ];

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Client Assistance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed font-normal">
            Everything you need to know about purchasing, insured transit, diamond certifications, and lifetime service.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((sec, secIdx) => (
            <div key={sec.category} className="bg-white border border-brand-beige p-6 sm:p-8">
              <h2 className="font-serif text-xl font-normal text-brand-black border-b border-brand-beige pb-3 mb-4">
                {sec.category}
              </h2>

              <div className="divide-y divide-brand-beige/60">
                {sec.questions.map((item, qIdx) => {
                  const id = `${secIdx}-${qIdx}`;
                  const isOpen = !!openItems[id];
                  return (
                    <div key={item.q} className="py-4">
                      <button
                        onClick={() => toggle(id)}
                        className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-medium text-brand-black hover:text-brand-gold transition-colors gap-4"
                      >
                        <span>{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-brand-gold shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed pr-6 font-normal">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-[#FAF4E6] border border-brand-gold/40 p-8">
          <h3 className="font-serif text-xl font-normal text-brand-black mb-2">Have an Unanswered Question?</h3>
          <p className="text-xs text-brand-grey max-w-md mx-auto mb-6">
            Our private client concierge is available around the clock to assist with bespoke requests.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="bg-brand-black text-brand-gold hover:bg-brand-gold hover:text-brand-black px-6 py-3 text-xs uppercase tracking-luxury font-semibold transition-all"
          >
            Connect With Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
